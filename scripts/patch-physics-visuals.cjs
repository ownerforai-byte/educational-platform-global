const fs = require('fs');
const path = require('path');

const VISUAL_TYPE_MAP = {
  // Mechanics - Kinematics & Motion
  'projectile-motion': 'projectile-motion',
  'freely-falling-body': 'free-fall',
  'instantaneous-velocity-acceleration': 'instantaneous-velocity',
  'relative-velocity': 'relative-velocity',
  'equations-of-motion-graphs': 'motion-graphs',
  
  // Circular Motion
  'centripetal-acceleration-force': 'centripetal-force',
  'conical-pendulum': 'conical-pendulum',
  'vertical-circle': 'vertical-circle',
  'banking-applications': 'banked-road',
  'motion-in-a-vertical-circle': 'vertical-circle',
  
  // Newton's Laws
  'newton-law-gravitation': 'newton-gravitation',
  'gravitational-field-strength': 'gravitational-field',
  'centre-of-mass-gravity': 'centre-of-mass',
  'application-of-newton-s-laws': 'newtons-laws',
  'linear-momentum-impulse': 'impulse-momentum',
  'conservation-linear-momentum': 'momentum-conservation',
  'collisions': 'elastic-collisions',
  
  // Work, Energy, Power
  'work-done-by-constant-and-variable-force': 'work-energy',
  'power': 'power-concept',
  'conservation-energy': 'energy-conservation',
  'work-energy-theorem': 'work-energy-theorem',
  
  // Rotational Motion
  'moment-torque-and-equilibrium': 'torque-equilibrium',
  'angular-displacement-velocity': 'angular-motion',
  'relation-between-angular-and-linear-velocity': 'angular-linear',
  
  // Vectors
  'vector': 'vector-basics',
  'resolution-unit-vectors': 'vector-resolution',
  'scalar-vector-products': 'dot-cross-product',
  
  // Elasticity
  'hooke-law-force-constant': 'hooke-law',
  'stress-strain-elasticity': 'stress-strain',
  'elastic-modulus': 'young-modulus',
  'elastic-potential-energy': 'elastic-energy',
  
  // Solids
  'solid-friction': 'friction-forces',
  
  // Fluid Mechanics (not in syllabus - skip)
  
  // Thermal Physics
  'thermal-equilibrium-zeroth-law': 'zeroth-law',
  'quantity-of-heat': 'heat-transfer',
  'change-of-phases-latent-heat': 'phase-change',
  'specific-heat-capacity': 'specific-heat',
  'principle-of-calorimetry': 'calorimetry',
  'newton-law-cooling': 'newton-cooling',
  'temperature-scales': 'temperature-scales',
  'linear-expansion': 'thermal-expansion',
  'cubical-superficial-expansion': 'volume-expansion',
  
  // Gases & Thermodynamics
  'ideal-gas-equation': 'ideal-gas',
  'kinetic-molecular-model': 'kinetic-theory',
  'boltzmann-constant-root-mean-square-speed': 'rms-speed',
  'average-translational-kinetic-energy': 'ke-translation',
  'heat-capacities-gases': 'heat-capacity',
  'derivation-of-pressure-exerted-by-gas': 'gas-pressure',
  
  // Current Electricity
  'electric-current-drift-velocity': 'drift-velocity',
  'ohm-s-law-electrical-resistance': 'ohms-law',
  'series-parallel-resistors': 'resistor-combination',
  'potential-divider': 'potential-divider',
  'emf-internal-resistance': 'emf-internal-resistance',
  'work-power-circuits': 'electric-power',
  'current-voltage-relations': 'iv-characteristics',
  'resistances-in-series-and-parallel': 'resistor-network',
  
  // Electrostatics
  'electric-charges-induction': 'charge-induction',
  'coulomb-law': 'coulomb-law',
  'electric-field-point-charges': 'electric-field',
  'gauss-law': 'gauss-law',
  'applications-of-gauss-law': 'gauss-applications',
  'potential-difference-point-charge': 'electric-potential',
  'equipotential-surfaces': 'equipotential',
  'potential-gradient': 'potential-gradient',
  
  // Capacitance
  'capacitance-parallel-plate': 'capacitor',
  'combination-capacitors': 'capacitor-combination',
  'energy-charged-capacitor': 'capacitor-energy',
  'dielectric-effect': 'dielectric',
  'effect-of-a-dielectric': 'dielectric-effect',
  
  // Magnetism (not fully covered in +2)
  
  // Modern Physics
  'nucleus-discovery': 'nuclear-model',
  'atomic-mass-isotopes': 'isotopes',
  'mass-energy-binding-energy': 'mass-defect',
  'einstein-s-mass-energy-relation': 'mass-energy',
  'fission-fusion': 'nuclear-reactions',
  'particles-and-antiparticles-quarks-leptons': 'particle-physics',
  'big-bang-and-hubble-law': 'big-bang',
  'dark-matter-black-hole': 'dark-matter',
  
  // Optics
  'mirror-formula': 'mirror-equation',
  'lens-maker-formula': 'lens-maker',
  'power-of-lens': 'lens-power',
  'laws-refraction-refractive-index': 'snell-law',
  'total-internal-reflection': 'tir',
  'lateral-shift': 'lateral-shift',
  'minimum-deviation': 'min-deviation',
  'prism-deviation-formula': 'prism-formula',
  'dispersive-power': 'dispersion',
  'chromatic-aberration': 'chromatic-aberration',
  'achromatism': 'achromatism',
  
  // Wave Optics
  'wave-nature': 'wave-optics',
  
  // Recent Trends
  'recent-trends-in-physics': 'modern-physics',
  'black-body-radiation': 'blackbody',
  'stefan-boltzmann-law': 'stefan-boltzmann',
  'radiation-black-body': 'blackbody',
  'particle-physics': 'particle-physics',
  'universe-big-bang': 'cosmology',
  
  // Practical/Derivation focused
  'dimensional-analysis': 'dimensional-analysis',
  'errors': 'error-analysis',
};

const physicsPath = 'content/ravikishan/class-11-notes/physics';

function processFiles() {
  const stats = { updated: 0, errors: 0, skipped: 0 };
  
  function walkDir(dir) {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const item of items) {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        walkDir(fullPath);
      } else if (item.name.endsWith('.json') && 
                 !item.name.includes('mindmap') &&
                 !item.name.includes('plan.json') &&
                 !fullPath.includes('/notes/')) {
        
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const data = JSON.parse(content);
          
          if (!data.topicSlug) continue;
          
          const slug = data.topicSlug.toLowerCase();
          let visualType = null;
          
          // Try exact match first
          if (VISUAL_TYPE_MAP[slug]) {
            visualType = VISUAL_TYPE_MAP[slug];
          } else {
            // Try partial matching
            for (const [key, value] of Object.entries(VISUAL_TYPE_MAP)) {
              if (slug.includes(key) || key.includes(slug)) {
                visualType = value;
                break;
              }
            }
          }
          
          if (visualType && data.visualType !== visualType) {
            data.visualType = visualType;
            fs.writeFileSync(fullPath, JSON.stringify(data, null, 2) + '\n', 'utf8');
            stats.updated++;
            console.log(`✓ ${path.basename(fullPath)} → ${visualType}`);
          } else if (!data.visualType) {
            stats.skipped++;
          } else {
            stats.skipped++;
          }
        } catch (e) {
          stats.errors++;
        }
      }
    }
  }
  
  walkDir(physicsPath);
  
  console.log(`\nPatch complete: ${stats.updated} files fixed, ${stats.skipped} skipped, ${stats.errors} errors`);
}

processFiles();
