<template>
<div> <!-- array de classe-->
    <img :src="drawing.imgUrl"/>
</div>
</template>

<script>
export default {
    name: 'Drawing',
    props: {
        drawing: Object,
    },
}

</script>

<style scope>


.fas{
    color:red;
    left:5%;
}
.task {
    border: solid black 1px;
    margin : 1%;
}

.task.reminder {
    border-left : 5px solid green;
}

img {
    width:10%;
    height:10%;
}

</style>