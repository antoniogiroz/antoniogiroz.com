<template>
  <nav class="py-4 px-2 z-30 fixed inset-y-0 left-0 w-64 bg-primary shadow overflow-y-auto lg:static lg:w-full lg:block lg:mt-8 lg:p-0 lg:bg-transparent lg:shadow-none">
    <ul class="flex flex-col">
      <li>
        <nuxt-link
          to="/me"
          class="p-2 rounded block hover:bg-secondary hover:text-ternary"
          @click.native="select"
        >
          About me
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/contact"
          class="mt-1 p-2 rounded block hover:bg-secondary hover:text-ternary"
          @click.native="select"
        >
          Contact
        </nuxt-link>
      </li>
      <h3 class="ml-2 mt-4 text-xs font-semibold text-secondary uppercase tracking-wide">Follow me</h3>
      <li class="flex items-center">
        <a
          class="p-2 rounded block hover:text-brand"
          href="https://twitter.com/antonioluisgil"
          target="_blank"
          @click="select"
        >
          Twitter
        </a>
        <svg
          class="w-4 h-4 -ml-1 fill-current text-primary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            class="heroicon-ui"
            d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/>
        </svg>
      </li>
      <li class="flex items-center">
        <a
          class="p-2 rounded block hover:text-brand"
          href="https://github.com/algil"
          target="_blank"
          @click="select"
        >
          Github
        </a>
        <svg
          class="w-4 h-4 -ml-1 fill-current text-primary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            class="heroicon-ui"
            d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/>
        </svg>
      </li>
      <li class="flex items-center">
        <a
          class="p-2 rounded block hover:text-brand"
          href="https://www.linkedin.com/in/antonioluisgil"
          target="_blank"
          @click="select"
        >
          LinkedIn
        </a>
        <svg
          class="w-4 h-4 -ml-1 fill-current text-primary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            class="heroicon-ui"
            d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/>
        </svg>
      </li>
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
    </ul>
  </nav>
</template>

<script>
export default {
  created() {
    const handleEscape = e => {
      if (e.key === 'Esc' || e.key === 'Escape') {
        this.$emit('select')
      }
    }

    if (process.client) {
      document.addEventListener('keydown', handleEscape)
      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener('keydown', handleEscape)
      })
    }
  },

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
