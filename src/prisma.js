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
        return post.author;
    } catch (e) {
        throw new Error(`createPostForUser ${e}`);
    }
};

// createPostForUser('cjszcduzk01v60852wh7adro2', {
//     title: '6:21pm Friday',
//     body: '6:21pm Friday',
//     published: true
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// }).catch((error) => {
//     console.log('createPostForUser Error ', error.message)
// });

const updatePostForUser = async (postId, data) => {
    try {
        const postExists = await prisma.exists.Post({id: postId});
        if(!postExists) {
            throw new Error(`Post with id of ${postId} not found.`)
        }
        const post = await prisma.mutation.updatePost({
           data: {
               ...data
           },
            where: {
               id: postId
            }
        }, `{ id author { id name email posts { id title published }}}`);
        return post.author;
    } catch (error) {
        throw new Error(`updatePostForUser ${error}`)
    }
};

// updatePostForUser('cjt4l34mp00yt0834aqr8wi7x', {
//     title: '1055 Monday',
//     body: '1055 Monday',
//     published: true
// }).then((data) => {
//     console.log(JSON.stringify(data, undefined, 2));
// }).catch((error) => {
//     throw new Error(`updatePostForUser ${error}`);
// });
