<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { Motion } from '@oku-ui/motion'

// State
const loanAmount = ref(1000)
const loanTerm = ref(3)
const interestRate = 0.3 // 30% simple interest example

// Computed monthly payment
const monthlyPayment = computed(() => {
  const totalInterest = (loanAmount.value * interestRate) / loanTerm.value
  const total = loanAmount.value + totalInterest
  return (total / loanTerm.value).toFixed(2)
})

// Structured data (JSON-LD)
const appendJSONLD = () => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Loan Calculator",
    "description": "Estimate your monthly repayments for microloans up to N$5000 with flexible terms up to 6 months in Namibia.",
    "serviceType": "Quick Microloan Estimator",
    "areaServed": "NA",
    "provider": {
      "@type": "Organization",
      "name": "Greenline Financials",
      "url": "https://yourwebsite.com",
      "logo": "https://yourwebsite.com/logo.png"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "NAD",
      "price": loanAmount.value,
      "eligibleDuration": `${loanTerm.value} months`
    }
  })
  document.head.appendChild(script)
}

onMounted(() => appendJSONLD())

// Update JSON-LD when values change
watch([loanAmount, loanTerm], () => {
  // Remove existing script if present
  const existing = document.head.querySelector('script[type="application/ld+json"]')
  if (existing) existing.remove()
  appendJSONLD()
})
</script>

<template>
  <Motion
    type="section"
    id="loan-calculator"
    :initial="{ opacity: 0, y: 40 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.7, ease: 'easeOut' }"
    class="text-primary w-full flex flex-col gap-6"
    aria-label="Loan Calculator Section"
  >
    <!-- Header -->
    <header class="mb-4">
      <h2 class="max-sm:text-2xl max-md:text-3xl text-4xl font-bold leading-tight">
        Loan Calculator
      </h2>
      <p class="mt-2 text-lg text-gray-700 max-w-prose">
        Estimate your monthly repayment amount for loans up to
        <strong>N$5000</strong> with flexible terms between 1–6 months.
      </p>
    </header>

    <!-- Calculator Form -->
    <form class="flex flex-col gap-6" aria-label="Loan calculator form">
      <!-- Loan Amount Slider -->
      <fieldset>
        <legend class="text-lg font-semibold mb-2">Loan Amount</legend>
        <div class="flex flex-col gap-2">
          <input
            type="range"
            v-model.number="loanAmount"
            min="100"
            max="5000"
            step="50"
            class="w-full accent-primary cursor-pointer"
            aria-valuemin="100"
            aria-valuemax="5000"
            :aria-valuenow="loanAmount"
            aria-label="Select loan amount"
          />
          <div class="flex justify-between text-sm text-gray-500">
            <span>N$100</span>
            <span>N$5000</span>
          </div>
        </div>
      </fieldset>

      <!-- Loan Term Dropdown -->
      <fieldset>
        <legend class="text-lg font-semibold mb-2">Repayment Term (months)</legend>
        <select
          v-model.number="loanTerm"
          class="w-full border border-primary p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          aria-label="Select loan term"
        >
          <option v-for="n in 6" :key="n" :value="n">
            {{ n }} {{ n > 1 ? 'Months' : 'Month' }}
          </option>
        </select>
      </fieldset>
    </form>

    <!-- Monthly Payment Display -->
    <Motion
      type="div"
      :initial="{ opacity: 0, y: 10 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.5, ease: 'easeOut' }"
      class="mt-5 border-t border-gray-300 pt-4"
      aria-live="polite"
      aria-atomic="true"
    >
      <p class="text-xl text-gray-700">Estimated Monthly Repayment</p>
      <p class="max-md:text-3xl text-4xl font-bold text-accent mt-2">
        N${{ monthlyPayment }}
      </p>
    </Motion>
  </Motion>
</template>

<style scoped>
/* Cross-browser slider thumb styling */
input[type='range'] {
  width: 100%;
  height: 8px;
  border-radius: 5px;
  background: #d1d5db; /* Tailwind gray-300 */
  outline: none;
}
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #154A3A; /* Primary color */
  cursor: pointer;
  border: 2px solid #fff;
}
input[type='range']::-moz-range-thumb {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #154A3A;
  cursor: pointer;
  border: 2px solid #fff;
}
input[type='range']::-ms-thumb {
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #154A3A;
  cursor: pointer;
  border: 2px solid #fff;
}
</style>
