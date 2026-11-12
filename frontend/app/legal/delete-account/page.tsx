import Link from "next/link";
import { LegalDoc } from "../legal-doc";
import { SupportRequest } from "@/components/support/support-request";

export const metadata = { title: "Delete account — Ravikisan's Platform" };

export default function DeleteAccountPage() {
  return <LegalDoc title="Account and data deletion" updated="1 November 2026" intro="Request deletion even if you have uninstalled the app." doc="account-deletion">
    <p>For Ravikisan&apos;s Platform (com.ravikisan.platform), sign in and use the request form below, or email <a href="mailto:sahrocky81@gmail.com?subject=Account%20deletion%20request">sahrocky81@gmail.com</a> from your account email with the subject “Account deletion request”. You do not need to reinstall the app or obtain premium access.</p>
    <p>Support verifies account ownership before acting. Never send a password. Requests cover your authentication account, profile, learning progress, bookmarks, AI history and uploaded files. Support confirms completion or explains any data that must be retained for a legal or security obligation, its purpose and retention period. Provider backups may expire on their separate retention schedule.</p>
    <p>Contact support for request status. <Link href="/login">Sign in</Link> to send a request using your existing account.</p>
    <SupportRequest kind="account_deletion" />
  </LegalDoc>;
}
