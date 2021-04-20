<template>

    <canvas id="canvas"></canvas>
    <Button @click="eraseDraw()" text="Réinitialiser" color="blue"/>
    <Button @click="saveDraw()" text="Sauvegarder" color="green"/>

   <!-- <img src="../assets/paintbrush.svg" alt="" style="width:100px; height:100px"/> -->

</template>

<script>   
import Button from './button'



export default{
    name: 'Canvas',
    components: {
        Button
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
        this.canvas.style.width='50%';  
        this.canvas.style.height='60%';
        this.canvas.width  = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight; // A RESOLU MON PROBLEME DE TRAIT DECALE !

        //this.canvas.style.cursor = 'url("../assets/paintbrush.svg width=\'32\' height=\'32\' "), auto'


        window.onresize = function() { //dès que la fenêtre change de taille, on doit réappliquer la taille au canvas
            this.canvas.width  = this.canvas.offsetWidth;
            this.canvas.height = this.canvas.offsetHeight;
        };

        // get canvas 2D context and set him correct size
        this.ctx = this.canvas.getContext('2d');

        const canvas = this.canvas
        const ctx= this.ctx


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

            ctx.beginPath(); // begin

            ctx.lineWidth = 3;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'black';

            ctx.moveTo(pos.x, pos.y); // from
            setPosition(e);
            ctx.lineTo(pos.x, pos.y); // to

            ctx.stroke(); // draw it!
        }
    
    },
     methods:{
         //Clic sur réinitialiser -> nettoie le canvas
         eraseDraw() {
               this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);           
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
        }
    } 
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

</style>