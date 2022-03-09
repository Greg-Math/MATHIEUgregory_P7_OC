<template>
    <div class="card">
        <h1 class="card__title">Mon Espace Perso</h1>
        <p class="card__subtitle">Voilà donc qui je suis...</p>
        <p class="form-row">Nom Complet : <span class="card__action">{{ firstname }} {{ lastname }}</span></p>
        <p class="form-row">Username : <span class="card__action">{{ username }}</span></p>
        <p class="form-row">Email : <span class="card__action">{{ email }}</span></p>
        <div class="form-row">
            <button @click="logout()" class="button">
                Déconnexion
            </button>
        </div>
        <div>
            <button @click="delProfile($route.params.userId)" class="button delete">
                Supprimer
            </button>
        </div>
        <div>
            <button @click="retour()" class="button">Retour</button>
        </div>
    </div>
</template>


<script>
import {mapActions, mapState} from 'vuex'
export default {
    data: function() {
        return {
            email: '',
            username: '',
            firstname: '',
            lastname: '',
        }
    },
    name: 'Profile',
    async mounted() {
        if (!this.user.token) {
            this.$router.push({name: 'Connexion'})
            return
        }
        const userInfos = await this.getUserInfos(this.user.id)
        this.email = userInfos.data.email
        this.username = userInfos.data.username
        this.firstname = userInfos.data.firstname
        this.lastname = userInfos.data.lastname
    },
    computed: {
        ...mapState({
            user: 'user'
        })
    },
    methods: {
        ...mapActions(['getUserInfos', 'deleteProfile']),
        logout: async function() {
            this.$store.commit('logout')
            await this.$router.push({name: 'Connexion'})
        },
        async delProfile(userId) {
            await this.deleteProfile(userId)
            localStorage.clear()
            this.$store.commit('logout')
            await this.$router.push({name: 'Connexion'})
        },
        async retour() {
            await this.$router.push('/posts')
        }
    }
}
</script>


<style lang='scss' scoped>
.card {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}
.delete {
    margin-bottom: 15px;
}
.form-row {
    margin: 15px;
    font-weight: bold;
}
</style>