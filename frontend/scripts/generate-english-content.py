#!/usr/bin/env python3
"""Generate English content for NEB Class 11 syllabus topics."""
import json
import os
from pathlib import Path

# Content templates organized by unit and topic
ENGLISH_CONTENT = {
    "language-development": {
        "Unit 1 — Education and Humanity": {
            "notes": [
                "### 1. Meaning of Education",
                "Education is the systematic process of facilitating learning, acquiring knowledge, skills, values, and habits. It is not merely schooling but a lifelong journey of personal and social development.",
                "### 2. Types of Education",
                "- **Formal Education**: Structured, curriculum-based learning in schools, colleges, and universities.",
                "- **Non-Formal Education**: Organized learning outside the formal system (adult education, vocational training).",
                "- **Informal Education**: Lifelong learning from family, peers, media, and life experiences.",
                "### 3. Education and Humanity",
                "True education must nurture humanity — empathy, ethical reasoning, and social responsibility. When education becomes purely job-oriented, it risks producing skilled but morally empty individuals.",
                "### 4. Goals of Education",
                "- Intellectual: Developing critical thinking and creativity",
                "- Moral: Building character and ethical judgment",
                "- Social: Fostering cooperation and civic responsibility",
                "- Economic: Preparing for productive employment",
                "### 5. Education in Nepal",
                "Nepal's education system has evolved from traditional gurushekha to modern schooling. The National Education Plan 2019 emphasizes inclusive, equitable, and quality education for all.",
                "### 6. Entrance Exam Focus",
                "Common MCQs: Define education; Difference between formal and informal education; Role of education in nation-building.",
            ],
            "confusion": [
                "❌ Education = Schooling. ✅ Education is broader — it includes life experiences.",
                "❌ Only formal education matters. ✅ Informal learning shapes attitudes and values.",
            ],
            "practice": [
                "Define education and explain its types with examples.",
                "How does education contribute to humanity? Discuss.",
                "What are the goals of education in a democratic society?",
            ],
            "formulas": [],
        },
        "Unit 2 — Communication": {
            "notes": [
                "### 1. What is Communication?",
                "Communication is the exchange of information, ideas, feelings, and meaning between two or more people through symbols, signs, or behavior.",
                "### 2. Elements of Communication",
                "- **Sender**: The person who initiates the message",
                "- **Message**: The content being communicated",
                "- **Channel/Medium**: The method of transmission (verbal, written, digital)",
                "- **Receiver**: The person who gets the message",
                "- **Feedback**: The response from the receiver",
                "- **Noise**: Any interference that distorts the message",
                "### 3. Types of Communication",
                "- **Verbal**: Spoken or written words",
                "- **Non-verbal**: Body language, gestures, facial expressions",
                "- **Visual**: Images, graphs, symbols",
                "- **Active Listening**: Fully concentrating on what is being said",
                "### 4. Communication Barriers",
                "Physical (distance, noise), Psychological (prejudice, emotion), Semantic (language differences), Cultural (norms, values).",
                "### 5. Effective Communication Skills",
                "Clarity, conciseness, correctness, courtesy, and confidence are the 5 Cs of effective communication.",
                "### 6. Entrance Exam Focus",
                "MCQs: Identify elements of communication; Differentiate verbal and non-verbal; List barriers to communication.",
            ],
            "confusion": [
                "❌ Communication is only talking. ✅ It includes listening, observing, and interpreting.",
                "❌ More words = better communication. ✅ Clarity and conciseness matter more.",
            ],
            "practice": [
                "Explain the elements of communication with a diagram.",
                "What are the barriers to effective communication? How can they be overcome?",
                "Differentiate between verbal and non-verbal communication.",
            ],
            "formulas": [],
        },
        "Unit 3 — Media and Society": {
            "notes": [
                "### 1. Media: Definition and Types",
                "Media refers to the channels through which news, entertainment, education, and opinion are delivered. Types: Print (newspapers, magazines), Broadcast (TV, radio), Digital (social media, websites).",
                "### 2. Role of Media in Society",
                "- Informing the public about current events",
                "- Educating and raising awareness",
                "- Providing entertainment",
                "- Acting as a watchdog over government",
                "- Shaping public opinion and culture",
                "### 3. Media Ethics",
                "Accuracy, fairness, independence, accountability, and minimizing harm are core principles of media ethics.",
                "### 4. Impact of Social Media",
                "Social media has democratized information but also spread misinformation. Critical media literacy is essential.",
                "### 5. Media in Nepal",
                "Nepal has a vibrant press with newspapers like Kailash, Online Khabar, and Gandaki. Radio and TV remain dominant in rural areas.",
                "### 6. Entrance Exam Focus",
                "MCQs: Functions of media; Difference between traditional and new media; Role of media in democracy.",
            ],
            "confusion": [
                "❌ Media only entertains. ✅ Media informs, educates, and holds power accountable.",
                "❌ Social media is always reliable. ✅ Verification and media literacy are crucial.",
            ],
            "practice": [
                "Discuss the role of media in a democratic society.",
                "What are the challenges of social media in modern society?",
                "How can media literacy help combat misinformation?",
            ],
            "formulas": [],
        },
    },
    "reading-and-comprehension": {
        "Short Story 1 — The Selfish Giant (Oscar Wilde)": {
            "notes": [
                "### 1. Summary",
                "The Selfish Giant is a tale about a giant who builds a wall around his beautiful garden, keeping children out. As a result, winter perpetually reigns in his garden. When the giant finally lets the children back in, spring returns. Through the story, Wilde explores themes of selfishness, redemption, and the transformative power of love and compassion.",
                "### 2. Characters",
                "- **The Giant**: Initially selfish, later becomes kind and selfless",
                "- **The Children**: Symbolize innocence, joy, and renewal",
                "- **The Little Boy**: Represents Christ-like figure; his tears bring spring back",
                "### 3. Themes",
                "- **Selfishness vs. Generosity**: The giant's transformation shows that sharing brings happiness",
                "- **Redemption**: Anyone can change and find salvation through love",
                "- **Nature and Morality**: The garden's seasons reflect the giant's moral state",
                "- **Childhood Innocence**: Children represent purity and spiritual wisdom",
                "### 4. Key Symbols",
                "- **The Wall**: Separation, ego, and isolation",
                "- **Winter**: Coldness of selfishness; **Spring**: Warmth of compassion",
                "- **The Rose Tree**: Never blossoms for the giant until the little boy returns",
                "- **The Little Boy**: Symbol of divine love and Christ",
                "### 5. Moral of the Story",
                "True happiness comes from sharing and loving others. Selfishness leads to isolation and spiritual winter.",
                "### 6. Entrance Exam Focus",
                "MCQs: Who built the wall? What did the children represent? Why did winter come? Short answers: Theme of redemption; Symbolism of the garden.",
            ],
            "confusion": [
                "❌ The giant was always kind. ✅ He was selfish at first, then transformed.",
                "❌ The story is just about a garden. ✅ It's a spiritual allegory about love and redemption.",
            ],
            "practice": [
                "Summarize 'The Selfish Giant' in 100 words.",
                "What is the symbolism of winter and spring in the story?",
                "How does the giant change throughout the story?",
                "Discuss the theme of redemption in 'The Selfish Giant'.",
            ],
            "formulas": [],
        },
        "Short Story 2 — The Oval Portrait (Edgar Allan Poe)": {
            "notes": [
                "### 1. Summary",
                "The Oval Portrait is a framed story within a story. A narrator lies ill in an abandoned chateau in the Apennines. He finds an oval portrait of a young woman and reads a note explaining that it was painted by a young artist who loved his bride deeply. Consumed by his art, he neglected her, and as he painted, she slowly grew pale and died — her life force transferring into the portrait.",
                "### 2. Narrative Structure",
                "- **Frame narrative**: Story within a story",
                "- **First-person narrator**: Provides objective observation",
                "- **Artistic description**: The painter's account is embedded",
                "### 3. Themes",
                "- **Art vs. Life**: Art can consume and destroy life",
                "- **Destructive Passion**: Obsessive love becomes self-destructive",
                "- **Beauty and Death**: Beauty is transient; death gives permanence",
                "- **The Artist's Sacrifice**: Creating art requires sacrifice",
                "### 4. Gothic Elements",
                "- Setting: Isolated chateau, stormy weather, shadows",
                "- Mood: Melancholy, supernatural undertones",
                "- Theme: Death and art intertwine",
                "- Symbolism: The oval frame represents life's fragility",
                "### 5. Literary Devices",
                "- **Foreshadowing**: Early hints of the tragic ending",
                "- **Symbolism**: The painting as a vessel of life force",
                "- **Irony**: The artist's greatest work costs his wife's life",
                "### 6. Entrance Exam Focus",
                "MCQs: Who painted the portrait? Where was the story set? Short answers: Theme of art vs. life; Gothic elements; Symbolism of the oval frame.",
            ],
            "confusion": [
                "❌ The wife died naturally. ✅ Her life force was absorbed by the painting.",
                "❌ The artist loved his wife. ✅ His obsession with art consumed him.",
            ],
            "practice": [
                "Summarize 'The Oval Portrait' in 100 words.",
                "What are the Gothic elements in Poe's story?",
                "Discuss the theme of art versus life.",
                "Explain the symbolism of the oval frame.",
            ],
            "formulas": [],
        },
    },
    "writing-and-composition": {
        "Essay Writing": {
            "notes": [
                "### 1. Types of Essays",
                "- **Narrative**: Tells a story with a sequence of events",
                "- **Descriptive**: Paints a picture with words",
                "- **Expository**: Explains or informs objectively",
                "- **Argumentative**: Presents a claim with evidence",
                "- **Persuasive**: Convinces the reader to accept a viewpoint",
                "### 2. Essay Structure",
                "- **Introduction**: Hook + thesis statement",
                "- **Body Paragraphs**: Topic sentence + evidence + analysis",
                "- **Conclusion**: Restate thesis + summary + final thought",
                "### 3. Argumentative Essay Tips",
                "State a clear thesis, use credible evidence, address counterarguments, and conclude forcefully.",
                "### 4. Descriptive Essay Tips",
                "Use sensory details (sight, sound, smell, touch, taste). Show, don't tell.",
                "### 5. Common Essay Topics",
                "Education, Technology, Environment, Globalization, Youth Role, Health, Corruption, Tourism in Nepal.",
                "### 6. Entrance Exam Focus",
                "Write an essay on any one: 'Technology has made life easier' / 'Environmental protection is our duty'. Structure: 5-7 paragraphs, 250-300 words.",
            ],
            "confusion": [
                "❌ Argumentative = personal opinion. ✅ Must be backed by evidence and logic.",
                "❌ Descriptive = listing facts. ✅ Should engage all five senses.",
            ],
            "practice": [
                "Write an argumentative essay on 'Is technology beneficial or harmful?'",
                "Describe your favorite place using sensory details.",
                "Write an expository essay on 'The importance of education'.",
            ],
            "formulas": [],
        },
        "Letter Writing": {
            "notes": [
                "### 1. Formal Letter Format",
                "Sender's address → Date → Receiver's address → Subject → Salutation (Sir/Madam) → Body → Closing (Yours faithfully) → Signature",
                "### 2. Informal Letter Format",
                "Date → Salutation (Dear Name) → Opening → Body → Closing (Love/Yours) → Signature",
                "### 3. Formal Letter Types",
                "- **Application**: For jobs, admissions, leaves",
                "- **Complaint**: About products, services, conditions",
                "- **Inquiry**: Asking for information",
                "- **Editor's Letter**: Expressing opinion on public issues",
                "### 4. Informal Letter Types",
                "- **Friendly letter**: Catching up with friends/family",
                "- **Thank you letter**: Expressing gratitude",
                "- **Congratulatory letter**: Celebrating achievements",
                "### 5. Email Writing",
                "Subject line must be clear and concise. Use formal tone for professional emails. Keep paragraphs short.",
                "### 6. Entrance Exam Focus",
                "Write a formal letter to the editor about pollution in Kathmandu. Write an application for a scholarship.",
            ],
            "confusion": [
                "❌ Formal letters need 'Dear Sir' without name. ✅ Use 'Dear Sir/Madam' if name unknown.",
                "❌ Emails are informal. ✅ Professional emails require formal tone.",
            ],
            "practice": [
                "Write a formal letter to the editor complaining about poor road conditions.",
                "Write an application for a scholarship to the principal.",
                "Write an email to a friend about your summer vacation plans.",
            ],
            "formulas": [],
        },
    },
}

