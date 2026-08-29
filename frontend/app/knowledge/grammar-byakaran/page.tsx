import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

const TOPICS = [
  {
    title: "शब्द (Shabd)",
    items: [
      "शब्दको परिचय र परिभाषा",
      "शब्दका भागहरू: परु, मूल, उपसर्ग, प्रत्यय",
      "परु शब्द (प्राकृतिक + व्युत्पन्न)",
      "तत्सम, तद्भव, देशज, विदेशज, प्रतिशब्द",
    ],
  },
  {
    title: "वाक्य (Vakya)",
    items: [
      "वाक्यको परिचय र प्रकार",
      "सरल, संयोजक, जटिल वाक्य",
      "वाक्यका अंशहरू:कर्ता, क्रिया, कर्म, विस्तारक",
      "व्याकरणिक सम्बन्ध (कारक)",
    ],
  },
  {
    title: "मुख्य पद (Mukhya Pad)",
    items: [
      "नाम (Names): पुरुष, वचन, लिङ्ग, विभक्ति",
      "सर्वनाम (Pronouns): व्यक्ति, सर्वनामका प्रकार",
      "विशेषण (Adjectives): गुण, संख्या, सर्वनामी",
      "क्रिया (Verbs): कारक, काल, पुरुष, वचन",
    ],
  },
  {
    title: "लिङ्ग (Ling)",
    items: [
      "लिङ्गको परिचय",
      "सङ्गीत लिङ्ग (Masculine) र स्त्रीलिङ्ग (Feminine)",
      "लिङ्ग बदल्ने नियमहरू",
      "उदाहरण सहितको अभ्यास",
    ],
  },
  {
    title: "वचन (Vachan)",
    items: [
      "एकवचन र बहुवचन",
      "वचन बदल्ने नियमहरू",
      "अनिश्चित बहुवचन र निश्चित बहुवचन",
      "वचन शिक्षा सम्बन्धी प्रश्नहरू",
    ],
  },
  {
    title: "काल (Kaal)",
    items: [
      "कालको परिचय: वर्तमान, भूत, भविष्य",
      "साधारण, सतत, पूर्ण, समाप्त काल",
      "काल चिन्हहरू (Ti, thyo, chu, ne)",
      "उदाहरण सहितको व्याकरण",
    ],
  },
  {
    title: "कारक (Karak)",
    items: [
      "कारकको परिचय (७ वटा कारक)",
      "कर्ता कारक (-ले, -लेर)",
      "कर्म कारक (- लाई, - बाट)",
      "करण, अपादान, सम्प्रदान, अधिकरण, सम्बन्ध कारक",
    ],
  },
  {
    title: "सन्धि (Sandhi)",
    items: [
      "स्वर सन्धि",
      "व्यञ्जन सन्धि",
      "विसर्ग सन्धि",
      "आदर सन्धि र विशेष सन्धि",
    ],
  },
  {
    title: "समास (Samas)",
    items: [
      "समासको परिचय",
      "द्वन्द्व समास",
      "तत्पुरुष समास",
      "बहूव्रीहि, अव्यायीभाव, कर्मधारय समास",
    ],
  },
  {
    title: "शब्द परिवर्तन",
    items: [
      "पुंलिङ्गबाट स्त्रीलिङ्ग",
      "एकवचनबाट बहुवचन",
      "विशेषणको कोटि (गुणवाचक, संख्यावाचक, सर्वनामी)",
      "क्रियाको रूप परिवर्तन",
    ],
  },
];

const EXAMPLE_SENTENCES = [
  { sentence: "रामले किताब पढ्छ।", analysis: "कर्ता: राम (ले), क्रिया: पढ्छ, कर्म: किताब" },
  { sentence: "विद्यालयमा विद्यार्थीहरूले खेल्छन्।", analysis: "अधिकरण: विद्यालयमा, कर्ता: विद्यार्थीहरू (ले), क्रिया: खेल्छन्" },
  { sentence: "उनी किताब पढिरहेका छन्।", analysis: "सतत वर्तमान काल — प्रत्यय: -इरहेका छन्" },
  { sentence: "मलाई पुस्तक चाहिएको छ।", analysis: "सम्प्रदान कारक: मलाई, क्रिया: चाहिएको छ" },
];

export default function GrammarByakaranPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 py-6 md:py-10 px-4">
      <Link href="/knowledge" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="h-4 w-4" />
        Back to Knowledge
      </Link>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-amber-600" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Grammar & Byakaran</h1>
          <p className="text-xs text-muted-foreground">Nepali व्याकरण — NEB Class 11 & 12</p>
        </div>
      </div>

      <div className="space-y-3">
        {TOPICS.map((topic, i) => (
          <details key={i} className="rounded-xl border border-border bg-card overflow-hidden group">
            <summary className="flex items-center justify-between px-5 py-4 cursor-pointer hover:bg-muted/50 transition-colors list-none">
              <span className="font-semibold text-sm">{topic.title}</span>
              <span className="text-muted-foreground text-xs group-open:hidden">▼</span>
              <span className="text-muted-foreground text-xs group-open:block hidden">▲</span>
            </summary>
            <div className="border-t border-border px-5 py-3 space-y-1.5">
              {topic.items.map((item, j) => (
                <div key={j} className="flex items-start gap-2">
                  <span className="text-amber-500 mt-1 text-xs">●</span>
                  <p className="text-xs text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-5 space-y-3">
        <h2 className="font-semibold text-sm text-foreground">वाक्य विश्लेषण (Sentence Analysis)</h2>
        {EXAMPLE_SENTENCES.map((ex, i) => (
          <div key={i} className="border-l-2 border-amber-300 pl-4 py-1">
            <p className="text-sm font-medium text-foreground">{ex.sentence}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{ex.analysis}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
