#!/usr/bin/env node
/** Fetches SPKI SHA-256 pins for harindrasah.com.np (max depth 4). */
import tls from "node:tls";
import crypto from "node:crypto";

const HOST = "harindrasah.com.np";

const pins = await new Promise((resolve, reject) => {
  const socket = tls.connect(
    { host: HOST, port: 443, servername: HOST, rejectUnauthorized: true },
    () => {
      const out = [];
      let cert = socket.getPeerCertificate(true);
      for (let depth = 0; depth < 4 && cert && Object.keys(cert).length > 0; depth++) {
        const pk = cert.publicKey;
        let pin = null;
        if (pk && typeof pk.export === "function") {
          pin = crypto
            .createHash("sha256")
            .update(pk.export({ type: "spki", format: "der" }))
            .digest("base64");
        }
        out.push({ cn: cert.subject?.CN, pin });
        const next = cert.issuerCertificate;
        if (!next || next.fingerprint === cert.fingerprint) break;
        cert = next;
      }
      socket.end();
      resolve(out.filter((p) => p.pin));
    },
  );
  socket.setTimeout(15_000, () => {
    socket.destroy();
    reject(new Error("TLS timeout"));
  });
  socket.on("error", reject);
});

console.log(JSON.stringify({ host: HOST, pins, isrgBackup: "C5+lpZ7TcVgd+yrJqeqOWWnOMQ2lHhmIiUk5l+Ci1Q0=" }, null, 2));