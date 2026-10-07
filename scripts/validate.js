// Checks that every file in data/ is valid and follows the rules in CONTRIBUTING.md.
// Run it yourself before opening a pull request:
//
//   node scripts/validate.js
//
// It also runs automatically on every pull request (see .github/workflows/validate.yml).

const fs = require("fs");
const path = require("path");

const DATA_DIR = path.join(__dirname, "..", "data");

const RESOURCE_CATEGORIES = [
  "Git",
  "GitHub",
  "Open Source",
  "Docs",
  "Find Issues",
  "Programs",
  "Python",
  "Web",
  "DSA",
  "Design",
];
const RESOURCE_LEVELS = ["Beginner", "Intermediate"];

const errors = [];

function fail(file, message) {
  errors.push(`  ${file}: ${message}`);
}

function readJSON(file) {
  const fullPath = path.join(DATA_DIR, file);
  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (err) {
    fail(file, `is not valid JSON. ${err.message}`);
    fail(file, "Tip: check for a missing comma, an extra comma after the last item, or a missing quote.");
    return null;
  }
}

function isText(value) {
  return typeof value === "string" && value.trim().length > 0;
}

// ---------- glossary.json ----------
const glossary = readJSON("glossary.json");
if (glossary) {
  if (!Array.isArray(glossary)) {
    fail("glossary.json", "must be a list, starting with [ and ending with ].");
  } else {
    const seen = new Set();
    glossary.forEach((entry, i) => {
      const where = `entry ${i + 1}${entry && entry.term ? ` ("${entry.term}")` : ""}`;
      if (!isText(entry.term)) fail("glossary.json", `${where} needs a "term".`);
      if (!isText(entry.definition)) fail("glossary.json", `${where} needs a "definition".`);
      if (isText(entry.definition) && entry.definition.length > 250) {
        fail("glossary.json", `${where} has a definition longer than 250 characters. Keep it short and simple.`);
      }
      if ("example" in entry && !isText(entry.example)) {
        fail("glossary.json", `${where} has an empty "example". Remove it or fill it in.`);
      }
      if (isText(entry.term)) {
        const key = entry.term.toLowerCase();
        if (seen.has(key)) fail("glossary.json", `${where} is a duplicate. This term already exists.`);
        seen.add(key);
      }
    });
  }
}

// ---------- resources.json ----------
const resources = readJSON("resources.json");
if (resources) {
  if (!Array.isArray(resources)) {
    fail("resources.json", "must be a list, starting with [ and ending with ].");
  } else {
    const seenUrls = new Set();
    resources.forEach((entry, i) => {
      const where = `entry ${i + 1}${entry && entry.title ? ` ("${entry.title}")` : ""}`;
      ["title", "url", "category", "level", "description"].forEach((field) => {
        if (!isText(entry[field])) fail("resources.json", `${where} needs a "${field}".`);
      });
      if (isText(entry.url) && !entry.url.startsWith("https://")) {
        fail("resources.json", `${where} has a url that does not start with https://`);
      }
      if (isText(entry.category) && !RESOURCE_CATEGORIES.includes(entry.category)) {
        fail("resources.json", `${where} has category "${entry.category}". Use one of: ${RESOURCE_CATEGORIES.join(", ")}.`);
      }
      if (isText(entry.level) && !RESOURCE_LEVELS.includes(entry.level)) {
        fail("resources.json", `${where} has level "${entry.level}". Use one of: ${RESOURCE_LEVELS.join(", ")}.`);
      }
      if (isText(entry.description) && entry.description.length > 160) {
        fail("resources.json", `${where} has a description longer than 160 characters.`);
      }
      if (isText(entry.url)) {
        const key = entry.url.replace(/\/+$/, "").toLowerCase();
        if (seenUrls.has(key)) fail("resources.json", `${where} is a duplicate. This link is already listed.`);
        seenUrls.add(key);
      }
    });
  }
}

// ---------- cheatsheet.json ----------
const cheatsheet = readJSON("cheatsheet.json");
if (cheatsheet) {
  if (!Array.isArray(cheatsheet)) {
    fail("cheatsheet.json", "must be a list of sections, starting with [ and ending with ].");
  } else {
    cheatsheet.forEach((section, i) => {
      const where = `section ${i + 1}${section && section.title ? ` ("${section.title}")` : ""}`;
      if (!isText(section.title)) fail("cheatsheet.json", `${where} needs a "title".`);
      if (!Array.isArray(section.commands) || section.commands.length === 0) {
        fail("cheatsheet.json", `${where} needs a "commands" list with at least one command.`);
        return;
      }
      section.commands.forEach((cmd, j) => {
        if (!isText(cmd.command)) fail("cheatsheet.json", `${where}, command ${j + 1} needs a "command".`);
        if (!isText(cmd.description)) fail("cheatsheet.json", `${where}, command ${j + 1} needs a "description".`);
      });
    });
  }
}

if (errors.length > 0) {
  console.error("\nFound some problems in the data files:\n");
  console.error(errors.join("\n"));
  console.error("\nFix these and run `node scripts/validate.js` again.\n");
  process.exit(1);
}

console.log("All data files look good.");
