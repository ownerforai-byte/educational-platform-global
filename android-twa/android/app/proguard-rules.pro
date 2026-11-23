# Release shrink + obfuscation (tokens never logged; keep only what the platform requires).

-keepattributes Signature,InnerClasses,EnclosingMethod
-renamesourcefileattribute SourceFile

# Room
-keep @androidx.room.Entity class *
-keep class * extends androidx.room.RoomDatabase
-keepclassmembers class * extends androidx.room.RoomDatabase {
    abstract ** *;
}

# FCM entrypoint (manifest)
-keep class com.ravikisan.platform.RnPushMessagingService { *; }

# Firebase / Play Services (reflective)
-keep class com.google.firebase.** { *; }
-dontwarn com.google.firebase.**

# Android Keystore / crypto (JNI names)
-keep class androidx.security.crypto.** { *; }