# close-issue-based-on-pr-branch-action
An action triggered by a PR that looks at branch number and appends "closes #xx" to the description.
It uses the leading digits of the branch name as the issue number.

Example usage:
```
on: 
  pull_request:
    branches:
      - master

jobs:
  update_pull_request:
    runs-on: ubuntu-latest
    steps:
      - name: Update pull request
        id: pr
        uses: MoonriseCo/close-issue-based-on-pr-branch-action@master
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
```