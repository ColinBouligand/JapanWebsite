<template>
    <div id="cards">
        <FlashCard class="card" :key="c.id" v-for="c in content" ref="flashcard" @turn-card="turnCard"  :content="c" :column="column" :fontSize="fontSize" :num="num" :turned="allRecto" />
    </div>
</template>

<script >
    import FlashCard from './FlashCard'

    export default {
        name: 'Cards',
        props: {
            content: Object,
            column: String,
            fontSize: String,
            num: String,
            allRecto: Boolean,
        },
        data()  {
            return {
                lastClicked : ""
            }
        },
        emits: ['turn-card'],
        components: {
            FlashCard,
        },
        methods: {
         turnCard(kanji, colonne){
            this.$emit('turn-card', kanji,colonne)
            }
        },
        async created() {
            //console.log(this.allRecto)    
            //this.$forceUpdate()         
        },
        setup : () => {
            //const flashcard = 
            //return flashcard
        },
        watch:
        {
            allRecto()
            {
                //console.log("RECTO" , this.allRecto)
            }
        }
    }
</script>

<style scoped>
#cards {
    height:100%;
    width: 50%;
    display:flex;
    flex-direction: column;
    flex-wrap:wrap;
    justify-content: space-between;
}

.card {

     text-align: center;
     border: solid white 1px;
     background-color: #FAF0CD;
     color:#9B2D23;
     padding:0;
     width:20%;
     height:15%;
     margin-left:25%; 
     margin-top: 3%;
     cursor:pointer;

}
/*
.card:hover {
    border: solid 3px black;
}
*/

</style>