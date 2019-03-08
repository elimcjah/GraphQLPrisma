import { Prisma } from 'prisma-binding';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
});

/**
 * prisma.query
 * prisma.mutation
 * prisma.subscription
 * prisma.exists
 * */

//
// prisma.query.comments(null, `{id text author { id name } }`).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

prisma.mutation.createPost({
    data: {
        title: '137 Friday Title',
        body: '137 Friday Body',
        published: true,
        author: {
            connect: {
                id: 'cjsz6hlw500ux08521sul7u2j'
            }
        }
    }
}, `{ id title body published}`).then((data) => {
    console.log(JSON.stringify(data, undefined, 2));
    prisma.query.users(null, `{ id name email posts { id title }}`).then((data) => {
        console.log(JSON.stringify(data, undefined, 2));
    });
})