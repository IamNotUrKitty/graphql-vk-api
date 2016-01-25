import {
    GraphQLID,
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType
} from 'graphql'

const wallType = new GraphQLObjectType({
    name:"wallType",
    description:"User wall posts",
    fields(){
        return {
            id:{type:GraphQLID},
            from_id:{type:GraphQLID},
            owner_id:{type:GraphQLID},
            date:{type:GraphQLInt},
            post_type:{type:GraphQLString},
            text:{type:GraphQLString}
        }
    }
});
export default wallType;