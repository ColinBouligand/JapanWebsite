<template>
<img @click="openModal" class="logo_help" src="../assets/logo_help.png" alt="logo aide" />
<Modal @close-modal="modalClosed" v-if="showModal" :text="textModal"/>
    <div class="search-container">
            <h2>Chercher un kanji (en anglais)</h2>
            <input v-model="search" class="search-bar" type="text" @change="searchForKanji">
    </div>
</template>

<script>
import Modal from '../components/Modal'
import { apiSearchKey }  from '../../api.js'

export default{
    name: 'search',
    components: {
        Modal
    },
    data() {
        return {
            search: "",
            textModal: "Cette page vous permet d'accéder aux informations d'un kanji juste en rentrant son nom en anglais et en appuyant sur 'Entrée'.",
            showModal: false,

        }
    },
    methods :{
            async searchForKanji()
            {
                var unirest = require("unirest");

                var req = unirest("GET", "https://kanjialive-api.p.rapidapi.com/api/public/search/"+this.search.toLowerCase());

                req.headers({
                    "x-rapidapi-key": apiSearchKey ,
                    "x-rapidapi-host": "kanjialive-api.p.rapidapi.com",
                    "useQueryString": true
                });


                req.end( (res) => { // utilisation des arrows functions pour accéder au this de l'objet et pas de la fonction
                    if (res.error) throw new Error(res.error);

                    if(res.body[0]){
                            //si la requête renvoie un résultat -> déplace l'utilisateur à la page du kanji renvoyé
                            window.location.href = `${window.location.origin}/kanji/${res.body[0].kanji.character} `
                    }
                    this.result=res.body[0]
                });

            },
            openModal(){
                this.showModal= ! this.showModal
            },
            modalClosed(){
                this.showModal=false
            },
    }
}

</script>

<style scoped>

.search-container {
    width:50%;
    margin-left:25%;
    display:flex;
    flex-direction: column;
    align-items: center;
}
.search-bar {
    margin-top:2%;
}
.logo_help {
        width:3%;
        min-width:35px;
        left:95%;
        margin-top:1%;
        position:relative

    }
</style>
