<template>
  <nav class="py-4 px-2 z-30 fixed inset-y-0 left-0 w-64 bg-gray-100 shadow overflow-y-auto lg:static lg:w-full lg:block lg:mt-8 lg:p-0 lg:bg-gray-300 lg:shadow-none">
    <ul class="flex flex-col">
      <li>
        <nuxt-link
          to="/me"
          class="p-2 rounded block hover:bg-gray-200"
        >
          About me
        </nuxt-link>
      </li>
      <li>
        <nuxt-link
          to="/contact"
          class="mt-1 p-2 rounded block hover:bg-gray-200"
        >
          Contact
        </nuxt-link>
      </li>
      <h3 class="ml-2 mt-4 text-xs font-semibold text-gray-600 uppercase tracking-wide">Follow me</h3>
      <li class="flex items-center">
        <a
          class="p-2 rounded block hover:text-theme"
          href="https://twitter.com/antonioluisgil"
          target="_blank"
        >
          Twitter
        </a>
        <svg
          class="w-4 h-4 -ml-1 fill-current text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            class="heroicon-ui"
            d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/>
        </svg>
      </li>
      <li class="flex items-center">
        <a
          class="p-2 rounded block hover:text-theme"
          href="https://github.com/algil"
          target="_blank"
        >
          Github
        </a>
        <svg
          class="w-4 h-4 -ml-1 fill-current text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            class="heroicon-ui"
            d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/>
        </svg>
      </li>
      <li class="flex items-center">
        <a
          class="p-2 rounded block hover:text-theme"
          href="https://www.linkedin.com/in/antonioluisgil"
          target="_blank"
        >
          LinkedIn
        </a>
        <svg
          class="w-4 h-4 -ml-1 fill-current text-gray-700"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path
            class="heroicon-ui"
            d="M19 6.41L8.7 16.71a1 1 0 1 1-1.4-1.42L17.58 5H14a1 1 0 0 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 0 1-2 0V6.41zM17 14a1 1 0 0 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2h5a1 1 0 0 1 0 2H5v12h12v-5z"/>
        </svg>
      </li>
    </ul>
  </nav>
</template>
