import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLEnumType
} from 'graphql'

import {
    getUser,
    getFriends,
    getAlbums,
    getPhotos
} from "../api/vk"

let friendType = new GraphQLObjectType({
    name:"friend",
    fields(){
        return {
            id:{type:GraphQLInt},
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
            id:{type:GraphQLString},
            photo_75:{type:GraphQLString},
            photo_130:{type:GraphQLString},
            photo_604:{type:GraphQLString}
        }
    }
});


let albumType = new GraphQLObjectType({
   name:"userAlbum",
   description:"User's photo albums",
   fields(){
       return {
            owner_id:{type:GraphQLInt},
            id:{type:GraphQLString},
            title:{type:GraphQLString},
            thumb_id:{type:GraphQLInt},
            description:{type:GraphQLString},
            created:{type:GraphQLString},
            updated:{type:GraphQLString},
            size:{type:GraphQLInt},
            photos:{
                type:new GraphQLList(photoType),
                resolve(album){
                    return getPhotos(album.owner_id, album.id)
                }
            }
       }
   }
});

let followers_count = {
    type:GraphQLInt,
    description:"Count of user followers"
};

let userType = new GraphQLObjectType({
    name:"vkUser",
    description:"Vk.com user",
    fields(){
        return  {
            id:{type:GraphQLInt},
            first_name:{type:GraphQLString},
            last_name:{type:GraphQLString},
            photo_50:{type:GraphQLString},
            photo_100:{type:GraphQLString},
            photo_200:{type:GraphQLString},
            albums:{
                args:{
                    limit:{
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
                    let limit = args.limit || "";
                    return getAlbums(user.id, "", limit)
                }
            },
            friends:{
                args:{
                  limit:{
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
                     let limit = args.limit||"";
                     return getFriends(user.id, limit, fieldsRequest)
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
