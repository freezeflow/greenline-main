<script setup>
  import { Motion } from '@oku-ui/motion';
  import { onMounted } from 'vue'
  import { FileCheck, Banknote, CheckCircle, Stamp } from 'lucide-vue-next';

  onMounted(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FinancialService",
      "name": "Greenline Fiancials",
      "description": "Fast, simple, reliable loans up to N$5000 with 48-hour approval.",
      "url": "https://greenline-ubvx.onrender.com",
      "areaServed": "NA",
      "logo": "https://greenline-ubvx.onrender.com/green.png"
    })
    document.head.appendChild(script)
  })
</script>

<template>
  <main class="flex flex-row w-full items-end overflow-x-hidden max-sm:flex-col-reverse max-sm:items-center" aria-label="Hero section">
    
    <!-- Hero Text -->
    <Motion
      type="section"
      :initial="{ opacity: 0, y: 100 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 1.0 }"
      class="flex flex-col gap-8 w-3/4 z-40"
    >
      <!-- Main Headline -->
      <h1 class="text-primary font-bold max-md:text-3xl text-5xl leading-tight max-sm:text-center">
        Quick Microloans Up to N$5000 in Namibia
      </h1>

      <!-- Subheadline -->
      <h2 class="text-primary max-md:text-xl text-2xl flex flex-col leading-snug max-sm:text-center">
        Fast. Simple. Reliable.
        <span class="mt-2 font-light text-lg">Get approved within 48 hours</span>
      </h2>

      <!-- Call to Action -->
      <a
        href="#apply"
        class="w-fit inline-block cursor-pointer max-sm:px-5 max-sm:w-full text-center py-3 px-10 rounded bg-accent hover:bg-accent/95 transition text-white font-display font-semibold max-sm:text-lg max-md:text-xl text-2xl"
      >
        Apply Now 
      </a>
    </Motion>

    <!-- Hero Image -->
    <Motion
      type="section"
      :initial="{ opacity: 0, x: 100 }"
      :animate="{ opacity: 1, x: 0 }"
      :transition="{ duration: 1.0 }"
      class="w-1/2 flex justify-center items-center"
    >
      <FileCheck class="text-accent absolute -translate-x-16 -translate-y-10 lg:-translate-x-32 hover:scale-140 transition-all" id="svg1"/>

      <Stamp class="text-primary absolute -translate-x-28 translate-y-8 lg:-translate-x-40 hover:scale-140 transition-all" id="svg2"/>

      <CheckCircle class="text-primary absolute translate-x-32 translate-y-0 lg:translate-x-48 hover:scale-140 transition-all" id="svg3"/>
      
      <Banknote class="text-accent absolute translate-x-32 translate-y-20 lg:translate-x-40 hover:scale-140 transition-all" id="svg4"/>
      <img
        src="/hero.png"
        alt="Smiling person getting approved for a quick loan"
        class="min-w-64 h-auto"
      />
    </Motion>
    
  </main>
</template>

<style scoped>
  
</style>