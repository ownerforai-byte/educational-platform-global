package com.ravikisan.platform;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.ravikisan.platform.fcm.FcmRegistrar;
import com.ravikisan.platform.net.ApiClient;
import com.ravikisan.platform.sync.SyncScheduler;

public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_DEEP_LINK = "deepLink";

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        FcmRegistrar.requestPermissionIfNeeded(this);
        FcmRegistrar.registerForSignedInUser(this);
        SyncScheduler.schedule(this);
        androidx.work.WorkManager.getInstance(this).enqueue(
                new androidx.work.OneTimeWorkRequest.Builder(
                                com.ravikisan.platform.sync.ContentSyncWorker.class)
                        .build());
        BottomNavigationView nav = findViewById(R.id.bottom_nav);
        nav.setOnItemSelectedListener(item -> {
            Fragment fragment;
            int id = item.getItemId();
            if (id == R.id.nav_home) {
                fragment = ContentFragment.newInstance("Home", "home");
            } else if (id == R.id.nav_learn) {
                fragment = ContentFragment.newInstance("Learn", "learn");
            } else if (id == R.id.nav_search) {
                fragment = ContentFragment.newInstance("Search", "search");
            } else if (id == R.id.nav_profile) {
                fragment = ContentFragment.newInstance("Profile", "profile");
            } else if (id == R.id.nav_settings) {
                fragment = SettingsFragment.newInstance();
            } else {
                return false;
            }
            getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.fragment_container, fragment)
                    .commit();
            return true;
        });
        if (savedInstanceState == null) {
            nav.setSelectedItemId(R.id.nav_home);
        }
        handleDeepLink(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleDeepLink(intent);
    }

    private void handleDeepLink(Intent intent) {
        if (intent == null) return;
        String route = intent.getStringExtra(EXTRA_DEEP_LINK);
        if (route == null && intent.getData() != null) {
            Uri data = intent.getData();
            if ("rn".equals(data.getScheme()) && "app".equals(data.getHost())) {
                route = data.getPath();
            }
        }
        if (route == null || route.isEmpty()) return;
        BottomNavigationView nav = findViewById(R.id.bottom_nav);
        if (route.contains("community")) {
            nav.setSelectedItemId(R.id.nav_home);
        } else if (route.contains("profile") || route.contains("settings")) {
            nav.setSelectedItemId(R.id.nav_profile);
        }
    }
}