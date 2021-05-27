<template>
    <button @click="onClick()"
    :style="{background: color, color: textColor}" class="btn">{{text}}
    </button> 
</template>

<script>

export default{
    name: 'Button',
    props:{
        text: String,
        color: String,
        textColor: String,
    },
    methods: {
        onClick() {
            this.$emit('btn-click')
        }
    }
}

</script>

<style scoped>

.btn {
  display: inline-block;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
  font-weight: bold;

}

.btn:hover {
  color: linear-gradient(to top, rgb(235,210,205), rgb(250,240,205), rgb(235,210,205));
  }
</style>
