<template>
  <div>
    <h3 class="ml-2 mt-4 text-xs font-semibold text-secondary uppercase tracking-wide">Follow me</h3>
    <li
      v-for="(item, index) in socialLinks"
      :key="index"
      class="flex items-center"
    >
      <a
        :href="item.link"
        class="p-2 rounded block hover:text-brand"
        target="_blank"
        @click="select"
      >
        {{ item.title }}
      </a>
      <icon-external-link class="w-4 h-4 -ml-1 fill-current text-primary" />
    </li>
  </div>
</template>

<script>
import IconExternalLink from '@/components/icons/icon-external-link.vue'

export default {
  components: {
    IconExternalLink
  },

  data() {
    return {
      socialLinks: [
        {
          title: 'Twitter',
          link: 'https://twitter.com/antoniogiroz',
        },
        {
          title: 'Github',
          link: 'https://github.com/algil'
        },
        {
          title: 'LinkedIn',
          link: 'https://www.linkedin.com/in/antonioluisgil'
        }
      ]
    }
  }
}
</script>
