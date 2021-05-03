<template>
<div  v-bind:data-kanji="content.kanji" :style="{fontSize: fontSize, color: clicked ? 'black' : 'red'}" 
v-bind:class="{verso : clicked, minSize: minSize}  " @click="turnCard" :data-num="num"> {{content[column][0]}} </div>
</template>

<script>


export default {
    name: 'FlashCard',
    props: {
        content: Object,
        column: String,
        fontSize: String,
        num: String,
        turned: Boolean,
    },
    components: {
    },
    data() {
        return {
            clicked: false,
            minSize: false
        }
    },
    methods: {
        format(content, column) { //met en forme le json en chaine
            console.log(content, column)
            console.log(this.$props.content[(this.$props.column)])
        },
        async turnCard(e){

             // e.target.getAttribute("data-kanji") === e.explicitOriginalTarget.dataset.kanji
                this.$emit('turn-card', e.target.getAttribute("data-kanji"),e.target.getAttribute("data-num"))
                this.clicked =!this.clicked
                this.correct = !this.correct
            //envoie le kanji et la colonne du kanji sélectionné
            // PROBLEME EN FONCTION DES NAVIGATEURS
            //recup le navigateur de l'utilisateur
            //var browser;

           /* var isFirefox = typeof InstallTrigger !== 'undefined';

            console.log("Firefox", isFirefox)

            var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

            console.log("chrome", isChrome)*/

            //var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

            //console.log("opera", isOpera)
            //console.log(e.target.getAttribute())
            
                 
               

            
           /* else 
            {
               console.log("event", e.srcElement) //pour opera et chrome
                console.log(e.srcElement.data)
                
               // this.$emit('turn-card', e.explicitOriginalTarget.dataset.kanji,e.explicitOriginalTarget.dataset.num)
                
            }*/
               


            //console.log(navigator.userAgent)
            //var agent = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)/?s*(.?d+(.d+)*)/i)
            //var event=e||window.event;
            //console.log("event", event)
            //console.log(event.explicitOriginalTarget)
            //console.log(event.explicitOriginalTarget.dataset)
            
                
            

        }
    },
    created() {
        if(this.column == "meanings")
        {
            this.minSize=true;

        }

        //if(this.content[this.column][0].length > 8)
        
    
    },watch:
    {
    turned(newValue)
    {
        if(newValue)
        {
            this.clicked=false

        }
    }
    },
    emits: ['turn-card'],
    computed: {

            //clicked: function() {return false;},
            //correct: function() {return false}
    }
}
</script>



<style scoped>
.minSize {
    font-size: 30px;
    padding:10%;
}


</style>