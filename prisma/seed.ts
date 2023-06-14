import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'cip@nmnboost.com' },
    update: {},
    create: {
      name: 'Cip',
      email: 'cip@nmnboost.com',
      articles: {
        createMany: {
          data: [
            {
              title: 'Why APIs are dead',
              content: "They're not, but they're not the future either",
              slug: 'why-apis-are-dead',
            },
            {
              title: 'GraphQL is the future',
              content: "It's not, but it's not the past either",
              slug: 'graphql-is-the-future',
            },
            {
              title: 'Frontend is power',
              content:
                'The backend is just a database, frontend is where the magic happens',
              slug: 'frontend-is-power',
            },
            {
              title: 'Serverless for the rescue',
              content: "Don't worry about servers, just write code",
              slug: 'serverless-for-the-rescue',
            },
          ],
        },
      },
    },
  })

  console.log({ user })
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit()
  })
