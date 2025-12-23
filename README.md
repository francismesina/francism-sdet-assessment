# Heart and Spade Ventures - Junior SDET Assessment

## Overview
This project contains automated tests for the Playwright documentation site and an external authentication service, demonstrating proficiency with Playwright, TypeScript, and the Page Object Model pattern.

## Project Structure
```
├── tests/           # All Playwright test files (*.spec.ts)
├── POM/            # Page Object Model classes
├── playwright.config.ts
├── tsconfig.json
└── package.json
```

## Prerequisites
- Node.js 18+ 
- npm or yarn

## Setup
1. Clone this repository
2. Install dependencies: `npm install`
3. Install Playwright browsers: `npx playwright install`

## Running Tests
- All tests: `npm test`
- Headed mode: `npm run test:headed`
- Debug mode: `npm run test:debug`
- UI mode: `npm run test:ui`

## Authentication Service Setup
For authentication tests, clone and run:
```bash
git clone https://github.com/SmailBestybay/express-jwt-app
cd express-jwt-app
npm install
npm start
```

## Test Coverage
### Playwright Documentation Site
- H1 assertion test
- Search navigation test 
- Footer regex assertion
- Visual testing with locators
- Component state validation

### Authentication Service
- Login through UI
- Invalid credentials validation
- Auth token login

## Manual Test Cases
Manual test cases are documented in Google Sheets following the required format.