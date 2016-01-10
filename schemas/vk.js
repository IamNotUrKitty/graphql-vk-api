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
    getPhotos,
    getGroups
} from "../api/vk"

let friendType = new GraphQLObjectType({
    name:"friend",
    fields(){
        return {
            id:{type:GraphQLID},
            first_name:{type:GraphQLString},
            last_name:{type:GraphQLString},
            city:{type:GraphQLString},
            domain:{type:GraphQLString}
        }
    }
});

let photoType = new GraphQLObjectType({
    name:"Photo",
    description:"User's photo from album",
    fields(){
        return {
            id:{type:GraphQLID},
            photo_75:{type:GraphQLString},
            photo_130:{type:GraphQLString},
            photo_604:{type:GraphQLString}
        }
    }
});

let groupType = new GraphQLObjectType({
    name:"Group",
    description:"User's groups",
    fields(){
        return {
            id:{type:GraphQLInt},
            name:{type:GraphQLString}
        }
    }
});


let albumType = new GraphQLObjectType({
   name:"userAlbum",
   description:"User's photo albums",
   fields(){
       return {
            owner_id:{type:GraphQLID},
            id:{type:GraphQLString},
            title:{type:GraphQLString},
            thumb_id:{type:GraphQLInt},
            description:{type:GraphQLString},
            created:{type:GraphQLInt},
            updated:{type:GraphQLInt},
            size:{type:GraphQLInt},
            photos:{
                args:{
                    count:{
                        type:GraphQLInt,
                        description:"Limit albums"
                    }
                },
                type:new GraphQLList(photoType),
                resolve(album,args){
                    return getPhotos(album.owner_id, album.id, args.count)
                }
            }
       }
   }
});


let userType = new GraphQLObjectType({
    name:"vkUser",
    description:"Vk.com user",
    fields(){
        return  {
            id:{type:GraphQLID},
            first_name:{type:GraphQLString},
            last_name:{type:GraphQLString},
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
            },
            groups:{
                type:new GraphQLList(groupType),
                resolve(user){
                    return getGroups(user.id)
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
