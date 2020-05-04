const core = require('@actions/core');
const { graphql } = require("@octokit/graphql")
const fs = require('fs');

async function updatePullRequestBody(pullRequestId, body) {
  const githubToken = core.getInput('github-token');
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${githubToken}`
    }
  });

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

  await graphqlWithAuth(mutation);
}

async function parseEventAndUpdatePullRequest() {
  // parse Github's description of triggering event
  const ev = JSON.parse(
    fs.readFileSync(process.env.GITHUB_EVENT_PATH, 'utf8')
  );
  
  const pullRequestId = ev.pull_request.node_id;
  let body = ev.pull_request.body;
  
  const branchName = ev.pull_request.head.ref;
  const match = branchName.match(/^[0-9]+/);
  
  if (match == null) {
    return;
  }
  
  const issueNumber = match[0];
  
  if (body.includes(`#${issueNumber}`)) {
    return;
  }
  
  body = body.concat(`\nCloses #${issueNumber}`);
  updatePullRequestBody(pullRequestId, body);
}

parseEventAndUpdatePullRequest();
