<script>
export default {
  data() {
    return {
      buttonLabel: this.label !== undefined ? this.label : this.press,
      class: this.customClass !== undefined ? `${this.customClass} button` : 'button',
    }
  },

  props: ['press', 'label', 'customClass'],
  created() {
    window.addEventListener('keydown', (e) => {
      if (this.buttonCurrentlyPressed) {
        return false;
      }

      if (e.key == this.press) {
        this.$emit('button-pressed', this.press);
        if (this.class.search('button--pressed') === -1) {
          this.class = `${this.class} button--pressed`;
        }

        setTimeout(() => {
          this.class = this.class.replaceAll('button--pressed', '');
        }, 100);
      }
    });
  }
}
</script>

<template>
    <div v-on:click="$emit('button-pressed', press)" v-bind:class=this.class>
        {{ buttonLabel }}
    </div>
</template>

<style>

</style>
