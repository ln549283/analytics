<template>
  <v-app>
    <DrawerBar />

    <v-main>
      <v-container>
        <v-row v-for="m in 3" :key="m">
          <v-col v-for="n in 3" :key="n" cols="12" sm="4">
            <v-card
              :id="'card-' + (m - 1) * 3 + n"
              append-icon="O"
              variant="flat"
              class="mx-auto"
              :color="cards[m][n].colors"
              style="min-height: 200px; display: flex; justify-content: end;padding-left:10px;"
              @dragover.prevent="onDragOver(m, n)"
              @dragleave="onDragLeave(m, n)"
              @drop.prevent="onDrop(m, n)"
              :class="cards[m][n].classes"
            >
                  <v-btn variant="plain" style="position: absolute;min-width:0px">
                    <v-icon class="me-1">
                      <IconDots class="svg"/>
                  </v-icon>
                  </v-btn>
                <Bar style="margin-right:20px" :key="cards[m][n].key" :colonne="cards[m][n].value" v-if="cards[m][n].value"/>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>
<script setup>
import { ref } from 'vue'
import Footer from '../components/FooterBar.vue'
import Bar from '../components/Bar.vue'
import DrawerBar from '../components/DrawerBar.vue'
import IconDots from '@/components/icons/IconDots.vue'

const cards = ref(Array.from({ length: 4 }, () => Array(4).fill({
  colors : 'deep-purple-lighten-5',
  classes : '',
  value : '',
  type : '',
  key : 1,
}).map(card => ({ ...card }))));

const onDragOver = (m, n) => {
  cards.value[m][n].colors = "deep-purple-lighten-3"
  cards.value[m][n].classes = "drag-over border-lg border-dashed border-primary"
};

const onDragLeave = (m, n) => {  
  resetStyle(m, n)
};

const onDrop = (m, n) => {
  resetStyle(m, n)
  cards.value[m][n].value = event.dataTransfer.getData('text/plain');
  cards.value[m][n].key = cards.value[m][n].key+1;
};

const resetStyle = (m, n) => {   
  cards.value[m][n].colors = "deep-purple-lighten-5";
  cards.value[m][n].classes = "";
};


</script>