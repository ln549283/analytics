<template>
  <v-navigation-drawer color="grey-lighten-5" width="280" permanent>
    <p class="text-h5 text-center mt-7">LOGO</p>
    <ImportFile />
    <v-card v-if="dashboardStore.headers.length > 0" class="mx-auto" variant="text">
        <v-list lines="one" ref="sortable_headers" id="sortable-headers">
            <v-list-item
                v-for="(col, index) in dashboardStore.headers"
                :key="index"
                :title="col"
                color="primary"
                rounded="xl"
                class="cursor-grab"
            ></v-list-item>
        </v-list>
        <ul id="sortable2">
            <li v-for="(col, index) in dashboardStore.headers" :key=index style="padding:5px;">{{col}}</li>
        </ul>
    </v-card>
    <template v-slot:append>
      <p class="text-h5 text-center mt-7">{{ dashboardStore.fileName }}</p>
    </template>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch} from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import ImportFile from './ImportFile.vue'
import { useSortable } from '@vueuse/integrations/useSortable'

const dashboardStore = useDashboardStore()

// const sortable_headers = ref();

watch(async () => dashboardStore.headers.length, async () => {
    console.info('ok');
    useSortable('#sortable2', dashboardStore.headers)


}, { deep: true });

</script>