def generate_slug(topic_title):
    """Convert topic title to slug."""
    import re
    slug = topic_title.lower().strip()
    slug = re.sub(r'[^a-z0-9\s-]', '', slug)
    slug = re.sub(r'\s+', '-', slug)
    slug = re.sub(r'-+', '-', slug).strip('-')
    return slug

def create_note_file(unit_slug, topic_title, content):
    """Create a note JSON file."""
    topic_slug = generate_slug(topic_title)
    note = {
        "title": topic_title,
        "unitSlug": unit_slug,
        "topicSlug": topic_slug,
        "topicTitle": topic_title,
        "relevance": 100,
        "notes": content["notes"],
        "confusion": content.get("confusion", []),
        "practice": content.get("practice", []),
        "formulas": content.get("formulas", []),
    }
    return note

def main():
    base_dir = Path("public/data/syllabus-notes/english")
    generated = 0

    for unit_slug, units in ENGLISH_CONTENT.items():
        unit_dir = base_dir / unit_slug
        unit_dir.mkdir(parents=True, exist_ok=True)

        for topic_title, content in units.items():
            note = create_note_file(unit_slug, topic_title, content)
            file_path = unit_dir / f"{generated+1:02d}-{generate_slug(topic_title)}.json"
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(note, f, indent=2, ensure_ascii=False)
            generated += 1
            print(f"Created: {file_path}")

    print(f"\nTotal files generated: {generated}")

if __name__ == "__main__":
    main()
