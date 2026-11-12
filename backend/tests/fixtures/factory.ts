export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends ReadonlyArray<infer U>
    ? ReadonlyArray<U>
    : T[K] extends object
      ? DeepPartial<T[K]>
      : T[K];
};

export function mergeFixture<T extends object>(base: T, overrides?: DeepPartial<T>): T {
  if (!overrides) return { ...base };
  const out = { ...base } as T;
  for (const key of Object.keys(overrides) as Array<keyof T>) {
    const value = overrides[key];
    const current = out[key];
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      current &&
      typeof current === "object" &&
      !Array.isArray(current)
    ) {
      out[key] = mergeFixture(
        current as object,
        value as DeepPartial<object>,
      ) as T[keyof T];
    } else if (value !== undefined) {
      out[key] = value as T[keyof T];
    }
  }
  return out;
}
