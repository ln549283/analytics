<template>
    <div>
        <Bar
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
            v-if="type == 'bar'"
        />
        <Pie
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
            v-else-if="type == 'pie'"
        />
        <Doughnut
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
            v-else-if="type == 'doughnut'"
        />
        <PolarArea
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
            v-else-if="type == 'polar'"
        />
        <Line
            id="my-chart-id"
            :options="chartOptions"
            :data="chartData"
            v-else-if="type == 'line'"
        />
    </div>
</template>
  
<script setup>

import { ref } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { Bar, Pie, Doughnut, PolarArea, Line } from 'vue-chartjs'
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
const dashboardStore = useDashboardStore()

const props = defineProps({
    colonne: String,
    type: String,
});

const result = dashboardStore.triAPlat(props.colonne);
const labels = Array.from(result.data.keys());
const values = Array.from(result.data.values());

const chartData = ref(null)
const randomColors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(255, 205, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(201, 203, 207, 0.5)'
];
const shuffledColors = shuffleArray(randomColors);


chartData.value = {
    labels: labels,
    datasets: [{
        label: result.header,
        data: values,
        backgroundColor: shuffledColors,
        borderColor: shuffledColors.map(color => color.replace('0.5', '1')),
        borderWidth: 2 // Largeur du contour des barres
    }]
};
const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        onClick: (e) => e.stopPropagation()

      },
      title: {
        display: true,
        text: props.colonne
      }
    }
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
</script>