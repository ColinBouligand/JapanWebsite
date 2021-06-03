<template>
    <option  :value="value"> {{value}}
    </option>
</template>

<script>
export default {
    name: "Option",
    props: {
            value: String
    },
    methods: {
    
    },
    async created(){
    }


}

</script>
