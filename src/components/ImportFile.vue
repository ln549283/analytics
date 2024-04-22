<template>
    <div class="pa-4 text-center">
        <v-dialog v-model="dialog" max-width="600">
            <template v-slot:activator="{ props: activatorProps }">
                <v-btn
                    class="text-none font-weight-regular"
                    variant="tonal"
                    :prepend-icon="!dashboardStore.fileName ? 'mdi-plus' : 'mdi-refresh'"
                    v-bind="activatorProps"
                    :text="!dashboardStore.fileName ? 'Import your File' : 'Change your file'"
                >
                </v-btn>
            </template>

            <v-card title="Import file">
            <v-card-text>
                <v-spacer></v-spacer>

                <v-file-input
                prepend-icon=""
                @change="handleFile"
                accept=".csv, .xls, .xlsx"
                clearable
                label="File input"
                ></v-file-input>
                <small class="text-caption text-medium-emphasis">Only CSV, XLS and XLSX files</small>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

                <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
        <v-row class="mt-4 align-center">
            <v-col>Or</v-col>
            <v-col>
                <v-btn
                    class="text-none font-weight-regular"
                    variant="tonal"
                    prepend-icon="mdi-file-table"
                    text="Import Sample File"
                    @click="handleSampleFile"

                >
                </v-btn>
            </v-col>            
        </v-row>
        
    </div>
</template>
  
<script setup>
  import { ref } from 'vue'
  import { useDashboardStore } from '@/stores/dashboard'
  const dashboardStore = useDashboardStore()
  
  const dialog = ref(false)
  const fileImported = ref(false)
  
  async function handleFile(event) {
    fileImported.value = true
    await dashboardStore.setJsonData(event)
  }
async function handleSampleFile(event) {
    //Give true in 2nd arg to use this fonction as a test
    await dashboardStore.setJsonData(event, true)
}
</script>