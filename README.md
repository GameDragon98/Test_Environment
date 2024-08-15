
---

# CI/CD Pipeline for Node.JS/Express.JS Application with GitHub Actions and Vercel

This repository demonstrates a Continuous Integration and Continuous Deployment (CI/CD) pipeline setup for a Node.js application using GitHub Actions and Vercel. The purpose is to automate the workflow from code commit to deployment, ensuring efficient and error-free releases.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [CI/CD Pipeline Details](#cicd-pipeline-details)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project showcases a CI/CD pipeline for a Node.js application. The pipeline is built using GitHub Actions for continuous integration and Vercel for continuous deployment. This setup allows automatic testing and deployment of the application whenever changes are pushed to the repository.

## Prerequisites

Before you begin, ensure you have the following:

- Node.js installed
- A GitHub account
- A Vercel account
- Basic knowledge of Git and GitHub

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/prashant1879/ci-cd-nodejs-pipeline-github-with-vercel.git
   cd ci-cd-nodejs-pipeline-github-with-vercel
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env` file in the root directory and add your environment variables. Example:

   ```bash
   PORT=3000
   NODE_ENV=development
   ```

4. **Configure Vercel**

   - Link your GitHub repository to Vercel.
   - Set the build and output settings in Vercel dashboard to match your project setup.

5. **GitHub Secrets**

   Add necessary secrets in your GitHub repository settings (e.g., VERCEL_TOKEN, VERCEL_PROJECT_ID) for the GitHub Actions to deploy to Vercel.

## Usage

- **Start Development Server**

  ```bash
  npm run dev
  ```

## CI/CD Pipeline Details

The CI/CD pipeline is defined in the `.github/workflows/main.yml` file.

### Workflow Steps

1. **Trigger on Push or Pull Request**
2. **Set Up Node.js Environment**
3. **Install Dependencies**
4. **Run Tests**
5. **Build Application**
6. **Deploy to Vercel**

### Example Workflow File

```yaml
name: Vercel development Deployment
env:
  #THIS IS PROJECT INFORMATION WHICH COMES FROM .VERCEL/PROJECT.JSON FILE.
  # THIS KEY VALUE STORE IN GITHUB ACTION. 
  # GITHUB.COM > SETTINGS > SECRETS AND VARIABLES > ACTIONS > REPOSITORY SECRETS.
  VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
on:
  push:
    branches:
      - main
jobs:
  Deploy-development:
    runs-on: ubuntu-latest
    steps:
      #INSTALL NODEJS & NPM ON VERCEL
      - uses: actions/checkout@v2
      - name: Install Node.js
        uses: actions/setup-node@v3

      - name: Install npm
        uses: actions/setup-node@v3
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org/'
      #INSTALL DEPENDENCIES
      - name: Install dependencies
        run: npm install  
      #INSTALL VERCEL CLI IN SERVER.
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      #SET ENVIRONMENT IN VERCEL. 
      #CREATE ENVIRONMENT IN VERCEL & BUILD IN VERCEL.
      # GITHUB.COM > SETTINGS > SECRETS AND VARIABLES > ACTIONS > ENVRIONEMENT SECRETS.
      - name: Pull Vercel Environment Information
        run: vercel pull --yes --environment=development --token=${{ secrets.VERCEL_TOKEN }}
      - name: Build Project Artifacts
        run: vercel build --prod --token=${{ secrets.VERCEL_TOKEN }}
      - name: Deploy Project Artifacts to Vercel  
        run: vercel deploy --prebuilt --prod --token=${{ secrets.VERCEL_TOKEN }} 

```

## Project Structure

```bash
.
├── .github
│   └── workflows
│       └── main.yml        # GitHub Actions workflow file
├── index.js                # Main application file
├── .env                    # Environment variables
├── package.json            # Node.js dependencies and scripts
├── README.md               # Project documentation
└── vercel.json             # vercel run file.
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. Feel free to customize this project. You can contact me on [skype](skype:prashant1879).

---# Test_Environment
