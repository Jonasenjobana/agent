<template>
  <router-view />
</template>

<script setup lang="ts">
import { get } from './shared/request';


get('/chat').then(res => {
  console.log(res.data);
})
</script>

<style scoped></style>
