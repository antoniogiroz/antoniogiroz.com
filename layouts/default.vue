<template>
  <div class="container mx-auto px-2 py-2 lg:py-8 lg:px-0 lg:flex">
    <div class="m-2 flex items-center justify-between lg:w-3/12 lg:min-w-64 lg:h-full lg:top-0 lg:sticky lg:p-4 lg:flex lg:flex-col">
      <div class="flex items-center lg:flex-col lg:text-center">
        <nuxt-link
          to="/">
          <img
            class="w-16 border-2 border-white rounded-full shadow-md lg:w-24"
            src="~/assets/images/avatar.jpg">
        </nuxt-link>
        <div class="flex flex-col ml-3">
          <h1 class="text-2xl font-semibold leading-tight lg:mt-3">
            Antonio Gil
          </h1>
          <h2 class="uppercase font-light">Senior developer</h2>
          <p class="hidden lg:block lg:text-center text-theme">antonioluisgil@gmail.com</p>
        </div>
      </div>
      <app-nav-bar :class="{'hidden': !showSidebar}" />

      <button
        class="lg:hidden"
        @click="showSidebar = !showSidebar"
      >
        <icon-close
          v-if="showSidebar"
          class="w-8 h-8 self-end fill-current text-gray-600 hover:text-gray-800"
        />
        <icon-menu
          v-else
          class="w-8 h-8 self-end fill-current text-gray-600 hover:text-gray-800"
        />
      </button>
    </div>
    <div class="lg:w-9/12 my-4 py-8 px-8 bg-white border border-gray-400 rounded">
      <nuxt />
    </div>
  </div>
</template>

<script>
import AppNavBar from '@/components/app-nav-bar.vue'
import IconMenu from '@/components/icon-menu.vue'
import IconClose from '@/components/icon-close.vue'

export default {
  components: {
    AppNavBar,
    IconMenu,
    IconClose
  },

  data: () => ({
    showSidebar: false
  })
}
</script>
