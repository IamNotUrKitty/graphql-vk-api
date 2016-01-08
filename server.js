import express from 'express'
import graphqlHTTP from "express-graphql"
import {Schema} from "./schemas/vk"

const app = express();

app.use('/', graphqlHTTP({ schema: Schema, graphiql: true }));

app.listen(3000,()=>{
    console.log("App started at port 3000");
});