import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID
} from 'graphql'
import PersonFields from './fields/personFields'


let friendType = new GraphQLObjectType({
    name:"friend",
    fields(){
        return Object.assign({
            id:{type:GraphQLID},
            first_name:{type:GraphQLString},
            last_name:{type:GraphQLString}
        }, PersonFields)
    }
});

export default friendType;