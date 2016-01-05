import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLEnumType
} from 'graphql'

import {getUser, getFriends} from "../api/vk"

let friendType = new GraphQLObjectType({
    name:"friend",
    fields(){
        return {
            uid:{type:GraphQLInt},
            first_name:{type:GraphQLString},
            last_name:{type:GraphQLString}
        }
    }
});

let userType = new GraphQLObjectType({
    name:"vkUser",
    fields(){
        return {
            uid:{type:GraphQLInt},
            first_name:{type:GraphQLString},
            last_name:{type:GraphQLString},
            photo_50:{type:GraphQLString},
            friends:{
                type:new GraphQLList(friendType),
                resolve(user){
                     return getFriends(user.uid)
                }
            }
        }
    }
});

export const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user:{
                type:userType,
                args:{
                  uid:{
                      type:GraphQLInt,
                      description:"uid of user"
                  }
                },
                resolve(root,{uid,fields}){
                    return getUser(uid,fields)
                }
            }
        }
    })
});
