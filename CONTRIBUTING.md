# Contributing guide

Thanks for helping! This guide explains exactly how to make your first contribution. No experience needed.

## Before you start

- Make sure Git is installed: run `git --version`.
- You need a GitHub account.
- Read our [Code of Conduct](CODE_OF_CONDUCT.md).

## The rules

1. **Pick an issue first.** Every pull request must be linked to an issue.
2. **Ask before you start.** Comment "I'd like to work on this" and wait until a maintainer assigns you.
3. **One issue at a time.** Finish or drop your current issue before asking for another.
4. **Keep it small.** One pull request should do one thing.
5. **No low-effort pull requests.** Pull requests that only change whitespace, add your name, or paste AI-generated text without checking it will be closed.

If you are assigned and get stuck, ask in the issue. If you stop working on it, say so, and we will reassign it.

## Step by step

### 1. Fork and clone

Click **Fork** on GitHub, then:

```bash
git clone https://github.com/<your-username>/Hacktober-Open-Source-Starter-kit.git
cd Hacktober-Open-Source-Starter-kit
```

### 2. Create a branch

Name it after what you are doing, using lowercase words and dashes:

```bash
git checkout -b add-python-resources
```

### 3. Make your change

Edit only the files the issue mentions. See the examples below.

### 4. Check your change

```bash
node scripts/validate.js
python -m http.server 8000
```

The first command checks the data files. The second lets you open http://localhost:8000 and see your change.

No Node.js? That's okay. The same check runs automatically when you open your pull request.

### 5. Commit and push

Write a short message that says what you did:

```bash
git add .
git commit -m "Add three beginner Python resources"
git push origin add-python-resources
```

### 6. Open a pull request

1. Go to your fork on GitHub and click **Compare & pull request**.
2. Fill in the template.
3. Write `Closes #<issue number>` in the description so the issue closes when your PR is merged.

A maintainer will review it, usually within 2 days. If they ask for changes, edit your files, commit, and push again to the same branch. The pull request updates by itself.

## Adding content

### A glossary term

Add an entry to `data/glossary.json`. The list is sorted on the website, so you can add it anywhere.

```json
{
  "term": "Upstream",
  "definition": "The original repository that you forked from.",
  "example": "git fetch upstream"
}
```

- `term` and `definition` are required. `example` is optional.
- Keep the definition under 250 characters and write it for a complete beginner.

### A resource

Add an entry to `data/resources.json`:

```json
{
  "title": "Pro Git (free book)",
  "url": "https://git-scm.com/book/en/v2",
  "category": "Git",
  "level": "Beginner",
  "description": "The official Git book. Chapters 1 to 3 cover everything you need to start.",
  "addedBy": "your-github-username"
}
```

- `category` must be one of: Git, GitHub, Open Source, Docs, Find Issues, Programs, Python, Web, DSA, Design
- `level` must be Beginner or Intermediate
- The link must start with `https://` and must be free to access
- Keep the description under 160 characters, in your own words
- `addedBy` is optional

### A cheat sheet command

Add a command to a section in `data/cheatsheet.json`, or add a new section:

```json
{
  "title": "Undo mistakes",
  "commands": [
    { "command": "git restore <file>", "description": "Throw away changes to a file you have not committed yet." }
  ]
}
```

## Common JSON mistakes

- A missing comma between two entries
- An extra comma after the last entry in a list
- Using curly quotes (“ ”) instead of straight quotes (" ")

`node scripts/validate.js` will tell you which entry has the problem.

## Need help?

Ask in your issue, or in the GDSC NIT Rourkela community group. There are no silly questions here.
