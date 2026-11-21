package com.ravikisan.platform;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.core.content.ContextCompat;
import androidx.fragment.app.Fragment;

import com.ravikisan.platform.net.ApiClient;
import com.ravikisan.platform.sync.SyncScheduler;

public class SettingsFragment extends Fragment {
    public static SettingsFragment newInstance() {
        return new SettingsFragment();
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        LinearLayout layout = new LinearLayout(requireContext());
        layout.setOrientation(LinearLayout.VERTICAL);
        layout.setPadding(48, 48, 48, 48);
        layout.setBackgroundColor(ContextCompat.getColor(requireContext(), R.color.backgroundColor));
        TextView title = new TextView(requireContext());
        title.setText("Settings");
        title.setTextColor(ContextCompat.getColor(requireContext(), R.color.textPrimary));
        title.setTextSize(20f);
        Button signOut = new Button(requireContext());
        signOut.setText("Sign out");
        signOut.setOnClickListener(v -> {
            ApiClient api = new ApiClient(requireContext());
            api.logout(() -> requireActivity().runOnUiThread(() -> {
                SyncScheduler.schedule(requireContext());
                startActivity(new Intent(requireContext(), LoginActivity.class));
                requireActivity().finish();
            }));
        });
        layout.addView(title);
        layout.addView(signOut);
        return layout;
    }
}