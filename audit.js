const fs = require("fs");
const path = require("path");

console.log("\n🔍 Vite + React Project Audit Tool\n");

// Summary
let summary = {
  vercel: true,
  buildScript: true,
  viteConfig: true,
  imports: [],
  dependencies: [],
  basePath: true
};

// ==============================
// 1️⃣ Check vercel.json
// ==============================
if (!fs.existsSync("vercel.json")) {
  console.log("\x1b[31m❌ Missing: vercel.json\x1b[0m");
  summary.vercel = false;
} else {
  console.log("\x1b[32m✅ vercel.json found\x1b[0m");
}

// ==============================
// 2️⃣ Check package.json build script
// ==============================
let pkg;
if (fs.existsSync("package.json")) {
  pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  if (!pkg.scripts || pkg.scripts.build !== "vite build") {
    console.log("\x1b[31m❌ Incorrect build script in package.json\x1b[0m");
    summary.buildScript = false;
  } else {
    console.log("\x1b[32m✅ Correct build script\x1b[0m");
  }
} else {
  console.log("\x1b[31m❌ No package.json found\x1b[0m");
  summary.buildScript = false;
}

// ==============================
// 3️⃣ Check vite.config for outDir & GitHub Pages base
// ==============================
const viteConfigFile = ["vite.config.js", "vite.config.ts"].find(fs.existsSync);
if (viteConfigFile) {
  const content = fs.readFileSync(viteConfigFile, "utf8");
  if (content.includes("outDir") && !content.includes("dist")) {
    console.log("\x1b[33m⚠️ Custom outDir detected — may cause Vercel issues.\x1b[0m");
    summary.viteConfig = false;
  } else {
    console.log("\x1b[32m✅ Vite output directory OK (dist)\x1b[0m");
  }

  // Check base path for GitHub Pages
  if (!content.includes("base: '/vite-react/'")) {
    console.log("\x1b[33m⚠️ Warning: vite.config base path not set for GitHub Pages\x1b[0m");
    summary.basePath = false;
  } else {
    console.log("\x1b[32m✅ Vite base path set correctly for GitHub Pages\x1b[0m");
  }
} else {
  console.log("\x1b[33m⚠️ No vite.config found\x1b[0m");
  summary.viteConfig = false;
}

// ==============================
// 4️⃣ Scan for case-sensitive import errors
// ==============================
function scanImports(dir) {
  const entries = fs.readdirSync(dir);
  for (let file of entries) {
    const full = path.join(dir, file);
    if (fs.lstatSync(full).isDirectory()) {
      scanImports(full);
      continue;
    }
    if (!file.match(/\.(js|jsx|ts|tsx)$/)) continue;
    const code = fs.readFileSync(full, "utf8");
    const imports = code.match(/from ["'](.+)["']/g) || [];
    imports.forEach((i) => {
      const match = i.match(/["'](.+)["']/);
      if (!match) return;
      const importPath = match[1];
      if (importPath.startsWith(".") && !fs.existsSync(path.resolve(path.dirname(full), importPath))) {
        console.log(`\x1b[31m❌ Import error in ${full} — Missing file: ${importPath}\x1b[0m`);
        summary.imports.push({ file: full, missing: importPath });
      }
    });
  }
}

console.log("\n🔎 Checking imports...");
scanImports("./src");

// ==============================
// 5️⃣ Check for missing dependencies
// ==============================
console.log("\n🔎 Checking dependencies...");
if (pkg) {
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const used = [];

  function scanForRequires(dir) {
    const entries = fs.readdirSync(dir);
    for (let file of entries) {
      const full = path.join(dir, file);
      if (fs.lstatSync(full).isDirectory()) {
        scanForRequires(full);
        continue;
      }
      if (!file.match(/\.(js|jsx|ts|tsx)$/)) continue;
      const code = fs.readFileSync(full, "utf8");
      const imports = code.match(/from ["'](.+)["']/g) || [];
      imports.forEach((i) => {
        const m = i.match(/["'](.+)["']/);
        if (!m) return;
        const lib = m[1].split("/")[0];
        if (!lib.startsWith(".")) used.push(lib);
      });
    }
  }

  scanForRequires("./src");

  used.forEach((u) => {
    if (!deps[u]) {
      console.log(`\x1b[31m❌ Missing dependency: ${u}\x1b[0m`);
      summary.dependencies.push(u);
    }
  });
}

console.log("\n✨ Audit Complete! Summary:\n");
console.table(summary);
