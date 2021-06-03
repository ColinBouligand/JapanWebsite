<template>
    <div :key="drawing.id" v-for="drawing in drawings">
    <Drawing  :drawing="drawing"/>
    </div>
</template>

<script >
    import Drawing from './Drawing'

    export default {
        name: 'Drawings',
        props: {
            drawings: Array,
        },
        components: {
            Drawing,
        },
        //emits: ['delete-task', 'toggle-reminder'],
    }
</script>
