# SonarCloud GitHub Actions Sample Application

A sample Node.js / Express application configured for **SonarCloud** code quality, SAST security analysis, code coverage, and PR decoration via **GitHub Actions**.

---

## 📁 Repository Structure

```text
├── .github/
│   └── workflows/
│       └── sonarcloud.yml              # GitHub Actions workflow for SonarCloud scan
├── src/
│   ├── app.js                          # Express app entry point
│   └── routes/
│       └── sample.routes.js            # Sample routes & quality/security test patterns
├── test/
│   └── app.test.js                     # Unit tests
├── sonar-project.properties            # SonarCloud project configuration
├── .gitignore
├── package.json
└── README.md
```

---

## 🔑 Setup Instructions for SonarCloud

### 1. Import Repository in SonarCloud
1. Go to [sonarcloud.io](https://sonarcloud.io) and log in with your GitHub account.
2. Click **+** (top right) > **Analyze new project**.
3. Select your GitHub Organization and import this repository.
4. Set the **Analysis Method** to **GitHub Actions**.

### 2. Configure GitHub Secrets
In your GitHub repository, go to **Settings** > **Secrets and variables** > **Actions** > **New repository secret**:

| Secret Name | Value | Description |
| :--- | :--- | :--- |
| `SONAR_TOKEN` | `sqp_1234567890abcdef...` | Token generated from SonarCloud (**Account > Security > Generate Token**) |

*(Note: `GITHUB_TOKEN` is automatically provided by GitHub Actions for PR comments/decoration).*

### 3. Update `sonar-project.properties`
Open [sonar-project.properties](file:///Users/sumeshj/Documents/Brototype/team-project/learnings/veracode-scan/sonar-project.properties) and replace the placeholders with values from your SonarCloud project dashboard:

```properties
sonar.organization=YOUR_ORGANIZATION_KEY
sonar.projectKey=YOUR_PROJECT_KEY
```

---

## 📊 Where to View Scan Results

### 1. SonarCloud Web Dashboard (Comprehensive Report)
- Visit [sonarcloud.io](https://sonarcloud.io) and open your project dashboard:
  - **URL Format**: `https://sonarcloud.io/project/overview?id=YOUR_PROJECT_KEY`
  - **What you see**:
    - **Quality Gate Status**: Passed / Failed.
    - **Security & SAST**: Vulnerabilities, Security Hotspots (e.g. unescaped HTML, dangerous `eval`).
    - **Reliability & Maintainability**: Bugs, Code Smells, Technical Debt.
    - **Coverage & Duplications**: Exact line-by-line coverage and duplicate blocks.

### 2. GitHub Pull Requests (PR Comments & Inline Annotations)
- **PR Conversation**: SonarCloud automatically posts a summary comment with Quality Gate metrics and status.
- **Files Changed**: SonarCloud annotates exact lines of code with code smells, vulnerabilities, or missed coverage.
- **Checks Tab**: View the SonarCloud check status and a one-click link to the cloud report.

### 3. GitHub Actions Execution Logs
- In GitHub, navigate to **Actions** > select the latest workflow run > click **SonarCloud Scan**.
- The log output prints the analysis summary and a direct link:
  ```text
  INFO: ANALYSIS SUCCESSFUL, you can browse https://sonarcloud.io/dashboard?id=...
  ```

---

## 🚀 Workflow Details (`.github/workflows/sonarcloud.yml`)

1. **Full History Fetch**: Clones with `fetch-depth: 0` for accurate Git blame, new code detection, and PR line decoration.
2. **Automated Code Coverage**: Executes `npm run test:coverage` to produce `coverage/lcov.info`.
3. **SonarCloud Action**: Uses official `sonarsource/sonarcloud-github-action@v3` to upload metrics, test coverage, bugs, vulnerabilities, and code smells to SonarCloud.

---

## 💻 Local Testing & Coverage

```bash
# Install dependencies
npm install

# Run app locally
npm start

# Run unit tests
npm test

# Run tests and generate LCOV coverage report
npm run test:coverage
```
