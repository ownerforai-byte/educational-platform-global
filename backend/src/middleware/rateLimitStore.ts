/**
 * Rate-limit store port (T14). Default in-memory; optional Upstash Redis REST
 * when UPSTASH_REDIS_REST_URL (+ TOKEN) are set.
 */

export interface RateLimitHit {
  count: number;
  reset: number;
}

export interface RateLimitStore {
  hit(key: string, windowMs: number): Promise<RateLimitHit>;
  clear(): void;
}

export class MemoryStore implements RateLimitStore {
  private hits = new Map<string, RateLimitHit>();

  async hit(key: string, windowMs: number): Promise<RateLimitHit> {
    const now = Date.now();
    if (this.hits.size > 5000) {
      for (const [k, entry] of this.hits) {
        if (now > entry.reset) this.hits.delete(k);
      }
    }
    const entry = this.hits.get(key);
    if (!entry || now > entry.reset) {
      const next = { count: 1, reset: now + windowMs };
      this.hits.set(key, next);
      return next;
    }
    entry.count += 1;
    return entry;
  }

  clear(): void {
    this.hits.clear();
  }
}

/**
 * Upstash REST (no SDK). Uses INCR + conditional PEXPIRE so the window starts
 * on the first hit. Falls back to a soft fail-open only if fetch throws —
 * callers should treat that as count=1.
 */
export class UpstashStore implements RateLimitStore {
  constructor(
    private readonly url: string,
    private readonly token: string,
  ) {}

  private async command(args: Array<string | number>): Promise<unknown> {
    const res = await fetch(this.url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(args),
    });
    if (!res.ok) {
      throw new Error(`Upstash ${res.status}`);
    }
    const body = (await res.json()) as { result?: unknown };
    return body.result;
  }

  async hit(key: string, windowMs: number): Promise<RateLimitHit> {
    const redisKey = `rl:${key}`;
    const count = Number(await this.command(["INCR", redisKey]));
    if (count === 1) {
      await this.command(["PEXPIRE", redisKey, windowMs]);
    }
    const pttl = Number(await this.command(["PTTL", redisKey]));
    const reset = Date.now() + (pttl > 0 ? pttl : windowMs);
    return { count, reset };
  }

  clear(): void {
    // No-op for distributed store (tests use MemoryStore).
  }
}

let activeStore: RateLimitStore = new MemoryStore();

export function getRateLimitStore(): RateLimitStore {
  return activeStore;
}

/** Select store from env; call once at boot or from tests. */
export function configureRateLimitStore(env: NodeJS.ProcessEnv = process.env): RateLimitStore {
  const url = env.UPSTASH_REDIS_REST_URL?.trim();
  const token = env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (url && token) {
    activeStore = new UpstashStore(url, token);
  } else {
    activeStore = new MemoryStore();
  }
  return activeStore;
}

export function resetRateLimitStoreForTests(): void {
  activeStore = new MemoryStore();
}
