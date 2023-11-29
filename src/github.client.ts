import { context } from "@actions/github";
import { Octokit } from "@octokit/action";

export class GithubClient {
	constructor(private readonly octokit: Octokit) {}

}