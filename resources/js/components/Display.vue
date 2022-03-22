<script>
export default {  
  props: ['content'],

  computed: {
    dynamicContent() {
      return this.content == '' ? '<span class="calculator__display-number">0</span>' : this.content;
    }
  },
  
}
</script>

<template>
    <div class="calculator__display" v-html="dynamicContent">
       
    </div>
</template>

<style>

</style>
