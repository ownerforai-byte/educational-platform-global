package com.ravikisan.platform;

import android.content.Intent;
import android.os.Bundle;

import androidx.activity.OnBackPressedCallback;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.ravikisan.platform.fcm.FcmRegistrar;
import com.ravikisan.platform.fcm.NotificationChannels;
import com.ravikisan.platform.security.SecureDeepLink;
import com.ravikisan.platform.security.SecureWindow;
import com.ravikisan.platform.security.SecurityBootstrap;
import com.ravikisan.platform.session.SessionManager;
import com.ravikisan.platform.sync.SyncScheduler;
import com.ravikisan.platform.web.WebHostFragment;

public class MainActivity extends AppCompatActivity {
    public static final String EXTRA_DEEP_LINK = "deepLink";
    private static final String TAG_WEB = "web_host";

    private BottomNavigationView nav;
    private String pendingDeepLink;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SecureWindow.apply(this);
        if (!new SessionManager(this).isSignedIn()) {
            Intent login = new Intent(this, LoginActivity.class);
            login.putExtras(getIntent());
            startActivity(login);
            finish();
            return;
        }
        SecurityBootstrap.enforceAuthenticatedSession(this);
        NotificationChannels.ensureAll(this);
        setContentView(R.layout.activity_main);
        FcmRegistrar.requestPermissionIfNeeded(this);
        FcmRegistrar.registerForSignedInUser(this);
        SyncScheduler.schedule(this);
        SyncScheduler.runOnceIfIdle(this);

        nav = findViewById(R.id.bottom_nav);
        nav.setOnItemSelectedListener(item -> {
            int id = item.getItemId();
            if (id == R.id.nav_settings) {
                showSettings();
                return true;
            }
            String path;
            if (id == R.id.nav_home) {
                path = "/home/member";
            } else if (id == R.id.nav_learn) {
                path = "/learn";
            } else if (id == R.id.nav_search) {
                path = "/search";
            } else if (id == R.id.nav_profile) {
                path = "/profile";
            } else {
                return false;
            }
            showWebAt(path);
            return true;
        });

        getOnBackPressedDispatcher()
                .addCallback(
                        this,
                        new OnBackPressedCallback(true) {
                            @Override
                            public void handleOnBackPressed() {
                                Fragment f = getSupportFragmentManager().findFragmentByTag(TAG_WEB);
                                if (f instanceof WebHostFragment && ((WebHostFragment) f).goBack()) {
                                    return;
                                }
                                setEnabled(false);
                                getOnBackPressedDispatcher().onBackPressed();
                            }
                        });

        if (savedInstanceState == null) {
            nav.setSelectedItemId(R.id.nav_home);
            showWebAt("/home/member");
        }
        handleDeepLink(getIntent());
    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);
        handleDeepLink(intent);
    }

    private void showSettings() {
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragment_container, SettingsFragment.newInstance())
                .commit();
    }

    private void showWebAt(String path) {
        if (pendingDeepLink != null) {
            path = pendingDeepLink;
            pendingDeepLink = null;
        }
        path = SecureDeepLink.sanitizePath(path);
        Fragment existing = getSupportFragmentManager().findFragmentByTag(TAG_WEB);
        if (existing instanceof WebHostFragment) {
            ((WebHostFragment) existing).loadPath(path);
            return;
        }
        WebHostFragment web = WebHostFragment.newInstance(path);
        getSupportFragmentManager()
                .beginTransaction()
                .replace(R.id.fragment_container, web, TAG_WEB)
                .commit();
    }

    private void handleDeepLink(Intent intent) {
        if (intent == null) return;
        String route = intent.getStringExtra(EXTRA_DEEP_LINK);
        if (route == null && intent.getData() != null) {
            route = SecureDeepLink.fromUri(intent.getData());
        } else if (route != null) {
            route = SecureDeepLink.sanitizePath(route);
        }
        if (route == null || route.isEmpty()) return;

        if (route.contains("settings")) {
            nav.setSelectedItemId(R.id.nav_settings);
            showSettings();
            return;
        }
        if (route.contains("profile")) {
            nav.setSelectedItemId(R.id.nav_profile);
        } else if (route.contains("community") || route.contains("ai/")) {
            nav.setSelectedItemId(R.id.nav_home);
        } else if (route.contains("learn") || route.contains("notes")) {
            nav.setSelectedItemId(R.id.nav_learn);
        } else if (route.contains("search")) {
            nav.setSelectedItemId(R.id.nav_search);
        } else {
            nav.setSelectedItemId(R.id.nav_home);
        }

        Fragment existing = getSupportFragmentManager().findFragmentByTag(TAG_WEB);
        if (existing instanceof WebHostFragment) {
            ((WebHostFragment) existing).loadPath(route);
        } else {
            pendingDeepLink = route;
            showWebAt(route);
        }
        intent.removeExtra(EXTRA_DEEP_LINK);
    }
}