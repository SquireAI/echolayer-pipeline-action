import { context } from "@actions/github";
import { Octokit } from "@octokit/action";
import { configuration } from "echolayer-pipeline-lib";

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
	try {
		await octokit.pulls.create({
			owner,
			repo,
			head: options.pullBranchName,
			base: options.branch,
			title: `${options.commitPrefix} Updates from EchoLayer Pipeline`,
		});
	} catch	(e) {
		console.log(`Error creating PR: ${e}`);
		return;
	}

}