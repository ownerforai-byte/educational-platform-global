package com.ravikisan.platform.compose.core.contract

import kotlinx.serialization.Serializable

// ── Thin Surfaces DTOs ──────────────────────────────────────────────────────

@Serializable
data class AnnouncementItem(
    val date: String,
    val tag: String,
    val title: String,
    val body: String,
)

@Serializable
data class AnnouncementsData(val items: List<AnnouncementItem>)

@Serializable
data class AnnouncementsResponse(val ok: Boolean, val data: AnnouncementsData)

@Serializable
data class ChangelogEntry(
    val version: String,
    val date: String,
    val type: String,
    val entries: List<String>,
)

@Serializable
data class ChangelogData(val items: List<ChangelogEntry>)

@Serializable
data class ChangelogResponse(val ok: Boolean, val data: ChangelogData)

@Serializable
data class NoticeItem(
    val title: String,
    val body: String,
    val date: String,
    val source: String,
    val sourceUrl: String,
)

@Serializable
data class NoticeData(val items: List<NoticeItem>)

@Serializable
data class NoticeResponse(val ok: Boolean, val data: NoticeData)

@Serializable
data class ExamSubjectCountdown(
    val slug: String,
    val name: String,
    val examDateAd: String,
    val examDateBs: String,
    val daysLeft: Int,
)

@Serializable
data class ExamCountdownData(val subjects: List<ExamSubjectCountdown>)

@Serializable
data class ExamCountdownResponse(val ok: Boolean, val data: ExamCountdownData)

@Serializable
data class FeedbackCategory(
    val icon: String,
    val title: String,
    val description: String,
)

@Serializable
data class FeedbackData(
    val categories: List<FeedbackCategory>,
    val contactUrl: String,
)

@Serializable
data class FeedbackResponse(val ok: Boolean, val data: FeedbackData)

@Serializable
data class PlatformStatusService(
    val api: String,
    val ai: String,
    val content: String,
)

@Serializable
data class PlatformStatusData(
    val status: String,
    val timestamp: String,
    val commit: String? = null,
    val services: PlatformStatusService,
)

@Serializable
data class PlatformStatusResponse(val ok: Boolean, val data: PlatformStatusData)

@Serializable
data class ReferralsData(
    val title: String,
    val description: String,
    val enabled: Boolean,
    val rewardDescription: String,
)

@Serializable
data class ReferralsResponse(val ok: Boolean, val data: ReferralsData)

@Serializable
data class SiteIndexItem(val title: String, val href: String)

@Serializable
data class SiteIndexSection(val name: String, val items: List<SiteIndexItem>)

@Serializable
data class SiteIndexData(val sections: List<SiteIndexSection>)

@Serializable
data class SiteIndexResponse(val ok: Boolean, val data: SiteIndexData)

@Serializable
data class CurriculumLevel(
    val slug: String,
    val name: String,
    val description: String,
    val subjectCount: Int,
)

@Serializable
data class LevelsData(val levels: List<CurriculumLevel>)

@Serializable
data class LevelsResponse(val ok: Boolean, val data: LevelsData)

// ── Knowledge / GK DTOs ─────────────────────────────────────────────────────

@Serializable
data class KnowledgeTopic(
    val id: String,
    val title: String,
    val points: List<String>,
)

@Serializable
data class KnowledgeNote(
    val topicId: String,
    val title: String,
    val summary: String,
    val facts: List<String>,
)

@Serializable
data class KnowledgePracticeQuestion(
    val id: String,
    val question: String,
    val options: List<String>,
    val correctIndex: Int,
    val explanation: String,
)

@Serializable
data class KnowledgeSectionSummary(
    val slug: String,
    val name: String,
    val description: String,
    val basePath: String,
    val topicCount: Int,
)

@Serializable
data class KnowledgeSectionFull(
    val slug: String,
    val name: String,
    val description: String,
    val basePath: String,
    val topics: List<KnowledgeTopic>,
    val notes: List<KnowledgeNote> = emptyList(),
    val practice: List<KnowledgePracticeQuestion> = emptyList(),
)

@Serializable
data class KnowledgeHubData(val sections: List<KnowledgeSectionSummary>)

@Serializable
data class KnowledgeHubResponse(val ok: Boolean, val data: KnowledgeHubData)

@Serializable
data class KnowledgeSectionResponse(val ok: Boolean, val data: KnowledgeSectionFull)
