<template>
  <v-app>
    <DrawerBar />

    <v-main>
      <v-container>
        <v-row v-for="m in 3" :key="m">
          <v-col v-for="n in 3" :key="n" cols="12" sm="4">
            <v-card
              variant="flat"
              class="mx-auto"
              color="deep-purple-lighten-5"
              title="Drop a column of your file"
              style="min-height: 200px; display: flex; justify-content: center; align-items: center"
            >
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Footer from '../components/FooterBar.vue'
import DrawerBar from '../components/DrawerBar.vue'


</script>
