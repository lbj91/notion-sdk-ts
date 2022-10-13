import { Client } from "@notionhq/client"

async function addItem(client: Client, databaseId: string, message: string, author: string, repository: string, date: string) {
  try {
    const response = await client.pages.create({
      parent: { database_id: databaseId },
      properties: {
        message: {
          title:[
            {
              "text": {
                "content": message
              }
            }
          ],
        },
        author: {
          rich_text: [
            {
              text: {
                content: author
              }
            }
          ]
        },
        project: {
          select: {
            name: repository
          }
        },
        date: {
          date: {
            start: date
          }
        }
      },
    })
    console.log(response)
    console.log("Success! Entry added.")
  } catch (error) {
    console.error(error)
  }
}

export default addItem;