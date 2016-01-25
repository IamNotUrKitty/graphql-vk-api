import axios from "axios"
let a_token;
export function setToken(token){
    a_token = token;
}
/**
 * Return promise api request
 * @param method(String) api method
 * @param params(String) params for api request
 * @return axios.Promise api request
 **/
export function apiRequest(method, params){
    let _params = buildQuery(params);
    let token = a_token?`access_token=${a_token}`:"";
    return axios.get(`https://api.vk.com/method/${method}?${_params}${token}&v=5.42`)
        .then(result => {
           if(result['data']['error']){
               return new Error(result['data']['error']["error_msg"])
           }else{
               return result["data"]["response"]
           }
        })
        .catch(err =>{
            console.log(err);
        })
}
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