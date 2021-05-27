<template>
<Help :textModal="textModal" home="true" />
    <div v-if="kanji" class="card">
        <Card :kanji="kanji"  />
        <a :href="getURlKanji()" >Détails</a>
    </div>
    <div class="infoshome">
        <h1>Bienvenue sur Kanjio.io !</h1>
        <p> Ici vous pouvez apprendre les différents kanji et hiragana, ou tester vos connaissances !</p>


    </div>
</template>

<script>
import Card from '../components/Card'
import Help from '../components/Help'

export default {
    name: 'Home',
    components: {
        Card,
        Help,
    },
     data() {
        return {
            kanji: [],
            trad: "",
            textModal: "En cliquant sur ce bouton, vous avez accès à une explication sur le but de chaque page et de comment s'en servir, n'hésitez pas si vous ne comprenez pas quelque chose !",

        }
    },
    methods: {
    //renvoie n kanjis aléatoires de l'api (de grade 1)
    async fetchNKanjis(n){
        var ran = Math.floor(Math.random() * 6);

        const res = await fetch('https://kanjiapi.dev/v1/kanji/grade-'+ ran)
        const data = await res.json()

        let result = []
        for(let i=0;i <n; i++)
        {
            var random = data[Math.floor(Math.random() * data.length)];
            result.push(random)
        }
        
        return result
      }, // récupère les informations du kanji passé en paramètre
      async getInfosKanji(kanji){
        const res = await fetch('https://kanjiapi.dev/v1/kanji/'+kanji)
        const data = await res.json()
        return data

      }, 
    async changeKanji(){
        this.kanji = await this.fetchNKanjis(1)
        this.kanji = await this.getInfosKanji(this.kanji)
    },
    getURlKanji(){
        return `${window.location.origin}/kanji/${this.kanji.kanji} `
    },         
    },
    async created() {
      this.changeKanji()
    }
}
</script>
<style scoped>

* {
          font-weight: bold;

}

.card {
    position: absolute;
    top: 50%;
    left: 20%;
    width: 300px;
    height: 300px;
    margin: -150px;
    float: left;
    perspective: 400px;
}


a {
    position: relative;
    color: white;
    left: 40%;
    top: 330px;
    font-size:20px;
    text-decoration: none;

}

.infoshome {
    position: absolute;
    float: left;
    top: 40%;
    left: 40%;
    color : #FAF0CD;
}

h1 {
    font-size:calc(50px + 10%);    /* Calcule le min entre 50 px et 10% */
        margin-bottom : 5%;

}

p {
    font-size:calc(35px + 6%);
}
</style>
