import * as github from "@actions/github";

async function getCommit(token: string, owner: string, repo: string) {
  try {
    const octokit = github.getOctokit(token);

    const { data: commit } = await octokit.rest.repos.listCommits({
      owner: owner,
      repo: repo,
    });
    console.log("Got Response", commit);
  } catch (error) {
    console.error(error);
  }
}

export default getCommit;
