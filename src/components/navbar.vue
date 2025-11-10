<script setup>
import { ref, onMounted } from 'vue'
import { Motion } from '@oku-ui/motion'
import { Home, Calculator, Info, FileText, Contact } from 'lucide-vue-next'

const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

onMounted(() => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "SiteNavigationElement",
        "position": 1,
        "name": "Home",
        "url": "https://yourwebsite.com/#home"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 2,
        "name": "Calculator",
        "url": "https://yourwebsite.com/#calculator"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 3,
        "name": "Info",
        "url": "https://yourwebsite.com/#info"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 4,
        "name": "Apply",
        "url": "https://yourwebsite.com/#apply"
      },
      {
        "@type": "SiteNavigationElement",
        "position": 5,
        "name": "Contact",
        "url": "https://yourwebsite.com/#footer"
      }
    ]
  })
  document.head.appendChild(script)
})
</script>

<template>
  <!-- Desktop Navbar -->
  <nav
    class="max-md:hidden fixed top-0 left-0 w-full bg-white text-primary shadow z-50 max-md:px-[64px] px-[120px]"
    aria-label="Primary navigation"
  >
    <div class="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
      <h1 class="font-heading text-xl" aria-label="Greenline Financials logo">logo</h1>
      <ul class="flex gap-6">
        <li><a href="#home" class="flex flex-row gap-1">Home</a></li>
        <li><a href="#calculator" class="flex flex-row gap-1">Calculator</a></li>
        <li><a href="#info" class="flex flex-row gap-1">Info</a></li>
        <li><a href="#apply" class="flex flex-row gap-1">Apply</a></li>
        <li><a href="#footer" class="flex flex-row gap-1">Contact</a></li>
      </ul>
    </div>
  </nav>

  <!-- Mobile Navbar -->
  <div
    class="max-sm:px-[20px] max-md:px-[64px] md:hidden fixed top-0 left-0 w-full py-3 bg-white text-primary shadow z-50"
  >
    <div class="w-full flex flex-row justify-between items-center">
      <h1 class="font-heading text-xl" aria-label="Greenline Microloans logo">logo</h1>

      <!-- Hamburger -->
      <button
        @click="toggleMenu"
        class="flex flex-col gap-2 focus:outline-none"
        :aria-expanded="isOpen.toString()"
        aria-controls="mobile-menu"
        aria-label="Toggle mobile navigation"
      >
        <span class="w-8 h-0.5 bg-primary rounded-full"></span>
        <span
          class="transition-all ease-in-out h-0.5 bg-primary rounded-full"
          :class="isOpen? 'w-4' : 'w-8'"
        ></span>
        <span
          class="transition-all ease-in-out h-0.5 bg-primary rounded-full"
          :class="isOpen? 'w-2' : 'w-8'"
        ></span>
      </button>
    </div>

    <!-- Animated Mobile Menu -->
    <Motion
      v-if="isOpen"
      type="nav"
      id="mobile-menu"
      :initial="{ opacity: 0, y: -30 }"
      :animate="{ opacity: 1, y: 0 }"
      :exit="{ opacity: 0, y: -30 }"
      :transition="{ duration: 0.4, ease: 'easeInOut' }"
      class="md:hidden w-full bg-white text-primary p-6 flex flex-col items-center gap-6 z-40"
      aria-label="Mobile navigation"
    >
      <ul class="flex flex-col gap-12 text-lg font-medium">
        <li @click="toggleMenu" class="mx-auto">
          <a href="#home" class="flex flex-row gap-1"><Home /> Home</a>
        </li>
        <li @click="toggleMenu" class="mx-auto">
          <a href="#calculator" class="flex flex-row gap-1"><Calculator /> Calculator</a>
        </li>
        <li @click="toggleMenu" class="mx-auto">
          <a href="#info" class="flex flex-row gap-1"><Info /> Info</a>
        </li>
        <li @click="toggleMenu" class="mx-auto">
          <a href="#apply" class="flex flex-row gap-1"><FileText /> Apply</a>
        </li>
        <li @click="toggleMenu" class="mx-auto">
          <a href="#footer" class="flex flex-row gap-1"><Contact /> Contact</a>
        </li>
      </ul>
    </Motion>
  </div>
</template>