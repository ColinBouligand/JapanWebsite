<template>
    <div v-if="kanjiInfo" class="kanji">
        <h1>{{ kanjiInfo.kanji }} </h1>
        <p> Rang : {{ kanjiInfo.grade }}</p>
        <p> Nombre de traits : {{ kanjiInfo.stroke_count }}</p>
        <p> Traduction(s) : <br> <strong>{{ meanings }}</strong></p>
        <p> Lectures(s) KUN : <br>  <strong>{{ readings_kun }}</strong></p>
        <p> Lectures(s) ON : <br>  <strong>{{ readings_on }}</strong></p>
       </div> 


</template>

<script>


export default {
    name: 'MemoryCard',
    components: {
    },
     data() {
        return {
            kanjiInfo : []


        }
    },
    methods : {
        async getInfosKanji(kanji){
        const res = await fetch('https://kanjiapi.dev/v1/kanji/'+kanji)
        const data = await res.json()
        return data
      },    
    },
    async created() {
        this.kanjiInfo = await this.getInfosKanji(this.$route.params.kanji)
        console.log(this.kanjiInfo)
    },
    computed :{
        readings_kun() {
                var res = ""
                for(var i in this.kanjiInfo.kun_readings)
                {
                    res +=  `${this.kanjiInfo.kun_readings[i]} | `

                }
                return res.substring(0, res.length - 2); // enlève le dernier tiret

        },
        readings_on() {
                var res = ""
                for(var i in this.kanjiInfo.on_readings)
                {
                    res +=  `${this.kanjiInfo.on_readings[i]} | `

                }
                return res.substring(0, res.length - 2); // enlève le dernier tiret

        },
        meanings() {
                var res = ""
                for(var i in this.kanjiInfo.meanings)
                {
                    res +=  `${this.kanjiInfo.meanings[i]} - `

                }
                return res.substring(0, res.length - 2); // enlève le dernier tiret

        },
        
    }

    
}
</script>
<style scoped>

.kanji {
    width: 40%;
    text-align: center;
    background :#FAF0CD;
    margin-left: 27%;
    margin-top:7%;
    padding:3%;
}

p {
    font-size:150%;
}

</style>
