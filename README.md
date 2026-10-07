# Open Source Starter Kit

A beginner's guide to open source, built by students of NIT Rourkela with GDSC NIT Rourkela.

**Live site:** https://YOUR-ORG.github.io/open-source-starter-kit

The site has three parts:

- **Cheat sheet:** the Git commands you need for your first contribution
- **Glossary:** open source words like fork, branch, and pull request, explained simply
- **Resources:** hand-picked guides, games, and places to find beginner-friendly issues

This project is made for first-time contributors. If you have never opened a pull request before, you are in the right place.

## Setup

1. Fork this repository using the **Fork** button at the top right.
2. Clone the repositry to your computer:

   ```bash
   git clone https://github.com/<your-username>/open-source-starter-kit.git
   cd open-source-starter-kit
   ```

3. Start a local server inside the project folder:

   ```bash
   python -m http.server 8000
   ```

   Or use the **Live Server** extension in VS Code.

4. Open http://localhost:8000 in your browser.

> Opening `index.html` directly will not load the content. Browsers block pages from reading the `data/` folder that way, so use a local server.

## How the project is organized

```
data/               All the content. Most contributions only change these files.
  glossary.json     Glossary terms
  resources.json    Learning resources
  cheatsheet.json   Git commands
assets/css/         Styles
assets/js/main.js   Reads the JSON files and builds the pages
scripts/validate.js Checks the data files for mistakes
*.html              The four pages of the site
```

## Contributing

We would love your help. Start here:

1. Read [CONTRIBUTING.md](CONTRIBUTING.md). It takes 5 minutes.
2. Find an issue labeled [`good first issue`](https://github.com/YOUR-ORG/open-source-starter-kit/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22).
3. Comment on it to ask for it, and wait to be assigned.

Please also read our [Code of Conduct](CODE_OF_CONDUCT.md).

## Contributors

Everyone whose pull request is merged appears here automatically.

<a href="https://github.com/YOUR-ORG/open-source-starter-kit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=YOUR-ORG/open-source-starter-kit" alt="Contributors">
</a>

## License

[MIT](LICENSE)
