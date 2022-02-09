<script>
export default {
  data() {
    return {
      buttonLabel: this.label !== undefined ? this.label : this.press,
    }
  },

  props: ['press', 'label'],
  created() {
    window.addEventListener('keydown', (e) => {
      if (e.key == this.press) {
        this.$emit('button-pressed', this.press);
      }
    });
  }
}
</script>

<template>
    <div v-on:click="$emit('button-pressed', press)">
        {{ buttonLabel }}
    </div>
</template>

<style>

</style>
