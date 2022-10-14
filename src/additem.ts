import { Client } from "@notionhq/client";

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
    // const datetime = new Date(date).toLocaleString("UTC", {
    //   timeZone: timezone,
    // });
    const datetime = new Date(date).toISOString();
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
      const project = { project: { select: { name: projectname } } };
      properties.project = project;
    }
    const response = await client.pages.create({
      parent: { database_id: databaseId },
      properties,
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
