import { configuration, discoveryPipeline } from "echolayer-pipeline-lib";
import { getInputConfiguration } from "./config";
import { createPR } from "./git";
import { setFailed } from "@actions/core";

async function runAction(){
	const options: configuration = getInputConfiguration();
	try {
		await discoveryPipeline(options);
	} catch (e) {
		console.error(e);
		setFailed("Error running EchoLayer Pipeline import");
		return;
	}
	try {
		await createPR(options);
	} catch (e) {
		console.error(e);
		setFailed("Error creating PR");
		return;
	}
}

runAction();