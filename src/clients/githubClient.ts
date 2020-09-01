import axios, { AxiosInstance, AxiosError } from "axios";
import Axios from "axios";

export class GithubClient {
  isAuthentificated: boolean;
  username: string;
  accessToken: string;
  apibaseUrl = "https://api.github.com";

  private axiosClient: AxiosInstance;

  constructor(username: string, accessToken: string) {
    this.isAuthentificated = false;
    this.username = username;
    this.accessToken = accessToken;

    this.axiosClient = axios.create({
      baseURL: "https://api.github.com",
      headers: {
        accept: "application/vnd.github.v3+json",
      },
      auth: {
        username: this.username,
        password: this.accessToken,
      },
    });
  }

  /**
   * Just for example
   */
  async authentificate(): Promise<boolean> {
    this.isAuthentificated = true;
    return true;
  }

  async getRepository(owner: string, repositoryName: string): Promise<GithubRepository | null> {
    let repo: GithubRepository;
    try {
      const { data } = await this.axiosClient.get(`/repos/${owner}/${repositoryName}`);
      repo = data;
    } catch (error) {
      console.error(error);
      return null;
    }

    return repo;
  }

  async getListRepositories(): Promise<GithubRepository[]> {
    const { data } = await this.axiosClient.get("/user/repos", {
      params: {
        type: "owner",
      },
    });

    if (!data) return [];

    return data.map((x: GithubRepository) => ({ name: x.name, description: x.description, private: x.private }));
  }

  async createRepository(repository: GithubRepository): Promise<GithubRepository> {
    const { data } = await this.axiosClient.post("/user/repos", { ...repository, auto_init: true });
    return { name: data.name, description: data.description, private: data.private };
  }

  async deleteRepository(repositoryName: string): Promise<void> {
    await this.axiosClient.delete(`/repos/${this.username}/${repositoryName}`);
  }
}

export interface GithubRepository {
  name: string;
  description: string;
  private: boolean;
}
