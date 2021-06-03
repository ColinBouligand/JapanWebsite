<template>
    <img @click="openModal" class="logo_help" src="../assets/logo_help.png" alt="logo aide" />
<Modal @close-modal="modalClosed" v-if="showModal" :text="textModal"/>
</template>

<script>
import Modal from '../components/Modal'

export default({
    name : 'Help',
    components:{
        Modal,
    },
    props: {
        textModal: String,
        home: Boolean,
    },
    data(){
        return {
            showModal:false
        }
    },
    methods: {
      openModal(){
          this.showModal= ! this.showModal
      },
      modalClosed(){
          this.showModal=false
      },
    },
    created(){
        if(this.home) 
        {
             setTimeout(() => {this.showModal = true; }, 4000); 
        }
    }
})
</script>

<style scoped>

.logo_help {
        width:3%;
        min-width:35px;
        left:95%;
        margin-top:1%;
        position:relative

  }

</style>