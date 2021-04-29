<template>
    <Select v-model="selectedFamily" :content="families" @select-change="selectChange"/>

<div class="flashcard">
    <Cards @turn-card="turnCard" v-if="kanjisv1" :content="kanjisv1" column="kanji" fontSize="50px" num="1"/>
    <Cards @turn-card="turnCard" v-if="kanjisv2" :content="kanjisv2" column="meanings" fontSize="30px" num="2" />
</div>
    <transition name="toast">
    <Toast v-if="showToast" :text="text"  />
    </transition> 
</template>

<script>
import Cards from '../components/Cards'
import Toast from '../components/Toast'
import Select from '../components/Select'

export default {
    name: 'FlashCards',
    components: {
        Cards,
        Toast,
        Select
    },
     data() {
        return {
            kanjis1: [],
            kanjis2:[],
            nbGagne: 0,
            lastClicked: "",
            showToast: false,
            text:"",
            families:[],
            selectedFamily: "1",
        }
    },
    methods: {
        async turnCard(kanji,colonne){
            console.log(kanji,colonne)
          //si ce n'est pas le 1er clic
          if(this.lastClicked)
          {
              console.log(this.lastClicked, kanji)
              console.log(this.lastClicked,colonne)
            //si les cartes correspondent -> vérifier qu'il n'a pas cliqué 2 fois sur la même carte
            if((this.lastClicked[0] == kanji) && (this.lastClicked[1] !== colonne))
            {
                this.text = "gagné"
                this.nbGagne++
                
                console.log(this.kanjis1)
                this.kanjis1 = await this.remove(this.kanjis1, kanji)
                this.kanjis2 = await this.remove(this.kanjis2, kanji)

                if(Object.keys(this.kanjis1).length == 0)
                {
                    console.log("GAGNE")
                    this.nbGagne = 0
                    this.initialize()
                }

                //delete this.kanjis1[4]
                //delete this.kanjis2[4]
                //console.log(this.kanjis1)
                
                /*let copy = JSON.parse(JSON.stringify(this.kanjis1))
                delete copy[0]
                this.kanjis1 = copy*/

                //delete this.kanjis1[kanji]
               /* Object.keys(this.kanjis1).forEach(function(key){
                if (this.kanjis1[key].kanji === kanji) {
                    //delete this.kanjis1[key];
                    //delete this.kanjis2[key];

                }
                console.log(this.kanjis1, this.kanjis2)
            });*/
            }
            else {
                this.text = "perdu"
            }
            this.lastClicked= ""
            this.triggerToast()
         }
          else{
              this.lastClicked= kanji + colonne
              console.log("kanji", this.lastClicked[0])
              //console.log("2", this.lastClicked)
          }
      },
    async remove(list, kanji)
      {
          if(list){
        var newList = []
        for(var i =0; i < list.length; i++)
        {
            if(list[i].kanji!== kanji)
            {
                newList.push(list[i])
            }
        }
          }
        return newList
      },
        //récup tous les kanjis de grade 1
    async fetchKanjis(family){
        if(family === "tous")
        {
            const res = await fetch('https://kanjiapi.dev/v1/kanji/all')
            const data = await res.json()
            return data


        }   
        else{
            const res = await fetch('https://kanjiapi.dev/v1/kanji/grade-'+family)
            const data = await res.json()
            return data
        }
      },
    //renvoie n kanjis aléatoires de l'api (de grade 1)
    async fetchNKanjis(n, family){
        const data = await this.fetchKanjis(family)

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
      async initialize(){
          console.log("initialize")
        this.kanjis1= this.kanjis2=null
        this.temp = await this.fetchNKanjis(5,this.selectedFamily) // temp permet de laisser kanjis à undefined tant que toutes les données ne sont pas chargées -> ne charge pas les composants enfants sans les données
        for(var k in this.temp)
        {
            this.temp[k]= await this.getInfosKanji(this.temp[k])
            //this.meanings.push(await this.getInfosKanji(this.kanjis[k]).meanings)
        }
        //mélanger la liste
        this.kanjis1= this.temp    
        this.kanjis2 = await this.shuffle(this.kanjis1)
        this.families = ["1","2","3","4","5","6","8"]//,"tous"] //familles de kanji proposées dans le select
        //all comporte des kanji non traduits -> peut-être à enlever
      },
      triggerToast(){
        this.showToast = true;
        setTimeout(() => this.showToast = false, 1000)
      },
      selectChange(family){
        this.selectedFamily = family
        this.initialize(); //réactualise les cartes

      },
      //mélange la liste passée en paramètre -> permet aux cartes des flashcards de ne pas être en face l'une de l'autre
      async shuffle(list)
      {
        var nouvelleList = [];
        var indiceList = []
        var j, x, i;

        for(i =0; i < list.length; i++)
        {
            indiceList.push(i)
        }
        for (i = list.length - 1; i > 0; i--) {
            
            j = Math.floor(Math.random() * (i + 1));
            x = indiceList[i];
            indiceList[i] = indiceList[j];
            indiceList[j] = x;
        }
        for(i =0; i < list.length; i++)
        {
            nouvelleList.push(list[indiceList[i]])
        }
        return nouvelleList;
        }
    },
    async created() {
        this.initialize()
    },
    computed: {
        kanjisv1() {
            return this.kanjis1
        },
        kanjisv2() {
            return this.kanjis2
        }
    }
}
</script>
<style scoped>

.flashcard {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
}

/* animation toast */
.toast-enter-from {
    opacity: 0;
    transform: translateY(+60px)
}
.toast-enter-to {
    opacity: 1;
    transform: translateY(0);
}

.toast-enter-active {
    transition: all 0.3s ease;
}

.toast-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.toast-leave-to {
    opacity: 0;
    transform: translateY(+60px)
}
.toast-leave-active {
    transition: all 0.3s ease;
}

 Select {
      position: relative;
      margin-left: 43%;
      width:3%;
      min-width:40px;

    }

</style>
