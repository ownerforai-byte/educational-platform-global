# TokenKit packed context for: backend/src/ai
files: 28   raw-est: 112695   packed-est: 1692
savings: 98%

## backend/src/ai/academic-figures.ts
imports: (none)
exports: FigureKind, FigureArchetype, FIGURE_ARCHETYPES, isVectorFigureKind, classifyFigureKind, FIGURE_ARCHETYPE_GUIDE, subjectOfFigure, buildFigureBrief, FIGURE_WRITER_SYSTEM, MAX_FIGURE_CHARS, MAX_FIGURE_ELEMENTS, ExtractedFigure, hasForbiddenFigureConstruct, ensureFigureViewBox, extractSvgFigure, cleanCaption, FigurePart, figureParts, captionForFigure

---
## backend/src/ai/academic-intelligence.ts
imports: (none)
exports: ACADEMIC_INTELLIGENCE_RULES, ACADEMIC_TAXONOMY_RULES, ACADEMIC_SEARCH_ADDENDUM, MASTER_ACADEMIC_RULES

---
## backend/src/ai/answer-guide.ts
imports: (none)
exports: ANSWER_GUIDE_RULES

---
## backend/src/ai/artifact-rules.ts
imports: (none)
exports: ARTIFACT_RULES

---
## backend/src/ai/book-ingest.ts
imports: (none)
exports: MIN_CHUNK_CHARS, DEFAULT_MAX_CHUNK_CHARS, BookRecord, ParsedBook, ScanReport, splitPdfPages, scanReport, findRunningHeads, cleanPage, Chapter, chapterHeading, detectChapters, chunkChapter, slugify, buildBookRecords, BookMeta, recordsFromChapters, recordFileName, MarkdownSection, splitMarkdownSections, markdownChapters, windowedChapters, decodeXmlEntities, docxXmlToText, paragraphsToPages

---
## backend/src/ai/class-scope.ts
imports: ./curriculum-corpus
exports: ScopeZone, ScopeClassification, DIRECTIVES, classifyScope, CLASS_SCOPE_RULES

---
## backend/src/ai/complete-answer.ts
imports: ./truncation, ./syllabus-anchor, ./service
exports: CompleteAnswerOptions, CompleteAnswerResult, completeAnswer

---
## backend/src/ai/config.ts
imports: (none)
exports: getAgnesKey, getGroqKey, getCerebrasKey, getGeminiKey, getCloudflareAiKey, getCloudflareAccountId, hasAnyLlmKey, AiWorkType, AI_WORK_LANES, SupportedProviderName, getWorkLaneKey, getWorkLaneProvider, isImageGenConfigured, getGoogleCseKey, getGoogleCseCx, isGoogleCseConfigured, SearchEngineKeys, getSearchEngineKeys, hasAnySearchEngine, describeAiKeyStatus

---
## backend/src/ai/curriculum-corpus.ts
imports: fs, path
exports: ClassLevel, CorpusSection, CorpusEntry, BOILERPLATE_MIN_RECORDS, MIN_TEACHABLE_CHARS, isTemplateFrame, normalizeLine, isBoilerplateLine, humanizeKey, detectClassLevel, classLevelFromDeclared, sectionsCharCount, loadClassIndex, classFromIndex, CorpusStats, loadCorpus, getCorpus, getCorpusStats, resetCorpusCache

---
## backend/src/ai/curriculum-retrieval.ts
imports: ./curriculum-corpus, motion, this word appears here
exports: tokenize, stem, idfOf, isContentToken, buildQueryTokens, CoverageGrade, CurriculumHit, containsToken, RetrievalResult, DEFAULT_RECORD_LIMIT, OWNER_SLOT_QUOTA, gradeStrength, selectHits, titleKey, retrieve, retrieveCurriculum, formatRecord, buildCurriculumContext, buildCurriculumContextFor, curriculumSummary, hasCurriculumCoverage, auditCurriculumCoverage

---
## backend/src/ai/deep-answer.ts
imports: ./academic-figures
exports: DEEP_ANSWER_RULES

---
## backend/src/ai/depth-regulation.ts
imports: one surface at a time
exports: InquiryMode, classifyInquiryMode, depthDirectiveForMode, DEPTH_REGULATION_RULES

---
## backend/src/ai/diagram-search.ts
imports: ./google-diagrams
exports: DiagramImage, DIAGRAM_LIMIT, DIAGRAM_TIMEOUT_MS, questionTerms, buildDiagramQuery, relevanceOf, plainText, parseCommonsImages, fetchDiagrams, diagramSearchEnabled, formatDiagramBlock, fetchDiagramContext

