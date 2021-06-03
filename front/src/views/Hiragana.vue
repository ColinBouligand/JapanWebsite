<template>
    <div v-if="hiraganaInfo" class="hiragana">
        <h1>{{ hiragana_trad }} </h1>

       </div>

      <div v-if="!hiraganaInfo">
          <h2>Le caractère recherché n'est pas un hiragana</h2>
          </div> 


</template>

<script>


export default {
    name: 'Hiragana',
    components: {
    },
     data() {
        return {
            hiraganaInfo : [],
            dataHiragana : {'あ' : 'a',	'い' : 'i',	'う' : 'u',	'え' : 'e',	'お' : 'o',
'か' : 'ka' ,	'き' : 'ki',	'く' : 'ku',	'け' : 'ke',	'こ' : 'ko',
'さ' : 'sa' ,	'し' : 'shi',	'す' :  'su',	'せ': 'se',	'そ' : 'so',	
'た' : 'ta' ,	'ち' : 'chi', 'つ' : 'tsu',	'て' : 'te',	'と' : 'to',	
'な' : 'na' ,	'に' : 'ni', 'ぬ' : 'nu',	'ね' : 'ne',	'の' : 'no',	
'は' : 'ha' ,	'ひ' : 'hi', 'ふ' : 'fu',	'へ' : 'he'	, 'ほ' : 'ho'	,
'ま' : 'ma' ,	'み' : 'mi', 'む': 'mu',	'め': 'me',	'も' : 'mo'	,
'や' : 'ya'	,	'ゆ' : 'yu'	,	'よ' : 'yo'	,
'ら' : 'ra'	,  'り': 'ri' , 'る' : 'ru' ,	'れ' : 're' ,	'ろ' : 'ro',
'わ' : 'wa'	,	'を':  'wo' ,	
'ん' : 'n' 	,
'が' : 'ga', 'ぎ' : 'gi',	'ぐ': 'gu'	,'げ' : 'ge',	'ご' : 'go'	,	
'ざ' : 'za'	,'じ' : 'ji',	'ず' : 'zu'	,'ぜ' : 'ze',	'ぞ' : 'zo'	,	
'だ' : 'da'	,'ぢ' : 'ji',	'づ ': 'zu'	,'で' : 'de',	'ど' : 'do'	,
'ば' : 'ba'	,'び' : 'bi',	'ぶ' : 'bu'	,'べ' : 'be',	'ぼ' : 'bo'	,
'ぱ' : 'pa'	,'ぴ' : 'pi',	'ぷ' : 'pu'	,'ぺ' : 'pe',	'ぽ' : 'po'	},



        }
    },
    methods : {
         getInfosHiragana(hiragana){
             console.log(hiragana)
        return this.dataHiragana[hiragana]
      },    
    }, // vérification que la requête renvoie bien les informations(il faut que le param soit un kanji), sinon rend null kanjiInfo pour modifier l'affichage
    async created() {
        this.hiraganaInfo = this.getInfosHiragana(this.$route.params.hiragana)
        console.log(this.hiraganaInfo)
    },
    computed :{
        hiragana_trad() {
                var res = `${this.$route.params.hiragana} : ${this.hiraganaInfo}`
                return res
        },
    }

    
}
</script>
<style scoped>

.hiragana {
    width: 28%;
    background :#FAF0CD;
    margin-left: 33%;
    margin-top:7%;
    padding:3%;
    border-radius: 5%;
    align-items: center;


}


h1 {
    font-size: 800%;
    margin-left : 5%;
    margin-bottom: 2%;
}

h2 {
    position: relative;
    margin-top: 10%;
    left: 34%;
    color: #faf0cd;
    font-weight: bold;

}


</style>
