<template>
<h1>FlashCards</h1>
    <Cards :kanjis="kanjis" />
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
        }
    },
    methods: {
        //récup tous les kanjis de type1
    async fetchKanjis(){
        const res = await fetch('https://kanjiapi.dev/v1/kanji/grade-1')
        const data = await res.json()
        return data
      },
    //renvoie n kanjis aléatoires de l'api
    async fetchNKanjis(n){
        const res = await fetch('https://kanjiapi.dev/v1/kanji/grade-1')
        const data = await res.json()


        let result = []
        for(let i=0;i <n; i++)
        {
        var random = data[Math.floor(Math.random() * data.length)];
        //console.log(random)   
        result.push(random)
        }
        //console.log(result)
        
        return result
      },
    
       
    },
    async created() {
        this.kanjis = await this.fetchNKanjis(5)
    }
}
</script>
<style scoped>


</style>
