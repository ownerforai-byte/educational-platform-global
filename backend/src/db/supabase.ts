import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const MOCK_CLASSES = [
  { id: "cls-11", slug: "grade-11", name: "Grade 11", is_active: true, education_level_id: "lvl-1" },
  { id: "cls-12", slug: "grade-12", name: "Grade 12", is_active: true, education_level_id: "lvl-1" },
];

const MOCK_SUBJECTS = [
  { id: "sub-phy", class_id: "cls-11", slug: "physics", name: "Physics", is_active: true, order: 1 },
  { id: "sub-chem", class_id: "cls-11", slug: "chemistry", name: "Chemistry", is_active: true, order: 2 },
  { id: "sub-bio", class_id: "cls-11", slug: "biology", name: "Biology", is_active: true, order: 3 },
  { id: "sub-math", class_id: "cls-11", slug: "mathematics", name: "Mathematics", is_active: true, order: 4 },
  { id: "sub-eng", class_id: "cls-11", slug: "english", name: "English", is_active: true, order: 5 },
  { id: "sub-nep", class_id: "cls-11", slug: "nepali", name: "Nepali", is_active: true, order: 6 },
];

const MOCK_CHAPTERS = [
  { id: "ch-vec", subject_id: "sub-phy", slug: "vectors", title: "Vectors & Scalars", is_active: true, order: 1 },
  { id: "ch-kin", subject_id: "sub-phy", slug: "kinematics", title: "Kinematics", is_active: true, order: 2 },
  { id: "ch-dyn", subject_id: "sub-phy", slug: "dynamics", title: "Dynamics", is_active: true, order: 3 },
  { id: "ch-grav", subject_id: "sub-phy", slug: "gravitation", title: "Gravitation", is_active: true, order: 4 },
];

const MOCK_TOPICS = [
  { id: "top-1", chapter_id: "ch-vec", slug: "01-scalars-and-vectors", title: "Scalars and Vectors", is_active: true, order: 1 },
  { id: "top-2", chapter_id: "ch-vec", slug: "02-vector-addition", title: "Vector Addition", is_active: true, order: 2 },
];

const MOCK_LEVELS = [
  { id: "lvl-1", slug: "neb-plus-two", name: "NEB (+2) Higher Secondary", is_active: true },
];

function createMockQueryBuilder(table: string) {
  let tableData: any[] = [];
  if (table === "classes") tableData = [...MOCK_CLASSES];
  else if (table === "subjects") tableData = [...MOCK_SUBJECTS];
  else if (table === "chapters") tableData = [...MOCK_CHAPTERS];
  else if (table === "topics") tableData = [...MOCK_TOPICS];
  else if (table === "education_levels") tableData = [...MOCK_LEVELS];
  else if (table === "profiles") {
    tableData = [{ id: "mock-user-1", role: "STUDENT", full_name: "Guest Student", credits: 100, is_active: true }];
  }

  let filtered = [...tableData];

  const builder: any = {
    select(_fields?: string, options?: any) {
      if (options?.head) {
        return {
          ...builder,
          then(onfulfilled?: any) {
            return Promise.resolve({ data: null, count: filtered.length, error: null }).then(onfulfilled);
          },
        };
      }
      return builder;
    },
    eq(column: string, value: any) {
      filtered = filtered.filter((row) => row[column] === value);
      return builder;
    },
    neq(column: string, value: any) {
      filtered = filtered.filter((row) => row[column] !== value);
      return builder;
    },
    order(_column: string, _opts?: any) {
      return builder;
    },
    limit(count: number) {
      filtered = filtered.slice(0, count);
      return builder;
    },
    range(from: number, to: number) {
      filtered = filtered.slice(from, to + 1);
      return builder;
    },
    single() {
      return Promise.resolve({
        data: filtered[0] ?? null,
        error: filtered[0] ? null : { message: "Row not found", code: "PGRST116" },
      });
    },
    maybeSingle() {
      return Promise.resolve({
        data: filtered[0] ?? null,
        error: null,
      });
    },
    insert(row: any) {
      return Promise.resolve({ data: row, error: null });
    },
    update(updates: any) {
      return Promise.resolve({ data: updates, error: null });
    },
    delete() {
      return Promise.resolve({ data: null, error: null });
    },
    then(onfulfilled?: any, onrejected?: any) {
      return Promise.resolve({
        data: filtered,
        error: null,
        count: filtered.length,
      }).then(onfulfilled, onrejected);
    },
  };

  return builder;
}

function createMockSupabaseClient(): SupabaseClient {
  console.warn("[AI Studio] Supabase credentials not configured — using in-memory mock fallback");

  const mockClient: any = {
    from(table: string) {
      return createMockQueryBuilder(table);
    },
    auth: {
      getUser: async (_token?: string) => ({
        data: {
          user: {
            id: "guest-user-id",
            email: "guest@nebstudy.org",
            user_metadata: { full_name: "Guest Student" },
          },
        },
        error: null,
      }),
      signInWithPassword: async () => ({
        data: {
          user: { id: "guest-user-id", email: "guest@nebstudy.org" },
          session: { access_token: "mock-session-token", refresh_token: "mock-refresh-token" },
        },
        error: null,
      }),
      signUp: async () => ({
        data: {
          user: { id: "guest-user-id", email: "guest@nebstudy.org" },
          session: { access_token: "mock-session-token" },
        },
        error: null,
      }),
      signOut: async () => ({ error: null }),
      admin: {
        updateUserById: async () => ({ data: {}, error: null }),
      },
    },
    storage: {
      from: () => ({
        upload: async () => ({ data: { path: "mock-path" }, error: null }),
        getPublicUrl: (filePath: string) => ({ data: { publicUrl: `/mock/${filePath}` } }),
      }),
    },
  };

  return mockClient as SupabaseClient;
}

function createSupabaseAdmin(): SupabaseClient {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    return createMockSupabaseClient();
  }

  try {
    return createClient(url, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  } catch (e) {
    console.warn("[AI Studio] Failed to init Supabase client, using mock:", e);
    return createMockSupabaseClient();
  }
}

let cached: SupabaseClient | null = null;

export const supabaseAdmin: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    if (!cached) {
      cached = createSupabaseAdmin();
    }
    const value = Reflect.get(cached as object, prop);
    return typeof value === "function" ? value.bind(cached) : value;
  },
});

