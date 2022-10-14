import * as github from "@actions/github";

async function getLastCommit(token: string, owner: string, repo: string) {
  try {
    const octokit = github.getOctokit(token);

    const { data: commit } = await octokit.rest.repos.listCommits({
      owner,
      repo,
    });
    const sha = commit[0]?.sha;
    return sha;
  } catch (error) {
    console.error(error);
  }
}

async function getCommit(
  token: string,
  owner: string,
  repo: string,
  ref: string
) {
  try {
    const octokit = github.getOctokit(token);

    const { data: commit } = await octokit.rest.repos.getCommit({
      owner,
      repo,
      ref,
    });

    // const message = commit?.commit?.message;
    // const author = commit?.author?.login;
    // const url = commit?.html_url;
    console.log(commit);
  } catch (error) {
    console.error(error);
  }
}

export { getLastCommit, getCommit };
