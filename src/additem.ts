import { Client } from "@notionhq/client";

function offsetTimezone(timeZone: string, date: Date) {
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone }));
  return (tzDate.getTime() - utcDate.getTime()) / 6e4;
}

function toIsoString(timeZone: string, date: Date) {
  console.log(date.getTime());
  const offset = offsetTimezone(timeZone, date);
  const timezoneDate = new Date(date.getTime() + offset);
  let tzo = offset,
    dif = tzo >= 0 ? "+" : "-",
    pad = function (num: Number) {
      return (num < 10 ? "0" : "") + num;
    };

  return (
    timezoneDate.getFullYear() +
    "-" +
    pad(timezoneDate.getMonth() + 1) +
    "-" +
    pad(timezoneDate.getDate()) +
    "T" +
    pad(timezoneDate.getHours()) +
    ":" +
    pad(timezoneDate.getMinutes()) +
    ":" +
    pad(timezoneDate.getSeconds()) +
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
  timezone: string = "UTC",
  projectname?: string
) {
  try {
    const datetime = toIsoString(timezone, new Date(date));
    console.log(date, timezone, datetime);
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
