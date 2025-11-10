<script setup>
import { reactive, onMounted } from 'vue'
import { MapPin, Phone, Mail } from 'lucide-vue-next'

// Reactive form object
const contactForm = reactive({
  email: '',
  body: ''
})

// Handle form submission
function handleSubmit(e) {
  e.preventDefault()
  const formEl = e.target
  if (formEl.checkValidity()) {
    console.log('Contact Form Data:', contactForm)
    // reset form if needed
    formEl.reset()
    contactForm.email = ''
    contactForm.body = ''
  } else {
    formEl.reportValidity()
  }
}


onMounted(() => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Greenline Financials",
    "url": "https://yourwebsite.com",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "email": "greenline@gmail.com",
        "telephone": "+264818669984",
        "contactType": "customer support",
        "areaServed": "NA"
      }
    ]
  })
  document.head.appendChild(script)
})
</script>

<template>
  <section class="flex flex-col gap-5 text-primary" aria-labelledby="footer-contact-title">
    <header>
      <h2 id="footer-contact-title" class="max-sm:text-2xl max-md:text-3xl text-4xl font-bold leading-tight">
        For more information
      </h2>
    </header>

    <form 
      @submit="handleSubmit"
      class="max-sm:w-3/4 w-1/3 flex flex-col gap-3"
      aria-label="Contact form"
      novalidate
    >
      <input
        type="email"
        v-model="contactForm.email"
        placeholder="example@gmail.com"
        class="p-2 w-full border border-primary/30 rounded"
        required
        aria-required="true"
        @invalid="e => e.target.setCustomValidity('Please enter a valid email address.')"
        @input="e => e.target.setCustomValidity('')"
      />

      <textarea
        v-model="contactForm.body"
        placeholder="body..."
        class="p-2 border border-primary/30 w-full rounded"
        required
        aria-required="true"
        @invalid="e => e.target.setCustomValidity('Please enter a message.')"
        @input="e => e.target.setCustomValidity('')"
      ></textarea>

      <button
        type="submit"
        class="bg-primary text-white p-2 w-1/2 rounded cursor-pointer hover:bg-primary/80"
      >
        Send
      </button>
    </form>

    <div class="mt-5 flex flex-col gap-8">
      <div class="flex flex-row gap-2">
        <MapPin aria-hidden="true" />
        <p itemprop="address" aria-label="Physical address">15th Road 1393 Tsumeb</p>
      </div>

      <div class="flex flex-row gap-2">
        <Mail aria-hidden="true" />
        <p itemprop="email" aria-label="Email address">greenline@gmail.com</p>
      </div>

      <div class="flex flex-row gap-2">
        <Phone aria-hidden="true" />
        <p itemprop="telephone" aria-label="Telephone number">+264 81 866 9984</p>
      </div>
    </div>
  </section>
</template>
