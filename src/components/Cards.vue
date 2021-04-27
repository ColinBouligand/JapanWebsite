<template>
    <div id="cards">
    <div class="card" :key="c.id" v-for="c in content" >
        <FlashCard @turn-card="turnCard"  :content="c" :column="column" :fontSize="fontSize" :num="num"/>
    </div>
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
             /*console.log(this.content)
             console.log(this.column)

             for(var i in this.content)
             {
                 console.log(this.content[i].kanji)
                console.log(this.content[i].meanings[0])

             }*/
/*
             console.log(this.content[0].meanings)
             if(this.content && this.content[0]){
                 //console.log(Object.keys(this.content))
                 console.log(this.content[0])
                    for(var i in Object.keys(this.content))
                    {
                        console.log("data")
                        this.data.push(this.content[i].this.column)
                        
                    }
                    console.log("fin")
                    console.log(this.data)
             }*/

             
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
     background-color: black;
     color:white;
     padding:0;
     width:20%;
     margin-left:25%; 
     margin-top: 3%;
     cursor:pointer;
}


</style>