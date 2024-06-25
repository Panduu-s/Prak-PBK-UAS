<template>
    <q-layout view="hHh lpR fFf">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-toolbar-title align="left">
            UAS Prak PBK 
          </q-toolbar-title>
          <q-space />
          <div class="tasks-section">
            <q-select
              v-model="selectedTask"
              :options="tasks"
              label="Select Task"
              emit-value
              map-options
            />
            <q-btn @click="navigateToTask" label="Lihat Tugas" color="dark" />
          </div>
        </q-toolbar>
      </q-header>
      <q-page-container>
        <router-view />
      </q-page-container>
      <q-footer elevated align="left" class="bg-dark text-white">
        <q-toolbar>
          <q-toolbar-title>
            Pandu Sarma - 223510113 4E
          </q-toolbar-title>
        </q-toolbar>
      </q-footer>
    </q-layout>
  </template>

<script setup>
import {ref} from 'vue'
const tasks = ref([
  { label: "Tugas 1", value: "https://prak-pbk-tugas-1.vercel.app/" },
  {
    label: "Tugas 2", value: "https://prak-pbk-tugas-2.vercel.app/",
  },
  { label: "Tugas 3", value: "https://prak-pbk-tugas-3.vercel.app/" },
  {
    label: "Tugas 4", value: "https://prak-pbk-tugas-4.vercel.app/",
  },
  { label: "Tugas 5", value: "https://panduu-s-prak-pbk-tugas-5.vercel.app/" 
  },
  { label: "Tugas 6", value: "https://prak-pbk-tugas-6.vercel.app/" },
]);

const selectedTask = ref(null);

const navigateToTask = () => {
  if (selectedTask.value) {
    window.open(selectedTask.value, '_blank');
  }
};
</script>

<style scoped>
.tasks-section {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>