const core = require('@actions/core');
const { graphql } = require("@octokit/graphql")
const fs = require('fs');

// parse Github's description of triggering event
const ev = JSON.parse(
  fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
);

const owner = ev.repository.owner.login;
const repo = ev.repository.name;
const pullRequestId = ev.pull_request.id;
let body = ev.pull_request.body;

const branchName = ev.pull_request.head.ref;
const issueNumber = branchName.match(/^[0-9]+/)[0];
const message = `\nCloses #${issueNumber}`;
body = body.concat(message);

const githubToken = core.getInput('github-token')
console.log(`githubToken: ${githubToken}`);
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${githubToken}`
  }
});

console.log(`pullRequestId: ${pullRequestId}`);
const mutation = 
`
mutation updatePullRequestBody {
  updatePullRequest(input: {
    pullRequestId:"${pullRequestId}",
    body:"${body}"
  }) {
    pullRequest {
      id
    }
  }
}
`;
console.log(mutation)

async function mutatePullRequest() {
  const result = await graphqlWithAuth(mutation);
}

mutatePullRequest();

