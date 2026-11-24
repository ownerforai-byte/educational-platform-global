package com.ravikisan.platform;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.os.Looper;

import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;

import com.ravikisan.platform.fcm.FcmRegistrar;
import com.ravikisan.platform.security.SecureWindow;
import com.ravikisan.platform.security.SecurityBootstrap;
import com.ravikisan.platform.session.SessionManager;
import com.ravikisan.platform.sync.SyncScheduler;
import com.ravikisan.platform.web.WebHostFragment;
import com.ravikisan.platform.web.WebSessionCookies;

/**
 * Sign-in uses the same web flow as the browser (in-app WebView only — never Chrome).
 */
public class LoginActivity extends AppCompatActivity implements WebHostFragment.WebAuthListener {
    private final Handler handler = new Handler(Looper.getMainLooper());
    private boolean finishingAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SecureWindow.apply(this);
        if (new SessionManager(this).isSignedIn()) {
            openMainAndFinish();
            return;
        }
        setContentView(R.layout.activity_login);
        if (savedInstanceState == null) {
            WebHostFragment login = WebHostFragment.newInstance("/login");
            login.setWebAuthListener(this);
            getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.login_fragment_host, login, "login_web")
                    .commit();
        }
    }

    @Override
    public void onWebAuthMaybeReady() {
        if (finishingAuth || isFinishing()) return;
        if (!WebSessionCookies.ingestWebSession(this)) return;
        if (!new SessionManager(this).isSignedIn()) return;
        finishingAuth = true;
        handler.post(this::completeWebSignIn);
    }

    private void completeWebSignIn() {
        if (isFinishing()) return;
        FcmRegistrar.requestPermissionIfNeeded(this);
        FcmRegistrar.registerForSignedInUser(this);
        SyncScheduler.schedule(this);
        SecurityBootstrap.enforceAuthenticatedSession(this);
        openMainAndFinish();
    }

    private void openMainAndFinish() {
        Intent main = new Intent(this, MainActivity.class);
        if (getIntent() != null && getIntent().hasExtra(MainActivity.EXTRA_DEEP_LINK)) {
            main.putExtra(MainActivity.EXTRA_DEEP_LINK, getIntent().getStringExtra(MainActivity.EXTRA_DEEP_LINK));
        } else if (getIntent() != null && getIntent().getData() != null) {
            main.setData(getIntent().getData());
        }
        startActivity(main);
        finish();
    }

    @Override
    protected void onDestroy() {
        handler.removeCallbacksAndMessages(null);
        super.onDestroy();
    }

    /** Re-attach listener after config change. */
    @Override
    protected void onStart() {
        super.onStart();
        Fragment f = getSupportFragmentManager().findFragmentByTag("login_web");
        if (f instanceof WebHostFragment) {
            ((WebHostFragment) f).setWebAuthListener(this);
        }
    }
}