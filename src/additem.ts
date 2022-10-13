import { Client } from "@notionhq/client"

async function addItem(client: Client, databaseId: string, message: string, author: string, repository: string, date: string,project: string) {
  try {
    const response = await client.pages.create({
      parent: { database_id: databaseId },
      properties: {
        message: {
          title:[
            {
              text: {
                content: message
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
            name: project
          }
        },
        date: {
          date: {
            start: date
          }
        },
        repository: {
          rich_text:[
            {
              text: {
                content:repository
              }
            }
          ]
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