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

    const message = commit?.commit?.message;
    const author = commit?.commit?.author?.name;
    const date = commit?.commit?.author?.date;
    const url = commit?.html_url;
    return { message, author, date, url };
  } catch (error) {
    console.error(error);
  }
}

async function getPushEvent(token: string) {
  try {
    const octokit = github.getOctokit(token);
    let message: string = "",
      timestamp: string = "",
      url: string = "",
      author: string = "";
    console.log("get context??", github.context.eventName);
    if (github.context.eventName === "push") {
      const pushPayload = github.context.payload;
      console.log("get event", pushPayload);
      const { commits, repository } = pushPayload;
      commits?.forEach((commit: any) => {
        message = commit.message;
        timestamp = commit.timestamp;
        url = commit.url;
        author = commit.author.name;
      });
      const repo = repository?.name ?? "";
      return { message, timestamp, url, author, repo };
    }
  } catch (error) {
    console.error(error);
  }
}

export { getLastCommit, getCommit, getPushEvent };
