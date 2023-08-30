import { configuration, discoveryPipeline } from "echolayer-pipeline-lib";
import { getInputConfiguration } from "./config";
import { createPR } from "./git";

async function runAction(){
	const options: configuration = getInputConfiguration();
	try {
		await discoveryPipeline(options);
	} catch (e) {
		console.error(e);
		return;
	}
	try {
		await createPR(options);
	} catch (e) {
		console.log(`Error creating PR: ${e}`);
		return;
	}
}

runAction();