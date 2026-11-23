import { NextResponse } from "next/server";

const SITE = "https://harindrasah.com.np";

/** RFC 9116 security contact for researchers and store reviewers. */
const SECURITY_TXT = `Contact: mailto:sahrocky81@gmail.com
Expires: 2027-12-31T23:59:59.000Z
Preferred-Languages: en
Canonical: ${SITE}/.well-known/security.txt
Policy: ${SITE}/legal/privacy
Acknowledgments: ${SITE}/legal/terms
`;

export function GET() {
  return new NextResponse(SECURITY_TXT, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}