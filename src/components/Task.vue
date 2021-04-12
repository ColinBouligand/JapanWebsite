<template>
<div @dblclick="$emit('toggle-reminder',task.id)" :class="[task.reminder ? 'reminder' : '', 'task']"> <!-- array de classe-->
    <h3> {{ task.text }}
         <i @click="onDelete(task.id) " class="fas fa-times"></i>
    </h3>
   
    <p> {{task.day}} </p>
</div>
</template>

<script>
export default {
    name: 'Task',
    props: {
        task: Object,
    },
    methods:{
        onDelete(id) {
            this.$emit('delete-task',id)
        },
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

</style>