# TypeScript template for integration tests

## Preparation
Tests require [Github Access Token](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) at environment variables with grants to **create**, **read**, and **delete** repositories. 

Environment variables can be set by creating `.env` file in root directory with variables from `.env.example` file.

## Locally running
To run tests execute the following commands in your terminal:

```
npm install
npm run test:dev
```

