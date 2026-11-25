# Physics class-11 — thermal expansion final 3 files (structured-style variants)
PART_A = [
    {
        "file": "class-11/physics/thermal-expansion/02-cubical-expansion-superficial-expansion-and-their-relation-with-linear-expansion.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: derive &#946; = 2&#945; and &#947; = 3&#945; yourself\n\nA square plate of side $L_0$ heated by $\\Delta T$ grows to $L = L_0(1+\\alpha\\Delta T)$ on each side, so $A = L^2 = A_0(1+\\alpha\\Delta T)^2 \\approx A_0(1+2\\alpha\\Delta T)$ — the $\\alpha^2$ term is negligibly small, giving $\\beta = 2\\alpha$. A cube gives $V = L^3 \\approx V_0(1+3\\alpha\\Delta T)$, so $\\gamma = 3\\alpha$. The same one-direction logic runs backwards for cooling. Because the fractional change is tiny (aluminium over 100 K: $\\sim 0.2\\%$), first-order algebra is always enough. Density falls as $\\rho = \\rho_0/(1+\\gamma\\Delta T)$ — the microscopic reason hot water floats on cold."),
             "table1": {"title": "From length to area to volume",
                        "headers": ["Step", "Exact", "First-order"],
                        "rows": [
                            ["Side", "$L = L_0(1+\x08b1lpha\ gammadT)$", "&#8212;"],
                            ["Area", "$A = A_0(1+\x08b1lpha\ gammadT)^2$", "$A_0(1+2\x08b1lpha\ gammadT)$, so \x08b2 = 2\x08b1lpha"],
                            ["Volume", "$V = V_0(1+\x08b1lpha\ gammadT)^3$", "$V_0(1+3\x08b1lpha\ gammadT)$, so \x13b3 = 3\x08b1lpha"],
                            ["Density", "$\x1c1 = \x1c1_0/(1+\x13b3\ gammadT)$", "$\x1c1_0(1&#8722;\x13b3\ gammadT)$"],
                        ]},
             "table2": {"title": "Typical coefficients (/K, near room temperature)",
                        "headers": ["Material", "\x08b1lpha (linear)", "\x13b3 (cubical)"],
                        "rows": [
                            ["Steel", "12&#215;10&#8315;&#8310;", "36&#215;10&#8315;&#8310;"],
                            ["Copper", "17&#215;10&#8315;&#8310;", "51&#215;10&#8315;&#8310;"],
                            ["Aluminium", "23&#215;10&#8315;&#8310;", "69&#215;10&#8315;&#8310;"],
                            ["Glass", "9&#215;10&#8315;&#8310;", "27&#215;10&#8315;&#8310;"],
                            ["Invar", "1.2&#215;10&#8315;&#8310;", "3.6&#215;10&#8315;&#8310;"],
                        ]},
             "svg": ("Cube of side L — three directions triple the linear effect",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"180\" y=\"70\" width=\"120\" height=\"120\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"240\" y=\"215\" fill=\"#1d4ed8\">side L&#8320;</text>"
                     "<rect x=\"400\" y=\"62\" width=\"130\" height=\"130\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"465\" y=\"215\" fill=\"#a16207\">side L(1+\x08b1lpha&#916;T)</text>"
                     "</g>"
                     "<text x=\"320\" y=\"45\" text-anchor=\"middle\" fill=\"#374151\">V &#8746; L&#179; &#8594; &#916;V/V = 3\x08b1lpha&#916;T</text>"
                     "<text x=\"320\" y=\"245\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">one expansion coefficient, three powers of (1+\x08b1lpha&#916;T)</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Density drops as volume grows — why hot water rises",
                     "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"120\" y=\"70\" width=\"150\" height=\"90\" rx=\"8\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"195\" y=\"120\" fill=\"#1d4ed8\">cold: denser</text>"
                     "<rect x=\"370\" y=\"60\" width=\"160\" height=\"100\" rx=\"8\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"450\" y=\"120\" fill=\"#991b1b\">hot: bigger, lighter</text>"
                     "</g>"
                     "<text x=\"320\" y=\"200\" text-anchor=\"middle\" fill=\"#374151\">\x1c1 = \x1c1&#8320;/(1+\x13b3&#916;T): mass fixed, volume grows</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/thermal-expansion/04-dulong-and-petit-method-for-liquid-expansivity.json",
        "blocks": [
            {"after": "**Principle:** At the horizontal base of the U-tube, the pressure from",
             "md": ("### Deep dive: balancing two columns of the same liquid\n\nDulong and Petit's U-tube holds the same liquid with one limb hot and one cold. At the horizontal base the pressures balance: $\x1c1_0 g h_0 = \x1c1 g h$, where $h_0$ is the cold-column height and $h$ the hot-column height. Using $\x1c1 = \x1c1_0/(1+\x13b3\ gammadT)$ and rearranging gives $\x13b3 = \\dfrac{h - h_0}{h_0\ gammadT}$ (to first order; more precisely $\x13b3 = \\dfrac{h-h_0}{h_0\ gammadT - h\ gammadT}$ forms appear, but the NEB form uses the cold height). The method measures the *absolute (real)* expansivity of the liquid because the glass container is not involved — unlike the weight-thermometer method, no container correction is needed. The hot column stands taller precisely because heat thinned the liquid."),
             "table1": {"title": "The U-tube balance in symbols",
                        "headers": ["Quantity", "Cold limb", "Hot limb"],
                        "rows": [
                            ["Temperature", "T&#8320;", "T = T&#8320; + &#916;T"],
                            ["Density", "\x1c1&#8320;", "\x1c1 = \x1c1&#8320;/(1+\x13b3&#916;T)"],
                            ["Column height", "h&#8320;", "h &gt; h&#8320;"],
                            ["Pressure at base", "\x1c1&#8320;g h&#8320;", "\x1c1 g h"],
                        ]},
             "table2": {"title": "Result and comparisons",
                        "headers": ["Item", "Formula", "Note"],
                        "rows": [
                            ["Real expansivity", "\x13b3 = (h &#8722; h&#8320;)/(h&#8320;&#916;T)", "no glass correction"],
                            ["Contrast: weight thermometer", "gives apparent \x13b3", "needs glass \x13b3 added"],
                            ["Typical \x13b3 (mercury)", "1.8&#215;10&#8315;&#8308; /K", "large, easy to measure"],
                            ["Typical \x13b3 (water 20&#176;C)", "2.1&#215;10&#8315;&#8304; /K", "anomalous near 4&#176;C"],
                        ]},
             "svg": ("Dulong–Petit U-tube — the hot column stands taller",
                     "<svg viewBox=\"0 0 640 300\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<path d=\"M180 60 L 180 230 L 460 230 L 460 100\" fill=\"none\" stroke=\"#1d4ed8\" stroke-width=\"14\"/>"
                     "<text x=\"150\" y=\"55\" fill=\"#1d4ed8\">cold: h&#8320;</text>"
                     "<text x=\"500\" y=\"95\" fill=\"#991b1b\">hot: h &gt; h&#8320;</text>"
                     "<line x1=\"120\" y1=\"230\" x2=\"520\" y2=\"230\" stroke=\"#374151\" stroke-width=\"2\"/>"
                     "<text x=\"320\" y=\"260\" fill=\"#374151\">pressure balance: \x1c1&#8320;g h&#8320; = \x1c1 g h</text>"
                     "</g>"
                     "<text x=\"320\" y=\"290\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">\x13b3 = (h &#8722; h&#8320;)/(h&#8320;&#916;T) — absolute expansivity, no glass correction</text>"
                     "</svg>"),
            },
            {"after": "**Why the hot limb is taller:** The liquid in the hot limb i",
             "svg": ("Hot liquid is less dense — same pressure needs more height",
                     "<svg viewBox=\"0 0 640 220\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"220\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"140\" y=\"80\" width=\"90\" height=\"90\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"185\" y=\"130\" fill=\"#1d4ed8\">\x1c1&#8320; h&#8320;</text>"
                     "<rect x=\"410\" y=\"60\" width=\"90\" height=\"110\" fill=\"#fef2f2\" stroke=\"#991b1b\"/>"
                     "<text x=\"455\" y=\"130\" fill=\"#991b1b\">\x1c1 h</text>"
                     "</g>"
                     "<text x=\"320\" y=\"45\" text-anchor=\"middle\" fill=\"#374151\">equal pressures &#8594; lower density needs a taller column</text>"
                     "<text x=\"320\" y=\"200\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">the height difference itself measures \x13b3</text>"
                     "</svg>"),
            },
        ],
    },
    {
        "file": "class-11/physics/thermal-expansion/04-dulong-and-petit-method-of-determining-expansivity-of-liquid.json",
        "blocks": [
            {"after": "## 2. Fundamental Concepts",
             "md": ("### Deep dive: apparent vs real expansivity\n\nA liquid has no shape of its own, so its expansion is always measured *relative to a container*. A weight thermometer (a bulb with a capillary) filled and heated overflows a mass of liquid; the overflow reflects the difference between the liquid's real expansion and the glass bulb's expansion. Hence $\x13b3_{apparent} = \x13b3_{real} - \x13b3_{glass}$, with glass $\x13b3 \\approx 2.5\\times10^{-5}$ /K. The Dulong&#8211;Petit U-tube, by contrast, balances two free columns and measures the *real* expansivity directly. The two classic relations $\x13b3_r = \x13b3_a + \x13b3_g$ and the overflow-mass formula connect every NEB numerical on this topic."),
             "table1": {"title": "Real vs apparent expansivity",
                        "headers": ["Quantity", "Definition", "Measured by"],
                        "rows": [
                            ["Real \x13b3&#8342;", "true volume expansion of the liquid", "Dulong&#8211;Petit U-tube"],
                            ["Apparent \x13b3&#8336;", "expansion relative to the container", "weight thermometer"],
                            ["Glass \x13b3_g", "container's own volume expansion", "&#8776; 2.5&#215;10&#8315;&#8305; /K"],
                            ["Relation", "\x13b3&#8342; = \x13b3&#8336; + \x13b3_g", "always additive"],
                        ]},
             "table2": {"title": "Weight-thermometer working formula",
                        "headers": ["Step", "Symbol", "Statement"],
                        "rows": [
                            ["Mass filled at T&#8320;", "m&#8320;", "fill to a mark"],
                            ["Mass remaining at T", "m", "overflow expelled"],
                            ["Overflow fraction", "(m&#8320;&#8722;m)/m", "apparent expansion"],
                            ["Real expansivity", "\x13b3&#8342;", "\x13b3&#8336; + \x13b3_g"],
                        ]},
             "svg": ("Apparent = real − glass: the container eats part of the expansion",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<rect x=\"90\" y=\"60\" width=\"200\" height=\"130\" rx=\"10\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"190\" y=\"100\" fill=\"#1d4ed8\">real \x13b3&#8342;</text>"
                     "<rect x=\"110\" y=\"140\" width=\"160\" height=\"40\" rx=\"8\" fill=\"#ffffff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"190\" y=\"167\" fill=\"#1d4ed8\" font-size=\"12\">glass takes \x13b3_g</text>"
                     "<rect x=\"370\" y=\"60\" width=\"200\" height=\"130\" rx=\"10\" fill=\"#fefce8\" stroke=\"#a16207\"/>"
                     "<text x=\"470\" y=\"100\" fill=\"#a16207\">apparent \x13b3&#8336;</text>"
                     "<text x=\"470\" y=\"135\" fill=\"#374151\" font-size=\"12\">what the overflow shows</text>"
                     "</g>"
                     "<text x=\"320\" y=\"235\" text-anchor=\"middle\" fill=\"#374151\">\x13b3&#8342; = \x13b3&#8336; + \x13b3_g</text>"
                     "</svg>"),
            },
            {"after": "## 4. Exam Orientation and Previous Year Questions (NEB)",
             "svg": ("Weight thermometer — overflow mass measures apparent γ",
                     "<svg viewBox=\"0 0 640 260\" font-family=\"Segoe UI\" font-size=\"13\">"
                     "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
                     "<g text-anchor=\"middle\">"
                     "<circle cx=\"240\" cy=\"170\" r=\"55\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<rect x=\"228\" y=\"60\" width=\"24\" height=\"70\" fill=\"#eff6ff\" stroke=\"#1d4ed8\"/>"
                     "<text x=\"240\" y=\"250\" fill=\"#1d4ed8\">bulb + capillary</text>"
                     "<path d=\"M260 60 C 320 40, 360 40, 420 55\" fill=\"none\" stroke=\"#a16207\" stroke-width=\"2\"/>"
                     "<path d=\"M420 55 L 405 48 L 405 63 Z\" fill=\"#a16207\"/>"
                     "<text x=\"470\" y=\"45\" fill=\"#a16207\">overflow drops</text>"
                     "</g>"
                     "<text x=\"320\" y=\"230\" text-anchor=\"middle\" fill=\"#6b7280\" font-size=\"12\">weigh the overflow: (m&#8320;&#8722;m)/m &#8594; \x13b3&#8336;, then add \x13b3_g</text>"
                     "</svg>"),
            },
        ],
    },
]
TOPICS = list(PART_A)