---
## backend/src/ai/figure-draw.ts
imports: ./academic-figures, ./service, ./config
exports: MAX_FIGURE_REQUEST_CHARS, figureGenEnabled, DrawnFigure, FigureChat, drawAcademicFigure

---
## backend/src/ai/google-diagrams.ts
imports: ./config
exports: GoogleDiagram, ParseGoogleImagesOptions, GOOGLE_DIAGRAM_LIMIT, GOOGLE_TIMEOUT_MS, googleDiagramsEnabled, buildGoogleImageQuery, googleRelevanceOf, hostOf, parseGoogleImages, fetchGoogleDiagrams, formatGoogleDiagramBlock

---
## backend/src/ai/history-search.ts
imports: ./curriculum-retrieval
exports: HistoryMessage, HistorySelection, historyTerms, scoreMessage, selectHistory, HISTORY_SEARCH_RULES, formatHistoryContext

---
## backend/src/ai/image-gen.ts
imports: ./academic-figures, ./config, ./figure-draw
exports: imageGenEnabled, FIGURE_FENCE, FigureSpec, GeneratedFigure, ReplyFigureResult, drawReplyFigure, enrichImagePrompt, generateVeerImage, FigureStreamFilter, resolveFiguresInText, FIGURE_TOOL_INSTRUCTION, SUBJECT_DIAGRAM_GUIDE, withFigureToolInstruction

---
## backend/src/ai/image-input.ts
imports: (none)
exports: MAX_CHAT_IMAGES, MAX_IMAGE_BYTES, MAX_TOTAL_IMAGE_CHARS, ParsedImage, parseDataUrl, SanitizeImagesResult, sanitizeChatImages, OpenAITextPart, OpenAIImagePart, toOpenAIContent, imageInstruction

---
## backend/src/ai/platform-guide-prompt.ts
imports: (none)
exports: PLATFORM_GUIDE_SYSTEM_PROMPT, PLATFORM_GUIDE_MAX_WORDS, PLATFORM_GUIDE_TARGET_WORDS, clampReplyWords

---
## backend/src/ai/profanity-guard.ts
imports: (none)
exports: ROUGH_REDFLAG_REPLY, RoughVerdict, detectRoughInput, ROUGH_INPUT_RULE

---
## backend/src/ai/prompts.ts
imports: ./search-engine, ./answer-guide, ./diagram-search, ./academic-intelligence, ./syllabus-anchor, ./curriculum-retrieval, ./class-scope, ./deep-answer, ./artifact-rules, ./reply-craft, ./source-registry, ./depth-regulation
exports: PROFESSOR_STYLE_RULES, MASTER_ACADEMIC_PROMPT, buildProfessorContext, withProfessorContext, ChatConsoleId, NEPALI_CONSOLE_RULES, GRAMMAR_CONSOLE_RULES, appendConsoleRules

---
## backend/src/ai/reply-craft.ts
imports: (none)
exports: REPLY_CRAFT_RULES

---
## backend/src/ai/search-engine.ts
imports: ./config
exports: WebSearchResult, WebSearchResponse, EngineName, selectProviders, WebSearchService, formatSearchContext, getSearchService

---
## backend/src/ai/service.ts
imports: ../db/supabase, ../config/env, ./search-engine, ./academic-intelligence, ./image-input, ./config
exports: MAX_OUTPUT_TOKENS, REPLY_TEMPERATURE, SupportedProvider, AIChatMessage, AISearchResult, AISearchResponse, AIService, createAIService

---
## backend/src/ai/source-classify.ts
imports: (none)
exports: SourceSink, SourceClass, classifySourceFile, UNKNOWN_SUBJECT, sinkFolder

---
## backend/src/ai/source-registry.ts
imports: (none)
exports: SourceKind, SourceDescriptor, SOURCE_REGISTRY, OFFICIAL_SOURCE_ALLOWLIST, SOURCE_REGISTRY_RULES, registrySummary

---
## backend/src/ai/syllabus-anchor.ts
imports: ../db/supabase
exports: SyllabusHit, QuestionDepth, REPLY_FLOOR_WORDS, DEPTH_FLOOR_WORDS, classifyQuestionDepth, floorWordsForQuestion, wordCount, meetsReplyFloor, buildSyllabusAnchorBlock, findSyllabusMatches, EXPANSION_REQUEST, EXPANSION_REQUEST_STRICT, FloorEnforcementResult, enforceReplyFloor

---
## backend/src/ai/truncation.ts
imports: (none)
exports: MAX_CONTINUATIONS, TruncationVerdict, detectTruncation, continuationRequest, joinContinued, describeVerdict
