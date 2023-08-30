import { InputOptions, getInput } from "@actions/core";
import { context } from "@actions/github";
import { BackstageOptions, configuration, defaultBackstageOptions } from "echolayer-pipeline-lib";

export function getInputConfiguration(): configuration {
	const backstageOptions: BackstageOptions = {
		...defaultBackstageOptions,
		moduleGlob: getInputWithDefault("moduleGlob", defaultBackstageOptions.moduleGlob),
	}
	return {
		basePath: getInputWithDefault("GITHUB_WORKSPACE", process.cwd()),
		apiPath: getInput("apiPath", { required: true }),
		apiKey: getInput("apiKey", { required: true }),
		branch: getInputWithDefault("branch", "main"),
		repoName: context.repo.repo,
		repoUrl: `${context.serverUrl}/${context.repo.owner}`,
		pullBranchName: getInputWithDefault("pullBranchName", "EchoLayerPipeline"),
		commitPrefix: getInputWithDefault("commitPrefix", "*chore*"),
		modules: [ backstageOptions ]
	}
}

function getInputWithDefault(name: string, defaultValue: string, options?: InputOptions): string {
	const input = getInput(name, options);
	return input !== "" ? input : defaultValue;
}