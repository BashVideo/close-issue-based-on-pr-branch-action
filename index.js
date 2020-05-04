const core = require('@actions/core');
const github = require('@actions/github');

const fs = require('fs');
const ev = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
);

// console.log(ev);
const prNum = ev.pull_request.number;
console.log(`pull request: ${prNum}`);

const branchName = ev.pull_request.head.ref;

branchName.match(/^[0-9]+/)[0];
num = branchName.match(/^[0-9]+/)[0];
message = `Closes #${num}`;
console.log(`message: ${message}`);

