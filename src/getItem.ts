import * as github from "@actions/github";

interface Commit {
  message: string;
  timestamp: string;
  url: string;
  author: string;
  repository: string;
}

async function getPushEvent() {
  try {
    let message: string = "",
      timestamp: string = "",
      url: string = "",
      author: string = "";
    let commitList: Commit[] = [];
    if (github.context.eventName === "push") {
      const pushPayload = github.context.payload;
      console.log("get event", pushPayload);
      const { commits, repository } = pushPayload;
      commits?.forEach((commit: any) => {
        let commitObject: Commit = {
          message,
          timestamp,
          url,
          author,
          repository: "",
        };
        commitObject.message = commit.message;
        commitObject.timestamp = commit.timestamp;
        commitObject.url = commit.url;
        commitObject.author = commit.author.name;
        commitObject.repository = repository?.name ?? "";
        commitList.push(commitObject);
      });
      return commitList;
    }
  } catch (error) {
    console.error(error);
  }
}

export { getPushEvent };
