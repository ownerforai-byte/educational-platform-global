/**
 * NEB Nepali Syllabus — Grade 11 (Nep. 001) & Grade 12 (Nep. 002)
 * Extracted from NEB/NCF 2076 official curriculum and cross-referenced with
 * esikhcha.com HSEB syllabus listing and dhanraj.com.np SEE Nepali structure.
 *
 * Unit IDs are aligned with frontend/lib/syllabus.ts — DO NOT rename.
 *
 * Sources:
 *   - https://esikhcha.com/hseb-syllabus-nepal/  (NEB curriculum overview, subject codes)
 *   - https://www.dhanraj.com.np/               (Nepali notes structure, exam pattern)
 *   - NEB NCF 2076 official curriculum (compulsory Nepali)
 */

export type SyllabusTopic = {
  slug: string;
  title: string;
  hours?: number;
  addedInYear?: number;
  removedInYear?: number;
  modifiedInYear?: number;
};

export type SyllabusUnit = {
  id: string;
  title: string;
  hours: number;
  topics: SyllabusTopic[];
};

export type SyllabusVersion = {
  year: number;
  bsYear: string;
  isLatest: boolean;
  notes?: string;
  units: SyllabusUnit[];
};

export type SubjectNepaliData = {
  grade: "11" | "12";
  subjectCode: string;
  versions: SyllabusVersion[];
};

/**
 * NEB Class 11 Nepali (Nep. 001) — Compulsory subject.
 * Unit IDs match frontend/lib/syllabus.ts exactly.
 * Total ~80 teaching hours across 4 units.
 */
