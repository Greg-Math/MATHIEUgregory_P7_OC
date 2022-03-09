<template>
    <div id="post">
        <header>
            <div>
                <img id="imgLogo" src="../assets/logo.png" alt="Goupomania">
            </div>
            <nav>
                <router-link :to="{ name: 'allProfile'}" v-if="user.isAdmin">All Users</router-link>
                <router-link :to="{ name: 'Profile', params: {userId: user.id}}">Profil</router-link>
            </nav>
        </header>
        <div class="card">
            <div class="card_newPost">
                <div>
                    <h2>Nouvelle publication :</h2>
                    <input v-model="title" type="text" class="form-row__input" placeholder="Titre">
                </div>
                <div>
                    <textarea v-model="content" class="form-row" cols="30" rows="5"/>
                    <input class="postMedia" name="media" type="file" accept="image/jpg, image/jpeg, image/png, image/webp, image/gif, video/x-msvideo, video/mp4, video/mpeg, video/ogg, video/mp2t, video/webm, video/3gpp , video/3gpp2">
                </div>
            </div>
            <button @click="addPost()" id="newPost">Ajouter une Publication</button>
        </div>
        <div v-for="post of posts" :key="post.id" class="card">
            <div id="title">
                <h2>{{post['User.username']}}</h2>
                <h2><span v-if="user.isAdmin || user.id == post.UserId" @click="delPost(post.id)" class="deleteButton">Supprimer</span>{{post.title}}</h2>
            </div>
            <div id="content">
                <p>{{post.content}}</p>
                <div v-if="post.attachment">
                    <img v-if="['jpg','png','gif','webp'].includes(post.attachment.split('.').pop())" :src="post.attachment"/>
                    <video controls="controls" v-else :src="post.attachment"></video>
                </div>
            </div>
            <div id="footer-post">
                <div id="footer-post_like">
                    <button @click="like(post.id)" id="footer-post_like_button"><i class="far fa-thumbs-up"></i></button>
                    <p id="footer-post_like_number">{{post.likes}}</p>
                </div>
                <button @click="addComment(post.id)">Commenter</button>
                <button @click="comment(post.id)">Voir les commentaires</button>
            </div>
            <div>
                <div id="comments" v-for="comment of comments[post.id]" :key="comment.id">
                    <h3>{{comment.User.username}} <span v-if="user.isAdmin || user.id == comment.UserId" @click="deleteCom(post.id, comment.id)" class="deleteButton">Supprimer</span></h3>
                    <p>{{comment.content}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    data: function() {
        return {
            posts: [],
            comments: {},
            title: '',
            content: '',
            }
        },
    name: 'Posts',
    async mounted() {
        if (!this.user.token) {
            this.$router.push({name: 'Connexion'})
            return
        }
        const postsInfos = await this.getAllPosts()
        this.posts = postsInfos.post
    },
    computed: {
        ...mapState({
            user: 'user',
            post: 'posts'
        })
    },
    methods: {
        async like(postid) {
            try {
                const data = await this.postLikes(postid)
                const post = this.posts.find(el => el.id === data.postFound.id)
                post.likes = data.postFound.likes
            }
            catch (error) {
                console.error(error)
            } 
        },
        async comment(postid) {
            try {
                const data = await this.getCommentOfPost(postid)
                this.comments[postid] = data.comment
            }
            catch (error) {
                console.error(error)
            }
        },
        async deleteCom(postid, commentid) {
            try {
                const data = await this.deleteComment({postid, commentid})
                delete this.comments[postid].find(el => el.id === commentid)
                this.$router.go()
            }
            catch (error) {
                console.error(error)
            }
        },
        addComment(postid) {
            this.$router.push('/comment/' + postid)
        },
        async addPost() {
            try {
                const media = document.querySelector('.postMedia').files[0]
                const postMedia = new FormData()
                postMedia.append('media', media)
                postMedia.append('title', this.title)
                postMedia.append('content', this.content)
                await this.createPost(postMedia)
                await this.$router.go()
            }
            catch (error) {
                console.error(error)
            }
        },
        async delPost(postid) {
            try {
                const data = await this.deletePost({postid})
                delete this.posts.find(el => el.id === postid)
                this.$router.go()
            }
            catch (error) {
                console.error(error)
            }
        },
        ...mapActions(['getAllPosts', 'postLikes', 'getCommentOfPost', 'deleteComment', 'createPost', 'deletePost'])
    }

}
</script>

<style lang='scss' scoped>
#imgLogo {
    max-height: 60px;
}
nav a {
    cursor: pointer;
    font-weight: bold;
    margin: 15px;
    &:hover {
        color: blue;
        text-decoration: underline;
    }
}
nav {
    margin-bottom: 20px;
}
img, video {
    max-width: 95%;
}
input {
    background: whitesmoke;
}
#newPost {
    margin-bottom: 30px;
}
#comments {
    border-top: 2px solid lightsalmon;
}
h2 {
    font-size: 16px;
}
.card {
    align-items: center;
    justify-content: space-between;
    padding: 0;
    margin-bottom: 30px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}
#title {
    width: 99%;
    display: flex;
    justify-content: space-between;
    padding-left: 2%;
    padding-right: 2%;
}
p {
    overflow-wrap: break-word;
}
#content {
    max-width: 95%;
}
#footer-post {
    max-width: 95%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &_like {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-right: 8px;
        &_button {
            border: none;
            background-color: white;
            box-shadow: none;
            font-size: 25px;
            color: navy;
        }
        &_number {
            font-size: 25px;
            font-weight: bold;
            color: navy;
        }
    }
}
button {
    min-height: 30px;
    max-height: 55px;
    border-radius: 20px;
    font-weight: bold;
    background-color: #F4A460;
    margin-top: 10px;
    &:hover {
        box-shadow: 0px 0px 10px #708090;
    }
}
</style>