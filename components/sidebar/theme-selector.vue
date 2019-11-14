<template>
  <div>
    <h3 class="ml-2 mt-4 text-xs font-semibold text-secondary uppercase tracking-wide">Theme</h3>
    <div class="mt-2 p-2 flex">
      <button
        class="h-6 w-6 bg-gray-100 border border-primary rounded-full shadow focus:outline-none"
        @click="changeTheme('theme-light')"
      />
      <button
        class="ml-2 h-6 w-6 bg-gray-800 border border-primary rounded-full shadow focus:outline-none"
        @click="changeTheme('theme-dark')"
      />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    select() {
      this.$emit('select')
    },

    changeTheme(theme) {
      this.$store.commit('changeTheme', theme)
      this.select()
    }
  }
}
</script>
