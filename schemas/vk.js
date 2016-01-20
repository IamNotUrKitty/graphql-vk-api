import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLEnumType,
    GraphQLID
} from 'graphql'

import {getUser} from "../api/vk"

import userType from './userType'

export const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user:{
                type:userType,
                args:{
                  user_id:{
                      type:GraphQLString,
                      description:"id/screen_name of user"
                  }
                },
                resolve(root,{user_id},ast){
                    let selection = ast.fieldASTs[0].selectionSet.selections;
                    let fieldsRequest = selection.map(item =>{
                       return item.name.value
                    });
                    let id = user_id ? user_id : '1';
                    return getUser(id,fieldsRequest)
                }
            }
        }
    })
});
