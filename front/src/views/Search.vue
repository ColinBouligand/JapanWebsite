<template>
<Help :textModal="textModal" />

    <div class="search-container">
            <h1>CHERCHER UN KANJI (en anglais)</h1>
            <input v-model="search" class="search-bar" type="text" @change="searchForKanji" placeholder="Search ...">
            <p v-if="search"> Appuyer sur "Entrée" pour lancer la recherche ! </p>
    </div>
</template>

<script>
import Help from '../components/Help'
import { apiSearchKey }  from '../../api.js'

export default{
    name: 'search',
    components: {
        Help
    },
    data() {
        return {
            search: "",
            textModal: "Cette page vous permet d'accéder aux informations d'un kanji juste en rentrant son nom en anglais et en appuyant sur 'Entrée'.",
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
    color: #db5249;
    width: 130px;
    box-sizing: border-box;
    border: 2px solid #9b2d23;
    border-radius: 4px;
    font-size: 16px;
    background-color: #faf0cd;
    background-image: url('../assets/loupe.png');
    background-size: 24px 24px;
    background-position: 10px 10px; 
    background-repeat: no-repeat;
    padding: 12px 20px 12px 40px;
}

h1,p {
    color: #faf0cd;
    font-weight: bold;
    margin-top: 1%;
}
</style>
