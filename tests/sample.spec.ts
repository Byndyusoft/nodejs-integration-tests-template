import "jest-extended";

import { GithubClient, GithubRepository } from "../src/clients/githubClient";
import { privateRepository } from "../src/generators/repositoryGenerator";
import { githubUsername, githubAccessToken } from "../src/config";

const githubClient = new GithubClient(githubUsername, githubAccessToken);

beforeAll(async () => {
  await githubClient.authentificate();
});

describe("github testing", () => {
  let testRepository: GithubRepository;
  const repositoryName = "some-test-repo";

  beforeAll(async () => {
    const repository = privateRepository(repositoryName).withDescription("Repo created from integration tests");

    testRepository = await githubClient.createRepository(repository);
  });

  describe("when repository created", () => {
    test("gets repository by name", async () => {
      const someRepository = await githubClient.getRepository(githubClient.username, repositoryName);
      expect(someRepository).toMatchObject({ name: repositoryName });
    });

    test("shown in user repositories", async () => {
      const userRepositories = await githubClient.getListRepositories();
      expect(userRepositories).toContainValue(expect.objectContaining({ name: testRepository.name }));
    });
  });

  afterAll(async () => {
    await githubClient.deleteRepository(testRepository.name);
  });
});
