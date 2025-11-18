<script setup>
import { Motion } from '@oku-ui/motion';
import { reactive, onMounted } from 'vue';
import { ReceiptText, IdCard, Receipt } from 'lucide-vue-next';
import docCard from '@/components/docCard.vue';

const info = reactive([
  {
    icon: ReceiptText,
    heading: '1st Time clients',
    desc: '3 Month bankstatement'
  },
  {
    icon: ReceiptText,
    heading: 'Returning clients',
    desc: '1 Month bankstatement'
  },
  {
    icon: IdCard,
    heading: 'Id copy',
    desc: 'Certified Namibian Id copy'
  },
  {
    icon: Receipt,
    heading: 'Pay slip',
    desc: 'Latest payslip'
  }
]);

onMounted(() => {
  // Inject structured data for SEO (microdata)
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Loan Application Requirements",
    "provider": {
      "@type": "FinancialService",
      "name": "Greenline Financials",
      "areaServed": "Namibia",
      "url": "https://greenline-ubvx.onrender.com"
    },
    "description": "Required documents for applying for a Greenline microloan, including ID copy, payslip, and bank statements."
  });
  document.head.appendChild(script);
});
</script>

<template>
  <Motion 
    type="section"
    :initial="{ opacity: 0, y: 40 }" 
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.7, ease: 'easeOut' }"
    class="text-primary w-full flex flex-col gap-5 rounded-lg max-sm:text-lg"
    itemscope
    itemtype="https://schema.org/Service"
    aria-labelledby="required-documents"
  >
    <header class="mb-4">
      <h2
        id="required-documents"
        class="max-sm:text-2xl max-md:text-3xl text-4xl font-bold leading-tight"
        itemprop="name"
      >
        Required Documents
      </h2>
      <meta itemprop="serviceType" content="Loan Application Requirements" />
    </header>

    <div
      class="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4"
      itemprop="hasOfferCatalog"
      itemscope
      itemtype="https://schema.org/OfferCatalog"
    >
      <docCard
        v-for="(info, index) in info"
        :key="index"
        :icon="info.icon"
        :heading="info.heading"
        :desc="info.desc"
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/Service"
      />
    </div>
  </Motion>
</template>
