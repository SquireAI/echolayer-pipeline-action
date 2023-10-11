import { context } from "@actions/github";
import { IGitClient, PullRequestParams } from "@echolayer/echolayer-pipeline-lib";
import { Octokit } from "@octokit/action";

export class GithubClient implements IGitClient {
	constructor(private readonly octokit: Octokit) {}
	async createPullRequest(params: PullRequestParams): Promise<string> {
		const { owner, repo } = context.repo;
		try {
			const pullRequestResult = await this.octokit.pulls.create({
				owner,
				repo,
				head: params.sourceBranch,
				base: params.targetBranch,
				title: params.title,
				body: params.description,
			});
			return pullRequestResult.data.html_url;
		} catch (e) {
			console.error(`Failed to create pull request: ${e}`);
			throw e;
		}
	}
}