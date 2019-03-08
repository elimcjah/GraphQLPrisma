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

const createPostForUser = async (authorId, data) => {
    try {
        const post = await prisma.mutation.createPost({
            data: {
                ...data,
                author: {
                    connect: {
                        id: authorId
                    }
                }
            }
        }, `{ id }`);

        const user = await prisma.query.user({
            where: {
                id: authorId
            }
        }, '{ id name email posts { id title body published }}');

        return user;
    } catch (e) {
                throw new Error(`createPostForUser \n ${e}`);
    }
};

// createPostForUser('cjszcduzk01v60852wh7adro2', {
//     title: '231',
//     body: '231 body',
//     published: true
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });



//
// prisma.query.comments(null, `{id text author { id name } }`).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

// prisma.mutation.createPost({
//     data: {
//         title: '144 Friday Title',
//         body: '144 Friday Body',
//         published: false,
//         author: {
//             connect: {
//                 id: 'cjsz6hlw500ux08521sul7u2j'
//             }
//         }
//     }
// }, `{ id title body published}`).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
//     prisma.query.users(null, `{ id name email posts { id title }}`).then((data) => {
//         console.log(JSON.stringify(data, undefined, 2));
//     });
// })
// prisma.mutation.updatePost({
//     data: {
//         published: true
//     },
//     where: {
//         id: "cjt0j3lkn003u0834jexr4n6c"
//     }
// }, `{ id title body published }`).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });