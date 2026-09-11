// In-memory fallback mock for Supabase when SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are not provided.
// Provides realistic NEB Class 11 and 12 curriculum data so all endpoints work immediately.

export interface MockRecord {
  [key: string]: any;
}

const MOCK_CLASSES: MockRecord[] = [
  { id: "cls-11", slug: "class-11", name: "Class 11 Science", education_level_id: "level-1", is_active: true, order: 1 },
  { id: "cls-12", slug: "class-12", name: "Class 12 Science", education_level_id: "level-1", is_active: true, order: 2 },
];

const MOCK_LEVELS: MockRecord[] = [
  { id: "level-1", slug: "neb-science", name: "National Examinations Board (NEB) +2 Science", is_active: true },
];

const MOCK_SUBJECTS: MockRecord[] = [
  { id: "sub-11-phy", class_id: "cls-11", slug: "physics", name: "Physics", description: "Mechanics, Heat, Thermodynamics, Waves and Optics for Grade 11", is_active: true, order: 1 },
  { id: "sub-11-chem", class_id: "cls-11", slug: "chemistry", name: "Chemistry", description: "General and Physical, Inorganic, Organic Chemistry for Grade 11", is_active: true, order: 2 },
  { id: "sub-11-bio", class_id: "cls-11", slug: "biology", name: "Biology", description: "Botany and Zoology: Biomolecules, Cell Biology, Floral Diversity, and Ecology", is_active: true, order: 3 },
  { id: "sub-11-math", class_id: "cls-11", slug: "mathematics", name: "Mathematics", description: "Algebra, Trigonometry, Analytical Geometry, Calculus, Vectors", is_active: true, order: 4 },
  { id: "sub-11-cs", class_id: "cls-11", slug: "computer-science", name: "Computer Science", description: "Computer System Architecture, Programming in C, Web Technology", is_active: true, order: 5 },
  { id: "sub-12-phy", class_id: "cls-12", slug: "physics", name: "Physics", description: "Electricity, Magnetism, Modern Physics for Grade 12", is_active: true, order: 1 },
  { id: "sub-12-chem", class_id: "cls-12", slug: "chemistry", name: "Chemistry", description: "Physical Chemistry, Organic Synthesis, Transition Metals for Grade 12", is_active: true, order: 2 },
  { id: "sub-12-bio", class_id: "cls-12", slug: "biology", name: "Biology", description: "Genetics, Physiology, Applied Biology for Grade 12", is_active: true, order: 3 },
];

const MOCK_CHAPTERS: MockRecord[] = [
  // Physics
  { id: "chap-vectors", subject_id: "sub-11-phy", slug: "vectors", title: "Vectors & Scalars", description: "Vector addition, resolution of vectors, dot and cross products", is_active: true, order: 1 },
  { id: "chap-kinematics", subject_id: "sub-11-phy", slug: "kinematics", title: "Kinematics", description: "Equations of motion, projectile motion, circular motion", is_active: true, order: 2 },
  { id: "chap-gravitation", subject_id: "sub-11-phy", slug: "gravitation", title: "Gravitation", description: "Newton's law of gravitation, gravitational field and potential, escape velocity", is_active: true, order: 3 },
  { id: "chap-optics", subject_id: "sub-11-phy", slug: "optics", title: "Optics & Light", description: "Reflection, refraction, total internal reflection, lenses and prisms", is_active: true, order: 4 },
  { id: "chap-heat", subject_id: "sub-11-phy", slug: "quantity-of-heat", title: "Quantity of Heat", description: "Calorimetry, specific heat capacity, latent heat, thermal expansion", is_active: true, order: 5 },
  // Chemistry
  { id: "chap-atomic", subject_id: "sub-11-chem", slug: "atomic-structure", title: "Atomic Structure", description: "Rutherford model, Bohr model, quantum numbers, electronic configuration", is_active: true, order: 1 },
  { id: "chap-stoich", subject_id: "sub-11-chem", slug: "stoichiometry", title: "Stoichiometry & Mole Concept", description: "Chemical equations, limiting reactants, molarity, empirical formula", is_active: true, order: 2 },
  // Biology
  { id: "chap-biomol", subject_id: "sub-11-bio", slug: "biomolecules-and-cell-biology", title: "Biomolecules & Cell Biology", description: "Carbohydrates, lipids, proteins, enzymes, cell organelles and ultrastructure", is_active: true, order: 1 },
  { id: "chap-floral", subject_id: "sub-11-bio", slug: "floral-diversity", title: "Floral Diversity", description: "Plant kingdom classification: fungi, algae, bryophytes, pteridophytes, angiosperms", is_active: true, order: 2 },
  // Math
  { id: "chap-algebra", subject_id: "sub-11-math", slug: "algebra", title: "Algebra & Matrices", description: "Quadratic equations, permutations, combinations, binomial theorem, matrices", is_active: true, order: 1 },
  { id: "chap-calculus", subject_id: "sub-11-math", slug: "calculus", title: "Calculus", description: "Limits, continuity, differentiation, applications of derivatives", is_active: true, order: 2 },
];

