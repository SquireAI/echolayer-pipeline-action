"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const inputName = (0, core_1.getInput)("name");
greet(inputName, getRepoUrl(github_1.context));
function greet(name, repoUrl) {
    console.log(`'Hello ${name}! You are running a GH Action in ${repoUrl}'`);
}
function getRepoUrl({ repo, serverUrl }) {
    return `${serverUrl}/${repo.owner}/${repo.repo}`;
}
//# sourceMappingURL=index.js.map