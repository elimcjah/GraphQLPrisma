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
        const userExists = await prisma.exists.User({id: authorId});
        if (!userExists) {
            throw new Error(`User not found`);
        }

        const post = await prisma.mutation.createPost({
            data: {
                ...data,
                author: {
                    connect: {
                        id: authorId
                    }}}},
            `{ author { id name email posts { id title published } } }`
        );

        console.log('post.author === ', post.author.id);
        return post.author.id;
    } catch (e) {
        throw new Error(`createPostForUser ${e}`);
    }
};


createPostForUser('cjszcduzk01v60852wh7adro2', {
    title: '6:21pm Friday',
    body: '6:21pm Friday',
    published: true
}).then((data) => {
    console.log(JSON.stringify(data, undefined, 2));
});

const updatePostForUser = async (postId, data) => {
    try {
        const post = await prisma.mutation.updatePost({
           data: {
               ...data
           },
            where: {
               id: postId
            }
        }, `{ author { id }}`);
        const user = await prisma.query.user({
            where: {
                id: post.author.id
            }
        }, '{ id name email posts { id title body published }}');
        return user;
    } catch (e) {
        throw new Error(`updatePostForUser ${e}`)
    }

};

// prisma.exists.Comment({
//     id: 'cjszc6icw01rx0852h19ucaoj',
//     text: '2nd Comment',
//     author: {
//         id: 'cjsz6hlw500ux08521sul7u2j'
//     }
// }).then((exists) => {
//     console.log(exists);
// }).catch((e) => {
//     throw new Error(`prisma.exists.Comment ${e}`)
// });

// updatePostForUser('cjsz6x7bh00ys08526vtdvpel', {
//     title: '253 Friday',
//     body: '253 Friday',
//     published: true
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// });

