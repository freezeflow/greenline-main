<script setup>
import { reactive, onMounted, ref } from 'vue'
import { MapPin, Phone, Mail, Loader2 } from 'lucide-vue-next'
import { useToast } from "vue-toastification/dist/index.mjs";
import axios from 'axios'

// Reactive form object
const contactForm = reactive({
  email: '',
  body: ''
})

const loading = ref(false)
const uploadProgress = ref()
const toast = useToast();

// Handle form submission
async function handleSubmit(e) {
  e.preventDefault();
  const formEl = e.target;

  if (formEl.checkValidity()) {
    loading.value = true
    try {
      const response = await axios.post(`/api/contact`, contactForm, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          }
        }
      });

      if (response.data.success) {
        loading.value = false
        toast.success("Message recieved, we will contact you as soon as possible")

        contactForm.email = '';
        contactForm.body = '';
      } else {
        loading.value = false
        toast.error(`${response.data.error || "Failed to send message."}`);
      }

    } catch (err) {
      loading.value = false
      toast.error("An error occured, please wait while our team checks it out")
    }
  } else {
    formEl.reportValidity();
  }
}

onMounted(() => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Greenline Financials",
    "url": "https://greenline-ubvx.onrender.com",
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
        class="flex flex-row justify-center items-center gap-1 bg-primary text-white p-2 w-1/2 rounded cursor-pointer hover:bg-primary/80"
      >
        <Loader2 :size="20" :class="loading? 'animate-spin block':'hidden'" /> Send
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
