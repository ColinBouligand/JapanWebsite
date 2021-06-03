<template>
    <div v-if="kanjiInfo" class="kanji">
        <h1>{{ kanjiInfo.kanji }} </h1>
            <div class="kanjiInfos">
        <p> Rang : {{ kanjiInfo.grade }}</p>
        <p> Nombre de traits : {{ kanjiInfo.stroke_count }}</p>
        <p> Traduction(s) :  <strong>{{ meanings }}</strong></p>
        <p> Lectures(s) KUN :  <strong>{{ readings_kun }}</strong></p>
        <p> Lectures(s) ON :   <strong>{{ readings_on }}</strong></p>
            </div> 
       </div>

      <div v-if="!kanjiInfo">
          <h2>Le caractère recherché n'est pas un kanji</h2>
          </div> 


</template>

<script>


export default {
    name: 'Kanji',
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
        const data = await res
        return data
      },    
    }, // vérification que la requête renvoie bien les informations(il faut que le param soit un kanji), sinon rend null kanjiInfo pour modifier l'affichage
    async created() {
        var temp = await this.getInfosKanji(this.$route.params.kanji)
        console.log(temp.status)
        if(temp.status === 200){
            this.kanjiInfo= await temp.json()
        }
        else {
            this.kanjiInfo= null
        }

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
    width: 50%;
    background :#FAF0CD;
    margin-left: 22%;
    margin-top:7%;
    padding:3%;
    border-radius: 5%;
    display : flex;
    flex-direction: row;
    align-content: space-around;

}

.kanjiInfos {
    width: 100%;
    display:flex;
    flex-direction: column;
    margin-left: 15%;
    margin-top: 3%;
      
}

p {
    font-size:150%;
    font-weight: bold;;
}

h1 {
    font-size: 800%;
    margin-left : 5%;
    margin-bottom: 2%;
}

h2 {
    position: relative;
    margin-top: 10%;
    left: 36%;
    color: #faf0cd;
    font-weight: bold;

}


</style>