const MOCK_TOPICS: MockRecord[] = [
  { id: "top-rutherford", chapter_id: "chap-atomic", slug: "rutherford-model", title: "Rutherford's α-Ray Scattering Experiment", description: "Discovery of atomic nucleus, conclusions and limitations", is_active: true, order: 1 },
  { id: "top-bohr", chapter_id: "chap-atomic", slug: "bohr-atomic-theory", title: "Bohr's Theory of Hydrogen Atom", description: "Postulates, radius of orbit, energy levels and hydrogen spectrum", is_active: true, order: 2 },
  { id: "top-cell-membrane", chapter_id: "chap-biomol", slug: "cell-membrane", title: "Cell Membrane Structure & Fluid Mosaic Model", description: "Phospholipid bilayer, integral proteins, membrane transport mechanisms", is_active: true, order: 1 },
  { id: "top-mitochondria", chapter_id: "chap-biomol", slug: "mitochondria", title: "Mitochondria: Powerhouse of the Cell", description: "Double membrane structure, cristae, matrix, ATP synthesis via cellular respiration", is_active: true, order: 2 },
  { id: "top-newton-grav", chapter_id: "chap-gravitation", slug: "universal-gravitation", title: "Newton's Law of Universal Gravitation", description: "Statement, formula F = G(m1m2)/r^2, value and dimensions of G", is_active: true, order: 1 },
  { id: "top-vectors-add", chapter_id: "chap-vectors", slug: "vector-addition", title: "Triangle and Parallelogram Law of Vectors", description: "Analytical and graphical determination of resultant vectors", is_active: true, order: 1 },
];

const MOCK_RESOURCES: MockRecord[] = [
  {
    id: "res-pyq-1",
    title: "NEB Class 11 Physics Model Question 2080",
    type: "QUIZ",
    topic_id: "top-newton-grav",
    metadata: { year: 2080, subject: "Physics", marks: 75 },
    is_published: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "res-pyq-2",
    title: "NEB Class 11 Biology Model Question 2080",
    type: "QUIZ",
    topic_id: "top-cell-membrane",
    metadata: { year: 2080, subject: "Biology", marks: 75 },
    is_published: true,
    created_at: new Date().toISOString(),
  },
];

const tables: Record<string, MockRecord[]> = {
  classes: MOCK_CLASSES,
  education_levels: MOCK_LEVELS,
  subjects: MOCK_SUBJECTS,
  chapters: MOCK_CHAPTERS,
  topics: MOCK_TOPICS,
  resources: MOCK_RESOURCES,
  lab_progress: [],
  bookmarks: [],
  progress: [],
  user_progress: [],
  profiles: [
    { id: "user-default", role: "STUDENT", full_name: "NEB Science Student", email: "student@example.com" },
    { id: "teacher-default", role: "TEACHER", full_name: "Instructor Ravikishan", email: "teacher@example.com" },
  ],
};

class MockQueryBuilder {
  private tableName: string;
  private filters: Array<(row: MockRecord) => boolean> = [];
  private orderField?: string;
  private ascending = true;
  private limitCount?: number;
  private pendingUpdate?: Partial<MockRecord>;
  private pendingDelete = false;
  private pendingInsert?: MockRecord[];

  constructor(tableName: string) {
    this.tableName = tableName;
    if (!tables[tableName]) {
      tables[tableName] = [];
    }
  }

  select(_columns = "*") {
    return this;
  }

  eq(field: string, value: any) {
    this.filters.push((row) => row[field] === value);
    return this;
  }

  neq(field: string, value: any) {
    this.filters.push((row) => row[field] !== value);
    return this;
  }

  in(field: string, values: any[]) {
    this.filters.push((row) => values.includes(row[field]));
    return this;
  }

  order(field: string, options?: { ascending?: boolean }) {
    this.orderField = field;
    this.ascending = options?.ascending ?? true;
    return this;
  }

  limit(count: number) {
    this.limitCount = count;
    return this;
  }

