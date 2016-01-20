import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} from 'graphql'

let cityType = new GraphQLObjectType({
    name:"UserCity",
    fields(){
        return {
            id:{type:GraphQLID},
            title:{type:GraphQLString}
        }
    }
});

export default cityType;