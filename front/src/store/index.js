import { createStore } from "vuex"

const axios = require('axios')
const instance = axios.create({
    baseURL: 'http://localhost:3000'
})


const store = createStore({
    state: {
        status: '',
        user: {},
        userInfos: {
            email: '',
            username: '',
            firstname: '',
            lastname: '',
        },
        postsInfos: {
            username: '',
            title: '',
            content: '',
            attachment: '',
            likes: '',
        },
        likeInfos: {
            likes: '',
        },
        commentInfos: {
            content: '',
            postid: '',
        }
    },
    mutations: {
        setStatus(state, status) {
            state.status = status
        },
        logUser(state, user) {
            instance.defaults.headers.common['Authorization'] ='Bearer ' + user.token
            localStorage.setItem('user', JSON.stringify(user))
            state.user = user
        },
        userInfos(state, userInfos) {
            state.userInfos = userInfos
        },
        logout(state) {
            state.user = {}
            localStorage.removeItem('user')
        },
        postsInfos(state, postsInfos) {
            state.postsInfos = postsInfos
        },
        likeInfos(state, likeInfos) {
            state.likeInfos = likeInfos
        },
        commentInfos(state, commentInfos) {
            state.commentInfos = commentInfos
        }
    },
    actions: {
        connexion: ({commit}, userInfos) => {
            commit('setStatus', 'loading')
            return new Promise((resolve, reject) => {
                instance.post('/auth/login', userInfos)
                .then((response) => {
                    commit('setStatus', '')
                    commit('logUser', response.data)
                    resolve(response)
                })
                .catch((error) => {
                    commit('setStatus', 'error_login')
                    reject(error)
                })
            })
        },
        createAccount: ({commit}, userInfos) => {
            commit('setStatus', 'loading')
            return new Promise((resolve, reject) => {
                instance.post('/auth/signup', userInfos)
                .then((response) => {
                    commit('setStatus', 'created')
                    resolve(response)
                })
                .catch((error) => {
                    commit('setStatus', 'error_create')
                    reject(error)
                })
            })
        },
        deleteProfile: ({commit}, id) => {
            return new Promise((resolve, reject) => {
                instance.delete('/profile/' + id)
                .then((response) => {
                    commit('setStatus', 'deleted')
                    resolve(response)
                })
                .catch((error) => {
                    console.error(error)
                    reject(error)
                })
            })
        },
        getUserInfos: ({commit}, id) => {
            return new Promise((resolve, reject) => {
                instance.get('/profile/' + id)
                    .then((response) => {
                        commit('userInfos', response.data)
                        resolve(response)
                    })
                    .catch((error) => {
                        console.error(error),
                        reject(error)
                    })
            })
        },
        getAllUsers: ({commit}) => {
            return new Promise((resolve, reject) => {
                instance.get('/profile')
                    .then((response) => {
                        resolve(response.data)
                    })
                    .catch((error) => {
                        console.error(error)
                        reject(error)
                    })
            })
        },
        createPost: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                instance.post('/posts', data)
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    console.error(error),
                    reject(error)
                })
            })
        },
        deletePost: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                instance.delete('/posts/' + data.postid)
                .then((response) => {
                    commit('postsInfos', response.data)
                    resolve(response.data)
                })
                .catch((error) => {
                    console.error(error),
                    reject(error)
                })
            })
        },
        getAllPosts: ({commit}) => {
            return new Promise((resolve, reject) => {
                instance.get('/posts')
                    .then((response) => {
                        commit('postsInfos', response.data)
                        resolve(response.data)
                    })
                    .catch((error) => {
                        console.error(error),
                        reject(error)
                    })
            })
        },
        postLikes: ({commit}, postid) => {
            return new Promise((resolve, reject) => {
                instance.post('/posts/' + postid +'/like')
                    .then((response) => {
                        commit('likeInfos', response.data)
                        resolve(response.data)
                    })
                    .catch((error) => {
                        console.error(error),
                        reject(error)
                    })
            })
        },
        getCommentOfPost: ({commit}, postid) => {
            return new Promise((resolve, reject) => {
                instance.get('/comment/' + postid)
                    .then((response) => {
                        commit('commentInfos', response.data)
                        resolve(response.data)
                    })
                    .catch((error) => {
                        console.error(error),
                        reject(error)
                    })
            })
        },
        deleteComment: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                instance.delete('/comment/' + data.postid + '/' + data.commentid)
                .then((response) => {
                    commit('commentInfos', response.data)
                    resolve(response.data)
                })
                .catch((error) => {
                    console.error(error),
                    reject(error)
                })
            })
        },
        createComment: ({commit}, data) => {
            return new Promise((resolve, reject) => {
                instance.post('/comment/' + data.postid, {content: data.content} )
                .then((response) => {
                    resolve(response.data)
                })
                .catch((error) => {
                    console.error(error),
                    reject(error)
                })
            })
        }
    }
})

export default store