import { InputOptions, getInput } from "@actions/core";
import { context } from "@actions/github";
import { configuration, parseFile, validateMinimalModuleOptions, moduleDefaults } from "@echolayer/echolayer-pipeline-lib";
import { Octokit } from "@octokit/action";
import _ from "lodash";
import { GithubClient } from "./github.client";

export function getInputConfiguration(): configuration {
	const moduleConfigPath = getInputWithDefault("moduleConfigPath", ".github/config/echolayer.yml");
	console.log(`Using module config path: ${moduleConfigPath}`);
	const fileContents = parseFile(moduleConfigPath);

	const moduleInputs = validateMinimalModuleOptions(fileContents);
	const moduleOptions = moduleInputs.map((module) => {
		// Apply any module inputs to the defaults
		// Start with a blank object to avoid mutating the defaults
		return _.merge({}, moduleDefaults[module.type], module);
	});
	console.log("Using module config: ", moduleOptions);
	const githubClient = new GithubClient(new Octokit());
	return {
		basePath: getInputWithDefault("GITHUB_WORKSPACE", process.cwd()),
		apiPath: getInput("apiPath", { required: true }),
		apiKey: getInputWithDefault("apiKey", "https://api.echolayer.com/api"),
		defaultBranch: getInputWithDefault("branch", "main"),
		remoteUrl: `${context.serverUrl}/${context.repo.owner}/${context.repo.repo}.git`,
		source: "GitHub",
		pullBranchName: getInputWithDefault("pullBranchName", "EchoLayerPipeline"),
		commitPrefix: getInputWithDefault("commitPrefix", "*chore*"),
		daysToAnalyze: Number(getInputWithDefault("daysToAnalyze", "365")),
		modules: moduleOptions
	}
}

function getInputWithDefault(name: string, defaultValue: string, options?: InputOptions): string {
	const input = getInput(name, options);
	return input !== "" ? input : defaultValue;
}