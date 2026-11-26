package com.ravikisan.platform.compose.ui.screens.social.local

import com.ravikisan.platform.compose.ui.screens.social.CommunityPost

/**
 * Local fake community feed (Agent 4 task 7). Read-only demo content; posting
 * and replies arrive with the real API (Agent 2's `/api/community` reuse).
 */
object FakeCommunity {

    val posts: List<CommunityPost> = listOf(
        CommunityPost(
            id = "p1",
            author = "Aarav",
            body = "Anyone else finding rotational dynamics tougher than kinematics? The moment of " +
                "inertia derivations in unit 1 are rough. Any shortcut for the standard results?",
            subjectTag = "Physics · Class 12",
            timeAgo = "12 min ago",
            likes = 14,
            replies = 6,
        ),
        CommunityPost(
            id = "p2",
            author = "Sneha",
            body = "Tip: for the biomolecules unit, make one table with all the test reactions " +
                "(Benedict, Biuret, iodine) — it saved me before the unit test.",
            subjectTag = "Biology · Class 11",
            timeAgo = "1 h ago",
            likes = 32,
            replies = 11,
        ),
        CommunityPost(
            id = "p3",
            author = "Bikash",
            body = "Does the 2078 curriculum still include the vegetation unit for Botany? My " +
                "teacher skipped it but the syllabus lists it.",
            subjectTag = "Biology · Class 11",
            timeAgo = "3 h ago",
            likes = 7,
            replies = 4,
        ),
        CommunityPost(
            id = "p4",
            author = "Prakriti",
            body = "Volumetric analysis numericals: always balance the equation first, then convert " +
                "molarity to normality. Half my mistakes were unit slips.",
            subjectTag = "Chemistry · Class 12",
            timeAgo = "5 h ago",
            likes = 21,
            replies = 3,
        ),
        CommunityPost(
            id = "p5",
            author = "Nischal",
            body = "Study group for vectors this Saturday? We're covering scalar and vector products " +
                "with past-paper questions.",
            subjectTag = "Physics · Class 11",
            timeAgo = "yesterday",
            likes = 9,
            replies = 8,
        ),
    )
}
