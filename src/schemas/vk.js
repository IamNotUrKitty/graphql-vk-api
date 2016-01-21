import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} from 'graphql'

import {
    getUser,
    getAudio
} from "../api/vk"

import userType from './userType'
import audioType from './audioType'
import {count, user_id} from './utils/utils'

export const Schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'RootQueryType',
        fields: {
            user:{
                type:userType,
                args:{
                  user_id:{
                      type:new GraphQLNonNull(GraphQLString),
                      description:"id/screen_name of user"
                  }
                },
                resolve(root,{user_id},ast){
                    let selection = ast.fieldASTs[0].selectionSet.selections;
                    let fieldsRequest = selection.map(item => item.name.value );
                    let id = user_id ? user_id : '1';
                    return getUser(id,fieldsRequest)
                }
            },
            audio:{
                type: new GraphQLList(audioType),
                args:{
                    count,
                    user_id:{
                        type:new GraphQLNonNull(GraphQLString),
                        description:"id/screen_name of user"
                    }
                },
                resolve(root, args, ast){
                    return getAudio(args.user_id, args.count)
                }
            }
        }
    })
});
