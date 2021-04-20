<template>
 <div class="toast-wrapper">
  <div class="toast">
     {{traduction}}
    </div>
  </div>
</template>

<script>
    
    export default {
    name: 'Toast',
    components: {
    },
    props: {
        trad: Object
    },   
    data() {
        return {
            traduction: ""
        }
    },created() {
        if(this.trad){ // problème si retard avec l'API
            this.traduction = this.trad.translatedText.toUpperCase()

        }
    } 
}    
</script>

<style>
  .toast-wrapper {
    position: fixed;
    width: 100%;
    bottom: 20%;
  }
  .toast {
    padding: 20px;
    color: black;
    background: #ebd2cd;
    border-radius: 10px;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.2);
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
  }
</style>