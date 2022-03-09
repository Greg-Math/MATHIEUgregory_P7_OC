<template>
    <div class="card">
        <img v-if="mode == 'connexion'" src="../assets/logo.png" alt="Groupomania">
        <h1 v-if="mode == 'connexion'" class="card__title">Connexion</h1>
        <h1 v-else class="card__title">Inscription</h1>
        <p v-if="mode == 'connexion'" class="card__subtitle">Pour créer un compte <span class="card__action" @click="switchToCreateAccount">c'est ici</span></p>
        <p v-else class="card__subtitle">Vous avez déja un compte ? <span class="card__action" @click="switchToConnexion">Se connecter</span></p>
        <div class="form-row">
            <input v-model="email" class="form-row__input" type="text" placeholder="Adresse email"/>
        </div>
        <div class="form-row">
            <input v-model="password" class="form-row__input" type="password" placeholder="Mot de passe"/>
        </div>
        <div v-if="mode == 'create'" class="form-row">
            <input v-model="username" class="form-row__input" type="text" placeholder="Username">
        </div>
        <div v-if="mode == 'create'" class="form-row">
            <input v-model="firstname" class="form-row__input" type="text" placeholder="Prénom">
            <input v-model="lastname" class="form-row__input name" type="text" placeholder="Nom">
        </div>
        <div class="form-row" v-if="mode == 'connexion' && status == 'error_login'">
            Adresse email et/ou mot de passe invalide
        </div>
        <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
            Adresse email déja utilisée
        </div>
        <div class="form-row">
            <button v-if="mode == 'connexion'" @click="login()" class="button" :class="{'button-disabled' : !validatedFields}">
                <span v-if="status == 'loading'">Connexion en cours...</span>
                <span v-else>Connexion</span>
            </button>
            <button v-else @click="newAccount()" class="button" :class="{'button-disabled' : !validatedFields}">
                <span v-if="status == 'loading'">Création en cours...</span>
                <span v-else>S'enregistrer</span>
            </button>
        </div>
    </div>
</template>

<script>

import { mapActions, mapState } from 'vuex'

export default {
    name: 'Connexion',
    data: function() {
        return {
        mode: 'connexion',
        email: '',
        password: '',
        username: '',
        firstname: '',
        lastname: '',
        }
    },
    async mounted() {
        if (this.user.id) {
            await this.$router.push('/profile/' + this.user.id)
            return
        }
    },
    computed: {
        validatedFields: function() {
            if (this.mode == 'create') {
                if (this.email != "" && this.password != "" && this.username != "" && this.firstname != "" && this.lastname != "") {
                    return true
                }
                else return false
            }
            else {
                if (this.email != "" && this.password != "") {
                    return true
                }
                else return false
            }
        },
        ...mapState({
            user: 'user',
            status: 'status'
        })
    },
    methods: {
        ...mapActions(['connexion', 'createAccount']),
        switchToCreateAccount: function() {
            this.mode = 'create'
        },
        switchToConnexion: function() {
            this.mode = 'connexion'
        },
        login: function() {
            const self = this
            this.connexion({
                email: this.email,
                password: this.password
            })
            .then(async () => {
                await self.$router.push('/posts')
            })
            .catch(error => console.error(error))
        },
        newAccount: function() {
            const self = this
            this.createAccount({
                email: this.email,
                password: this.password,
                username: this.username,
                firstname: this.firstname,
                lastname: this.lastname
            })
            .then(() => {
                self.login()
            })
            .catch(error => console.error(error))
        }
    },
}
</script>

<style scoped>
img {
    height: 50px;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    max-width: 90%;
}
.card {
    margin: auto;
    width: 270px;
    height: 400px;
    justify-content: space-around;
}
.form-row__input {
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: whitesmoke;
    font-weight: 500;
    font-size: 16px;
}
.name {
    margin: 16px;
}
.button-disabled {
    cursor: not-allowed;
    background-color: grey;
}
</style>