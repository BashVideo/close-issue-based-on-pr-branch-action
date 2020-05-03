const core = require('@actions/core');
const github = require('@actions/github');

const fs = require('fs')
const ev = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
)
const prNum = ev.pull_request.number
console.log(`pull request ${prNum}`)
