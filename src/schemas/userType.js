import {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLEnumType,
    GraphQLID
} from 'graphql'

import {
    getFriends,
    getAlbums,
    getGroups,
    getAudio,
    getVideo
} from "../api/vk"

import albumType from './albumType'
import friendType from './friendType'
import PersonFields from './fields/personFields'
import audioType from './audioType'
import videoType from './videoType'
import {count} from './utils/utils'


let userType = new GraphQLObjectType({
    name: "vkUser",
    description: "Vk.com user",
    fields(){
        return Object.assign({
            albums: {
                args: {
                    count,
                    album_ids: {
                        type: new GraphQLList(GraphQLInt),
                        description: "album_ids to get"
                    }
                },
                type: new GraphQLList(albumType),
                resolve(user, args){
                    return getAlbums(user.id, args.album_ids, args.count)
                }
            },
            friends: {
                args: {count},
                type: new GraphQLList(friendType),
                resolve(user, args, ast){
                    let selection = ast.fieldASTs[0].selectionSet.selections;
                    let fieldsRequest = selection.map(item => {
                        return item.name.value
                    });
                    return getFriends(user.id, args.count, fieldsRequest)
                }
            },
            audio:{
                args:{count},
                type:new GraphQLList(audioType),
                resolve(user,args){
                    return getAudio(user.id, args.count)
                }
            },
            video:{
                args:{count},
                type:new GraphQLList(videoType),
                resolve(user, args){
                    return getVideo(user.id, args.count)
                }
            }
        }, PersonFields)
    }
});

export default userType;