import axios from "axios"

export function getUser(id) {
    return axios.get(`https://api.vk.com/method/users.get?user_id=${id}&fields=photo_50`).then(result => {
        return result["data"]["response"][0]
    })
}

export function getFriends(id){
    return axios.get(`https://api.vk.com/method/friends.get?user_id=${id}&fields=nickname`).then(result => {
        return result["data"]["response"]
    })
}

export function getAlbums(id){
    return axios.get(`https://api.vk.com/method/photos.getAlbums?user_id=${id}`).then(result => {
        return result["data"]["response"]
    })
}