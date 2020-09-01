module.exports = {
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-extended"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
};
