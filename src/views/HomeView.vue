<template>
  <v-app>
    <DrawerBar />

    <v-main>
      <v-container>
        <v-dialog v-model="dialogParams" max-width="600">
          <v-card title="Edit chart">
            <v-card-text>
              <v-spacer></v-spacer>

              <div>
                <v-row align="center" justify="center">
                  <p class="mx-5">Chart type</p>
                  <v-col cols="auto" min-width="500">
                    <v-btn class="ma-2" icon="mdi-chart-bar" @click="setTypeChart('bar')" variant="outlined"></v-btn>
                    <v-btn class="ma-2" icon="mdi-chart-pie" @click="setTypeChart('pie')" variant="outlined"></v-btn>
                    <v-btn class="ma-2" icon="mdi-chart-arc" @click="setTypeChart('doughnut')" variant="outlined"></v-btn>
                    <v-btn class="ma-2" icon="mdi-chart-bell-curve" @click="setTypeChart('line')" variant="outlined"></v-btn>
                    <v-btn class="ma-2" icon="mdi-chart-donut-variant" @click="setTypeChart('polar')" variant="outlined"></v-btn>                        
                  </v-col>
                </v-row>
                <v-row align="center" justify="center">
                  <p class="mx-5">Cross with another column :</p>
                  <v-col cols="auto" class="w-50">
                    <v-select
                      :items="dashboardStore.headers"
                      density="compact"
                      label="Compact"
                    ></v-select>                        
                  </v-col>
                </v-row>                  
              </div>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text="Close" variant="tonal" @click="dialogParams = false"></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-row v-for="m in 3" :key="m">
          <v-col v-for="n in 3" :key="n" cols="12" sm="4">
            <v-card
              :id="'card-' + (m - 1) * 3 + n"
              variant="flat"
              class="mx-auto pe-6 ps-2"
              :class="!cards[m][n].value ? `d-flex align-center justify-center ${cards[m][n].classes}` : ''"
              :color="cards[m][n].colors"
              style="min-height: 200px;"
              @dragover.prevent="onDragOver(m, n)"
              @dragleave="onDragLeave(m, n)"
              @drop.prevent="onDrop(m, n)"
            >
                <v-btn v-if="cards[m][n].value" icon="mdi-dots-vertical" variant="plain" style="position: absolute;right:0;min-width:0px" @click="handleParamsChart(m,n)" size="x-small"></v-btn>
                <Bar style="" :key="cards[m][n].key" :type="cards[m][n].type" :colonne="cards[m][n].value" v-if="cards[m][n].value"/>
                <div  v-else>
                  <p class="text-h5 d-flex align-center justify-center">Drop a columnn</p>
                </div>
              
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
import Bar from '../components/Chart.vue'
import DrawerBar from '../components/DrawerBar.vue'

import { useDashboardStore } from '@/stores/dashboard'
const dashboardStore = useDashboardStore()

const dialogParams = ref(false)

const currentObject = ref([null, null]);
console.log(currentObject.value)
console.log(currentObject.value)
const cards = ref(Array.from({ length: 4 }, () => Array(4).fill({
  colors : 'deep-purple-lighten-5',
  classes : '',
  value : '',
  type : 'bar',
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

const handleParamsChart = (m, n) => {
  currentObject.value[0] = m;
  currentObject.value[1] = n;
  console.log(currentObject.value)

  dialogParams.value = true
}
const setTypeChart = (params) => {
  cards.value[currentObject.value[0]][currentObject.value[1]].type = params
  console.log(currentObject.value)
  console.log(cards.value[currentObject.value[0]][currentObject.value[1]])
}
</script>