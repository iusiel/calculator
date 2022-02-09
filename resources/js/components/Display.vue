<script>
export default {  
  props: ['content'],

  computed: {
    dynamicContent() {
      return this.content == '' ? '0' : this.content;
    }
  } 
}
</script>

<template>
    <div v-html="dynamicContent">
       
    </div>
</template>

<style>

</style>
