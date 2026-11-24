package com.ravikisan.platform;

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.google.android.material.button.MaterialButton;
import com.ravikisan.platform.fcm.FcmRegistrar;
import com.ravikisan.platform.net.ApiClient;
import com.ravikisan.platform.sync.SyncScheduler;
import com.ravikisan.platform.web.WebHostFragment;

/**
 * Play-required legal links, support contact, version stamp, and sign-out.
 * URLs align with GET /api/v2/meta → requirements and play-store/*.md.
 */
public class SettingsFragment extends Fragment {
    private static final String SITE = "https://harindrasah.com.np";
    private static final String SUPPORT_EMAIL = "sahrocky81@gmail.com";

    public static SettingsFragment newInstance() {
        return new SettingsFragment();
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_settings, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        TextView version = view.findViewById(R.id.settings_version);
        version.setText(getString(R.string.settings_title) + " · v" + BuildConfig.VERSION_NAME
                + " (" + BuildConfig.VERSION_CODE + ")");

        view.findViewById(R.id.notification_settings).setOnClickListener(v -> openNotificationSettings());
        view.findViewById(R.id.refresh_fcm).setOnClickListener(v -> {
            FcmRegistrar.requestPermissionIfNeeded(requireActivity());
            FcmRegistrar.registerForSignedInUser(requireContext());
            Toast.makeText(requireContext(), R.string.settings_fcm_refreshed, Toast.LENGTH_SHORT).show();
        });
        view.findViewById(R.id.sync_now).setOnClickListener(v -> {
            SyncScheduler.runOnceIfIdle(requireContext());
            Toast.makeText(requireContext(), R.string.settings_sync_started, Toast.LENGTH_SHORT).show();
        });

        View openSite = view.findViewById(R.id.open_website);
        if (openSite != null) {
            openSite.setVisibility(View.GONE);
        }
        view.findViewById(R.id.contact_support).setOnClickListener(v -> {
            Intent mail = new Intent(Intent.ACTION_SENDTO, Uri.parse("mailto:" + SUPPORT_EMAIL));
            mail.putExtra(Intent.EXTRA_SUBJECT, "Ravikisan Platform support");
            startActivity(Intent.createChooser(mail, getString(R.string.settings_contact_support)));
        });

        view.findViewById(R.id.clear_cache).setOnClickListener(v -> {
            com.ravikisan.platform.data.AppDatabase.get(requireContext()).cache().clearAll();
            Toast.makeText(requireContext(), R.string.settings_cache_cleared, Toast.LENGTH_SHORT).show();
        });

        bindUrl(view, R.id.legal_privacy, SITE + "/legal/privacy");
        bindUrl(view, R.id.legal_terms, SITE + "/legal/terms");
        bindUrl(view, R.id.legal_cookies, SITE + "/legal/cookies");
        bindUrl(view, R.id.legal_delete, SITE + "/legal/delete-account");

        view.findViewById(R.id.sign_out).setOnClickListener(v -> {
            ApiClient api = new ApiClient(requireContext());
            api.logout(() -> requireActivity().runOnUiThread(() -> {
                SyncScheduler.schedule(requireContext());
                startActivity(new Intent(requireContext(), LoginActivity.class));
                requireActivity().finish();
            }));
        });
    }

    private void bindUrl(View root, int id, String url) {
        View target = root.findViewById(id);
        if (!(target instanceof MaterialButton)) return;
        target.setOnClickListener(v -> {
            String path = Uri.parse(url).getPath();
            if (path == null) path = "/";
            requireActivity()
                    .getSupportFragmentManager()
                    .beginTransaction()
                    .replace(R.id.fragment_container, WebHostFragment.newInstance(path), "web_host")
                    .commit();
        });
    }

    private void openNotificationSettings() {
        Intent intent = new Intent();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            intent.setAction(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
            intent.putExtra(Settings.EXTRA_APP_PACKAGE, requireContext().getPackageName());
        } else {
            intent.setAction(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
            intent.setData(Uri.parse("package:" + requireContext().getPackageName()));
        }
        startActivity(intent);
    }
}