/*
 * generate-twa.js
 * ---------------
 * Creates the Android TWA project from the live PWA manifest.
 *
 * Usage: node generate-twa.js
 * Prerequisites: JDK 17, Android SDK, and dependencies installed here.
 * Configure any release signing key locally; never commit it or its password.
 */
const path = require("path");
const fs = require("fs");

const { TwaManifest, TwaGenerator, ConsoleLog } = require("@bubblewrap/core");
const ROOT = __dirname;
const TARGET = path.join(ROOT, "android");
const LOG = path.join(ROOT, "generate.log");
const BUILD_GRADLE = path.join(TARGET, "app", "build.gradle");
const GRADLE_PROPERTIES = path.join(TARGET, "gradle.properties");

const logFile = (msg) => {
  const line = `${new Date().toISOString().slice(11, 19)}  ${msg}`;
  fs.appendFileSync(LOG, `${line}\n`);
  console.log(line);
};

function enforcePlayTargetSdk() {
  let buildGradle = fs.readFileSync(BUILD_GRADLE, "utf8");
  const targetSdkOverride = [
    "// Keep Play submissions current without relying on Bubblewrap CLI flags.",
    "def configuredTargetSdk = (findProperty('twaTargetSdk') ?: '36') as int",
    "if (configuredTargetSdk < 36) {",
    "    throw new GradleException('twaTargetSdk must be at least 36 for current Play submissions.')",
    "}",
    "android.defaultConfig.targetSdkVersion configuredTargetSdk",
  ].join("\n");

  if (!buildGradle.includes("def configuredTargetSdk")) {
    buildGradle = buildGradle.replace(
      /(?:\r?\n){2}task generateShorcutsFile/,
      `\n\n${targetSdkOverride}\n\ntask generateShorcutsFile`,
    );
    if (!buildGradle.includes("def configuredTargetSdk")) {
      throw new Error("Could not insert Play target SDK override into generated build.gradle");
    }
    fs.writeFileSync(BUILD_GRADLE, buildGradle);
  }

  const properties = fs.readFileSync(GRADLE_PROPERTIES, "utf8");
  if (!/^twaTargetSdk=36\r?$/m.test(properties)) {
    fs.appendFileSync(
      GRADLE_PROPERTIES,
      `${properties.endsWith("\n") ? "" : "\n"}twaTargetSdk=36\n`,
    );
  }
}

async function main() {
  fs.writeFileSync(LOG, "");
  logFile("[1/4] Fetching web manifest from ravikisan.vercel.app ...");
  const twaManifest = await TwaManifest.fromWebManifest(
    "https://ravikisan.vercel.app/manifest.json",
  );

  twaManifest.host = "ravikisan.vercel.app";
  twaManifest.startUrl = "/";
  twaManifest.name = "Ravikisan's Platform";
  twaManifest.launcherName = "Ravikisan";
  twaManifest.packageId = "com.ravikisan.platform";
  twaManifest.appVersionCode = 1;
  twaManifest.appVersionName = "1";
  twaManifest.display = "standalone";
  twaManifest.orientation = "portrait";
  twaManifest.themeColor = require("color")("#3b82f6");
  twaManifest.backgroundColor = require("color")("#0f172a");
  twaManifest.iconUrl = "https://ravikisan.vercel.app/icon-512.png";
  twaManifest.maskableIconUrl = "https://ravikisan.vercel.app/icon-512.png";
  twaManifest.enableNotifications = true;
  twaManifest.minSdkVersion = 30;
  twaManifest.generatorApp = "bubblewrap";
  twaManifest.webManifestUrl = new URL(
    "https://ravikisan.vercel.app/manifest.json",
  );
  twaManifest.features = {};

  logFile("[2/4] Validating TWA manifest ...");
  const error = twaManifest.validate();
  if (error) throw new Error(`Manifest validation failed: ${error}`);

  logFile("[3/4] Generating android/ project ...");
  if (fs.existsSync(TARGET)) {
    const previousGenerator = new TwaGenerator();
    await previousGenerator.removeTwaProject(ROOT);
  }
  const generator = new TwaGenerator();
  await generator.createTwaProject(TARGET, twaManifest, new ConsoleLog("TwaGenerator"));
  enforcePlayTargetSdk();
  await twaManifest.saveToFile(path.join(ROOT, "twa-manifest.json"));

  const checksum = require("crypto")
    .createHash("sha1")
    .update(fs.readFileSync(path.join(ROOT, "twa-manifest.json")))
    .digest("hex");
  fs.writeFileSync(path.join(ROOT, "manifest-checksum.txt"), `${checksum}\n`);

  logFile("[4/4] TWA project generated. Configure release signing locally before publishing.");
}

main().catch((err) => {
  logFile(`FATAL: ${err.message}`);
  console.error(err);
  process.exit(1);
});
