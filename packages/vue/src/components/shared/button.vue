<script setup lang="ts">
defineProps<{ label: string }>();
</script>

<template>
  <button class="rounded-full bg-black px-4 py-2 text-white">{{ label }}</button>
</template>
