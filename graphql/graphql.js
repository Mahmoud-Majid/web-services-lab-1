const { ApolloServer, gql } = require('apollo-server');

let articles = [
    { title: "A1", body: "B1" }, 
    { title: "A2", body: "B2" }, 
    { title: "A3", body: "B3" }, 
    { title: "A4", body: "B4" }, 
    { title: "A5", body: "B5" }, 
];

// schema
const typeDefs = gql`
    type Article {
        title: String!
        body: String!
    }
    
    union SearchResult = Article

    # query root type
    type Query {
        # query to fetch all articles
        allArticles (last: Int!): [Article]
        search (keyword: String): SearchResult
    }

    # mutation root type
    type Mutation {
        createArticle (title: String!, body: String!): [Article]
        deleteArticle (title: String!): [Article]
    }
`
const resolvers = {
    Mutation: {
        createArticle: (_, args, ctx) => {
            console.log(args);
            articles.push(args);
            return articles;
        },

        deleteArticle: (_, args, ctx) => {
            console.log("===============");

            console.log(args);
            const result = articles.filter(art => art.title !== args.title);
            console.log("===============");
            articles = result;
            return result;
        }

        
    },
    Query: {
        allArticles: (_, args, ctx) => {
            const result = articles.slice(-args.last);            
            return [...result];
        }
    }
}


const server = new ApolloServer({ 
    typeDefs,
    resolvers
 });
server.listen(3001).then(({ port }) => { console.log('listening on: ', port) });
