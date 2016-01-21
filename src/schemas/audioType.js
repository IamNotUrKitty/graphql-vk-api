import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLID
} from 'graphql'


let audioType = new GraphQLObjectType({
   name:"AudioType",
   fields(){
       return {
           id:{type:GraphQLID},
           owner_id:{type:GraphQLID},
           artist:{type:GraphQLString},
           title:{type:GraphQLString},
           duration:{type:GraphQLInt},
           lyrics_id:{type:GraphQLID},
           genre_id:{type:GraphQLInt}
       }
   }
});

export default audioType;