  private execute(): MockRecord[] {
    let list = [...(tables[this.tableName] || [])];
    for (const filter of this.filters) {
      list = list.filter(filter);
    }
    if (this.orderField) {
      const f = this.orderField;
      const asc = this.ascending;
      list.sort((a, b) => {
        const valA = a[f];
        const valB = b[f];
        if (valA === valB) return 0;
        if (valA === undefined) return 1;
        if (valB === undefined) return -1;
        return (valA > valB ? 1 : -1) * (asc ? 1 : -1);
      });
    }
    if (this.limitCount !== undefined) {
      list = list.slice(0, this.limitCount);
    }
    return list;
  }

  update(data: Partial<MockRecord>) {
    this.pendingUpdate = data;
    return this;
  }

  delete() {
    this.pendingDelete = true;
    return this;
  }

  insert(data: MockRecord | MockRecord[]) {
    const records = Array.isArray(data) ? data : [data];
    this.pendingInsert = records.map((item) => ({
      id: item.id || `mock-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      created_at: new Date().toISOString(),
      ...item,
    }));
    return this;
  }

  upsert(data: MockRecord | MockRecord[], options?: { onConflict?: string }) {
    const records = Array.isArray(data) ? data : [data];
    const conflictFields = options?.onConflict ? options.onConflict.split(",").map((s) => s.trim()) : ["id"];
    
    if (!tables[this.tableName]) {
      tables[this.tableName] = [];
    }
    const currentTable = tables[this.tableName];
    const results: MockRecord[] = [];

    for (const item of records) {
      const matchIndex = currentTable.findIndex((row) =>
        conflictFields.every((f) => row[f] !== undefined && item[f] !== undefined && row[f] === item[f])
      );

      if (matchIndex >= 0) {
        currentTable[matchIndex] = {
          ...currentTable[matchIndex],
          ...item,
          updated_at: new Date().toISOString(),
        };
        results.push(currentTable[matchIndex]);
      } else {
        const newRecord = {
          id: item.id || `mock-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          ...item,
        };
        currentTable.push(newRecord);
        results.push(newRecord);
      }
    }

    this.pendingInsert = results;
    return this;
  }

  private resolveOperation(): { data: any; error: any } {
    if (this.pendingInsert) {
      for (const rec of this.pendingInsert) {
        tables[this.tableName].push(rec);
      }
      const data = this.pendingInsert.length === 1 ? this.pendingInsert[0] : this.pendingInsert;
      return { data, error: null };
    }

    if (this.pendingDelete) {
      const toDelete = new Set(this.execute());
      tables[this.tableName] = (tables[this.tableName] || []).filter((r) => !toDelete.has(r));
      return { data: Array.from(toDelete), error: null };
    }

    if (this.pendingUpdate) {
      const existing = this.execute();
      for (const row of existing) {
        Object.assign(row, this.pendingUpdate, { updated_at: new Date().toISOString() });
      }
      return { data: existing, error: null };
    }

    const data = this.execute().map((r) => ({ ...r }));
    return { data, error: null };
  }

  async single() {
    const res = this.resolveOperation();
    if (Array.isArray(res.data)) {
      if (res.data.length === 0) {
        return { data: null, error: { message: "Row not found", code: "PGRST116" } };
      }
      return { data: { ...res.data[0] }, error: null };
    }
    return { data: res.data ? { ...res.data } : null, error: null };
  }

  async maybeSingle() {
    const res = this.resolveOperation();
    if (Array.isArray(res.data)) {
      return { data: res.data.length > 0 ? { ...res.data[0] } : null, error: null };
    }
    return { data: res.data ? { ...res.data } : null, error: null };
  }

  then(resolve: (result: { data: any; error: any }) => any, reject?: (err: any) => any) {
    try {
      const res = this.resolveOperation();
      return Promise.resolve(resolve(res));
    } catch (e) {
      if (reject) return Promise.resolve(reject(e));
      return Promise.reject(e);
    }
  }
}

export function createMockSupabaseClient(): any {
  return {
    from(tableName: string) {
      return new MockQueryBuilder(tableName);
    },
    auth: {
      async getUser(_token?: string) {
        return {
          data: {
            user: {
              id: "user-default",
              email: "student@example.com",
              user_metadata: { full_name: "NEB Science Student" },
            },
          },
          error: null,
        };
      },
      async signInWithPassword({ email }: { email: string }) {
        return {
          data: {
            user: { id: "user-default", email },
            session: { access_token: "mock-jwt-token" },
          },
          error: null,
        };
      },
      async signUp({ email, options }: { email: string; options?: any }) {
        return {
          data: {
            user: { id: "user-default", email, user_metadata: options?.data },
            session: { access_token: "mock-jwt-token" },
          },
          error: null,
        };
      },
      admin: {
        async updateUserById() {
          return { data: {}, error: null };
        },
      },
    },
  };
}
