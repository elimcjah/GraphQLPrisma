const Query = {
    me() {
        return {
            id: '123098',
            name: 'Michael',
            email: 'Michael@gmail.com'
        };
    },
    post() {
        return {
            id: '123487',
            title: 'The Thing',
            body: 'Lorem Ipsum',
            published: true,
            author: '2'
        }
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {};

        if(args.query) {
            opArgs.where = {
                OR: [{
                    title_contains: args.query
                }, {
                    body_contains: args.query
                }]
            }
        }
        return prisma.query.posts(opArgs, info);
    },
    users(parent, args, { prisma }, info) {
        const opArgs = {};

        if(args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }, {
                    email_contains: args.query
                }]
            }
        }
        return prisma.query.users(opArgs, info);
    },
    comments(parent, args, { prisma }, info) {
        return prisma.query.comments(null, info);
    },
};

export { Query as default};