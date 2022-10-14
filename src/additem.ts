import { Client } from "@notionhq/client";

function offsetTimezone(timeZone: string, date: Date) {
  if (timeZone === "UTC") return date.toISOString();
  const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const tzDate = new Date(date.toLocaleString("en-US", { timeZone }));
  const hour = String((tzDate.getTime() - utcDate.getTime()) / 6e4 / 60);
  let offsetString = "";
  if (hour.length === 1) offsetString = `+0${hour}:00`;
  else if (hour.includes("-")) {
    if (hour.length === 2) offsetString = hour.replace("-", "-0") + ":00";
    else offsetString = `${hour}:00`;
  } else offsetString = `+${hour}:00`;

  return date.toISOString().replace("Z", offsetString);
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
    const datetime = offsetTimezone(timezone, new Date(date));
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
