<template>
    <div class="card">
        <h1>Liste des Utilisateurs</h1>
        <button @click="retour()" class="button">Retour</button>
        <ul>
            <li v-for="user of profiles" :key="user.id">
                <p>{{user.username}}</p>
                <p>{{user.email}}</p>
                <p>{{user.firstname}}  {{user.lastname}}</p>
                <p>Admin : {{user.admin}}</p>
                <span @click="delProfile(user.id)" class="deleteButton">Supprimer</span>
            </li>
        </ul>

    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
    data: function() {
        return {
            profiles: []
        }
    },
    name: 'AllProfile',
    async mounted() {
        if (!this.user.isAdmin) {
            await this.$router.push('/')
        }
        this.profiles = await this.getAllUsers()
        this.profiles = this.profiles.User
    },
    methods: {
        ...mapActions(['getAllUsers', 'deleteProfile']),
        async delProfile(userId) {
            await this.deleteProfile(userId)
            await this.$router.go()
        },
        async retour() {
            await this.$router.push('/posts')
        }
    },
    computed: {
        ...mapState({
            user: 'user'
        })
    }
}
</script>

<style lang='scss' scoped>

button {
    margin: auto;
}
span {
    font-size: 13px;
    color: blue;
    font-weight: bold;
    padding: 3px;
    border: 1px white solid;
    &:hover {
        border-radius: 15px;
        box-shadow: 0px 0px 5px blue ;
    }
}

ul {
    padding: 10px;
}
li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    flex-wrap: wrap;
    border-top: 1px orangered dashed;
    *{
        flex:1;
    }
}
@media screen and (min-width: 816px) {
    li {
        flex-direction: row;
    }
}

</style>