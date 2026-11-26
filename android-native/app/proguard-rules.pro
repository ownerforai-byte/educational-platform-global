# android-native ProGuard/R8 rules.
# Release builds run R8 (isMinifyEnabled=true) — these rules keep the
# reflection-driven stacks alive. Shrinking class/method names is itself a
# hardening win: it raises the cost of static analysis of the APK.

# ── kotlinx.serialization ─────────────────────────────────────────────────
# Serializers are looked up reflectively from the companion; keep names.
-keepattributes *Annotation*, InnerClasses
-dontnote kotlinx.serialization.AnnotationsKt
-keepclassmembers class kotlinx.serialization.json.** { *** Companion; }
-keepclasseswithmembers class com.ravikisan.platform.compose.core.contract.** {
    kotlinx.serialization.KSerializer serializer(...);
}
-keep,includedescriptorclasses class com.ravikisan.platform.compose.core.contract.**$$serializer { *; }

# ── Retrofit ──────────────────────────────────────────────────────────────
-keepattributes Signature, Exceptions
-keepclassmembers,allowshrinking,allowobfuscation interface com.ravikisan.platform.compose.data.api.RnApi {
    <methods>;
}
-dontwarn okhttp3.internal.platform.**
-dontwarn org.codehaus.mojo.animal_sniffer.*
# Retrofit interface methods invoked via reflection against generic signatures.
-keep,allowobfuscation,allowshrinking interface retrofit2.Call
-keep,allowobfuscation,allowshrinking class retrofit2.Response
-keep,allowobfuscation,allowshrinking class kotlin.coroutines.Continuation

# ── Room ──────────────────────────────────────────────────────────────────
-keep class * extends androidx.room.RoomDatabase { <init>(); }
-keepclassmembers class * extends androidx.room.RoomDatabase { <init>(); }

# ── Hilt / Dagger ─────────────────────────────────────────────────────────
# Worker/entry points kept by their own consumer rules; nothing extra needed.

# ── Firebase (consumer rules ship with the SDKs; silence harmless warnings)
-dontwarn com.google.firebase.**
