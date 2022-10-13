import { Client } from "@notionhq/client";
import { brotliDecompressSync } from "zlib";

async function addItem(
  client: Client,
  databaseId: string,
  message: string,
  author: string,
  repository: string,
  date: string,
  project: string,
  branch: string,
  body: string,
  link: string
) {
  try {
    const response = await client.pages.create({
      parent: { database_id: databaseId },
      properties: {
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
        project: {
          select: {
            name: project,
          },
        },
        date: {
          date: {
            start: date,
          },
        },
        repository: {
          select: {
            name: repository,
          },
        },
        branch: {
          select: {
            name: branch,
          },
        },
      },
      children: [
        {
          object: "block",
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: body,
                  link: { url: link },
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
