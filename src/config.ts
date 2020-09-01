import { config as dotenvConfig } from "dotenv";

if ((process.env.NODE_ENV || "").toLowerCase() === "dev") {
  const result = dotenvConfig();
  if (result.error) throw result.error;
}

export const githubUsername = process.env.GITHUB_USERNAME;
export const githubAccessToken = process.env.GITHUB_ACCESS_TOKEN;
