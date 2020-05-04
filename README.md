# close-issue-based-on-pr-branch-action
An action triggered by a PR that looks at branch number and appends "closes #xx" to the description

Example usage:
```
on: 
  pull_request:
    branches:
      - master

jobs:
  hello_world_job:
    runs-on: ubuntu-latest
    name: A job to say hello
    steps:
      - name: Edit PR description
        id: pr
        uses: MoonriseCo/close-issue-based-on-pr-branch-action@master
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```