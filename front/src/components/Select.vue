<template>
    <select :v-if="content" @change="change" >
        <Option v-for="(option, index) in content"
            :key="index"
            :value="option"/>
    </select>  
</template>

<script>

import Option from '../components/Option'

export default {
    name: "Select",
    components: {
        Option,
    },
    props: {
        content: Object
    },
    data() {
        return {
        }
    },
    methods: {    
        change(event){
            this.$emit('select-change', event.target.value)
        }
    },
    computed: {
        options(){
            return this.content
        }
}


}
</script>

<style scoped>

</style>
