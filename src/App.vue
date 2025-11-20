<template>
  <navbar />

  <main class="w-full flex flex-col gap-16">
    <section id="home" class="max-sm:px-[20px] max-md:px-[64px] px-[120px] pt-20">
      <Home />
    </section>

    <section id="calculator" class="max-sm:px-[20px] max-md:px-[64px] px-[120px] py-10">
      <Calculator />
    </section>

    <section id="whyUs" class="bg-[url('/whyUs.png')] bg-cover bg-center">
      <div class="max-sm:px-[20px] max-md:px-[64px] px-[120px] py-10 bg-gradient-to-r from-primary/50 to-primary/25 backdrop-blur-xs">
        <WhyUs />
      </div>
    </section>

    <section id="info" class="flex flex-col gap-3 max-sm:px-[20px] max-md:px-[64px] px-[120px] py-10">
      <Info />
      <DocsInfo />
    </section>

    <section id="apply" class="max-sm:px-[20px] max-md:px-[64px] px-[120px] py-10">
      <Application />
    </section>
  </main>

  <footer id="footer" class="max-sm:px-[20px] max-md:px-[64px] px-[120px] py-10 bg-gray-100">
    <Footer />
  </footer>
</template>

<script setup>
    import navbar from './components/navbar.vue';
    import Home from './views/Home.vue';
    import Calculator from './views/Calculator.vue';
    import WhyUs from './views/WhyUs.vue';
    import Info from './views/Info.vue';
    import DocsInfo from './views/DocsInfo.vue';
    import Application from './views/Application.vue';
    import Footer from './views/Footer.vue';
</script>