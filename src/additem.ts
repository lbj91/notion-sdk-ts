import { Client } from "@notionhq/client";

function toIsoString(date: Date) {
  var tzo = -date.getTimezoneOffset(),
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num: Number) {
      return (num < 10 ? "0" : "") + num;
    };

  return (
    date.getFullYear() +
    "-" +
    pad(date.getMonth() + 1) +
    "-" +
    pad(date.getDate()) +
    "T" +
    pad(date.getHours()) +
    ":" +
    pad(date.getMinutes()) +
    ":" +
    pad(date.getSeconds()) +
    dif +
    pad(Math.floor(Math.abs(tzo) / 60)) +
    ":" +
    pad(Math.abs(tzo) % 60)
  );
}

async function addItem(
  client: Client,
  databaseId: string,
  message: string,
  author: string,
  repository: string,
  date: string,
  link: string,
  projectname?: string
) {
  try {
    const datetime = toIsoString(new Date(date));
    console.log(datetime);
    const properties: {
      message: any;
      author: any;
      repository: any;
      url: any;
      date: any;
      project?: any;
    } = {
      message: {
        title: [
          {
            text: {
              content: message,
            },
          },
        ],
      },
      author: {
        rich_text: [
          {
            text: {
              content: author,
            },
          },
        ],
      },
      repository: {
        select: {
          name: repository,
        },
      },
      url: {
        url: link,
      },
      date: {
        date: {
          start: datetime,
        },
      },
    };
    if (projectname) {
      const project = { select: { name: projectname } };
      properties.project = project;
    }
    const response = await client.pages.create({
      parent: { database_id: databaseId },
      properties: properties,
      children: [
        {
          object: "block",
          type: "heading_3",
          heading_3: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: "Commit Content",
                },
              },
            ],
          },
        },
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: message,
                },
              },
            ],
          },
        },
      ],
    });
    console.log(response);
    console.log("Success! Entry added.");
  } catch (error) {
    console.error(error);
  }
}

export default addItem;
