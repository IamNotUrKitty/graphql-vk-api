import {
    GraphQLString,
    GraphQLID
} from 'graphql'

import cityType from '../cityType'
let _string = {type:GraphQLString};

const PersonFields = {
    id:{type:GraphQLID},
    first_name:_string,
    last_name:_string,
    domain:_string,
    country:_string,
    photo_50:_string,
    photo_100:_string,
    photo_200:_string,
    last_seen:_string,
    relation:_string,
    education:_string,
    status:_string,
    universities:_string,
    city:{
        type:cityType,
        resolve(user){
            return user.city
        }
    }
};

export default PersonFields