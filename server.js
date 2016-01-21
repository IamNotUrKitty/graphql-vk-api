import express from 'express'
import graphqlHTTP from "express-graphql"
import vkGraphQl from './src/vk-graphql'

const app = express();

app.use('/', graphqlHTTP({ schema: vkGraphQl.Schema, graphiql: true }));

app.listen(3000,()=>{
    console.log("App started at port 3000");
});