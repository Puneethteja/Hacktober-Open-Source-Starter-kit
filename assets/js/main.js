// Open Source Starter Kit
// Each page has <body data-page="...">. This file reads that value
// and fills the page with content from the matching file in data/.
//
// To add content, you almost never need to edit this file.
// Edit the JSON files in data/ instead. See CONTRIBUTING.md.

// ---------- Helpers ----------

// Create an element with optional class and text.
// We use textContent (not innerHTML) so data can never inject HTML.
function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

// Turn "Pull request" into "pull-request" for use in links like glossary.html#pull-request
function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Load a JSON file from the data folder.
async function loadData(fileName) {
  const response = await fetch(`data/${fileName}`);
  if (!response.ok) {
    throw new Error(`Could not load data/${fileName} (status ${response.status}).`);
  }
  return response.json();
}

// Show a helpful message when content cannot load.
function showLoadError(container, error) {
  container.replaceChildren();
  const box = el("div", "notice");
  box.setAttribute("role", "alert");

  if (window.location.protocol === "file:") {
    box.append(
      el("p", "", "This page loads its content from the data folder, and browsers block that when you open the HTML file directly."),
      el("p", "", "Start a local server in the project folder instead:")
    );
    const p = el("p");
    p.append(el("code", "", "python -m http.server 8000"));
    box.append(p, el("p", "", "Then open http://localhost:8000 in your browser."));
  } else {
    box.append(el("p", "", error.message), el("p", "", "Run `node scripts/validate.js` to check the data files."));
  }
  container.append(box);
}

// ---------- Glossary page ----------

async function renderGlossary() {
  const container = document.getElementById("glossary");
  const searchInput = document.getElementById("glossary-search");

  let terms;
  try {
    terms = await loadData("glossary.json");
  } catch (error) {
    showLoadError(container, error);
    return;
  }

  // Sort A to Z so new terms can be added anywhere in the file
  terms.sort((a, b) => a.term.localeCompare(b.term));

  const list = el("dl", "terms");
  const items = terms.map((entry) => {
    const item = el("div", "term");
    item.id = slugify(entry.term);
    item.append(el("dt", "", entry.term));

    const dd = el("dd");
    dd.append(el("p", "", entry.definition));
    if (entry.example) {
      const example = el("p", "example");
      example.append(el("code", "", entry.example));
      dd.append(example);
    }
    item.append(dd);
    list.append(item);
    return { item, text: `${entry.term} ${entry.definition}`.toLowerCase() };
  });

  const empty = el("div", "notice");
  empty.hidden = true;

  container.replaceChildren(list, empty);

  // Simple search: hide terms that don't match what the user typed
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    let shown = 0;
    items.forEach(({ item, text }) => {
      const match = text.includes(query);
      item.hidden = !match;
      if (match) shown += 1;
    });

    empty.hidden = shown > 0;
    if (shown === 0) {
      empty.replaceChildren(
        el("p", "", `No terms match "${searchInput.value.trim()}".`),
        el("p", "", "Think it should be here? Add it to data/glossary.json and open a pull request.")
      );
    }
  });

  // If the page was opened with a link like glossary.html#fork, scroll to that term
  if (window.location.hash) {
    const target = document.getElementById(window.location.hash.slice(1));
    if (target) target.scrollIntoView();
  }
}

// ---------- Resources page ----------

async function renderResources() {
  const container = document.getElementById("resources");

  let resources;
  try {
    resources = await loadData("resources.json");
  } catch (error) {
    showLoadError(container, error);
    return;
  }

  // Group resources by category, keeping the order categories first appear in the file
  const groups = new Map();
  resources.forEach((resource) => {
    if (!groups.has(resource.category)) groups.set(resource.category, []);
    groups.get(resource.category).push(resource);
  });

  const sections = [];
  groups.forEach((items, category) => {
    const section = el("section", "resource-group");
    section.setAttribute("aria-labelledby", `cat-${slugify(category)}`);
    const heading = el("h2", "", category);
    heading.id = `cat-${slugify(category)}`;

    const list = el("ul", "resources");
    items.forEach((resource) => {
      const card = el("li", "resource");

      const link = el("a", "", resource.title);
      link.href = resource.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";

      card.append(
        el("span", `pill ${resource.level.toLowerCase()}`, resource.level),
        link,
        el("p", "", resource.description)
      );

      if (resource.addedBy) {
        card.append(el("span", "added-by", `Added by @${resource.addedBy}`));
      }
      list.append(card);
    });

    section.append(heading, list);
    sections.push(section);
  });

  container.replaceChildren(...sections);
}

// ---------- Cheat sheet page ----------

async function renderCheatsheet() {
  const container = document.getElementById("cheatsheet");

  let sections;
  try {
    sections = await loadData("cheatsheet.json");
  } catch (error) {
    showLoadError(container, error);
    return;
  }

  const wrapper = el("div", "sheet");
  sections.forEach((section) => {
    const block = el("section", "sheet-section");
    block.append(el("h2", "", section.title));

    const list = el("div", "commands");
    section.commands.forEach((item) => {
      const row = el("div", "command");
      const pre = el("pre");
      pre.append(el("code", "", item.command));
      row.append(pre, el("p", "", item.description));
      list.append(row);
    });

    block.append(list);
    wrapper.append(block);
  });

  container.replaceChildren(wrapper);
}

// ---------- Start ----------

const page = document.body.dataset.page;
if (page === "glossary") renderGlossary();
if (page === "resources") renderResources();
if (page === "cheatsheet") renderCheatsheet();
