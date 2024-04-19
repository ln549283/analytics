<template>
  <v-navigation-drawer color="grey-lighten-5" width="280" permanent>
    <p class="text-h5 text-center mt-7">LOGO</p>
    <ImportFile />
    <v-card v-if="dashboardStore.headers.length > 0" class="mx-auto" variant="text">
      <draggable :itemKey="(item, index) => index" v-model="dashboardStore.headers" class="sortable-list" @end="onDragEnd" group="columns" :move="handleMove">
        <template #item="{element}">
          <v-list lines="one">
            <v-list-item
              :title="element"
              color="primary"
              rounded="xl"
              class="cursor-grab"
            ></v-list-item>
          </v-list>
        </template>
        
      </draggable>
    </v-card>
    <template v-slot:append>
      <p class="text-h5 text-center mt-7">{{ dashboardStore.fileName }}</p>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import ImportFile from './ImportFile.vue'
import Draggable from 'vuedraggable';

const dashboardStore = useDashboardStore()

const onDragEnd = () => {
  // Logique à exécuter lorsque le glisser-déposer est terminé, si nécessaire
};

const handleMove = () => {
  return false; // Empêche le déplacement des éléments
};
</script>