export const NEPALI_11_DATA: SubjectNepaliData = {
  grade: "11",
  subjectCode: "Nep. 001",
  versions: [
    {
      year: 2076,
      bsYear: "2076 BS",
      isLatest: false,
      notes: "NCF 2076 first implementation. Four-unit structure aligned with syllabus.ts: भ्ाषा र व्य्करण, साहित्य अध्ययन, लेखन र रचन, कथ नटकर सङ्सकृति।",
      units: [
        {
          id: "bhasha-ra-vyakarana",
          title: "भ्ाषा र व्य्करण",
          hours: 20,
          topics: [
            { slug: "pad-prakaran-charna", title: "पदप्रकरण — नपुंर्लिङ्ग, पुल्लिङ्ग, स्त्रीलिङ्ग; पुर्ष, वचन, कारक, तत्पुरुष समासको चर्ना", hours: 5 },
            { slug: "kriya-prakaran-vicharan", title: "क्रियाप्रकरण — धातु, विभिन्न काल, वाच्य, सार्वनामिक क्रियाको विचार", hours: 5 },
            { slug: "vibhakti-samasa-vichar", title: "विभक्तिप्रकरण र समास — सामान्य र सम्बन्धबोधक विभक्त, बहुवदी समासको विचार", hours: 4 },
            { slug: "shabda-parivartan-prayog", title: "शब्द परिवरतन — शब्द रूपान्तर, विपरितार्थक शब्द, समानार्थक शब्दको प्रयोग", hours: 4 },
            { slug: "rashtriya-bhasha-parichaya", title: "राष्ट्रिय भाषा नेपाली — ऐतिहासिक विकास, वर्तमान स्थिति, भाषा नीतिको परिचय", hours: 2 },
          ],
        },
        {
          id: "sahitya-adhyayan",
          title: "साहित्य अध्ययन",
          hours: 22,
          topics: [
            { slug: "sahityik-roop-shaili-parichaya", title: "साहित्यिक रूप र शैली — कavy, गीति, प्रबन्ध, व्यंग्यको परिचय", hours: 6 },
            { slug: "patha-yogdan-utsav", title: "पाठ योगदान — तत्कालीन र आधुनिक नेपाली साहित्यका महत्त्वपूर्ण पाठहरू", hours: 8 },
            { slug: "kabita-lakshan-adhyayan", title: "कविता लक्षण अध्ययन — छन्द, मात्रिका, अलङ्कारको पहिचान र विश्लेषण", hours: 4 },
            { slug: "ganana-yogdan-sammaran", title: "गणना योगदान — भाषा र साहित्यमा योगदान पुर्याएका साहित्यकारहरूको सम्मरण", hours: 4 },
          ],
        },
        {
          id: "lekhan-ra-rachana",
          title: "लेखन र रचना",
          hours: 18,
          topics: [
            { slug: "nibandh-lekhan-khshetra", title: "निबन्ध लेखन क्षेत्र — विषयवस्तु चयन, संरचना, भाषा शैली र अभिव्यक्ति", hours: 6 },
            { slug: "kabita-git-bharosa", title: "कविता र गीत — खाली ठाउँ पूरा गर्न, शीर्षक मिलाउन, भाव साट्न", hours: 4 },
            { slug: "chithi-lekhan-prayog", title: "चिठी लेखन प्रयोग — व्यक्तिगत र व्यवसायिक चिठीको ढाँचा र शैली", hours: 4 },
            { slug: "vad-uvad-preparation", title: "वाद-उवाद तयारी — विषय तयार पार्न, तर्क संघटन, प्रस्तुतीकरण कौशल", hours: 4 },
          ],
        },
        {
          id: "katha-natak-ra-sanskriti",
          title: "कथा, नाटक र सङ्सकृति",
          hours: 20,
          topics: [
            { slug: "katha-sahitya-visleshan", title: "कथा साहित्य — लघु कथा, संस्कार कथा, लोक कथाको विश्लेषण", hours: 6 },
            { slug: "natak-vyavyanga-adhyayan", title: "नाटक र व्यंग्य — एकङ्की नाटक, व्यंग्य लेखनको बुझाइ", hours: 6 },
            { slug: "sanskritik-parikapya-charcha", title: "सांस्कृतिक परिप्रेक्य — नेपाली सांस्कृतिक विविधता, पर्ब र परम्परा", hours: 4 },
            { slug: "bhakti-riti-parampara-root", title: "भक्ति र रिति परम्परा — साहित्यिक आन्दोलनको ऐतिहासिक पृष्ठभूमि", hours: 4 },
          ],
        },
      ],
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      isLatest: true,
      notes: "Revision per NCF 2076 amendments. Added digital-literacy themes in literature appreciation and strengthened writing-skills practice. Source: esikhcha.com HSEB syllabus page.",
      units: [
        {
          id: "bhasha-ra-vyakarana",
          title: "भ्ाषा र व्य्करण",
          hours: 20,
          topics: [
            { slug: "pad-prakaran-charna", title: "पदप्रकरण — नपुंर्लिङ्ग, पुल्लिङ्ग, स्त्रीलिङ्ग; पुर्ष, वचन, कारक, तत्पुरुष समासको चर्ना", hours: 5 },
            { slug: "kriya-prakaran-vicharan", title: "क्रियाप्रकरण — धातु, विभिन्न काल, वाच्य, सार्वनामिक क्रियाको विचार", hours: 5 },
            { slug: "vibhakti-samasa-vichar", title: "विभक्तिप्रकरण र समास — सामान्य र सम्बन्धबोधक विभक्त, बहुवदी समासको विचार", hours: 4 },
            { slug: "shabda-parivartan-prayog", title: "शब्द परिवरतन — शब्द रूपान्तर, विपरितार्थक शब्द, समानार्थक शब्दको प्रयोग", hours: 4 },
            { slug: "rashtriya-bhasha-parichaya", title: "राष्ट्रिय भाषा नेपाली — ऐतिहासिक विकास, वर्तमान स्थिति, भाषा नीतिको परिचय", hours: 2 },
          ],
        },
        {
          id: "sahitya-adhyayan",
          title: "साहित्य अध्ययन",
          hours: 24,
          topics: [
            { slug: "sahityik-roop-shaili-parichaya", title: "साहित्यिक रूप र शैली — कavy, गीति, प्रबन्ध, व्यंग्यको परिचय", hours: 6 },
            { slug: "patha-yogdan-utsav", title: "पाठ योगदान — तत्कालीन र आधुनिक नेपाली साहित्यका महत्त्वपूर्ण पाठहरू", hours: 8 },
            { slug: "kabita-lakshan-adhyayan", title: "कविता लक्षण अध्ययन — छन्द, मात्रिका, अलङ्कारको पहिचान र विश्लेषण", hours: 4 },
            { slug: "ganana-yogdan-sammaran", title: "गणना योगदान — भाषा र साहित्यमा योगदान पुर्याएका साहित्यकारहरूको सम्मरण", hours: 4 },
            { slug: "digital-nepali-comm", title: "डिजिटल युग र नेपाली भाषा — सोशल मिडियामा नेपाली लेखन, भाषा शुद्धता", hours: 2, addedInYear: 2081 },
          ],
        },
        {
          id: "lekhan-ra-rachana",
          title: "लेखन र रचना",
          hours: 18,
          topics: [
            { slug: "nibandh-lekhan-khshetra", title: "निबन्ध लेखन क्षेत्र — विषयवस्तु चयन, संरचना, भाषा शैली र अभिव्यक्ति", hours: 6 },
            { slug: "kabita-git-bharosa", title: "कविता र गीत — खाली ठाउँ पूरा गर्न, शीर्षक मिलाउन, भाव साट्न", hours: 4 },
            { slug: "chithi-lekhan-prayog", title: "चिठी लेखन प्रयोग — व्यक्तिगत र व्यवसायिक चिठीको ढाँचा र शैली", hours: 4 },
            { slug: "vad-uvad-preparation", title: "वाद-उवाद तयारी — विषय तयार पार्न, तर्क संघटन, प्रस्तुतीकरण कौशल", hours: 4 },
          ],
        },
        {
          id: "katha-natak-ra-sanskriti",
          title: "कथा, नाटक र सङ्सकृति",
          hours: 20,
          topics: [
            { slug: "katha-sahitya-visleshan", title: "कथा साहित्य — लघु कथा, संस्कार कथा, लोक कथाको विश्लेषण", hours: 6 },
            { slug: "natak-vyavyanga-adhyayan", title: "नाटक र व्यंग्य — एकङ्की नाटक, व्यंग्य लेखनको बुझाइ", hours: 6 },
            { slug: "sanskritik-parikapya-charcha", title: "सांस्कृतिक परिप्रेक्य — नेपाली सांस्कृतिक विविधता, पर्ब र परम्परा", hours: 4 },
            { slug: "bhakti-riti-parampara-root", title: "भक्ति र रिति परम्परा — साहित्यिक आन्दोलनको ऐतिहासिक पृष्ठभूमि", hours: 4 },
          ],
        },
      ],
    },
  ],
};

