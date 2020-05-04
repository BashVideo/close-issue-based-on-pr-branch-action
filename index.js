const core = require('@actions/core');
const github = require('@actions/github');

const fs = require('fs')
const ev = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
)
const prNum = ev.pull_request.number
console.log(`pull request ${prNum}`)

const branchName = ev.branchName
console.log(`branch name ${branchName}`) 

branchName.match(/^[0-9]+/)[0]
num = branchName.match(/^[0-9]+/)[0]
message = `Closes #${num}`
