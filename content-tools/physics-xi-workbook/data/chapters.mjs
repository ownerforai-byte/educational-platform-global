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
  {
    unitNo: 3,
    unitId: "kinematics",
    unitName: "Kinematics",
    chapters: [
      {
        slug: "velocity-and-acceleration",
        code: "3.1",
        title: "Velocity, Acceleration and Graphs",
        topics: [
          "Instantaneous velocity and acceleration",
          "Graphical treatment of motion",
          "Equations of motion",
          "Relative velocity",
        ],
      },
      {
        slug: "free-fall-and-projectiles",
        code: "3.2",
        title: "Free Fall and Projectile Motion",
        topics: [
          "Freely falling bodies",
          "Time of flight",
          "Range and maximum height",
          "Relative velocity in two dimensions",
        ],
      },
    ],
  },
  {
    unitNo: 4,
    unitId: "dynamics",
    unitName: "Dynamics",
    chapters: [
      {
        slug: "momentum-impulse-and-newtons-laws",
        code: "4.1",
        title: "Momentum, Impulse and Newton's Laws",
        topics: [
          "Linear momentum and impulse",
          "Newton's laws applied",
          "Conservation of linear momentum",
          "Recoil and collisions",
        ],
      },
      {
        slug: "torque-equilibrium-and-friction",
        code: "4.2",
        title: "Torque, Equilibrium and Friction",
        topics: [
          "Moment of a force and torque",
          "Conditions of equilibrium",
          "Laws of solid friction",
          "Angle of friction and repose",
        ],
      },
    ],
  },
  {
    unitNo: 5,
    unitId: "work-energy-and-power",
    unitName: "Work, Energy and Power",
    chapters: [
      {
        slug: "work-energy-and-power",
        code: "5.1",
        title: "Work, Energy and Power",
        topics: [
          "Work done by a constant force",
          "Work-energy theorem",
          "Power",
          "Efficiency",
        ],
      },
      {
        slug: "conservation-of-energy-and-collisions",
        code: "5.2",
        title: "Conservation of Energy and Collisions",
        topics: [
          "Kinetic and potential energy",
          "Conservation of mechanical energy",
          "Elastic collisions",
          "Inelastic collisions",
        ],
      },
    ],
  },
];
