<template>
    <div>
        <h1>Nouveau Commentaire</h1>
        <div class="card">
            <textarea rows="5" class="form-row" v-model="content" type="text"/>
            <div id="boutons">
                <button @click="addComment($route.params.postId)" class="button">Ajouter</button>
                <button @click="retour()" class="button">Retour</button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    data() {
        return {
            content: '',
        }
    },
    name: 'Comment',
    async mounted() {
        if (!this.user.token) {
            await this.$router.push('/')
            return
        }
    },
    computed :{
        ...mapState({
            user: 'user',
        })
    },
    methods: {
        async addComment(idpost) {
            try {
                await this.createComment({
                    postid: idpost,
                    content: this.content
                })
                await this.$router.push('/posts')
            }
            catch (error) {
                console.error(error)
            }
        },
        async retour() {
            await this.$router.push('/posts')
        },
        ...mapActions(['createComment'])
    }
}
</script>

<style lang='scss' scoped>
.card {
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
}
textarea {
    resize: vertical;
    font-size: 14px;
}
button {
    margin-left: 15px;
    margin-bottom: 10px;
}

</style>