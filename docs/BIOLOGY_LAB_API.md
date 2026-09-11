# Biology Lab API Contract

## Endpoints

### GET /api/biology/labs
Returns all biology lab components with metadata.

**Response:**
```json
{
  "labs": [
    {
      "id": "bio-biomolecules-3d",
      "title": "Biomolecules 3D",
      "unit": "Unit 1: Biomolecules & Cell Biology",
      "type": "3d",
      "status": "active",
      "topics": ["carbohydrates", "proteins", "lipids", "nucleic acids", "enzymes", "water", "minerals"]
    }
  ],
  "total": 19,
  "units": [
    { "id": "unit1", "title": "Biomolecules & Cell Biology", "labCount": 3 },
    { "id": "unit2", "title": "Floral Diversity", "labCount": 1 },
    { "id": "unit3", "title": "Introductory Microbiology", "labCount": 1 },
    { "id": "unit4", "title": "Ecology", "labCount": 1 },
    { "id": "unit5", "title": "Vegetation", "labCount": 1 },
    { "id": "unit6", "title": "Introduction to Biology", "labCount": 1 },
    { "id": "unit7", "title": "Evolutionary Biology", "labCount": 1 },
    { "id": "unit8", "title": "Faunal Diversity", "labCount": 1 },
    { "id": "unit9", "title": "Biota & Environment", "labCount": 1 },
    { "id": "unit10", "title": "Conservation Biology", "labCount": 1 }
  ]
}
```

### GET /api/biology/labs/:id
Returns details for a single lab.

**Response:**
```json
{
  "id": "bio-cell-3d",
  "title": "Cell Ultrastructure 3D",
  "description": "NEB XI Unit 1 — 11 organelles with labelled SVG diagrams",
  "unit": "Unit 1: Biomolecules & Cell Biology",
  "type": "3d",
  "status": "active",
  "components": [
    { "id": "overview", "label": "Cell Overview" },
    { "id": "membrane", "label": "Cell Membrane" },
    { "id": "nucleus", "label": "Nucleus" },
    { "id": "mitochondria", "label": "Mitochondria" },
    { "id": "chloroplast", "label": "Chloroplast" },
    { "id": "er", "label": "Endoplasmic Reticulum" },
    { "id": "golgi", "label": "Golgi Bodies" },
    { "id": "ribosome", "label": "Ribosomes" },
    { "id": "lysosome", "label": "Lysosomes" },
    { "id": "wall", "label": "Cell Wall" },
    { "id": "cilia", "label": "Cilia & Flagella" }
  ],
  "syllabusTopics": [
    "Detail structure of eukaryotic cells: cell wall, cell membrane, mitochondria, plastids...",
    "Cell division: Concept of cell cycle, types of cell division..."
  ]
}
```

### POST /api/biology/labs/:id/progress
Records lab completion progress.

**Request:**
```json
{
  "userId": "supabase-user-uuid",
  "labId": "bio-biomolecules-3d",
  "progress": {
    "tabsViewed": ["carbs", "proteins", "lipids"],
    "timeSpent": 320,
    "completed": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "creditsEarned": 50,
  "streak": 3
}
```

### GET /api/biology/labs/:id/theory
Returns theory content for a lab (synthesized from theory-panel data).

**Response:**
```json
{
  "labId": "bio-biomolecules-3d",
  "theory": {
    "title": "Biomolecules",
    "unit": "Unit 1",
    "sections": [
      {
        "heading": "1. Carbohydrates",
        "content": "Carbohydrates are organic compounds...",
        "formula": "(CH₂O)ₙ",
        "keyPoints": ["General formula Cₙ(H₂O)ₙ", "Mono/di/polysaccharides"]
      }
    ],
    "practiceQuestions": [
      "Differentiate between starch and cellulose.",
      "Draw the structure of a triglyceride."
    ]
  }
}
```

### GET /api/biology/syllabus
Returns the full NEB XI biology syllabus with lab mappings.

**Response:**
```json
{
  "class": "Class 11",
  "subject": "Biology",
  "units": [
    {
      "id": "biomolecules-and-cell-biology",
      "title": "Biomolecules and Cell Biology",
      "hours": 15,
      "topics": ["Biomolecules...", "Cell: Introduction...", "Detail structure..."],
      "labs": ["bio-biomolecules-3d", "bio-cell-3d", "bio-cell-division-3d"]
    }
  ]
}
```

## Error Responses
All endpoints return standard error format:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```
