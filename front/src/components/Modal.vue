<template>
    <div class="modal">
        <h3>Explications</h3>
        <p>{{text}}</p>
        <Button @btn-click="closeModal" text="Compris" color="#FAF0CD"/>
    </div>
</template>

<script>
import Button from './button.vue'

export default {
    name: 'Modal',
    components : {
        Button
    },
    props: {
        text: String
    },
    methods: {
        closeModal(){
            document.getElementsByClassName("modal")[0].style.visibility = "hidden"
            this.$emit('close-modal')
        }
    },
    async created(){

        }
}
</script>

<style scoped>

.modal {
    position:absolute;
    top:15%;
    left:75%;
    width:20%;
   background-color:white;
   padding: 10px;
   border-radius:  25% 10%;
}
h3, Button {
    margin-left: 35%;
}


</style>