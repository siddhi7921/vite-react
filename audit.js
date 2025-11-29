const fs = require("fs");
const path = require("path");

console.log("\n🔍 Vite + React Project Audit Tool\n");

// ==============================
// 1️⃣ Check vercel.json
// ==============================
if (!fs.existsSync("vercel.json")) {
  console.log("❌ Missing: vercel.json");
  console.log("👉 Add this file:\n");
  console.log(`{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}\n`);
} else {
  console.log("✅ vercel.json found");
}

// ==============================
// 2️⃣ Check package.json build script
// ==============================
if (fs.existsSync("package.json")) {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
  if (!pkg.scripts || pkg.scripts.build !== "vite build") {
    console.log("❌ Incorrect build script in package.json");
    console.log("👉 Should be:");
    console.log(`"build": "vite build"\n`);
  } else {
    console.log("✅ Correct build script");
  }
} else {
  console.log("❌ No package.json found");
}

// ==============================
// 3️⃣ Check vite.config for correct output dir
// ==============================
const viteConfig = ["vite.config.js", "vite.config.ts"].find(fs.existsSync);

if (viteConfig) {
  const content = fs.readFileSync(viteConfig, "utf8");
  if (content.includes("outDir") && !content.includes("dist")) {
    console.log("⚠️ Custom outDir detected — may cause Vercel issues.");
  } else {
    console.log("✅ Vite output directory OK (dist)");
  }
} else {
  console.log("⚠️ No vite.config found");
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

      if (importPath.startsWith(".") && !fs.existsSync(path.resolve(dir, importPath))) {
        console.log(`❌ Import error in ${full}`);
        console.log(`   Missing file: ${importPath}\n`);
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

if (fs.existsSync("package.json")) {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"));
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
      console.log(`❌ Missing dependency: ${u}`);
    }
  });
}

console.log("\n✨ Audit Complete!\n");
