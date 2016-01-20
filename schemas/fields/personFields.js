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

import cityType from '../cityType'

const PersonFields = {
    id:{type:GraphQLID},
    first_name:{type:GraphQLString},
    last_name:{type:GraphQLString},
    domain:{type:GraphQLString},
    city:{
        type:cityType,
        resolve(friend){
            return friend.city
        }
    }
};

export default PersonFields