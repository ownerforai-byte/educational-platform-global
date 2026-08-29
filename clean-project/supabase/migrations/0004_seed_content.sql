-- ============================================================================
-- SEED: Chapters, Topics, and Resources for NEB Class 11 & 12
-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/tsvbksfegvdjwczzfdcx/sql/new
-- ============================================================================

-- Get class IDs
do $$
declare
  class11_id uuid;
  class12_id uuid;
  neb_id uuid;
begin
  select id into neb_id from education_levels where slug = 'neb';
  select id into class11_id from classes where slug = 'class-11' and education_level_id = neb_id;
  select id into class12_id from classes where slug = 'class-12' and education_level_id = neb_id;

  -- =========================================================
  -- CLASS 11 CHAPTERS
  -- =========================================================

  -- Mathematics Class 11
  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'sets', 'Sets', 'Theory of sets, types of sets, operations on sets', 1, true
  from subjects where slug = 'mathematics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'complex-numbers', 'Complex Numbers', 'Complex number system, operations, Argand diagram', 2, true
  from subjects where slug = 'mathematics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'quadratic-equation', 'Quadratic Equation', 'Solving quadratic equations, relation between roots and coefficients', 3, true
  from subjects where slug = 'mathematics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'permutation-combination', 'Permutation & Combination', 'Fundamental counting principle, permutations, combinations', 4, true
  from subjects where slug = 'mathematics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'sequence-series', 'Sequence & Series', 'Arithmetic progression, geometric progression', 5, true
  from subjects where slug = 'mathematics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'binomial-theorem', 'Binomial Theorem', 'Binomial expansion for positive integral index', 6, true
  from subjects where slug = 'mathematics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'mathematical-induction', 'Mathematical Induction', 'Principle of mathematical induction', 7, true
  from subjects where slug = 'mathematics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'linear-inequalities', 'Linear Inequalities', 'Solving linear inequalities in one variable', 8, true
  from subjects where slug = 'mathematics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'straight-lines', 'Straight Lines', 'Slope, equation of a line, various forms', 9, true
  from subjects where slug = 'mathematics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'limits-derivatives', 'Limits & Derivatives', 'Concept of limit, differentiation basics', 10, true
  from subjects where slug = 'mathematics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'statistical-methods', 'Statistical Methods', 'Mean, median, mode, standard deviation', 11, true
  from subjects where slug = 'mathematics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  -- Physics Class 11
  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'physical-world', 'Physical World', 'Scope and excitement of physics, nature of physical laws', 1, true
  from subjects where slug = 'physics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'kinematics', 'Kinematics', 'Motion in a straight line, motion in a plane, projectiles', 2, true
  from subjects where slug = 'physics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'laws-of-motion', 'Laws of Motion', 'Newton''s laws, momentum, impulse, friction', 3, true
  from subjects where slug = 'physics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'work-energy-power', 'Work, Energy & Power', 'Work-energy theorem, kinetic and potential energy', 4, true
  from subjects where slug = 'physics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'system-of-particles', 'System of Particles', 'Center of mass, conservation of momentum, collisions', 5, true
  from subjects where slug = 'physics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'rotational-motion', 'Rotational Motion', 'Moment of inertia, angular momentum, torque', 6, true
  from subjects where slug = 'physics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'gravitation', 'Gravitation', 'Newton''s law of gravitation, gravitational potential, satellites', 7, true
  from subjects where slug = 'physics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'properties-of-matter', 'Properties of Matter', 'Elasticity, viscosity, surface tension, thermometry', 8, true
  from subjects where slug = 'physics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'thermodynamics', 'Thermodynamics', 'Laws of thermodynamics, heat engines, entropy', 9, true
  from subjects where slug = 'physics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'kinetic-theory', 'Kinetic Theory', 'Kinetic theory of gases, ideal gas equation', 10, true
  from subjects where slug = 'physics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'oscillations-waves', 'Oscillations & Waves', 'Simple harmonic motion, wave motion, sound waves', 11, true
  from subjects where slug = 'physics' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  -- Chemistry Class 11
  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'some-basic-concepts', 'Some Basic Concepts of Chemistry', 'Law of chemical combination, stoichiometry', 1, true
  from subjects where slug = 'chemistry' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'structure-of-atom', 'Structure of Atom', 'Atomic model, quantum numbers, electronic configuration', 2, true
  from subjects where slug = 'chemistry' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'classification-elements', 'Classification of Elements', 'Periodic table, periodic trends', 3, true
  from subjects where slug = 'chemistry' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'chemical-bonding', 'Chemical Bonding', 'Ionic bond, covalent bond, VSEPR, hybridization', 4, true
  from subjects where slug = 'chemistry' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'thermodynamics-chem', 'Thermodynamics', 'First and second laws, enthalpy, Hess law', 5, true
  from subjects where slug = 'chemistry' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'equilibrium', 'Equilibrium', 'Chemical equilibrium, acid-base equilibrium, solubility', 6, true
  from subjects where slug = 'chemistry' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'redox-reactions', 'Redox Reactions', 'Oxidation-reduction, balancing redox equations', 7, true
  from subjects where slug = 'chemistry' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'hydrogen', 'Hydrogen', 'Properties, preparation, uses of hydrogen', 8, true
  from subjects where slug = 'chemistry' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 's-block', 's-Block Elements', 'Alkali metals and alkaline earth metals', 9, true
  from subjects where slug = 'chemistry' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'organic-chemistry-basic', 'Organic Chemistry - Basic Principles', 'IUPAC naming, isomerism, electronic effects', 10, true
  from subjects where slug = 'chemistry' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'hydrocarbons', 'Hydrocarbons', 'Alkanes, alkenes, alkynes, aromatic hydrocarbons', 11, true
  from subjects where slug = 'chemistry' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  -- Biology Class 11
  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'the-living-world', 'The Living World', 'Diversity in living organisms, taxonomic classification', 1, true
  from subjects where slug = 'biology' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'biological-classification', 'Biological Classification', 'Five-kingdom classification, microbes, fungi', 2, true
  from subjects where slug = 'biology' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'plant-kingdom', 'Plant Kingdom', 'Algae, bryophytes, pteridophytes, gymnosperms, angiosperms', 3, true
  from subjects where slug = 'biology' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'animal-kingdom', 'Animal Kingdom', 'Basis of classification, phyla overview', 4, true
  from subjects where slug = 'biology' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'morphology-flowering-plants', 'Morphology of Flowering Plants', 'Root, stem, leaf, flower, fruit, seed', 5, true
  from subjects where slug = 'biology' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'anatomy-flowering-plants', 'Anatomy of Flowering Plants', 'Tissue systems, plant anatomy', 6, true
  from subjects where slug = 'biology' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'cell-structure', 'Cell: The Unit of Life', 'Cell structure, organelles, cell division', 7, true
  from subjects where slug = 'biology' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'plant-physiology', 'Plant Physiology', 'Transport, photosynthesis, respiration, plant growth', 8, true
  from subjects where slug = 'biology' and class_id = class11_id
  on conflict (slug, subject_id) do nothing;

  -- =========================================================
  -- CLASS 12 CHAPTERS
  -- =========================================================

  -- Mathematics Class 12
  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'relations-functions', 'Relations & Functions', 'Types of relations and functions, invertible functions', 1, true
  from subjects where slug = 'mathematics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'inverse-trigonometric', 'Inverse Trigonometric Functions', 'Domain, range, properties, identities', 2, true
  from subjects where slug = 'mathematics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'matrices', 'Matrices', 'Operations on matrices, symmetric and skew-symmetric', 3, true
  from subjects where slug = 'mathematics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'determinants', 'Determinants', 'Properties, evaluation, area of triangle, minors, cofactors', 4, true
  from subjects where slug = 'mathematics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'continuity-differentiability', 'Continuity & Differentiability', 'Continuity, differentiation of composite/complementary functions', 5, true
  from subjects where slug = 'mathematics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'integrals', 'Integrals', 'Indefinite integrals, substitution, partial fractions, by parts', 6, true
  from subjects where slug = 'mathematics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'dif-equations', 'Differential Equations', 'Formation, solution of first-order DEs', 7, true
  from subjects where slug = 'mathematics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'vector-algebra', 'Vector Algebra', 'Introduction, magnitude, direction, types of vectors', 8, true
  from subjects where slug = 'mathematics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, '3d-geometry', 'Three Dimensional Geometry', 'Direction ratios, lines, planes in 3D', 9, true
  from subjects where slug = 'mathematics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'linear-programming', 'Linear Programming', 'Formulation, graphical method of solution', 10, true
  from subjects where slug = 'mathematics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'probability', 'Probability', 'Conditional probability, multiplication theorem, Bayes theorem', 11, true
  from subjects where slug = 'mathematics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  -- Physics Class 12
  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'electrostatics', 'Electrostatics', 'Electric charges, Coulomb law, electric field, potential', 1, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'capacitors', 'Capacitance & Capacitors', 'Capacitor, parallel plate, dielectrics, energy storage', 2, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'current-electricity', 'Current Electricity', 'Electric current, Ohm law, resistance, Kirchhoff laws', 3, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'moving-charges-magnetism', 'Moving Charges & Magnetism', 'Biot-Savart law, Ampere law, force on moving charge', 4, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'magnetism-matter', 'Magnetism & Matter', 'Magnetic dipole, earth magnetism, magnetic properties', 5, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'em-induction', 'Electromagnetic Induction', 'Faraday''s law, Lenz law, self and mutual induction', 6, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'alternating-current', 'Alternating Current', 'AC voltage, LCR circuit, resonance, transformers', 7, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'em-waves', 'Electromagnetic Waves', 'EM spectrum, displacement current, waves', 8, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'ray-optics', 'Ray Optics & Optical Instruments', 'Reflection, refraction, mirrors, lenses, prisms, microscopes, telescopes', 9, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'wave-optics', 'Wave Optics', 'Wavefront, Huygens principle, interference, diffraction, polarization', 10, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'dual-nature', 'Dual Nature of Radiation & Matter', 'Photoelectric effect, Einstein equation, de Broglie wavelength', 11, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'atoms-nuclei', 'Atoms & Nuclei', 'Atomic models, nuclear structure, radioactivity, nuclear reactions', 12, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'semiconductors', 'Semiconductor Electronics', 'Energy bands, intrinsic/extrinsic semiconductors, diodes, transistors', 13, true
  from subjects where slug = 'physics' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  -- Chemistry Class 12
  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'solid-state', 'Solid State', 'Classification, unit cell, packing, defects, band theory', 1, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'solutions', 'Solutions', 'Types, concentration, solubility, colligative properties', 2, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'electrochemistry', 'Electrochemistry', 'Electrolysis, Galvanic cells, Nernst equation, fuel cells', 3, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'chemical-kinetics', 'Chemical Kinetics', 'Rate of reaction, order, molecularity, Arrhenius equation', 4, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'chemistry-in-everyday-life', 'Chemistry in Everyday Life', 'Medicines, detergents, food additives, chemicals in beauty', 5, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'general-strategy-organics', 'General Strategy - Organic Chemistry', 'Purification, characterization, named reactions', 6, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'haloalkanes-haloarenes', 'Haloalkanes & Haloarenes', 'Mechanism of substitution and elimination, polarity, uses', 7, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'alcohols-phenols-ethers', 'Alcohols, Phenols & Ethers', 'Preparation, properties, reactions of OH compounds', 8, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'aldehydes-ketones-acids', 'Aldehydes, Ketones & Carboxylic Acids', 'Carbonyl chemistry, nucleophilic addition, acidic properties', 9, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'amines', 'Amines', 'Classification, preparation, properties, reactions', 10, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'biomolecules', 'Biomolecules', 'Carbohydrates, proteins, vitamins, nucleic acids', 11, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'polymers', 'Polymers', 'Classification, polymerization, important polymers and their uses', 12, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'chemistry-neb', 'Chemistry NEB Focus', 'NEB exam focused topics and important reactions', 13, true
  from subjects where slug = 'chemistry' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  -- Biology Class 12
  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'reproduction', 'Reproduction in Organisms', 'Asexual and sexual reproduction, modes in organisms', 1, true
  from subjects where slug = 'biology' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'human-reproduction', 'Human Reproduction', 'Male and female reproductive systems, gametogenesis, fertilization', 2, true
  from subjects where slug = 'biology' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'genetics-evolution', 'Genetics & Evolution', 'Mendelian inheritance, chromosome theory, DNA structure, evolution', 3, true
  from subjects where slug = 'biology' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'human-health-disease', 'Human Health & Disease', 'Pathogens, immunity, AIDS, cancer, drug addiction', 4, true
  from subjects where slug = 'biology' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'microbes', 'Microbes in Human Welfare', 'Industrial microbiology, antibiotics, biogas', 5, true
  from subjects where slug = 'biology' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'biotechnology', 'Biotechnology', 'Principles, applications, GMO, genetic engineering', 6, true
  from subjects where slug = 'biology' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'ecology', 'Ecology & Environment', 'Ecosystem, ecology basics, environmental issues', 7, true
  from subjects where slug = 'biology' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  insert into chapters (subject_id, slug, title, description, "order", is_active)
  select id, 'biology-neb', 'Biology NEB Focus', 'NEB exam focused topics and important diagrams', 8, true
  from subjects where slug = 'biology' and class_id = class12_id
  on conflict (slug, subject_id) do nothing;

  -- =========================================================
  -- TOPICS (sample for key chapters)
  -- =========================================================

  -- Math Class 11: Sets
  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'types-of-sets', 'Types of Sets', 'Empty set, finite/infinite sets, equal sets, subsets', 1, true
  from chapters c join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'sets' and cl.slug = 'class-11'
  on conflict (slug, chapter_id) do nothing;

  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'venn-diagrams', 'Venn Diagrams', 'Representation of sets using Venn diagrams', 2, true
  from chapters c join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'sets' and cl.slug = 'class-11'
  on conflict (slug, chapter_id) do nothing;

  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'union-intersection', 'Union & Intersection', 'Operations on sets: union, intersection, difference', 3, true
  from chapters c join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'sets' and cl.slug = 'class-11'
  on conflict (slug, chapter_id) do nothing;

  -- Math Class 11: Quadratic Equation
  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'quadratic-formula', 'Quadratic Formula', 'Formula method, factoring, completing the square', 1, true
  from chapters c join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'quadratic-equation' and cl.slug = 'class-11'
  on conflict (slug, chapter_id) do nothing;

  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'discriminant', 'Discriminant & Nature of Roots', 'Discriminant determines nature of roots', 2, true
  from chapters c join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'quadratic-equation' and cl.slug = 'class-11'
  on conflict (slug, chapter_id) do nothing;

  -- Physics Class 11: Kinematics
  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'basic-kinematics', 'Basic Kinematics', 'Displacement, velocity, acceleration, equations of motion', 1, true
  from chapters c join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'kinematics' and cl.slug = 'class-11'
  on conflict (slug, chapter_id) do nothing;

  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'projectile-motion', 'Projectile Motion', 'Projectile trajectory, range, maximum height', 2, true
  from chapters c join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'kinematics' and cl.slug = 'class-11'
  on conflict (slug, chapter_id) do nothing;

  -- Physics Class 12: Electrostatics
  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'coulomb-law', 'Coulomb''s Law', 'Force between two point charges, vector form', 1, true
  from chapters c join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'electrostatics' and cl.slug = 'class-12'
  on conflict (slug, chapter_id) do nothing;

  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'electric-field', 'Electric Field', 'Electric field intensity, field lines, continuous charge distributions', 2, true
  from chapters c join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'electrostatics' and cl.slug = 'class-12'
  on conflict (slug, chapter_id) do nothing;

  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'electric-potential', 'Electric Potential', 'Electric potential, potential difference, equipotential surfaces', 3, true
  from chapters c join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'electrostatics' and cl.slug = 'class-12'
  on conflict (slug, chapter_id) do nothing;

  -- Chemistry Class 12: Solid State
  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'unit-cell', 'Unit Cell & Packing', 'Types of unit cells, packing efficiency, voids', 1, true
  from chapters c join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'solid-state' and cl.slug = 'class-12'
  on conflict (slug, chapter_id) do nothing;

  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'crystal-defects', 'Crystal Defects', 'Point defects, stoichiometric and non-stoichiometric', 2, true
  from chapters c join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'solid-state' and cl.slug = 'class-12'
  on conflict (slug, chapter_id) do nothing;

  -- =========================================================
  -- RESOURCES (sample educational content)
  -- =========================================================

  -- Math Class 11: Sets resources
  insert into resources (topic_id, type, content_type, title, content, is_published, "order")
  select t.id, 'NOTES', 'ORIGINAL', 'Sets - Complete Notes',
    '{"body":"A set is a well-defined collection of distinct objects. Types include empty set, finite set, infinite set, equal sets, and subsets. Operations include union, intersection, and difference.","key-formulas":["A U B = {x : x in A or x in B}","A n B = {x : x in A and x in B}","n(A U B) = n(A) + n(B) - n(A n B)"],"examples":[{"problem":"If A = {1,2,3} and B = {2,3,4}, find A U B and A n B","solution":"A U B = {1,2,3,4}, A n B = {2,3}"}],"practice-questions":["Find all subsets of {a,b,c}","If n(A)=5, n(B)=3, find max value of n(A n B)"]}'
  '::jsonb, true, 1
  from topics t join chapters c on c.id = t.chapter_id join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where t.slug = 'types-of-sets' and cl.slug = 'class-11'
  on conflict (title, topic_id) do nothing;

  -- Math Class 11: Quadratic Equation resources
  insert into resources (topic_id, type, content_type, title, content, is_published, "order")
  select t.id, 'NOTES', 'ORIGINAL', 'Quadratic Equation - Formula & Method',
    '{"body":"A quadratic equation is of the form ax^2 + bx + c = 0. The quadratic formula gives: x = (-b +/- sqrt(b^2-4ac)) / 2a. The discriminant D = b^2-4ac determines the nature of roots.","key-formulas":["x = (-b +/- sqrt(D)) / 2a","D = b^2 - 4ac","Sum of roots = -b/a","Product of roots = c/a"],"examples":[{"problem":"Solve: 2x^2 - 5x + 2 = 0","solution":"D = 25-16 = 9. x = (5+/-3)/4. x = 2 or x = 1/2"}],"practice-questions":["Solve x^2 - 5x + 6 = 0","Find k if x^2 + kx + 9 = 0 has equal roots"]}'
  '::jsonb, true, 1
  from topics t join chapters c on c.id = t.chapter_id join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where t.slug = 'quadratic-formula' and cl.slug = 'class-11'
  on conflict (title, topic_id) do nothing;

  -- Physics Class 11: Kinematics resources
  insert into resources (topic_id, type, content_type, title, content, is_published, "order")
  select t.id, 'NOTES', 'ORIGINAL', 'Kinematics - Equations of Motion',
    '{"body":"The three equations of motion for uniform acceleration: v = u + at, s = ut + 1/2at^2, v^2 = u^2 + 2as. These apply to motion in a straight line with constant acceleration.","key-formulas":["v = u + at","s = ut + 1/2at^2","v^2 = u^2 + 2as"],"examples":[{"problem":"A car starts from rest and accelerates at 2 m/s^2 for 5s. Find final velocity and distance.","solution":"v = 0 + 2x5 = 10 m/s. s = 0 + 1/2x2x25 = 25 m"}],"practice-questions":["A ball is thrown upward at 20 m/s. Find max height.","A train accelerates from 10 to 30 m/s in 5s. Find distance."]}'
  '::jsonb, true, 1
  from topics t join chapters c on c.id = t.chapter_id join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where t.slug = 'basic-kinematics' and cl.slug = 'class-11'
  on conflict (title, topic_id) do nothing;

  -- Physics Class 12: Electrostatics resources
  insert into resources (topic_id, type, content_type, title, content, is_published, "order")
  select t.id, 'NOTES', 'ORIGINAL', 'Coulomb''s Law & Electric Field',
    '{"body":"Coulomb''s law states that the force between two point charges is proportional to the product of charges and inversely proportional to the square of distance.","key-formulas":["F = kq1q2/r^2","E = F/q = kQ/r^2","k = 9x10^9 Nm^2/C^2"],"examples":[{"problem":"Find force between two charges of 2uC and 3uC separated by 0.1m.","solution":"F = 9x10^9 x 2x10^-6 x 3x10^-6 / (0.1)^2 = 5.4 N"}],"practice-questions":["Find electric field at 0.5m from a 4uC charge.","Two charges are placed 0.2m apart. Find neutral point."]}'
  '::jsonb, true, 1
  from topics t join chapters c on c.id = t.chapter_id join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where t.slug = 'coulomb-law' and cl.slug = 'class-12'
  on conflict (title, topic_id) do nothing;

  -- Chemistry Class 12: Solid State resources
  insert into resources (topic_id, type, content_type, title, content, is_published, "order")
  select t.id, 'NOTES', 'ORIGINAL', 'Solid State - Unit Cells & Packing',
    '{"body":"A unit cell is the smallest repeating unit of a crystal lattice. Types include simple cubic (sc), body-centered cubic (bcc), and face-centered cubic (fcc). Packing efficiency: sc=52%, bcc=68%, fcc=74%.","key-formulas":["Edge length (sc) = 2r","Edge length (bcc) = 4r/sqrt(3)","Edge length (fcc) = 2rxsqrt(2)","Density = ZxM/(NAxa^3)"],"examples":[{"problem":"Calculate density of copper (fcc, a=361pm, M=63.5g/mol).","solution":"rho = 4x63.5/(6.022x10^23 x (3.61x10^-8)^3) = 8.97 g/cm^3"}],"practice-questions":["Find edge length of bcc iron (r=124pm).","Calculate atomic radius if fcc edge = 404pm."]}'
  '::jsonb, true, 1
  from topics t join chapters c on c.id = t.chapter_id join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where t.slug = 'unit-cell' and cl.slug = 'class-12'
  on conflict (title, topic_id) do nothing;

  -- Math Class 12: Matrices resources
  insert into resources (topic_id, type, content_type, title, content, is_published, "order")
  select t.id, 'NOTES', 'ORIGINAL', 'Matrices - Operations & Properties',
    '{"body":"A matrix is a rectangular array of numbers. Operations include addition, subtraction, scalar multiplication, and matrix multiplication. Key properties: (AB)'' = B''A'', (A+B)'' = A''+B''.","key-formulas":["If A is mxn, B is nxp -> AB is mxp","|AB| = |A|x|B|","AxA^-1 = I","(A^-1)'' = (A'')^-1"],"examples":[{"problem":"If A = [[1,2],[3,4]], find A^2.","solution":"A^2 = [[1,2],[3,4]] x [[1,2],[3,4]] = [[7,10],[15,22]]"}],"practice-questions":["Show that A^2 - 5A - 7I = O for A=[[1,2],[3,4]].","Find inverse of [[2,1],[1,1]]."]}'
  '::jsonb, true, 1
  from topics t join chapters c on c.id = t.chapter_id join subjects s on s.id = c.subject_id join classes cl on cl.id = s.class_id
  where c.slug = 'matrices' and cl.slug = 'class-12' and t.id is not null
  limit 1
  on conflict (title, topic_id) do nothing;

  -- Add a default topic for chapters without specific topics
  insert into topics (chapter_id, slug, title, description, "order", is_active)
  select c.id, 'key-concepts', 'Key Concepts & Formulas', 'Important formulas and key concepts for exam preparation', 99, true
  from chapters c
  where c.id not in (select chapter_id from topics)
  on conflict (slug, chapter_id) do nothing;

  -- Add default resources for chapters without resources
  insert into resources (topic_id, type, content_type, title, content, is_published, "order")
  select t.id, 'NOTES', 'ORIGINAL', 'Chapter Overview',
    '{"body":"This chapter covers fundamental concepts essential for NEB examination. Focus on understanding definitions, derivations, and standard problem types.","key-formulas":[],"examples":[],"practice-questions":["Solve standard textbook problems","Practice previous years question papers"]}'
  '::jsonb, true, 1
  from topics t
  where t.id not in (select topic_id from resources)
  and t.slug = 'key-concepts'
  on conflict (title, topic_id) do nothing;

  raise notice 'Seeding completed! Chapters: %, Topics: %, Resources: %',
    (select count(*) from chapters),
    (select count(*) from topics),
    (select count(*) from resources);
end $$;
