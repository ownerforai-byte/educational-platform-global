/**
 * Physics XI — chapter registry for the A4 workbook.
 *
 * Unit order, ids and titles follow `frontend/lib/core/syllabus.ts` exactly.
 * Only units whose chapter data exists yet are listed here; add a unit as its
 * `data/unit-NN.mjs` file is authored.
 */

export const UNITS = [
  {
    unitNo: 1,
    unitId: "physical-quantities",
    unitName: "Physical Quantities",
    chapters: [
      {
        slug: "precision-and-significant-figures",
        code: "1.1",
        title: "Precision and Significant Figures",
        topics: [
          "Precision and accuracy",
          "Significant figures",
          "Scientific notation",
          "Rounding and fractional error",
        ],
      },
      {
        slug: "dimensions-and-dimensional-analysis",
        code: "1.2",
        title: "Dimensions and Dimensional Analysis",
        topics: [
          "Dimensions of derived quantities",
          "Dimensional homogeneity",
          "Deriving formulae",
          "Limitations of dimensional analysis",
        ],
      },
    ],
  },
  {
    unitNo: 2,
    unitId: "vectors",
    unitName: "Vectors",
    chapters: [
      {
        slug: "triangle-and-parallelogram-laws",
        code: "2.1",
        title: "Triangle and Parallelogram Laws",
        topics: [
          "Triangle law of vector addition",
          "Parallelogram law and the resultant",
          "Polygon law",
          "Special cases and equilibrium",
        ],
      },
      {
        slug: "resolution-of-vectors",
        code: "2.2",
        title: "Resolution of Vectors and Unit Vectors",
        topics: [
          "Rectangular components",
          "Unit vectors and direction cosines",
          "Adding vectors by components",
          "Angle of the resultant",
        ],
      },
      {
        slug: "scalar-and-vector-products",
        code: "2.3",
        title: "Scalar and Vector Products",
        topics: [
          "Dot product and its applications",
          "Cross product and its applications",
          "Angle between two vectors",
          "Geometrical meaning of the products",
        ],
      },
    ],
  },
];
