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

import {apiRequest} from "../api/vk"
import {offset,count} from './utils/utils'

let photoType = new GraphQLObjectType({
    name:"Photo",
    description:"User's photo from album",
    fields(){
        return {
            id:{type:GraphQLID},
            photo_75:{type:GraphQLString},
            photo_130:{type:GraphQLString},
            photo_604:{type:GraphQLString},
            date:{type:GraphQLString},
            width:{type:GraphQLInt},
            height:{type:GraphQLInt},
            text:{type:GraphQLString}
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
                args:{count,offset},
                type:new GraphQLList(photoType),
                resolve(album,args){
                    return apiRequest('photos.get',{
                        owner_id:album.owner_id,
                        album_id:album.id,
                        count:args.count
                    }).then(result =>result['items'])
                }
            }
        }
    }
});

export default albumType