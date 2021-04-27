<template>
    <h2 v-if="training" >Entrainement</h2>
    <canvas id="canvas"></canvas>
    <Button @click="eraseDraw()" text="Réinitialiser" color="blue"/>
    <Button v-if="!training" @click="saveDraw()" text="Sauvegarder" color="green"/>
    <img id="imageKanji" src="../assets/kanji.png">

   <!-- <img src="../assets/paintbrush.svg" alt="" style="width:100px; height:100px"/> -->

</template>

<script>   
import Button from './button'



export default{
    name: 'Canvas',
    components: {
        Button
    },
    props: {
        training: Boolean,
        kanji: String
    },
    data() {
        return{
            canvas: "",
            ctx: "",
            imgUrl: ""
        }
    },
    mounted(){
        /** Gestion du dessin de l'utilisateur **/
        this.canvas = document.getElementById('canvas')
        // some hotfixes... ( ≖_≖)
        document.body.style.margin = 0;
        this.canvas.style.position = 'relative'; // à garder fixed, sinon getBoundingClientRect() ne renvoie pas de ????? -> ne fonctionne que en plein écran :'(
        this.canvas.style.border ='solid black 1px';
        this.canvas.style.width='30%';  
        this.canvas.style.height='60%';
        this.canvas.width  = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight; // A RESOLU MON PROBLEME DE TRAIT DECALE !

        //this.canvas.style.cursor = 'url("../assets/paintbrush.svg width=\'32\' height=\'32\' "), auto'


        window.onresize = function() { //dès que la fenêtre change de taille, on doit réappliquer la taille au canvas
        if(this.canvas){ //sinon ça s'active même sur les fenêtres ou le canvas n'est pas défini
            this.canvas.width  = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
            }
        };

        // get canvas 2D context and set him correct size
        this.ctx = this.canvas.getContext('2d');

        const canvas = this.canvas
        const ctx= this.ctx
        

        this.eraseDraw()
            //const img = document.getElementById('imageKanji')
            //this.ctx.drawImage(img,1,1)
   


        // last known position
        var pos = { x: 0, y: 0 };

        document.addEventListener('mousemove', draw);
        document.addEventListener('mousedown', setPosition);
        document.addEventListener('mouseenter', setPosition);

        // new position from mouse event
        function setPosition(e) {
            //console.log(canvas.getBoundingClientRect().x + canvas.width,  canvas.getBoundingClientRect().y + canvas.height)
           // console.log(e.clientX - canvas.getBoundingClientRect().x,e.clientY - canvas.getBoundingClientRect().y)
            pos.x = e.clientX - canvas.getBoundingClientRect().x
            pos.y = e.clientY - canvas.getBoundingClientRect().y

            //clic en bas à droite :1006 413
        } // pour le décalage de position du au nav et header

        function draw(e) {
            // mouse left button must be pressed
            if (e.buttons !== 1) return;

            ctx.beginPath(); 

            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.strokeStyle = this.training ?  'black' : 'red'; //noir si pas de kanji en dessous !

            ctx.moveTo(pos.x, pos.y); // point de départ
            setPosition(e);
            ctx.lineTo(pos.x, pos.y); // point d'arrivée

            ctx.stroke(); // tracer le trait
        }
    
    },
     methods:{
         //Clic sur réinitialiser -> nettoie le canvas
         eraseDraw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //QUE SI L'UTILISATEUR VEUT DESSINER PAR DESSUS UN KANJI
            if(this.training){
            //const img = document.getElementById('imageKanji') //DESSINE L'IMAGE SITUEE SOUS LE CANVAS
            //this.ctx.drawImage(img,1,1)
            this.drawKanjiTraining(this.kanji)

            }
                          
        },
        //Clic sur sauvegarder -> propose de télécharger l'image et l'enregistre dans la base
        saveDraw() {
            this.imgUrl= this.canvas.toDataURL( ) ; // This method saves graphics in png
            //console.log(this.imgUrl)
            var image = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
            //console.log(image)
            var link = document.createElement('a');
            link.download = "kanji.png";
            link.href = image;
            link.click();

            //persistence données
            const newDrawing = {
                    imgUrl: this.imgUrl
                }

            this.$emit('add-drawing', newDrawing)
            //envoyer sous le format image:dataURL
            //document.getElementById('cimg').src = imgurl; // This will set img src to dataurl(png) so that it can be saved as image.
        },
        drawKanjiTraining(kanji){
            this.ctx.lineWidth = 3;
            this.ctx.lineCap = 'round';
            this.ctx.strokeStyle = 'black'; //noir si pas de kanji en dessous !
            this.ctx.font = "100px sans-serif";
            //this.ctx.fillText(kanji, 60, 100);
            this.ctx.strokeText(kanji, 60, 100);
        }
    },
    watch : {
        training() {
                this.eraseDraw()
        },
        kanji(newKanji, oldKanji){
            console.log("KANJI", oldKanji, newKanji)
            //this.kanji = newKanji
            this.eraseDraw()
        }
    },
    created() {
    },
    emits: ['add-drawing'],
}
    
</script>

<style scoped>


 canvas {

     border: solid black 2px;
     background-color: white;
     cursor : url("../assets/paintbrush.png") 0 16, auto;
 }

 Button {
    width:50%;
    margin:5px;

 }

 #imageKanji {
     visibility: hidden;
 }

</style>