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
    async fetchKanjis(){
        const res = await fetch('https://kanjiapi.dev/v1/kanji/grade-1')
        const data = await res.json()
        return data
      },
    
       
    },
    async created() {
        this.kanjis = await this.fetchKanjis()
    }
}
</script>
<style scoped>

</style>
