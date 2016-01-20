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
    getPhotos
} from "../api/vk"


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

export default albumType