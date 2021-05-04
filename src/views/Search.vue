<template>
    <div class="search-container">
            <h2>Chercher un kanji (en anglais)</h2>
            <input v-model="search" class="search-bar" type="text" @change="searchForKanji">
    </div>
</template>

<script>

export default{
    name: 'search',
    data() {
        return {
            search: "",

        }
    },
    methods :{
            async searchForKanji()
            {
                var unirest = require("unirest");

                var req = unirest("GET", "https://kanjialive-api.p.rapidapi.com/api/public/search/"+this.search);

                req.headers({
                    "x-rapidapi-key": "e704e96ba3msh916a6461e8774fep15a742jsndc5a3a965ea5",
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

            }
    }
}

</script>

<style scoped>

.search-container {
    width:50%;
    margin-left:25%;
    margin-top: 3%;
    display:flex;
    flex-direction: column;
    align-items: center;
}
.search-bar {
    margin-top:2%;
}

</style>