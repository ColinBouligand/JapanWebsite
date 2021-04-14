<template>
    {{kanji}}
</template>

<script>

export default {
    name: 'Card',
    props: {
        kanji: String,
    },
}


</script>


<style scoped>

template {
    text-align: center;
     border: solid white 1px;
     background-color: black;
     color:white;
     padding:0;
     width:10%;
     margin-left:45%;
     margin-bottom: 1%;
 }
</style>