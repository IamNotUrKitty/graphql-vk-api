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

import {
    getUser,
    getFriends,
    getAlbums,
    getGroups
} from "../api/vk"

import albumType from './albumType'
import friendType from './friendType'
import PersonFields from './fields/personFields'


let userType = new GraphQLObjectType({
    name:"vkUser",
    description:"Vk.com user",
    fields(){
        return  Object.assign({
            photo_50:{type:GraphQLString},
            photo_100:{type:GraphQLString},
            photo_200:{type:GraphQLString},
            albums:{
                args:{
                    count:{
                        type:GraphQLInt,
                        description:"Limit albums"
                    },
                    album_ids:{
                        type:new GraphQLList(GraphQLInt),
                        description:"album_ids to get"
                    }
                },
                type:new GraphQLList(albumType),
                resolve(user, args){
                    return getAlbums(user.id, args.album_ids, args.count)
                }
            },
            friends:{
                args:{
                    count:{
                        type:GraphQLInt,
                        description:"Limit friends"
                    }
                },
                type:new GraphQLList(friendType),
                resolve(user,args,ast){
                    let selection = ast.fieldASTs[0].selectionSet.selections;
                    let fieldsRequest = selection.map(item =>{
                        return item.name.value
                    });
                    return getFriends(user.id, args.count, fieldsRequest)
                }
            }
        }, PersonFields)
    }
});

export default userType;