<template>
<img @click="openModal" class="logo_help" src="../assets/logo_help.png" alt="logo aide" />
<Modal @close-modal="modalClosed" v-if="showModal" :text="textModal"/>

<div  v-if="!noPhotos">
<Select v-model="selectedFamily" :content="families" @select-change="selectChange"/>
    <a :href="getURlKanji()" >Détails</a>
    <Button @click="changeKanji();" text="Prochain Kanji" color="#F5F5F5"/>
    <div  class="container">
    <h1>{{kanji[0]}}</h1>
    <img v-if="images[0]" :src="images[0]"  @click="clickImg" :alt="kanji[0]" >
    <img v-if="images[1]" :src="images[1]"  @click="clickImg"  :alt="kanji[1]">
    <img v-if="images[2]" :src="images[2]" @click="clickImg" :alt="kanji[2]" >
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
import Modal from '../components/Modal'
import Select from '../components/Select'
import { apiImgKey } from '../../api.js'


export default {
    name: 'Pictures',
    components: {
        Button,
        Toast,
        Modal,
        Select,
    },
     data() {
        return {
            kanji: [],
            meanings:[],
            images: [],
            showToast: false,
            textModal: "Cette page est là pour vous aider à associer un kanji à une idée, une image. On vous y propose un kanji et 3 images. Vous devez ensuite choisir quelle image représente le kanji. Parfois les 3 images ne correspondront peut-être pas au kanji, n'hésitez pas à passer au prochain !",
            showModal: false,
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
        this.images = []
        this.meanings= []
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
        console.log(this.images)
    },
    triggerToast(text){
        this.showToast = true;
        this.textToast = text;
        setTimeout(() => this.showToast = false, 1000)
    },
    getURlKanji(){
        return `${window.location.origin}/kanji/${this.kanji[0]} `
    },
    openModal(){
        this.showModal= ! this.showModal
    },
    modalClosed(){
        this.showModal=false
    },   
    selectChange(family){
        this.selectedFamily = family
        this.changeKanji(); //réactualise les cartes

    },
    clickImg(img){
        console.log(img.explicitOriginalTarget.getAttribute("alt"))
        if(img.explicitOriginalTarget.getAttribute("alt") === this.kanji[0])
        {   
            console.log("gagné")
            this.triggerToast("Gagné ! - "+ this.meanings[0].meanings[0]+" -")
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


.container {
   width:80%;
   margin-left:10%;
   text-align: center;
}

Button {
    color:black;
    margin-left:45%;
    margin-top: 4%;
}

a {
    color: white;
    margin-left: 1%;
    margin-top: 1%;

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

.logo_help {
        width:3%;
        min-width:35px;
        left:95%;
        margin-top:1%;
        position:relative

  }
   Select {
      position: relative;
      margin-left: 41%;
      width:3%;
      min-width:40px;

    }

    img {
        cursor:pointer;
        margin: 1%;
    }
</style>