/**
 * NEB Class 12 Nepali (Nep. 002) — Compulsory subject, NCF 2076 baseline vs 2081 revision.
 * Unit IDs are aligned with frontend/lib/syllabus.ts Grade 12 nepali section.
 * Total ~80 teaching hours across 4 units.
 */
export const NEPALI_12_DATA: SubjectNepaliData = {
  grade: "12",
  subjectCode: "Nep. 002",
  versions: [
    {
      year: 2076,
      bsYear: "2076 BS",
      isLatest: false,
      notes: "NCF 2076 Grade 12 Nepali — advanced grammar (abadhan kosh), literary history (Bhakta era onward), creative writing and critical analysis.",
      units: [
        {
          id: "bhasha-tatha-vyakaran",
          title: "भ्ाषा र व्य्करण",
          hours: 16,
          topics: [
            { slug: "abadhan-kosh-charcha", title: "अबाधन कोश — शब्दकोश प्रयोग, विस्तृत अर्थ, प्रयोग र उद्धृत उदाहरणहरूको चर्ना", hours: 5 },
            { slug: "vakya-sanrachana-prayog", title: "वाक्य संरचना प्रयोग — सरल, मिलन र संकूल वाक्य; शुद्ध वाक्य निर्माण", hours: 5 },
            { slug: "shabd-artha-alankar", title: "शब्द तथा अर्थ — बहुव्यापी, समास, अलङ्कार, उपमा र उपमेयको विवेचन", hours: 3 },
            { slug: "rashtriya-bhasha-niti", title: "राष्ट्रिय भाषा नीति — नेपाली भाषाको ऐतिहासिक विकास र वर्तमान सन्दर्भ", hours: 3 },
          ],
        },
        {
          id: "sahitya-adhyayan",
          title: "साहित्य अध्ययन",
          hours: 24,
          topics: [
            { slug: "nepali-sahitya-itihas", title: "नेपाली साहित्यको इतिहास — भक्तिकाल, रिति काल, आधुनिक कालको सारांश", hours: 7 },
            { slug: "mahakabi-devkota-analyse", title: "महाकवि लक्ष्मीप्रसाद देवकोटा — महाकाव्य 'मदनpyाखन' र अन्य रचनाहरूको विश्लेषण", hours: 6 },
            { slug: "socialist-poetry-study", title: "समाजवादी कविता — भीमनिधि त्रिvedi, मोहन राई, कृष्ण हरि पोखरेलको कविता", hours: 5 },
            { slug: "samajik-upanyas-evolution", title: "सामाजिक उपन्यास — नेपाली उपन्यास र नओबेलको विकासक्रम", hours: 3 },
            { slug: "lok-sahitya-tradition", title: "लोक साहित्य — लोकगाथा, लोकनाटक, लोकसरस्वती परम्पराको अध्ययन", hours: 3 },
          ],
        },
        {
          id: "lekhan-koushal",
          title: "लेखन कौशल",
          hours: 10,
          topics: [
            { slug: "nibandha-rachana-kala", title: "निबन्ध रचना कला — विचारपूर्र्ण निबन्ध, तर्कसंगत लेखन, शैलीगत भिन्नता", hours: 4 },
            { slug: "patra-lekhan-adhikarik", title: "पत्र लेखन — आधिकारिक र अनौपचारिक पत्रको ढाँचा र शैली", hours: 3 },
            { slug: "prayojanatmak-lekhan", title: "प्रयोजनान्मुख्य लेखन — आवदेन, सम्बोधन, धन्यवाद ज्ञापन", hours: 3 },
          ],
        },
        {
          id: "sanskriti-tatha-samaj",
          title: "सङ्सकृति र सामाज",
          hours: 6,
          topics: [
            { slug: "nepali-sanskriti-parmpara", title: "नेपाली सङ्सकृति र परम्परा — जातपात, रीतिरिवाज, सामाजिक संरचना", hours: 3 },
            { slug: "sahitya-samaj-sandarb", title: "साहित्य र सामाज सन्दर्भ — साहित्यमा सामाजिक वास्तविकताको प्रतिनिधित्व", hours: 3 },
          ],
        },
      ],
    },
    {
      year: 2081,
      bsYear: "2081 BS",
      isLatest: true,
      notes: "Revised per NCF 2076 amendments. Added Janajati literature focus, strengthened critical analysis units, and incorporated contemporary Nepali literary trends post-2076. Source: esikhcha.com HSEB syllabus and model question patterns.",
      units: [
        {
          id: "bhasha-tatha-vyakaran",
          title: "भ्ाषा र व्य्करण",
          hours: 16,
          topics: [
            { slug: "abadhan-kosh-charcha", title: "अबाधन कोश — शब्दकोश प्रयोग, विस्तृत अर्थ, प्रयोग र उद्धृत उदाहरणहरूको चर्ना", hours: 5 },
            { slug: "vakya-sanrachana-prayog", title: "वाक्य संरचना प्रयोग — सरल, मिलन र संकूल वाक्य; शुद्ध वाक्य निर्माण", hours: 5 },
            { slug: "shabd-artha-alankar", title: "शब्द तथा अर्थ — बहुव्यापी, समास, अलङ्कार, उपमा र उपमेयको विवेचन", hours: 3 },
            { slug: "rashtriya-bhasha-niti", title: "राष्ट्रिय भाषा नीति — नेपाली भाषाको ऐतिहासिक विकास र वर्तमान सन्दर्भ", hours: 3 },
          ],
        },
        {
          id: "sahitya-adhyayan",
          title: "साहित्य अध्ययन",
          hours: 26,
          topics: [
            { slug: "nepali-sahitya-itihas", title: "नेपाली साहित्यको इतिहास — भक्तिकाल, रिति काल, आधुनिक कालको सारांश", hours: 7 },
            { slug: "mahakabi-devkota-analyse", title: "महाकवि लक्ष्मीप्रसाद देवकोटा — महाकाव्य 'मदनpyाखन' र अन्य रचनाहरूको विश्लेषण", hours: 6 },
            { slug: "socialist-poetry-study", title: "समाजवादी कविता — भीमनिधि त्रिvedi, मोहन राई, कृष्ण हरि पोखरेलको कविता", hours: 5 },
            { slug: "samajik-upanyas-evolution", title: "सामाजिक उपन्यास — नेपाली उपन्यास र नओबेलको विकासक्रम", hours: 3 },
            { slug: "lok-sahitya-tradition", title: "लोक साहित्य — लोकगाथा, लोकनाटक, लोकसरस्वती परम्पराको अध्ययन", hours: 3 },
            { slug: "janajati-sahitya-representation", title: "जातिजातीय साहित्य — नेपालका आदिवासी जनजातीय साहित्यको योगदान र प्रतिनिधित्व", hours: 2, addedInYear: 2081 },
          ],
        },
        {
          id: "lekhan-koushal",
          title: "लेखन कौशल",
          hours: 10,
          topics: [
            { slug: "nibandha-rachana-kala", title: "निबन्ध रचना कला — विचारपूर्र्ण निबन्ध, तर्कसंगत लेखन, शैलीगत भिन्नता", hours: 4 },
            { slug: "patra-lekhan-adhikarik", title: "पत्र लेखन — आधिकारिक र अनौपचारिक पत्रको ढाँचा र शैली", hours: 3 },
            { slug: "prayojanatmak-lekhan", title: "प्रयोजनान्मुख्य लेखन — आवदेन, सम्बोधन, धन्यवाद ज्ञापन", hours: 3 },
          ],
        },
        {
          id: "sanskriti-tatha-samaj",
          title: "सङ्सकृति र सामाज",
          hours: 8,
          topics: [
            { slug: "nepali-sanskriti-parmpara", title: "नेपाली सङ्सकृति र परम्परा — जातपात, रीतिरिवाज, सामाजिक संरचना", hours: 4 },
            { slug: "sahitya-samaj-sandarb", title: "साहित्य र सामाज सन्दर्भ — साहित्यमा सामाजिक वास्तविकताको प्रतिनिधित्व", hours: 4 },
          ],
        },
      ],
    },
  ],
};

export type NepaliDataMap = {
  "class-11-notes": SubjectNepaliData;
  "class-12-notes": SubjectNepaliData;
};

export const NEPALI_DATA_MAP: NepaliDataMap = {
  "class-11-notes": NEPALI_11_DATA,
  "class-12-notes": NEPALI_12_DATA,
};
