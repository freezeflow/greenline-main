<template>
  <figure
    class="bg-primary/40 hover:bg-primary/60 border border-primary text-white flex flex-col gap-2 p-3 rounded"
    itemscope
    itemtype="https://schema.org/Service"
  >
    <!-- Icon -->
    <component
      :is="icon"
      stroke-width="1.5"
      class="size-7"
      aria-hidden="true"
    />

    <!-- Text Content -->
    <figcaption class="flex flex-col gap-1">
      <h3 class="text-xl" itemprop="name">{{ heading }}</h3>
      <p itemprop="description">{{ desc }}</p>
    </figcaption>
  </figure>
</template>

<script setup>
const props = defineProps({
  icon: Function,
  heading: String,
  desc: String,
});
</script>
