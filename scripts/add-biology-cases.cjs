/**
 * Insert biology SVG cases before 'default:' in derivation-visual.tsx
 */
const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '..', 'frontend', 'components', 'derivations', 'derivation-visual.tsx');
let content = fs.readFileSync(FILE_PATH, 'utf-8');

const biologyCases = `
      case "biomolecule-types-diagram":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="60" y="40" width="580" height="340" rx="12" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="80" fill="#10b981" fontSize="16" fontWeight="bold" textAnchor="middle">Four Major Biomolecule Classes</text>
            {[
              {name:"Carbohydrates",formula:"(CH₂O)_n",examples:"Glucose, Starch, Cellulose",color:"#38bdf8",y:110},
              {name:"Proteins",formula:"Polypeptides (20 AA)",examples:"Enzymes, Collagen, Hemoglobin",color:"#10b981",y:200},
              {name:"Lipids",formula:"Fatty acid esters",examples:"Triglycerides, Phospholipids, Steroids",color:"#f59e0b",y:290}
            ].map((bio,i) => (
              <g key={i}>
                <rect x={80+i*170} y={bio.y} width={150} height={85} rx="8" fill={bio.color} fillOpacity="0.12" stroke={bio.color} strokeWidth="2"/>
                <text x={155+i*170} y={bio.y+25} fill={bio.color} fontSize="12" fontWeight="bold" textAnchor="middle">{bio.name}</text>
                <text x={155+i*170} y={bio.y+45} fill="#cbd5e1" fontSize="10" textAnchor="middle">{bio.formula}</text>
                <text x={155+i*170} y={bio.y+65} fill="#94a3b8" fontSize="9" textAnchor="middle">{bio.examples}</text>
              </g>
            ))}
            <rect x="80" y="350" width="540" height="20" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="1"/>
            <text x="350" y="365" fill="#a855f7" fontSize="10" textAnchor="middle">DNA/RNA store genetic info → Proteins execute cellular functions</text>
          </svg>
        );

      case "animal-vs-plant-cell":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="300" height="340" rx="10" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="2"/>
            <text x="190" y="60" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Plant Cell</text>
            <rect x="80" y="90" width="220" height="25" rx="4" fill="#10b981" fillOpacity="0.3"/>
            <text x="190" y="107" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Cell Wall (Cellulose)</text>
            <circle cx="190" cy="180" r="45" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="185" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Nucleus</text>
            {[100,160,220,280].map((y,i) => (
              <ellipse key={i} cx={130+i*40} cy={y} rx="20" ry="12" fill="#10b981" fillOpacity="0.4" stroke="#10b981" strokeWidth="1"/>
            ))}
            <text x="190" y="330" fill="#cbd5e1" fontSize="9" textAnchor="middle">Chloroplasts · Large Vacuole · No Centrioles</text>
            <rect x="360" y="30" width="300" height="340" rx="10" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeWidth="2"/>
            <text x="510" y="60" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">Animal Cell</text>
            <circle cx="510" cy="180" r="45" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2"/>
            <text x="510" y="185" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">Nucleus</text>
            <rect x="440" y="260" width="140" height="20" rx="4" fill="#ef4444" fillOpacity="0.3"/>
            <text x="510" y="274" fill="#ef4444" fontSize="9" textAnchor="middle">Centrioles</text>
            {[80,140,200,260].map((y,i) => (
              <rect key={i} x={440+i*50} y={y} width="25" height="15" rx="3" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="1"/>
            ))}
            <text x="510" y="330" fill="#cbd5e1" fontSize="9" textAnchor="middle">No Cell Wall · Small Vacuoles · Lysosomes</text>
            <line x1="340" y1="200" x2="360" y2="200" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)"/>
          </svg>
        );

      case "prokaryotic-vs-eukaryotic-cell":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="300" height="340" rx="10" fill="#f59e0b" fillOpacity="0.08" stroke="#f59e0b" strokeWidth="2"/>
            <text x="190" y="60" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">Prokaryotic Cell</text>
            <circle cx="190" cy="180" r="80" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
            <text x="190" y="170" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Nucleoid</text>
            <text x="190" y="190" fill="#cbd5e1" fontSize="9" textAnchor="middle">(circular DNA)</text>
            <rect x="80" y="280" width="220" height="70" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1"/>
            <text x="190" y="305" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Features:</text>
            <text x="190" y="325" fill="#cbd5e1" fontSize="9" textAnchor="middle">No nucleus · 70S ribosomes</text>
            <text x="190" y="340" fill="#cbd5e1" fontSize="9" textAnchor="middle">Peptidoglycan wall · Binary fission</text>
            <rect x="360" y="30" width="300" height="340" rx="10" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="2"/>
            <text x="510" y="60" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Eukaryotic Cell</text>
            <circle cx="510" cy="160" r="45" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2"/>
            <text x="510" y="165" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Nucleus</text>
            {[380,440,500,560,620].map((x,i) => (
              <ellipse key={i} cx={x} cy={240} rx="25" ry="15" fill="#10b981" fillOpacity="0.25" stroke="#10b981" strokeWidth="1"/>
            ))}
            <text x="510" y="275" fill="#cbd5e1" fontSize="9" textAnchor="middle">Organelles: ER, Golgi, Mito</text>
            <rect x="400" y="300" width="220" height="70" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1"/>
            <text x="510" y="325" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Features:</text>
            <text x="510" y="345" fill="#cbd5e1" fontSize="9" textAnchor="middle">True nucleus · 80S ribosomes</text>
            <text x="510" y="360" fill="#cbd5e1" fontSize="9" textAnchor="middle">Mitosis/Meiosis · Complex</text>
          </svg>
        );

      case "mitosis-vs-meiosis":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="30" y="30" width="320" height="340" rx="10" fill="#38bdf8" fillOpacity="0.08" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="65" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Mitosis</text>
            <circle cx="190" cy="110" r="30" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="115" fill="#38bdf8" fontSize="10" textAnchor="middle">2n→2n</text>
            <line x1="120" y1="110" x2="260" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)"/>
            <circle cx="100" cy="170" r="25" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
            <circle cx="280" cy="170" r="25" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
            <text x="100" y="175" fill="#10b981" fontSize="8" textAnchor="middle">2n</text>
            <text x="280" y="175" fill="#10b981" fontSize="8" textAnchor="middle">2n</text>
            <rect x="60" y="220" width="260" height="130" rx="6" fill="#0f172a" stroke="#38bdf8" strokeWidth="1"/>
            <text x="190" y="245" fill="#cbd5e1" fontSize="10" textAnchor="middle">• One division</text>
            <text x="190" y="265" fill="#cbd5e1" fontSize="10" textAnchor="middle">• Identical daughter cells</text>
            <text x="190" y="285" fill="#cbd5e1" fontSize="10" textAnchor="middle">• Growth & repair</text>
            <text x="190" y="305" fill="#cbd5e1" fontSize="10" textAnchor="middle">• No crossing over</text>
            <text x="190" y="335" fill="#f59e0b" fontSize="9" textAnchor="middle">Somatic cells (skin, meristem)</text>
            <rect x="350" y="30" width="320" height="340" rx="10" fill="#a855f7" fillOpacity="0.08" stroke="#a855f7" strokeWidth="2"/>
            <text x="510" y="65" fill="#a855f7" fontSize="14" fontWeight="bold" textAnchor="middle">Meiosis</text>
            <circle cx="510" cy="110" r="30" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2"/>
            <text x="510" y="115" fill="#a855f7" fontSize="10" textAnchor="middle">2n→n</text>
            <line x1="440" y1="110" x2="580" y2="110" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)"/>
            {[460,500,540,580].map((x,i) => (
              <circle key={i} cx={x} cy="170" r="20" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="1.5"/>
            ))}
            <rect x="380" y="220" width="260" height="130" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="1"/>
            <text x="510" y="245" fill="#cbd5e1" fontSize="10" textAnchor="middle">• Two divisions</text>
            <text x="510" y="265" fill="#cbd5e1" fontSize="10" textAnchor="middle">• 4 diverse haploid cells</text>
            <text x="510" y="285" fill="#cbd5e1" fontSize="10" textAnchor="middle">• Crossing over (Prophase I)</text>
            <text x="510" y="305" fill="#cbd5e1" fontSize="10" textAnchor="middle">• Genetic diversity</text>
            <text x="510" y="335" fill="#f59e0b" fontSize="9" textAnchor="middle">Gametes (sperm, egg)</text>
          </svg>
        );

      case "organelle-functions":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="60" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Eukaryotic Organelle Functions</text>
            {[
              {name:"Nucleus",func:"Genetic control center",color:"#38bdf8"},
              {name:"Mitochondria",func:"ATP production (respiration)",color:"#ef4444"},
              {name:"Rough ER",func:"Protein synthesis & folding",color:"#10b981"},
              {name:"Smooth ER",func:"Lipid synthesis, detox",color:"#f59e0b"},
              {name:"Golgi",func:"Package & ship proteins",color:"#a855f7"},
              {name:"Lysosome",func:"Digestion & recycling",color:"#ec4899"},
              {name:"Chloroplast",func:"Photosynthesis (plants)",color:"#22c55e"}
            ].map((o,i) => (
              <g key={i}>
                <rect x={55+i%4*150} y={95+Math.floor(i/4)*110} width={140} height={95} rx="6" fill={o.color} fillOpacity="0.12" stroke={o.color} strokeWidth="1.5"/>
                <text x={125+i%4*150} y={120} fill={o.color} fontSize="11" fontWeight="bold" textAnchor="middle">{o.name}</text>
                <text x={125+i%4*150} y={145} fill="#cbd5e1" fontSize="9" textAnchor="middle">{o.func}</text>
              </g>
            ))}
            <text x="350" y="360" fill="#94a3b8" fontSize="9" textAnchor="middle">Endosymbiotic theory: mitochondria & chloroplasts originated from prokaryotes</text>
          </svg>
        );

      case "food-chain-web":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Food Chain & Food Web</text>
            {/* Grazing chain */}
            <rect x="60" y="90" width="130" height="70" rx="8" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
            <text x="125" y="120" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Producer</text>
            <text x="125" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle">Grass / Phytoplankton</text>
            <text x="125" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle">Level 1: 10,000 kcal</text>
            <line x1="190" y1="125" x2="250" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)"/>
            <rect x="250" y="90" width="130" height="70" rx="8" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
            <text x="315" y="120" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Primary Consumer</text>
            <text x="315" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle">Rabbit / Zooplankton</text>
            <text x="315" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle">Level 2: ~1,000 kcal</text>
            <line x1="380" y1="125" x2="440" y2="125" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)"/>
            <rect x="440" y="90" width="130" height="70" rx="8" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2"/>
            <text x="505" y="120" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">Secondary Consumer</text>
            <text x="505" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle">Fox / Small fish</text>
            <text x="505" y="155" fill="#94a3b8" fontSize="9" textAnchor="middle">Level 3: ~100 kcal</text>
            {/* Energy loss arrow */}
            <line x1="505" y1="165" x2="505" y2="220" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 2"/>
            <text x="505" y="240" fill="#ef4444" fontSize="9" textAnchor="middle">~90% lost as heat</text>
            {/* 10% law box */}
            <rect x="60" y="270" width="580" height="80" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="300" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">10% Law (Lindeman): Only ~10% energy transfers between trophic levels</text>
            <text x="350" y="325" fill="#cbd5e1" fontSize="10" textAnchor="middle">Rest lost as heat via respiration, movement, undigested waste</text>
            <text x="350" y="340" fill="#94a3b8" fontSize="9" textAnchor="middle">Limits food chains to 4-5 levels; explains pyramid of energy shape</text>
          </svg>
        );

      case "carbon-nitrogen-cycles":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2"/>
            <text x="350" y="65" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Carbon & Nitrogen Cycles</text>
            {/* Carbon cycle */}
            <circle cx="180" cy="160" r="60" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="180" y="155" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">CO₂</text>
            <text x="180" y="175" fill="#cbd5e1" fontSize="9" textAnchor="middle">Atmosphere</text>
            <circle cx="180" cy="280" r="50" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
            <text x="180" y="275" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Plants</text>
            <text x="180" y="295" fill="#cbd5e1" fontSize="9" textAnchor="middle">Photosynthesis</text>
            <line x1="180" y1="220" x2="180" y2="225" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="195" y="225" fill="#10b981" fontSize="8">Photosynthesis</text>
            <line x1="170" y1="220" x2="170" y2="230" stroke="#ef4444" strokeWidth="2" markerStart="url(#arrow)"/>
            <text x="130" y="225" fill="#ef4444" fontSize="8">Respiration</text>
            {/* Nitrogen cycle */}
            <circle cx="500" cy="160" r="60" fill="#a855f7" fillOpacity="0.1" stroke="#a855f7" strokeWidth="2"/>
            <text x="500" y="155" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">N₂</text>
            <text x="500" y="175" fill="#cbd5e1" fontSize="9" textAnchor="middle">Atmosphere 78%</text>
            <circle cx="500" cy="280" r="50" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
            <text x="500" y="275" fill="#f59e0b" fontSize="10" fontWeight="bold" textAnchor="middle">Soil Bacteria</text>
            <text x="500" y="295" fill="#cbd5e1" fontSize="9" textAnchor="middle">Fixation</text>
            <line x1="500" y1="220" x2="500" y2="225" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="515" y="225" fill="#f59e0b" fontSize="8">Nitrogen fixation</text>
            <line x1="490" y1="220" x2="490" y2="230" stroke="#ef4444" strokeWidth="2"/>
            <text x="445" y="225" fill="#ef4444" fontSize="8">Denitrification</text>
            {/* Key facts */}
            <rect x="60" y="340" width="580" height="25" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1"/>
            <text x="350" y="357" fill="#10b981" fontSize="10" textAnchor="middle">Key: Carbon cycles via atmosphere; Nitrogen requires bacterial fixation; Phosphorus is sedimentary (no atmosphere)</text>
          </svg>
        );

      case "hydrophyte-xerophyte-adaptations":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Hydrophytes vs Xerophytes Adaptations</text>
            {/* Hydrophyte */}
            <rect x="60" y="90" width="260" height="250" rx="8" fill="#38bdf8" fillOpacity="0.08" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="115" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">🌊 Hydrophyte (Aquatic)</text>
            <text x="80" y="150" fill="#cbd5e1" fontSize="11">• Thin cuticle (no water loss risk)</text>
            <text x="80" y="175" fill="#cbd5e1" fontSize="11">• Stomata on UPPER leaf surface only</text>
            <text x="80" y="200" fill="#cbd5e1" fontSize="11">• Aerenchyma (air spaces) for buoyancy</text>
            <text x="80" y="225" fill="#cbd5e1" fontSize="11">• Weak mechanical tissue (water supports)</text>
            <text x="80" y="250" fill="#cbd5e1" fontSize="11">• Reduced root system</text>
            <text x="80" y="275" fill="#cbd5e1" fontSize="11">• Example: Lotus, Duckweed, Hydrilla</text>
            {/* Xerophyte */}
            <rect x="380" y="90" width="260" height="250" rx="8" fill="#f59e0b" fillOpacity="0.08" stroke="#f59e0b" strokeWidth="2"/>
            <text x="510" y="115" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">☀️ Xerophyte (Arid)</text>
            <text x="400" y="150" fill="#cbd5e1" fontSize="11">• Thick waxy cuticle (reduce water loss)</text>
            <text x="400" y="175" fill="#cbd5e1" fontSize="11">• Sunken stomata (reduce transpiration)</text>
            <text x="400" y="200" fill="#cbd5e1" fontSize="11">• CAM photosynthesis (open stomata at night)</text>
            <text x="400" y="225" fill="#cbd5e1" fontSize="11">• Succulent stems (water storage)</text>
            <text x="400" y="250" fill="#cbd5e1" fontSize="11">• Deep/extensive root systems</text>
            <text x="400" y="275" fill="#cbd5e1" fontSize="11">• Example: Cactus, Agave, Opuntia</text>
          </svg>
        );

      case "pollution-climate-change":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="65" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">Ecological Imbalances: Pollution & Climate Change</text>
            {[
              {title:"Greenhouse Effect",cause:"CO₂, CH₄, N₂O from fossil fuels",effect:"Global temp +1.1°C since 1850",color:"#ef4444"},
              {title:"Ozone Depletion",cause:"CFCs break down stratospheric O₃",effect:"Increased UV-B → skin cancer, cataracts",color:"#a855f7"},
              {title:"Acid Rain",cause:"SO₂ + NOₓ → H₂SO₄/HNO₃",effect:"pH<5.6 damages forests, lakes, buildings",color:"#f59e0b"},
              {title:"Biological Invasion",cause:"Non-native species disrupt ecosystems",effect:"Water hyacinth, Lantana in Nepal",color:"#38bdf8"}
            ].map((item,i) => (
              <rect key={i} x={50+i*160} y="90" width="145" height="140" rx="8" fill={item.color} fillOpacity="0.1" stroke={item.color} strokeWidth="1.5"/>
            ))}
            {[
              {x:122,y:115,title:"Greenhouse",desc:"Global warming"},
              {x:282,y:115,title:"Ozone",desc:"UV increase"},
              {x:442,y:115,title:"Acid Rain",desc:"Ecosystem damage"},
              {x:602,y:115,title:"Invasive",desc:"Biodiversity loss"}
            ].map((t,i) => (
              <text key={i} x={t.x} y={t.y} fill="#cbd5e1" fontSize="10" textAnchor="middle">{t.title}</text>
            ))}
            <rect x="60" y="250" width="580" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="280" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Key Solutions</text>
            <text x="350" y="305" fill="#cbd5e1" fontSize="10" textAnchor="middle">Montreal Protocol (CFCs phase-out) · Paris Agreement (GHG reduction)</text>
            <text x="350" y="325" fill="#cbd5e1" fontSize="10" textAnchor="middle">Renewable energy · Reforestation · Integrated Pest Management · Wastewater treatment</text>
            <text x="350" y="345" fill="#f59e0b" fontSize="9" textAnchor="middle">Biomagnification: DDT concentrations amplify 10⁶-fold up food chain</text>
          </svg>
        );

      case "origin-of-life-experiment":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Origin of Life: Oparin-Haldane & Miller-Urey</text>
            {/* Early Earth conditions */}
            <rect x="60" y="90" width="260" height="120" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="115" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Early Earth Conditions (~4.6 Ga)</text>
            <text x="80" y="145" fill="#cbd5e1" fontSize="10">• Reducing atmosphere: CH₄, NH₃, H₂, H₂O</text>
            <text x="80" y="165" fill="#cbd5e1" fontSize="10">• No free oxygen (anoxic)</text>
            <text x="80" y="185" fill="#cbd5e1" fontSize="10">• Energy: lightning, UV radiation, volcanic</text>
            {/* Miller-Urey experiment */}
            <rect x="380" y="90" width="260" height="120" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>
            <text x="510" y="115" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Miller-Urey Experiment (1953)</text>
            <text x="400" y="145" fill="#cbd5e1" fontSize="10">• Simulated early atmosphere + electric sparks</text>
            <text x="400" y="165" fill="#cbd5e1" fontSize="10">• Result: 11 amino acids after 1 week</text>
            <text x="400" y="185" fill="#cbd5e1" fontSize="10">• Supports chemical evolution hypothesis</text>
            {/* Timeline */}
            <rect x="60" y="230" width="580" height="120" rx="8" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>
            <text x="350" y="255" fill="#a855f7" fontSize="12" fontWeight="bold" textAnchor="middle">Timeline of Life's Origin</text>
            <line x1="100" y1="290" x2="600" y2="290" stroke="#a855f7" strokeWidth="2"/>
            {[
              {x:120,label:"4.6 Ga",sub:"Earth forms"},
              {x:250,label:"4.0 Ga",sub:"First organic molecules"},
              {x:380,label:"3.5 Ga",sub:"Stromatolites (earliest fossils)"},
              {x:510,label:"2.4 Ga",sub:"O₂ accumulates (Great Oxidation)"}
            ].map((t,i) => (
              <g key={i}>
                <circle cx={t.x} cy="290" r="6" fill="#f59e0b"/>
                <text x={t.x} y="310" fill="#cbd5e1" fontSize="9" textAnchor="middle">{t.label}</text>
                <text x={t.x} y="325" fill="#94a3b8" fontSize="8" textAnchor="middle">{t.sub}</text>
              </g>
            ))}
          </svg>
        );

      case "evidences-of-evolution":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Evidence for Evolution</text>
            {[
              {title:"Morphological",subtitle:"Homologous structures",desc:"Same origin, different function — vertebrate forelimbs",color:"#38bdf8"},
              {title:"Embryological",subtitle:"Developmental similarities",desc:"Pharyngeal pouches, tails in all vertebrate embryos",color:"#10b981"},
              {title:"Paleontological",subtitle:"Fossil record",desc:"Transitional fossils: Archaeopteryx (dino→bird), Tiktaalik",color:"#f59e0b"},
              {title:"Biochemical",subtitle:"Universal genetic code",desc:"Cytochrome c comparisons; 98.8% DNA shared with chimps",color:"#a855f7"},
              {title:"Biogeographical",subtitle:"Species distribution",desc:"Galápagos finches; marsupials in isolated Australia",color:"#ef4444"}
            ].map((e,i) => (
              <rect key={i} x={50+i*125} y="90" width="115" height="130" rx="8" fill={e.color} fillOpacity="0.1" stroke={e.color} strokeWidth="1.5"/>
            ))}
            {[
              {x:107,y:115,title:"Morpho.",sub:"Homologous"},
              {x:232,y:115,title:"Embryo",sub:"Similarities"},
              {x:357,y:115,title:"Fossils",sub:"Transitional"},
              {x:482,y:115,title:"Biochem.",sub:"Universal code"},
              {x:607,y:115,title:"Biogeog.",sub:"Distribution"}
            ].map((t,i) => (
              <text key={i} x={t.x} y={t.y} fill="#cbd5e1" fontSize="9" textAnchor="middle">{t.title}</text>
            ))}
            <rect x="60" y="240" width="580" height="110" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="270" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Homologous vs Analogous Structures</text>
            <text x="200" y="300" fill="#38bdf8" fontSize="10" textAnchor="middle">Homologous: Common ancestry</text>
            <text x="200" y="320" fill="#38bdf8" fontSize="10" textAnchor="middle">→ Divergent evolution</text>
            <text x="500" y="300" fill="#ef4444" fontSize="10" textAnchor="middle">Analogous: Similar function</text>
            <text x="500" y="320" fill="#ef4444" fontSize="10" textAnchor="middle">→ Convergent evolution</text>
            <text x="350" y="345" fill="#cbd5e1" fontSize="9" textAnchor="middle">Example: Bird wing (forelimb) vs Insect wing (integument outgrowth)</text>
          </svg>
        );

      case "evolution-theories-comparison":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Evolution Theories Comparison</text>
            {/* Lamarck */}
            <rect x="50" y="90" width="190" height="250" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>
            <text x="145" y="120" fill="#f59e0b" fontSize="13" fontWeight="bold" textAnchor="middle">Lamarckism</text>
            <text x="145" y="150" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">Inheritance of Acquired Traits</text>
            <text x="70" y="185" fill="#cbd5e1" fontSize="10">✗ Use/disuse → inherited</text>
            <text x="70" y="210" fill="#cbd5e1" fontSize="10">✗ Giraffe neck stretching</text>
            <text x="70" y="235" fill="#cbd5e1" fontSize="10">✗ Discredited mechanism</text>
            <text x="70" y="270" fill="#f59e0b" fontSize="9">Note: Some epigenetic effects</text>
            <text x="70" y="285" fill="#f59e0b" fontSize="9">show environmental influence</text>
            {/* Darwin */}
            <rect x="260" y="90" width="190" height="250" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="355" y="120" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Darwinism</text>
            <text x="355" y="150" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">Natural Selection (1859)</text>
            <text x="280" y="185" fill="#cbd5e1" fontSize="10">✓ Overproduction → variation</text>
            <text x="280" y="210" fill="#cbd5e1" fontSize="10">✓ Survival of fitted</text>
            <text x="280" y="235" fill="#cbd5e1" fontSize="10">✓ Heritable advantageous traits</text>
            <text x="280" y="270" fill="#38bdf8" fontSize="9">Example: Peppered moth</text>
            <text x="280" y="285" fill="#38bdf8" fontSize="9">Industrial melanism</text>
            {/* Neo-Darwin */}
            <rect x="470" y="90" width="190" height="250" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>
            <text x="565" y="120" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">Neo-Darwinism</text>
            <text x="565" y="150" fill="#cbd5e1" fontSize="10" fontWeight="bold" textAnchor="middle">Modern Synthesis</text>
            <text x="490" y="185" fill="#cbd5e1" fontSize="10">✓ Natural selection + Genetics</text>
            <text x="490" y="210" fill="#cbd5e1" fontSize="10">✓ Mutations = raw variation</text>
            <text x="490" y="235" fill="#cbd5e1" fontSize="10">✓ Population allele frequency</text>
            <text x="490" y="270" fill="#10b981" fontSize="9">Mechanisms: Selection, drift,</text>
            <text x="490" y="285" fill="#10b981" fontSize="9">gene flow, mutation</text>
          </svg>
        );

      case "human-evolution-tree":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>
            <text x="350" y="65" fill="#a855f7" fontSize="14" fontWeight="bold" textAnchor="middle">Human Evolution Timeline</text>
            {[
              {name:"Ardipithecus",year:"~4.4 Ma",brain:"~300-350cc",feat:"Bipedal",color:"#94a3b8"},
              {name:"Australopithecus",year:"~3.2 Ma",brain:"~400-500cc",feat:"Lucy, bipedal",color:"#f59e0b"},
              {name:"Homo habilis",year:"~2.4 Ma",brain:"~600cc",feat:"Stone tools",color:"#38bdf8"},
              {name:"Homo erectus",year:"~1.8 Ma",brain:"~900cc",feat:"Fire, migration",color:"#10b981"},
              {name:"H. sapiens",year:"~300 ka",brain:"~1350cc",feat:"Language, culture",color:"#a855f7"}
            ].map((h,i) => (
              <g key={i}>
                <circle cx={100+i*120} cy="120" r="35" fill={h.color} fillOpacity="0.2" stroke={h.color} strokeWidth="2"/>
                <text x={100+i*120} y="115" fill={h.color} fontSize="9" fontWeight="bold" textAnchor="middle">{h.name}</text>
                <text x={100+i*120} y="135" fill="#cbd5e1" fontSize="8" textAnchor="middle">{h.year}</text>
                <text x={100+i*120} y="190" fill="#94a3b8" fontSize="9" textAnchor="middle">Brain: {h.brain}</text>
                <text x={100+i*120} y="210" fill="#94a3b8" fontSize="9" textAnchor="middle">{h.feat}</text>
                {i < 4 && <line x1={135+i*120} y1="120" x2={220+i*120} y2="120" stroke="#64748b" strokeWidth="2"/>}
              </g>
            ))}
            <rect x="60" y="260" width="580" height="90" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="290" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Key Human Adaptations</text>
            <text x="350" y="315" fill="#cbd5e1" fontSize="10" textAnchor="middle">Bipedalism → Freed hands for tool use</text>
            <text x="350" y="335" fill="#cbd5e1" fontSize="10" textAnchor="middle">Brain expansion (400cc→1350cc) → Language, culture</text>
            <text x="350" y="350" fill="#f59e0b" fontSize="9" textAnchor="middle">Shared 98.8% DNA with chimpanzees; common ancestor ~6-7 Ma</text>
          </svg>
        );

      case "protist-diversity":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Protozoa Classification by Locomotion</text>
            {[
              {name:"Amoebozoa",locomotion:"Pseudopodia",example:"Amoeba, Entamoeba",disease:"Dysentery",color:"#38bdf8"},
              {name:"Flagellata",locomotion:"Flagella",example:"Trypanosoma, Giardia",disease:"Sleeping sickness, Giardiasis",color:"#10b981"},
              {name:"Ciliophora",locomotion:"Cilia",example:"Paramecium, Balantidium",disease:"Balantidiasis",color:"#f59e0b"},
              {name:"Sporozoa",locomotion:"None (parasitic)",example:"Plasmodium",disease:"Malaria",color:"#ef4444"}
            ].map((p,i) => (
              <rect key={i} x={55+i*150} y="90" width="140" height="200" rx="8" fill={p.color} fillOpacity="0.1" stroke={p.color} strokeWidth="2"/>
            ))}
            {[
              {x:125,y:115,name:"Amoebozoa"},
              {x:275,y:115,name:"Flagellata"},
              {x:425,y:115,name:"Ciliophora"},
              {x:575,y:115,name:"Sporozoa"}
            ].map((t,i) => (
              <text key={i} x={t.x} y={t.y} fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">{t.name}</text>
            ))}
            <rect x="60" y="310" width="580" height="50" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="1"/>
            <text x="350" y="340" fill="#a855f7" fontSize="10" textAnchor="middle">Plasmodium life cycle: Human (asexual in RBCs) → Mosquito (sexual) → Sporozoites in salivary glands</text>
          </svg>
        );

      case "animal-phyla-key-features":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Animal Phyla Key Features</text>
            {[
              {phylum:"Porifera",symmetry:"Asymmetrical",cavity:"None",example:"Sponge",color:"#94a3b8"},
              {phylum:"Cnidaria",symmetry:"Radial",cavity:"Gastrovascular",example:"Jellyfish, Coral",color:"#38bdf8"},
              {phylum:"Platyhelminthes",symmetry:"Bilateral",cavity:"Acoelomate",example:"Flatworm, Tapeworm",color:"#10b981"},
              {phylum:"Nematoda",symmetry:"Bilateral",cavity:"Pseudocoelomate",example:"Roundworm, Ascaris",color:"#f59e0b"},
              {phylum:"Annelida",symmetry:"Bilateral",cavity:"Coelomate",example:"Earthworm, Leech",color:"#a855f7"},
              {phylum:"Arthropoda",symmetry:"Bilateral",cavity:"Coelomate",example:"Insects, Crustaceans (LARGEST)",color:"#ef4444"},
              {phylum:"Chordata",symmetry:"Bilateral",cavity:"Coelomate",example:"Vertebrates + notochord",color:"#38bdf8"}
            ].map((p,i) => (
              <rect key={i} x={50+Math.floor(i/3)*210} y={90+(i%3)*80} width="200" height="70" rx="6" fill={p.color} fillOpacity="0.1" stroke={p.color} strokeWidth="1.5"/>
            ))}
            <text x="350" y="370" fill="#94a3b8" fontSize="10" textAnchor="middle">Complexity progression: Cellular → Tissue → Organ → Organ system levels</text>
          </svg>
        );

      case "earthworm-external-anatomy":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="65" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">Earthworm (Pheretima) External Anatomy</text>
            {/* Body diagram */}
            <ellipse cx="350" cy="160" rx="250" ry="50" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="155" fill="#f59e0b" fontSize="11" textAnchor="middle">Pheretima posthuma — Segmented Body (100+ metameres)</text>
            {/* Labels */}
            <line x1="120" y1="140" x2="80" y2="100" stroke="#38bdf8" strokeWidth="1.5"/>
            <text x="60" y="95" fill="#38bdf8" fontSize="10" fontWeight="bold">Prostomium</text>
            <text x="60" y="110" fill="#cbd5e1" fontSize="9">(lip lobe, digging)</text>
            <line x1="200" y1="130" x2="160" y2="80" stroke="#10b981" strokeWidth="1.5"/>
            <text x="120" y="75" fill="#10b981" fontSize="10" fontWeight="bold">Clitellum</text>
            <text x="120" y="90" fill="#cbd5e1" fontSize="9">(segments 14-16, cocoon)</text>
            <line x1="500" y1="130" x2="560" y2="80" stroke="#a855f7" strokeWidth="1.5"/>
            <text x="560" y="75" fill="#a855f7" fontSize="10" fontWeight="bold">Setae</text>
            <text x="560" y="90" fill="#cbd5e1" fontSize="9">(locomotion bristles)</text>
            <line x1="550" y1="150" x2="600" y2="120" stroke="#ef4444" strokeWidth="1.5"/>
            <text x="600" y="115" fill="#ef4444" fontSize="10" fontWeight="bold">Pygidium</text>
            <text x="600" y="130" fill="#cbd5e1" fontSize="9">(anal opening)</text>
            {/* Key facts */}
            <rect x="60" y="230" width="580" height="120" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="260" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Key Features</text>
            <text x="100" y="290" fill="#cbd5e1" fontSize="10">• Hermaphroditic (both sexes in one individual)</text>
            <text x="100" y="310" fill="#cbd5e1" fontSize="10">• Cross-fertilization during mating</text>
            <text x="350" y="290" fill="#cbd5e1" fontSize="10">• Cutaneous respiration (moist skin required)</text>
            <text x="350" y="310" fill="#cbd5e1" fontSize="10">• Hydrostatic skeleton (fluid-filled coelom)</text>
            <text x="100" y="340" fill="#f59e0b" fontSize="9">Ecological role: Soil aeration, nutrient cycling, bioindicators</text>
          </svg>
        );

      case "frog-anatomy-overview":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2"/>
            <text x="350" y="65" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Rana tigrina (Frog) — Amphibian Overview</text>
            {/* Double life */}
            <rect x="60" y="90" width="260" height="130" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="115" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Aquatic Larva (Tadpole)</text>
            <text x="80" y="145" fill="#cbd5e1" fontSize="10">• Gills for breathing</text>
            <text x="80" y="165" fill="#cbd5e1" fontSize="10">• Herbivorous (algae/detritus)</text>
            <text x="80" y="185" fill="#cbd5e1" fontSize="10">• Long coiled intestine</text>
            <text x="80" y="205" fill="#cbd5e1" fontSize="10">• Tail for swimming</text>
            {/* Adult */}
            <rect x="380" y="90" width="260" height="130" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>
            <text x="510" y="115" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Terrestrial Adult</text>
            <text x="400" y="145" fill="#cbd5e1" fontSize="10">• Lungs + skin breathing</text>
            <text x="400" y="165" fill="#cbd5e1" fontSize="10">• Carnivorous (insects)</text>
            <text x="400" y="185" fill="#cbd5e1" fontSize="10">• Short intestine</text>
            <text x="400" y="205" fill="#cbd5e1" fontSize="10">• Strong hind legs for jumping</text>
            {/* Systems summary */}
            <rect x="60" y="240" width="580" height="110" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="270" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Physiological Systems</text>
            <text x="120" y="300" fill="#38bdf8" fontSize="10">Heart: 3 chambers (2 atria + 1 ventricle)</text>
            <text x="120" y="320" fill="#38bdf8" fontSize="10">Excretion: Urea (ureotelic as adult)</text>
            <text x="400" y="300" fill="#10b981" fontSize="10">Respiration: Skin + buccal + lungs</text>
            <text x="400" y="320" fill="#10b981" fontSize="10">Metamorphosis: Thyroxine-triggered</text>
            <text x="350" y="345" fill="#a855f7" fontSize="9">Indicator species for ecosystem health</text>
          </svg>
        );

      case "fungi-life-cycles":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>
            <text x="350" y="65" fill="#a855f7" fontSize="14" fontWeight="bold" textAnchor="middle">Fungal Kingdom Classification</text>
            {[
              {name:"Phycomycetes",desc:"Coenocytic hyphae, no septa",spores:"Zoospores/Oospores",ex:"Rhizopus, Mucor",color:"#38bdf8"},
              {name:"Ascomycetes",desc:"Septate hyphae",spores:"Ascospores (8/ascus)",ex:"Yeast, Penicillium",color:"#10b981"},
              {name:"Basidiomycetes",desc:"Septate hyphae",spores:"Basidiospores (4/basidium)",ex:"Mushroom, Rusts",color:"#f59e0b"},
              {name:"Deuteromycetes",desc:"Imperfect fungi",spores:"Only asexual known",ex:"Alternaria, Trichoderma",color:"#ef4444"}
            ].map((f,i) => (
              <rect key={i} x={55+i*155} y="90" width="145" height="180" rx="8" fill={f.color} fillOpacity="0.1" stroke={f.color} strokeWidth="2"/>
            ))}
            {[
              {x:127,y:110,n:"Phyco."},
              {x:282,y:110,n:"Asco."},
              {x:437,y:110,n:"Basidio."},
              {x:592,y:110,n:"Deut."}
            ].map((t,i) => (
              <text key={i} x={t.x} y={t.y} fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">{t.n}</text>
            ))}
            <rect x="60" y="290" width="580" height="65" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="315" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Economic Importance</text>
            <text x="350" y="340" fill="#cbd5e1" fontSize="10">Decomposers · Mycorrhizal symbionts (90% plants) · Antibiotics (penicillin) · Food (mushrooms, yeast)</text>
          </svg>
        );

      case "algae-types-diagram":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Algae Classification by Pigment</text>
            {[
              {name:"Chlorophyceae",nameCN:"Green Algae",pigments:"Chl a+b",storage:"Starch",ex:"Spirogyra, Chlamydomonas",color:"#10b981"},
              {name:"Phaeophyceae",nameCN:"Brown Algae",pigments:"Chl a+c + fucoxanthin",storage:"Laminarin",ex:"Laminaria, Fucus",color:"#f59e0b"},
              {name:"Rhodophyceae",nameCN:"Red Algae",pigments:"Chl a+d + phycoerythrin",storage:"Floridean starch",ex:"Porphyra, Gracilaria",color:"#ef4444"}
            ].map((a,i) => (
              <rect key={i} x={60+i*210} y="90" width="190" height="220" rx="8" fill={a.color} fillOpacity="0.1" stroke={a.color} strokeWidth="2"/>
            ))}
            {[
              {x:155,y:115,n:"Green"},
              {x:365,y:115,n:"Brown"},
              {x:575,y:115,n:"Red"}
            ].map((t,i) => (
              <text key={i} x={t.x} y={t.y} fill="#cbd5e1" fontSize="12" fontWeight="bold" textAnchor="middle">{t.n}</text>
            ))}
            <rect x="60" y="330" width="580" height="25" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1"/>
            <text x="350" y="347" fill="#38bdf8" fontSize="10" textAnchor="middle">Key: Red algae survive deep water (phycoerythrin absorbs blue light); Agar from red algae essential for microbiology</text>
          </svg>
        );

      case "bryophyte-life-cycle":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Bryophyte Life Cycle — Gametophyte Dominant</text>
            {/* Spore */}
            <circle cx="100" cy="130" r="25" fill="#f59e0b" fillOpacity="0.3" stroke="#f59e0b" strokeWidth="2"/>
            <text x="100" y="135" fill="#f59e0b" fontSize="10" textAnchor="middle">Spore</text>
            <line x1="125" y1="130" x2="180" y2="130" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)"/>
            {/* Protonema */}
            <rect x="180" y="105" width="100" height="50" rx="6" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
            <text x="230" y="130" fill="#10b981" fontSize="10" textAnchor="middle">Protonema</text>
            <line x1="280" y1="130" x2="340" y2="130" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)"/>
            {/* Gametophyte */}
            <rect x="340" y="90" width="140" height="80" rx="8" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2"/>
            <text x="410" y="115" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Gametophyte</text>
            <text x="410" y="135" fill="#cbd5e1" fontSize="9" textAnchor="middle">(n) dominant phase</text>
            <text x="410" y="155" fill="#cbd5e1" fontSize="9" textAnchor="middle">Archegonia + Antheridia</text>
            <line x1="480" y1="130" x2="540" y2="130" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)"/>
            {/* Fertilization */}
            <circle cx="560" cy="130" r="20" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2"/>
            <text x="560" y="135" fill="#ef4444" fontSize="9" textAnchor="middle">Zygote</text>
            <line x1="560" y1="150" x2="560" y2="200" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)"/>
            {/* Sporophyte */}
            <rect x="520" y="200" width="120" height="70" rx="8" fill="#a855f7" fillOpacity="0.2" stroke="#a855f7" strokeWidth="2"/>
            <text x="580" y="225" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">Sporophyte</text>
            <text x="580" y="245" fill="#cbd5e1" fontSize="9" textAnchor="middle">(2n) parasitic on</text>
            <text x="580" y="260" fill="#cbd5e1" fontSize="9" textAnchor="middle">gametophyte</text>
            <line x1="580" y1="270" x2="580" y2="320" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)"/>
            {/* Sporangium */}
            <circle cx="580" cy="340" r="20" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2"/>
            <text x="580" y="345" fill="#f59e0b" fontSize="9" textAnchor="middle">Spores</text>
            {/* Key note */}
            <rect x="60" y="300" width="440" height="50" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1"/>
            <text x="280" y="330" fill="#10b981" fontSize="10" textAnchor="middle">Requirement: Water for fertilization (flagellated sperm swim to egg)</text>
          </svg>
        );

      case "pteridophyte-life-cycle":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2"/>
            <text x="350" y="65" fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">Pteridophyte Life Cycle — Sporophyte Dominant</text>
            {/* Sporophyte */}
            <rect x="60" y="90" width="260" height="140" rx="8" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2"/>
            <text x="190" y="120" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Sporophyte (2n) — Dominant</text>
            <text x="80" y="155" fill="#cbd5e1" fontSize="10">• Fern fronds with sori (sporangia)</text>
            <text x="80" y="175" fill="#cbd5e1" fontSize="10">• True vascular tissue (xylem + phloem)</text>
            <text x="80" y="195" fill="#cbd5e1" fontSize="10">• Rhizome + adventitious roots</text>
            <text x="80" y="215" fill="#cbd5e1" fontSize="10">• Examples: Dryopteris, Adiantum</text>
            <line x1="320" y1="160" x2="380" y2="160" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)"/>
            {/* Spores */}
            <circle cx="410" cy="160" r="25" fill="#f59e0b" fillOpacity="0.2" stroke="#f59e0b" strokeWidth="2"/>
            <text x="410" y="165" fill="#f59e0b" fontSize="10" textAnchor="middle">Spores</text>
            <line x1="435" y1="160" x2="490" y2="160" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)"/>
            {/* Gametophyte */}
            <rect x="490" y="130" width="170" height="60" rx="8" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
            <text x="575" y="155" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Prothallus (n)</text>
            <text x="575" y="175" fill="#cbd5e1" fontSize="9" textAnchor="middle">Heart-shaped, independent</text>
            <line x1="575" y1="190" x2="575" y2="230" stroke="#10b981" strokeWidth="2" markerEnd="url(#arrow)"/>
            {/* Gametes & fertilization */}
            <rect x="490" y="230" width="170" height="60" rx="8" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2"/>
            <text x="575" y="255" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">Gametes + Water needed</text>
            <text x="575" y="275" fill="#cbd5e1" fontSize="9" textAnchor="middle">Sperm swims to egg</text>
            <line x1="575" y1="290" x2="575" y2="320" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)"/>
            {/* Zygote */}
            <circle cx="575" cy="340" r="25" fill="#ef4444" fillOpacity="0.2" stroke="#ef4444" strokeWidth="2"/>
            <text x="575" y="345" fill="#ef4444" fontSize="10" textAnchor="middle">Zygote</text>
            {/* Key difference */}
            <rect x="60" y="310" width="400" height="50" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="1"/>
            <text x="260" y="340" fill="#f59e0b" fontSize="10" textAnchor="middle">vs Bryophytes: Sporophyte dominant, not parasitic; true vascular tissue</text>
          </svg>
        );

      case "gymnosperm-life-cycle":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="65" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">Gymnosperm Life Cycle (Pinus)</text>
            {/* Male cone */}
            <rect x="60" y="90" width="200" height="100" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>
            <text x="160" y="115" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Male Cone (Strobilus)</text>
            <text x="160" y="140" fill="#cbd5e1" fontSize="10">Microsporophylls → Microsporangia</text>
            <text x="160" y="160" fill="#cbd5e1" fontSize="10">→ Pollen grains (2-winged)</text>
            <text x="160" y="180" fill="#94a3b8" fontSize="9">Wind dispersal to ovule</text>
            {/* Female cone */}
            <rect x="440" y="90" width="200" height="100" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="540" y="115" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Female Cone (Strobilus)</text>
            <text x="460" y="140" fill="#cbd5e1" fontSize="10">Megasporophylls → Ovules</text>
            <text x="460" y="160" fill="#cbd5e1" fontSize="10">Nucellus + Integument + Micropyle</text>
            <text x="460" y="180" fill="#94a3b8" fontSize="9">Exposed seeds (naked = gymno)</text>
            {/* Pollination to seed */}
            <line x1="260" y1="140" x2="440" y2="140" stroke="#a855f7" strokeWidth="2" markerEnd="url(#arrow)"/>
            <text x="350" y="130" fill="#a855f7" fontSize="9" textAnchor="middle">Pollen tube</text>
            {/* Double fertilization note */}
            <rect x="60" y="220" width="580" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="250" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Key: NO double fertilization (unlike angiosperms)</text>
            <text x="350" y="275" fill="#cbd5e1" fontSize="10" textAnchor="middle">One sperm fertilizes egg → zygote (2n)</text>
            <text x="350" y="295" fill="#cbd5e1" fontSize="10" textAnchor="middle">Other sperm degenerates; Endosperm is HAPLOID (n, female gametophyte)</text>
            <text x="350" y="315" fill="#f59e0b" fontSize="9" textAnchor="middle">Seed = embryo (2n) + haploid endosperm + seed coat (2n)</text>
          </svg>
        );

      case "flower-anatomy-diagram":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="65" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">Flower Anatomy & Double Fertilization</text>
            {/* Four whorls */}
            <rect x="60" y="90" width="130" height="80" rx="6" fill="#10b981" fillOpacity="0.15" stroke="#10b981" strokeWidth="2"/>
            <text x="125" y="115" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Calyx</text>
            <text x="125" y="140" fill="#cbd5e1" fontSize="10">Sepals (protective)</text>
            <text x="125" y="160" fill="#94a3b8" fontSize="9">Outermost whorl</text>
            <rect x="210" y="90" width="130" height="80" rx="6" fill="#a855f7" fillOpacity="0.15" stroke="#a855f7" strokeWidth="2"/>
            <text x="275" y="115" fill="#a855f7" fontSize="11" fontWeight="bold" textAnchor="middle">Corolla</text>
            <text x="275" y="140" fill="#cbd5e1" fontSize="10">Petals (attract pollinators)</text>
            <text x="275" y="160" fill="#94a3b8" fontSize="9">Colorful whorl</text>
            <rect x="360" y="90" width="130" height="80" rx="6" fill="#38bdf8" fillOpacity="0.15" stroke="#38bdf8" strokeWidth="2"/>
            <text x="425" y="115" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Androecium</text>
            <text x="425" y="140" fill="#cbd5e1" fontSize="10">Stamens (anther + filament)</text>
            <text x="425" y="160" fill="#94a3b8" fontSize="9">Male reproductive</text>
            <rect x="510" y="90" width="130" height="80" rx="6" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="2"/>
            <text x="575" y="115" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Gynoecium</text>
            <text x="575" y="140" fill="#cbd5e1" fontSize="10">Carpel (stigma + style + ovary)</text>
            <text x="575" y="160" fill="#94a3b8" fontSize="9">Female reproductive</text>
            {/* Double fertilization */}
            <rect x="60" y="195" width="580" height="140" rx="8" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="225" fill="#ef4444" fontSize="13" fontWeight="bold" textAnchor="middle">Double Fertilization (Unique to Angiosperms)</text>
            <text x="150" y="260" fill="#38bdf8" fontSize="11" fontWeight="bold">Sperm 1 + Egg → Zygote (2n) → Embryo</text>
            <text x="150" y="285" fill="#10b981" fontSize="11" fontWeight="bold">Sperm 2 + 2 Polar nuclei → Primary Endosperm Nucleus (3n)</text>
            <text x="150" y="310" fill="#f59e0b" fontSize="10" fontWeight="bold">→ Triploid Endosperm (nutritive tissue for embryo)</text>
            <text x="350" y="340" fill="#94a3b8" fontSize="9">After fertilization: Ovule → Seed; Ovary → Fruit</text>
          </svg>
        );

      case "biology-scope-branches":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Biology: Scope & Major Branches</text>
            {[
              {name:"Morphology",sub:"Form & structure",color:"#38bdf8"},
              {name:"Anatomy",sub:"Internal structure",color:"#10b981"},
              {name:"Physiology",sub:"Function & processes",color:"#f59e0b"},
              {name:"Genetics",sub:"Heredity & variation",color:"#a855f7"},
              {name:"Ecology",sub:"Organism-environment",color:"#ef4444"},
              {name:"Taxonomy",sub:"Classification",color:"#ec4899"},
              {name:"Evolution",sub:"Descent with modification",color:"#38bdf8"},
              {name:"Microbiology",sub:"Microorganisms",color:"#10b981"}
            ].map((b,i) => (
              <rect key={i} x={55+Math.floor(i/4)*155} y={90+Math.mod(i,4)*75} width="145" height="65" rx="6" fill={b.color} fillOpacity="0.12" stroke={b.color} strokeWidth="1.5"/>
            ))}
            {[
              {x:127,y:110,n:"Morphology"},
              {x:282,y:110,n:"Anatomy"},
              {x:437,y:110,n:"Physiology"},
              {x:592,y:110,n:"Genetics"},
              {x:127,y:185,n:"Ecology"},
              {x:282,y:185,n:"Taxonomy"},
              {x:437,y:185,n:"Evolution"},
              {x:592,y:185,n:"Microbiology"}
            ].map((t,i) => (
              <text key={i} x={t.x} y={t.y} fill="#cbd5e1" fontSize="10" textAnchor="middle">{t.n}</text>
            ))}
            <rect x="60" y="310" width="580" height="45" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="337" fill="#f59e0b" fontSize="11" textAnchor="middle">Interdisciplinary: Biochemistry · Biophysics · Bioinformatics · Biostatistics · Environmental Science</text>
          </svg>
        );

      case "biology-interdisciplinary":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>
            <text x="350" y="65" fill="#a855f7" fontSize="14" fontWeight="bold" textAnchor="middle">Biology Interdisciplinary Connections</text>
            {[
              {field:"Chemistry",link:"Biochemistry",ex:"Metabolism, drug design",color:"#38bdf8"},
              {field:"Physics",link:"Biophysics",ex:"MRI, biomechanics, vision",color:"#10b981"},
              {field:"Mathematics",link:"Biostatistics",ex:"Population models, epidemiology",color:"#f59e0b"},
              {field:"Computer Sci",link:"Bioinformatics",ex:"Genomics, sequence analysis",color:"#a855f7"},
              {field:"Earth Science",link:"Ecology",ex:"Biogeochemical cycles, paleontology",color:"#ef4444"}
            ].map((c,i) => (
              <rect key={i} x={60+i*120} y="90" width="105" height="140" rx="8" fill={c.color} fillOpacity="0.1" stroke={c.color} strokeWidth="2"/>
            ))}
            {[
              {x:112,y:110,f:"Chemistry"},
              {x:232,y:110,f:"Physics"},
              {x:352,y:110,f:"Math"},
              {x:472,y:110,f:"Comp Sci"},
              {x:592,y:110,f:"Earth Sci"}
            ].map((t,i) => (
              <text key={i} x={t.x} y={t.y} fill="#cbd5e1" fontSize="10" textAnchor="middle">{t.f}</text>
            ))}
            <rect x="60" y="250" width="580" height="100" rx="8" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="280" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Critical Applications</text>
            <text x="350" y="305" fill="#cbd5e1" fontSize="10" textAnchor="middle">CRISPR gene editing (derived from bacterial immunity) · mRNA vaccines · Epidemic SIR models</text>
            <text x="350" y="325" fill="#cbd5e1" fontSize="10" textAnchor="middle">Human Genome Project (3 billion bases) · Climate modeling · Precision agriculture</text>
            <text x="350" y="345" fill="#f59e0b" fontSize="9" textAnchor="middle">Biology thrives at interfaces — modern research is inherently interdisciplinary</text>
          </svg>
        );

      case "bacterial-cell-structure":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="65" fill="#f59e0b" fontSize="14" fontWeight="bold" textAnchor="middle">Bacterial Cell Structure</text>
            {/* Cell outline */}
            <ellipse cx="350" cy="180" rx="180" ry="100" fill="#f59e0b" fillOpacity="0.08" stroke="#f59e0b" strokeWidth="2"/>
            {/* Capsule */}
            <ellipse cx="350" cy="180" rx="195" ry="110" fill="none" stroke="#a855f7" strokeWidth="2" strokeDasharray="5 3"/>
            <text x="350" y="75" fill="#a855f7" fontSize="10" textAnchor="middle">Capsule (slime layer)</text>
            {/* Cell wall */}
            <ellipse cx="350" cy="180" rx="180" ry="100" fill="none" stroke="#ef4444" strokeWidth="3"/>
            <text x="540" y="100" fill="#ef4444" fontSize="10">Cell Wall (peptidoglycan)</text>
            {/* Membrane */}
            <ellipse cx="350" cy="180" rx="165" ry="90" fill="none" stroke="#38bdf8" strokeWidth="2"/>
            <text x="540" y="160" fill="#38bdf8" fontSize="10">Cell Membrane</text>
            {/* Nucleoid */}
            <circle cx="320" cy="170" r="35" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2"/>
            <text x="320" y="175" fill="#10b981" fontSize="10" textAnchor="middle">Nucleoid</text>
            <text x="320" y="190" fill="#cbd5e1" fontSize="8" textAnchor="middle">(circular DNA)</text>
            {/* Ribosomes */}
            {[280,300,340,360,380].map((x,i) => (
              <circle key={i} cx={x} cy={200+i*3} r="4" fill="#f59e0b"/>
            ))}
            <text x="250" y="230" fill="#f59e0b" fontSize="9">70S Ribosomes</text>
            {/* Flagellum */}
            <path d="M 530 180 Q 580 160 600 200" fill="none" stroke="#a855f7" strokeWidth="2"/>
            <text x="590" y="220" fill="#a855f7" fontSize="9">Flagellum</text>
            {/* Gram stain box */}
            <rect x="60" y="300" width="270" height="55" rx="6" fill="#ef4444" fillOpacity="0.1" stroke="#ef4444" strokeWidth="2"/>
            <text x="195" y="325" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">Gram-Positive</text>
            <text x="195" y="345" fill="#cbd5e1" fontSize="9" textAnchor="middle">Thick peptidoglycan → PURPLE</text>
            <rect x="370" y="300" width="270" height="55" rx="6" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="505" y="325" fill="#38bdf8" fontSize="11" fontWeight="bold" textAnchor="middle">Gram-Negative</text>
            <text x="505" y="345" fill="#cbd5e1" fontSize="9" textAnchor="middle">Thin peptidoglycan + outer membrane → PINK</text>
          </svg>
        );

      case "virion-structure":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#ef4444" strokeWidth="2"/>
            <text x="350" y="65" fill="#ef4444" fontSize="14" fontWeight="bold" textAnchor="middle">Virus Structure & Replication</text>
            {/* Simple virus */}
            <circle cx="180" cy="150" r="60" fill="#ef4444" fillOpacity="0.15" stroke="#ef4444" strokeWidth="2"/>
            <circle cx="180" cy="150" r="20" fill="#ef4444" fillOpacity="0.3"/>
            <text x="180" y="155" fill="#ef4444" fontSize="9" textAnchor="middle">RNA/DNA</text>
            <text x="180" y="230" fill="#cbd5e1" fontSize="10" textAnchor="middle">Capsid (protein coat)</text>
            <line x1="180" y1="90" x2="180" y2="95" stroke="#f59e0b" strokeWidth="2"/>
            <text x="180" y="85" fill="#f59e0b" fontSize="9" textAnchor="middle">Envelope (some viruses)</text>
            {/* Bacteriophage */}
            <rect x="350" y="80" width="120" height="120" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <circle cx="410" cy="120" r="30" fill="#38bdf8" fillOpacity="0.2" stroke="#38bdf8" strokeWidth="2"/>
            <text x="410" y="115" fill="#38bdf8" fontSize="9" textAnchor="middle">Head</text>
            <text x="410" y="130" fill="#cbd5e1" fontSize="8" textAnchor="middle">(DNA)</text>
            <line x1="410" y1="150" x2="410" y2="190" stroke="#38bdf8" strokeWidth="3"/>
            <line x1="390" y1="190" x2="430" y2="190" stroke="#38bdf8" strokeWidth="2"/>
            <text x="410" y="210" fill="#cbd5e1" fontSize="9" textAnchor="middle">Tail</text>
            <text x="410" y="260" fill="#cbd5e1" fontSize="10" textAnchor="middle">T4 Phage (complex)</text>
            {/* Replication */}
            <rect x="500" y="80" width="160" height="170" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>
            <text x="580" y="105" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">Lytic Cycle</text>
            <text x="520" y="135" fill="#cbd5e1" fontSize="9">1. Attachment</text>
            <text x="520" y="155" fill="#cbd5e1" fontSize="9">2. Penetration</text>
            <text x="520" y="175" fill="#cbd5e1" fontSize="9">3. Biosynthesis</text>
            <text x="520" y="195" fill="#cbd5e1" fontSize="9">4. Maturation</text>
            <text x="520" y="215" fill="#cbd5e1" fontSize="9">5. Lysis/Release</text>
            <text x="580" y="250" fill="#f59e0b" fontSize="9" textAnchor="middle">~20 min per cycle</text>
            {/* Key fact */}
            <rect x="60" y="310" width="580" height="45" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>
            <text x="350" y="337" fill="#a855f7" fontSize="11" textAnchor="middle">Viruses are ACCELLULAR: no metabolism, obligate intracellular parasites, DNA OR RNA (never both)</text>
          </svg>
        );

      case "biotech-microbe-applications":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Microbial Biotechnology Applications</text>
            {[
              {area:"Industry",ex:"Fermentation, antibiotics, enzymes",color:"#38bdf8"},
              {area:"Medicine",ex:"Insulin, vaccines, monoclonal antibodies",color:"#10b981"},
              {area:"Agriculture",ex:"Biofertilizers (Rhizobium), Bt crops",color:"#f59e0b"},
              {area:"Environment",ex:"Bioremediation, wastewater treatment",color:"#a855f7"}
            ].map((a,i) => (
              <rect key={i} x={60+i*155} y="90" width="140" height="140" rx="8" fill={a.color} fillOpacity="0.1" stroke={a.color} strokeWidth="2"/>
            ))}
            {[
              {x:130,y:115,n:"Industry"},
              {x:285,y:115,n:"Medicine"},
              {x:440,y:115,n:"Agriculture"},
              {x:595,y:115,n:"Environment"}
            ].map((t,i) => (
              <text key={i} x={t.x} y={t.y} fill="#cbd5e1" fontSize="11" fontWeight="bold" textAnchor="middle">{t.n}</text>
            ))}
            {/* Key examples */}
            <rect x="60" y="250" width="580" height="110" rx="8" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="280" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Landmark Achievements</text>
            <text x="120" y="310" fill="#38bdf8" fontSize="10">• Humulin (1982): First GMO drug — human insulin from E. coli</text>
            <text x="120" y="330" fill="#10b981" fontSize="10">• Bt cotton: 50%+ pesticide reduction via bacterial crystal protein</text>
            <text x="400" y="310" fill="#a855f7" fontSize="10">• Pseudomonas putida: Oil spill bioremediation (Exxon Valdez)</text>
            <text x="400" y="330" fill="#ef4444" fontSize="10">• Gut microbiome: 10¹⁴ microbes essential for digestion & immunity</text>
          </svg>
        );

      case "biodiversity-conservation":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Biodiversity & Conservation Strategies</text>
            {/* Three levels */}
            <rect x="60" y="90" width="180" height="100" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="150" y="120" fill="#38bdf8" fontSize="12" fontWeight="bold" textAnchor="middle">Genetic Diversity</text>
            <text x="150" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle">Variation within species</text>
            <text x="150" y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">Nepal rice landraces (300+)</text>
            <rect x="260" y="90" width="180" height="100" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="120" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Species Diversity</text>
            <text x="350" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle">Variety of species in area</text>
            <text x="350" y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">Rhino, tiger, red panda</text>
            <rect x="460" y="90" width="180" height="100" rx="8" fill="#f59e0b" fillOpacity="0.1" stroke="#f59e0b" strokeWidth="2"/>
            <text x="550" y="120" fill="#f59e0b" fontSize="12" fontWeight="bold" textAnchor="middle">Ecosystem Diversity</text>
            <text x="550" y="145" fill="#cbd5e1" fontSize="10" textAnchor="middle">Variety of habitats</text>
            <text x="550" y="165" fill="#94a3b8" fontSize="9" textAnchor="middle">Terai to nival zones</text>
            {/* Threats */}
            <rect x="60" y="210" width="280" height="140" rx="8" fill="#ef4444" fillOpacity="0.08" stroke="#ef4444" strokeWidth="2"/>
            <text x="200" y="240" fill="#ef4444" fontSize="12" fontWeight="bold" textAnchor="middle">Major Threats</text>
            <text x="80" y="270" fill="#cbd5e1" fontSize="10">1. Habitat loss/degradation (PRIMARY)</text>
            <text x="80" y="295" fill="#cbd5e1" fontSize="10">2. Overexploitation (poaching, logging)</text>
            <text x="80" y="320" fill="#cbd5e1" fontSize="10">3. Invasive species</text>
            <text x="80" y="345" fill="#cbd5e1" fontSize="10">4. Pollution & climate change</text>
            {/* Conservation */}
            <rect x="360" y="210" width="280" height="140" rx="8" fill="#10b981" fillOpacity="0.08" stroke="#10b981" strokeWidth="2"/>
            <text x="500" y="240" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">Conservation Strategies</text>
            <text x="380" y="270" fill="#cbd5e1" fontSize="10">In-situ: National parks, wildlife reserves</text>
            <text x="380" y="295" fill="#cbd5e1" fontSize="10">Ex-situ: Seed banks, zoos, cryopreservation</text>
            <text x="380" y="320" fill="#cbd5e1" fontSize="10">Legal: CITES, IUCN Red List, Wildlife Act</text>
            <text x="380" y="345" fill="#f59e0b" fontSize="9">Nepal: Community forestry (22,000 user groups)</text>
          </svg>
        );

      case "conservation-strategies-nepal":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Nepal Conservation: In-situ & Ex-situ</text>
            {/* In-situ */}
            <rect x="50" y="90" width="290" height="220" rx="8" fill="#10b981" fillOpacity="0.1" stroke="#10b981" strokeWidth="2"/>
            <text x="195" y="120" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">In-situ Conservation</text>
            <text x="70" y="155" fill="#cbd5e1" fontSize="10">• National Parks (11): Chitwan, Sagarmatha</text>
            <text x="70" y="180" fill="#cbd5e1" fontSize="10">• Wildlife Reserves (6): Bardia, Koshi Tappu</text>
            <text x="70" y="205" fill="#cbd5e1" fontSize="10">• Conservation Areas (1): Annapurna (7,629 km²)</text>
            <text x="70" y="230" fill="#cbd5e1" fontSize="10">• Protected Forests & buffer zones</text>
            <text x="70" y="265" fill="#f59e0b" fontSize="9">Coverage: ~21% of Nepal's land area</text>
            <text x="70" y="290" fill="#94a3b8" fontSize="9">Ramsar sites: Koshi Tappu, Shey Phoksundo, Gokyo, Jalpa</text>
            {/* Ex-situ */}
            <rect x="360" y="90" width="290" height="220" rx="8" fill="#38bdf8" fillOpacity="0.1" stroke="#38bdf8" strokeWidth="2"/>
            <text x="505" y="120" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Ex-situ Conservation</text>
            <text x="380" y="155" fill="#cbd5e1" fontSize="10">• Seed banks (NTNC × Millennium Seed Bank)</text>
            <text x="380" y="180" fill="#cbd5e1" fontSize="10">• Botanical gardens (National, Bhaktapur)</text>
            <text x="380" y="205" fill="#cbd5e1" fontSize="10">• Zoos & safari parks (Chitwan Safari Park)</text>
            <text x="380" y="230" fill="#cbd5e1" fontSize="10">• Cryopreservation (gametes, embryos)</text>
            <text x="380" y="265" fill="#f59e0b" fontSize="9">Insurance against extinction & habitat loss</text>
            <text x="380" y="290" fill="#94a3b8" fontSize="9">Community forestry: 22,000 user groups managing 2.2M hectares</text>
            {/* IUCN categories */}
            <rect x="60" y="330" width="580" height="30" rx="6" fill="#0f172a" stroke="#a855f7" strokeWidth="2"/>
            <text x="350" y="350" fill="#a855f7" fontSize="10" textAnchor="middle">IUCN Categories: CR (Critical) · EN (Endangered) · VU (Vulnerable) · NT (Near Threatened) · LC (Least Concern)</text>
          </svg>
        );

      case "nepal-vegetation-zones":
        return (
          <svg viewBox="0 0 700 400" className="w-full h-auto select-none">
            <rect x="40" y="30" width="620" height="340" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="2"/>
            <text x="350" y="65" fill="#10b981" fontSize="14" fontWeight="bold" textAnchor="middle">Nepal Vegetation Zones (Altitude-Based)</text>
            {[
              {zone:"Terai",alt:"100-600m",veg:"Tropical deciduous (sal, sisau)",color:"#10b981"},
              {zone:"Siwalik",alt:"600-2000m",veg:"Moist subtropical (chirai, chilaune)",color:"#38bdf8"},
              {zone:"Middle Hills",alt:"2000-3000m",veg:"Temperate (oak, rhododendron, juniper)",color:"#f59e0b"},
              {zone:"High Hills",alt:"3000-4000m",veg:"Subalpine (birch, dwarf rhododendron)",color:"#a855f7"},
              {zone:"Alpine",alt:"4000-4800m",veg:"Alpine meadows (herbs, cushion plants)",color:"#ef4444"},
              {zone:"Nival",alt:"4800m+",veg:"Bare rock, snow, lichens only",color:"#94a3b8"}
            ].map((z,i) => (
              <rect key={i} x={50+i*105} y="90" width="95" height="180" rx="6" fill={z.color} fillOpacity="0.1" stroke={z.color} strokeWidth="2"/>
            ))}
            {[
              {x:97,y:110,z:"Terai"},
              {x:202,y:110,z:"Siwalik"},
              {x:307,y:110,z:"Mid Hills"},
              {x:412,y:110,z:"High Hills"},
              {x:517,y:110,z:"Alpine"},
              {x:622,y:110,z:"Nival"}
            ].map((t,i) => (
              <text key={i} x={t.x} y={t.y} fill="#cbd5e1" fontSize="9" fontWeight="bold" textAnchor="middle">{t.z}</text>
            ))}
            {/* Altitude scale */}
            <line x1="350" y1="90" x2="350" y2="270" stroke="#64748b" strokeWidth="2"/>
            <text x="355" y="100" fill="#64748b" fontSize="8">0m</text>
            <text x="355" y="270" fill="#64748b" fontSize="8">8848m</text>
            {/* Key facts */}
            <rect x="60" y="290" width="580" height="65" rx="6" fill="#0f172a" stroke="#f59e0b" strokeWidth="2"/>
            <text x="350" y="315" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Key Facts</text>
            <text x="350" y="340" fill="#cbd5e1" fontSize="10" textAnchor="middle">34+ rhododendron species (national flower: R. arboreum) · Forest cover recovering via community forestry</text>
            <text x="350" y="355" fill="#94a3b8" fontSize="9">Climate change shifting treeline upward ~30m/decade; alpine species face habitat compression</text>
          </svg>
        );
`;

// Find the position of '      default:' and insert before it
const defaultIndex = content.lastIndexOf('      default:');
if (defaultIndex === -1) {
  console.error('Could not find default: case');
  process.exit(1);
}

// Insert biology cases before default
const newContent = content.slice(0, defaultIndex) + biologyCases + '\n' + content.slice(defaultIndex);
fs.writeFileSync(FILE_PATH, newContent, 'utf-8');
console.log(`✓ Added ${biologyCases.split('case "').length - 1} biology SVG cases to derivation-visual.tsx`);
