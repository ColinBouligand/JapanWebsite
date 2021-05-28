<template>
<Help :textModal="textModal" />
<div  v-if="!noPhotos">
    <div class="select">
 <h2>Niveau de difficulté : </h2> <Select v-model="selectedFamily" :content="families" @select-change="selectChange"/>
    </div>
    <div  class="container">
    <h1 id="kanjiImage">{{kanjiToFind}}</h1>
    <a :href="getURlKanji()" >Détails</a>
    <div class="containerpictures">
    <img v-if="images[0]" :src="images[0]"  @click="clickImg" data-id="1" :data="kanji[0]"  :alt="meanings[0].meanings[0]" :title="meanings[0].meanings[0]" >
    <img v-if="images[1]" :src="images[1]"  @click="clickImg" data-id="2" :data="kanji[1]" :alt="meanings[1].meanings[0]" :title="meanings[1].meanings[0]" >
    <img v-if="images[2]" :src="images[2]" @click="clickImg" data-id="3" :data="kanji[2]" :alt="meanings[2].meanings[0]" :title="meanings[2].meanings[0]" >
       </div>
        <Button @click="changeKanji();" text="Prochain Kanji" color="#F5F5F5"/>

    
    </div>
</div>
<div v-if="noPhotos" class="container">
        <p  >Veuillez nous excuser pour ce désagrément, cette page n'est pas disponible pour le moment, réessayez dans 1 h !</p>
</div>
    <transition name="toast">
    <Toast v-if="showToast" :text="textToast"  />
    </transition> 
</template>

<script>
import Button from '../components/button'
import Toast from '../components/Toast'
import Help from '../components/Help'
import Select from '../components/Select'
import { apiImgKey } from '../../api.js'


export default {
    name: 'Pictures',
    components: {
        Button,
        Toast,
        Help,
        Select,
    },
     data() {
        return {
            kanji: [],
            meanings:[],
            images: [],
            kanjiToFind: "",
            showToast: false,
            textModal: "Cette page est là pour vous aider à associer un kanji à une idée, une image. On vous y propose un kanji et 3 images. Vous devez ensuite choisir quelle image représente le kanji. Vous avez accès au sens des images en passant votre souris par-dessus. Parfois certains kanji n'ont pas d'images, nous nous en excusons.",
            selectedFamily:"1",
            noPhotos: false,
            textToast: ""
        }
    },
    methods: {
    //renvoie n kanjis aléatoires de l'api (de grade 1)
    async fetchNKanjis(n){
        const res = await fetch('https://kanjiapi.dev/v1/kanji/grade-'+this.selectedFamily)
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

      },  //récupère les traductions en français des traductions anglais d'un kanji // LIMITE DE TRADUCTION -> ne traduire que le premier mot (pas tous les sens)
      async getImages(words,n) {
        const res = await fetch("https://api.pexels.com/v1/search?query="+words[n].meanings[0], {
          method: "GET", 
          withCredentials: true,
            headers: { "Authorization": apiImgKey,
                        "Content-Type": "application/json"
            }
            });
            return await res.json()
      },
    async changeKanji(){
        this.kanji = await this.fetchNKanjis(3)
        console.log(this.kanji)
        this.kanjiToFind = this.kanji[0]
        this.images = []
        this.meanings= []
        this.kanji = await this.shuffle(this.kanji)
        console.log(this.kanji)
        for(var i in this.kanji)
        {
            this.meanings.push(await this.getInfosKanji(this.kanji[i]))
            this.images.push(await this.getImages(this.meanings,i))
            if(this.images[i].photos)
            {
                this.images[i] = this.images[i].photos[0].src.tiny
            }
            else {
                this.noPhotos = true
            }
        }

    },
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
    },
    triggerToast(text){
        this.showToast = true;
        this.textToast = text;
        setTimeout(() => this.showToast = false, 1000)
    },
    getURlKanji(){
        return `${window.location.origin}/kanji/${this.kanji[0]} `
    },
    selectChange(family){
        this.selectedFamily = family
        this.changeKanji(); //réactualise les cartes

    },
    clickImg(img){

        // PROBLEME CROSS WEB BROWSER RESOLU AVEC  explicitOriginalTarget -> target
        console.log(img.target.getAttribute("alt"))
        console.log(document.getElementById("kanjiImage").innerHTML)
        if(img.target.getAttribute("data") === document.getElementById("kanjiImage").innerHTML)
        {   
            console.log("gagné")
            var id = img.target.getAttribute("data-id")
            this.triggerToast("Gagné ! - "+ this.meanings[id-1].meanings[0]+" -")
            this.changeKanji()
        }
        else {
            console.log("perdu")
            this.triggerToast("Perdu !")
        }
    }
       
    },
    async created() {
      this.families = ["1","2","3","4","5","6","8"]//,"tous"] //familles de kanji proposées dans le select
      this.changeKanji()
    }
}
</script>
<style scoped>


.select {
    display :flex;
    width: 25%;
    justify-content: space-around;
}


.container {
   width:80%;
   margin-left:10%;
   text-align: center;
}

Button {
    color:black;
    margin-top: 4%;
}

a {
    color: white;
    text-decoration: none;
    font-weight: bold;
    font-size: 25px;

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
      margin-left: 46%;
      width:3%;
      min-width:40px;


    }
    img {
        cursor:pointer;
        margin: 1%;
    }

    img:hover {
        border : 1px solid black;
        position : relative
    }
    /* Effet pour afficher le nom anglais de l'image en hover */
    img[title]:hover:after {
        content: attr(title);
        padding: 4px 8px;
        color: rgba(0,0,0,0.5);
        position: relative;
        left: 50%;
        top: 50%;
        white-space: nowrap;
        z-index: 1000;
        border-radius: 5px ;
        background: rgba(0,0,0,0.5);
}

h1 {
    font-size: 700%;
}

p {
    font-weight: bold;
}
</style>
