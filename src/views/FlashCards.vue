<template>
    <Cards :kanjis="kanjis" />
    <Cards :kanjis="meanings" />

</template>

<script>
import Cards from '../components/Cards'

export default {
    name: 'Home',
    components: {
        Cards
    },
     data() {
        return {
            kanjis: [],
            meanings: [],
        }
    },
    methods: {
        //récup tous les kanjis de grade 1
    async fetchKanjis(){
        const res = await fetch('https://kanjiapi.dev/v1/kanji/grade-1')
        const data = await res.json()
        return data
      },
    //renvoie n kanjis aléatoires de l'api (de grade 1)
    async fetchNKanjis(n){
        const res = await fetch('https://kanjiapi.dev/v1/kanji/grade-1')
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

      }
    
       
    },
    async created() {
        this.kanjis = await this.fetchNKanjis(5)
        for(var k in this.kanjis)
        {
            //this.kanjis[k]= await this.getInfosKanji(this.kanjis[k])
            this.meanings.push(await this.getInfosKanji(this.kanjis[k]).meanings)
        }
        console.log(this.kanjis)

    }
}
</script>
<style scoped>

</style>
