import { configuration, discoveryPipeline } from "@echolayer/echolayer-pipeline-lib";
import { getInputConfiguration } from "./config";
import { setFailed } from "@actions/core";

async function runAction(){
	try {
		const options: configuration = getInputConfiguration();
		await discoveryPipeline(options);
	} catch (e) {
		console.error(e);
		setFailed("Error running EchoLayer Pipeline import");
		return;
	}
}

runAction();