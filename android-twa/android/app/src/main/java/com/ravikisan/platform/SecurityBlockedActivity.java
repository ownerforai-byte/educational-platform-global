package com.ravikisan.platform;

import android.os.Bundle;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

public class SecurityBlockedActivity extends AppCompatActivity {
    public static final String EXTRA_REASON = "reason";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_security_blocked);
        String reason = getIntent().getStringExtra(EXTRA_REASON);
        TextView body = findViewById(R.id.block_reason);
        if (reason != null) {
            body.setText(reason);
        }
    }
}