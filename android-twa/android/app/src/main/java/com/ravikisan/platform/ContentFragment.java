package com.ravikisan.platform;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.ravikisan.platform.net.ApiClient;

public class ContentFragment extends Fragment {
    private static final String ARG_TITLE = "title";
    private static final String ARG_KIND = "kind";

    public static ContentFragment newInstance(String title, String kind) {
        ContentFragment f = new ContentFragment();
        Bundle b = new Bundle();
        b.putString(ARG_TITLE, title);
        b.putString(ARG_KIND, kind);
        f.setArguments(b);
        return f;
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        return inflater.inflate(R.layout.fragment_placeholder, container, false);
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        Bundle args = getArguments();
        String title = args != null ? args.getString(ARG_TITLE, "Screen") : "Screen";
        String kind = args != null ? args.getString(ARG_KIND, "home") : "home";
        TextView titleView = view.findViewById(R.id.title);
        TextView body = view.findViewById(R.id.body);
        TextView offline = view.findViewById(R.id.offline_banner);
        titleView.setText(title);
        ApiClient api = new ApiClient(requireContext());
        load(api, kind, body, offline);
        view.findViewById(R.id.refresh).setOnClickListener(v -> load(api, kind, body, offline));
    }

    private void load(ApiClient api, String kind, TextView body, TextView offline) {
        offline.setVisibility(
                com.ravikisan.platform.net.NetworkMonitor.isOnline(requireContext())
                        ? View.GONE
                        : View.VISIBLE);
        body.setText("Loading…");
        ApiClient.Callback<org.json.JSONObject> cb = (res, err) -> {
            if (!isAdded()) return;
            requireActivity().runOnUiThread(() -> {
                offline.setVisibility(err != null ? View.VISIBLE : View.GONE);
                if (res == null) {
                    body.setText(err != null ? err.getMessage() : "No data");
                    return;
                }
                body.setText(res.toString());
            });
        };
        if ("feed".equals(kind) || "learn".equals(kind)) {
            api.refreshFeed(cb);
        } else if ("profile".equals(kind) || "search".equals(kind)) {
            api.refreshMe(cb);
        } else if ("home".equals(kind)) {
            body.setText("Loading member home…");
            api.refreshMe((me, meErr) -> {
                if (!isAdded()) return;
                api.refreshFeed((feed, feedErr) -> {
                    if (!isAdded()) return;
                    requireActivity().runOnUiThread(() -> {
                        boolean isOffline = meErr != null || feedErr != null;
                        offline.setVisibility(isOffline ? View.VISIBLE : View.GONE);
                        StringBuilder text = new StringBuilder();
                        if (me != null) text.append("Profile\n").append(me.toString()).append("\n\n");
                        if (feed != null) text.append("Community\n").append(feed.toString());
                        if (text.length() == 0) {
                            text.append(meErr != null ? meErr.getMessage() : "No cached data yet.");
                        }
                        body.setText(text.toString());
                    });
                });
            });
        } else {
            body.setText("Member plan — sign in to sync profile and community.");
        }
    }
}