<template>
  <nav class="py-4 px-2 z-30 fixed inset-y-0 left-0 w-64 bg-primary shadow overflow-y-auto lg:static lg:w-full lg:block lg:mt-8 lg:p-0 lg:bg-transparent lg:shadow-none">
    <ul class="flex flex-col">
      <li
        v-for="(item, index) in navLinks"
        :key="index"
      >
        <nuxt-link
          :to="item.link"
          class="mt-1 p-2 rounded block hover:bg-secondary hover:text-ternary"
          @click.native="select"
        >
          {{ item.title }}
        </nuxt-link>
      </li>
    </ul>

    <social-links />
    <theme-selector @select="select" />
  </nav>
</template>

<script>
import IconExternalLink from '@/components/icons/icon-external-link.vue'
import SocialLinks from './social-links.vue'
import ThemeSelector from './theme-selector.vue'

export default {
  components: {
    IconExternalLink,
    SocialLinks,
    ThemeSelector
  },

  data() {
    return {
      navLinks: []
    }
  },

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
    }
  }
}
</script>
