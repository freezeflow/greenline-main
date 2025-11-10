<script setup>
import { onMounted } from 'vue';
import { Motion } from '@oku-ui/motion'

// Structured data (JSON-LD)
onMounted(() => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Apply for a Loan Online",
    "description": "A simple 3-step process to apply for a loan online, get quick approval, and receive funds directly to your bank account.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Apply Online",
        "text": "Complete the loan application form and upload your documents securely."
      },
      {
        "@type": "HowToStep",
        "name": "Quick Review",
        "text": "Your information is verified within 48 hours by our team."
      },
      {
        "@type": "HowToStep",
        "name": "Get Paid",
        "text": "Once approved, funds are sent directly to your account."
      }
    ]
  })
  document.head.appendChild(script)
})
</script>

<template>
  <Motion
    type="section"
    id="how-it-works"
    aria-labelledby="how-it-works-title"
    :initial="{ opacity: 0, y: 40 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.8, ease: 'easeOut' }"
    class="w-full flex flex-col gap-12 text-primary py-12"
  >
    <!-- Section Header -->
    <header class="">
      <h2 id="how-it-works-title" class="max-sm:text-2xl max-md:text-3xl text-4xl font-bold mb-4">
        How It Works
      </h2>
      <p class="text-gray-600 max-w-md">
        Understand our simple three-step loan process — from online application to fast approval and instant payout.
      </p>
    </header>

    <!-- Timeline + Steps -->
    <div class="flex flex-row gap-12">
      
      <!-- Timeline Column -->
      <div class="flex flex-col items-center">
        <!-- Step Numbers -->
        <div class="bg-primary/60 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg">1</div>
        <span class="w-px h-1/3 bg-primary/50"></span>
        <div class="bg-primary/60 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg">2</div>
        <span class="w-px h-1/3 bg-primary/50"></span>
        <div class="bg-primary/60 w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-lg">3</div>
      </div>

      <!-- Steps Content Column -->
      <ol class="flex flex-col gap-24 md:gap-24 w-full">
        <!-- Step 1 -->
        <li>
          <article>
            <h3 class="text-2xl font-semibold max-sm:text-xl">Apply Online</h3>
            <p class="text-gray-700 mt-2">
              Fill out your online loan application and securely
              <a href="#" class="text-accent underline">upload your documents</a>. Our process is fast and paperless.
            </p>
          </article>
        </li>

        <!-- Step 2 -->
        <li>
          <article>
            <h3 class="text-2xl font-semibold max-sm:text-xl">Quick Review</h3>
            <p class="text-gray-700 mt-2">
              We review your application and supporting documents within <strong>48 hours</strong>. You’ll be notified immediately once approved.
            </p>
          </article>
        </li>

        <!-- Step 3 -->
        <li>
          <article>
            <h3 class="text-2xl font-semibold max-sm:text-xl">Get Paid</h3>
            <p class="text-gray-700 mt-2">
              After approval, funds are transferred directly to your account — fast and secure.
            </p>
          </article>
        </li>
      </ol>

    </div>
  </Motion>
</template>
