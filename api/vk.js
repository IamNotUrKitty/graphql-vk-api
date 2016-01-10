import axios from "axios"

/**
 * Return promise api request
 * @param method(String) api method
 * @param params(String) params for api request
 * @return Promise api request
 **/
let apiRequest = (method,params)=>{
    let _params = buildQuery(params);
    return axios.get(`https://api.vk.com/method/${method}?${_params}&v=5.42`).then(result =>{
        return result["data"]["response"]
    })
};

/**
 * Build query string for api request
 * @param params(object)
 * @return String query
 **/
let buildQuery = (params) => {
    let result = '';
    for(let i in params){
        if(params.hasOwnProperty(i))
            result += i+'='+params[i]+'&'
    }
    return result;
};

/**
* Get user by id
* @param user_ids(Integer)
* @param fields(Array) additional fields
* @return JSON object with user fields
**/
export function getUser(user_ids, fields = []) {
    fields = fields.join(',');
    return apiRequest('users.get',{user_ids,fields})
           .then(result =>{
               return result[0]
           });
}

/**
 * Get user's friends by user_id
 * @param user_id(integer)
 * @param fields(Array) additional fields
 * @param count(integer) count friends to get
 * @return Array JSON objects of user friends
 **/
export function getFriends(user_id, count = "", fields = []){
    fields = fields.join(',');
    return apiRequest('friends.get',{user_id, count, fields})
           .then(result =>{
               return result["items"]
           })
}

/**
 * Get user's albums by user_id
 * @param owner_id(integer) Album owner id
 * @param album_ids(Array) Array of albums id's
 * @param count(integer) Limit albums
 * @return Array JSON objects of user albums
 **/
export function getAlbums(owner_id, album_ids=[], count = ""){
    album_ids = album_ids.join(",");
    return apiRequest('photos.getAlbums',{owner_id, album_ids, count, need_system:1})
           .then(result =>{
               return result["items"]
           })
}

/**
 * Get photos from user albums, by user_id and album_id
 * @param owner_id(integer) user_id
 * @param album_id(integer)
 * @param count(integer) count photos to get
 * @return Array JSON objects of album photos
 * **/
export function getPhotos(owner_id, album_id, count = ""){
    return apiRequest('photos.get',{owner_id,album_id, count})
           .then(result =>{
               return result["items"]
           })
}
/**
 * Get user's groups
 * @param user_id(integer) user_id
 * @return Array JSON objects of groups
 * */
export function getGroups(user_id){
    return apiRequest('groups.get',{user_id,extended:1})
           .then(result =>{
               return result["items"]
           })
}