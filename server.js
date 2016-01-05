import express from 'express'
import {getUser} from "./api/vk"
import graphqlHTTP from "express-graphql"
import {Schema} from "./schemas/vk"
import {graphql} from "graphql"

const app = express();

app.get("/",(req,res)=>{
    let query = `{
            user(uid:91035623){
                last_name
                photo_50
                friends(limit:3){
                    first_name
                    last_name
                 }
                }
            }`;
    graphql(Schema,query).then(result =>{
        res.send(result['data']);
    });
});


app.listen(3000,()=>{
    console.log("App started at port 3000");
});