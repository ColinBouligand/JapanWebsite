<template>
    
    <canvas id="canvas"></canvas>
    <br>
    <Button text="Sauvegarder" color="green"/>
    <Button @click="eraseDraw()" text="Réinitialiser" color="blue"/>
</template>

<script>
    const canvas = document.getElementById('canvas')

    // some hotfixes... ( ≖_≖)
    //document.body.style.margin = 0;
    canvas.style.position = 'fixed';
    canvas.style.border ='solid black 1px';
    canvas.style.width='150px';
    canvas.style.height='150px';

    
    // get canvas 2D context and set him correct size
    var ctx = canvas.getContext('2d');
    resize();
    var cptStroke = 0;
    var posX=0;
    var posY=0;
    
    // last known position
    var pos = { x: 0, y: 0 };
    
    window.addEventListener('resize', resize);
    document.addEventListener('mousemove', draw);
    document.addEventListener('mousedown', setPosition);
        
   
    function draw(e){
            var canvas = document.getElementById('canvas');
            var ctx= canvas.getContext('2d')
             // mouse left button must be pressed
            if (e.buttons !== 1) return;
    
            ctx.beginPath(); // begin
    
            ctx.lineWidth = 5;
            ctx.lineCap = 'round';
            ctx.strokeStyle = 'black';
    
            if(posX != pos.x && posY != pos.y)
            {
                cptStroke++;
                console.log(cptStroke);
            }

            ctx.moveTo(pos.x, pos.y); // from
            setPosition(e);
            ctx.lineTo(pos.x, pos.y); // to
            posX = pos.x;
            posY= pos.y;
    
            ctx.stroke(); // draw it!*/
        }  
    

    document.addEventListener('mousedown',(e) => { 
     // console.log(e.explicitOriginalTarget)  
      //console.log($('canvas'))   

      //rajoute un trait que si sur le canvas
      if(e.explicitOriginalTarget === canvas)
      {
       // cptStroke ++;   // PROBLEME : comptabilise même quand on clique seulement sans dessiner 
                        // à prendre en compte plus tard, ou changer de technique
      }
      
 
});
    document.addEventListener('mouseenter', setPosition);
   /* 
    //effacer le dessin
    $('#btn-erase').on('click',function(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      cptStroke=0;
    })

    //sauver le dessin
    $('#btn-save').on('click',function(){
      var imgurl= canvas.toDataURL( ) ; // This method saves graphics in png
      console.log(imgurl)
      // envoyer sous le format image:dataURL
      //document.getElementById('cimg').src = imgurl; // This will set img src to dataurl(png) so that it can be saved as image.
    })
*/
    
    // new position from mouse event
    function setPosition(e) {
      pos.x = e.clientX ;//-(window.innerWidth *0.1);
      pos.y = e.clientY;
    }
    
    // resize canvas
    function resize() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }
    


import Button from './button'

export default{
    name: 'Canvas',
    components: {
        Button
    },
    methods:{
         eraseDraw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            //var cptStroke=0;
        }
    },
    mounted(){
    }
}
    
</script>

<style scoped>


 canvas {
     border: solid black 2px;
     background-color: white;
 }

</style>