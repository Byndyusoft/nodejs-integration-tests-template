import { GithubRepository } from "../clients/githubClient";

export class RepositoryGenerator implements GithubRepository {
  name: string;
  description: string;
  private: boolean;

  constructor(name: string) {
    this.name = name;
    this.description = "";
  }

  withName(repositoryName: string): RepositoryGenerator {
    this.name = repositoryName;
    return this;
  }

  withDescription(description: string): RepositoryGenerator {
    this.description = description;
    return this;
  }

  withPrivateType(): RepositoryGenerator {
    this.private = true;
    return this;
  }

  withPublicType(): RepositoryGenerator {
    this.private = false;
    return this;
  }
}

export const privateRepository = (name: string): RepositoryGenerator => new RepositoryGenerator(name).withPrivateType();
export const publicRepository = (name: string): RepositoryGenerator => new RepositoryGenerator(name).withPublicType();
