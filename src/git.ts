import { context } from "@actions/github";
import { Octokit } from "@octokit/action";
import { configuration } from "@echolayer/echolayer-pipeline-lib";

export async function createPR(options: configuration){
	const octokit = new Octokit();
	const { owner, repo } = context.repo;
	try {
		const branch = await octokit.repos.getBranch({
			owner,
			repo,
			branch: options.pullBranchName
		});
	} catch (e) {
		console.log(`No changes. Skipping PR creation.`);
		return;
	}
	await octokit.pulls.create({
		owner,
		repo,
		head: options.pullBranchName,
		base: options.defaultBranch,
		title: `${options.commitPrefix} Updates from EchoLayer Pipeline`,
	});
}