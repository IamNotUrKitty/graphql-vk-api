import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLID
} from 'graphql'


let videoType = new GraphQLObjectType({
   name:"VideoType",
   fields(){
       return {
           id:{type:GraphQLID},
           owner_id:{type:GraphQLID},
           title:{type:GraphQLString},
           description:{type:GraphQLString},
           duration:{type:GraphQLInt},
           views:{type:GraphQLInt},
           comments:{type:GraphQLInt}
       }
   }
});

export default videoType;