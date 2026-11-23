package com.ravikisan.platform;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.button.MaterialButton;
import com.google.android.material.textfield.TextInputEditText;
import com.ravikisan.platform.auth.FirebaseAuthGateway;
import com.ravikisan.platform.fcm.FcmRegistrar;
import com.ravikisan.platform.net.ApiClient;
import com.ravikisan.platform.security.SecureWindow;
import com.ravikisan.platform.sync.SyncScheduler;

import org.json.JSONObject;

public class LoginActivity extends AppCompatActivity {
    private ApiClient api;
    private TextView error;
    private ProgressBar progress;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        SecureWindow.apply(this);
        setContentView(R.layout.activity_login);
        api = new ApiClient(this);
        error = findViewById(R.id.error);
        progress = findViewById(R.id.progress);
        TextInputEditText email = findViewById(R.id.email);
        TextInputEditText password = findViewById(R.id.password);
        MaterialButton signIn = findViewById(R.id.sign_in);
        signIn.setOnClickListener(v -> {
            String em = email.getText() != null ? email.getText().toString().trim() : "";
            String pw = password.getText() != null ? password.getText().toString() : "";
            if (em.isEmpty() || pw.isEmpty()) {
                showError("Enter email and password.");
                return;
            }
            progress.setVisibility(View.VISIBLE);
            error.setVisibility(View.GONE);
            attemptSignIn(em, pw);
        });
    }

    @Override
    protected void onStop() {
        TextInputEditText password = findViewById(R.id.password);
        if (password != null) {
            password.setText("");
        }
        super.onStop();
    }

    private void attemptSignIn(String email, String password) {
        if (FirebaseAuthGateway.isReady(this)) {
            FirebaseAuthGateway.signIn(this, email, password, (idToken, err) -> {
                if (idToken == null) {
                    runOnUiThread(() -> {
                        progress.setVisibility(View.GONE);
                        showError(err != null ? err.getMessage() : "Sign in failed");
                    });
                    return;
                }
                api.loginWithIdToken(idToken, this::finishLogin);
            });
            return;
        }
        api.loginWithPassword(email, password, this::finishLogin);
    }

    private void finishLogin(JSONObject res, Exception err) {
        runOnUiThread(() -> {
            progress.setVisibility(View.GONE);
            if (err != null || res == null) {
                showError(err != null ? err.getMessage() : "Sign in failed");
                return;
            }
            if (res.optJSONObject("user") == null) {
                showError(res.optString("message", res.optString("error", "Could not open session.")));
                return;
            }
            FcmRegistrar.requestPermissionIfNeeded(this);
            FcmRegistrar.registerForSignedInUser(this);
            SyncScheduler.schedule(this);
            startActivity(new Intent(this, MainActivity.class));
            finish();
        });
    }

    private void showError(String message) {
        error.setText(message);
        error.setVisibility(View.VISIBLE);
    }
}