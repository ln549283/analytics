<template>
  <v-app-bar class="border border-t-sm" height="48" location="bottom" flat>
    <v-footer>
      <v-row justify="center" no-gutters>
        <v-col v-for="(link, i) in links" :key="i" class="text-center mb-sm-0 mb-5" cols="auto">
          <a
            :href="link.href"
            class="mr-0 px-3 py-2 ma-5 rounded-lg "
            rel="noopener"
          >
            {{link.text}}
        </a>
        </v-col>

        <v-spacer class="hidden-sm-and-down" />

        <v-col cols="12" md="auto">
            <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
                &copy; 2019, made by NEBONNE Loïc
            </div>
        </v-col>
      </v-row>
    </v-footer>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'

const links = ref([
  {
    href: '#',
    text: 'Terms of Service'
  },
  {
    href: '#',
    text: 'Privacy Policy'
  },
  {
    href: '#',
    text: 'About Us'
  }
])
</script>