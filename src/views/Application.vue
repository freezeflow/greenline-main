<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useToast } from "vue-toastification/dist/index.mjs"
import { Check, Loader2 } from 'lucide-vue-next'
import { Motion } from '@oku-ui/motion'
import axios from 'axios'

const toast = useToast();

// Reactive form data
const form = reactive({
  name: '',
  email: '',
  mobile: '',
  amount: '',
  term: 1,
  files: {
    idCopy: null,
    bankstatement: null,
    payslip: null,
  },
})

const uploadProgress = ref()
const loading = ref(false)

// Track uploaded file names
const uploadedFiles = reactive({
  idCopy: '',
  bankstatement: '',
  payslip: ''
})

// Handle file upload and validation
function handleFileUpload(e, key) {
  const file = e.target.files[0]
  if (!file) return

  if (file.type !== 'application/pdf') {
    toast.error('Only PDF files are allowed.')
    e.target.value = ''
    return
  }

  form.files[key] = file
  uploadedFiles[key] = file.name
}

const submitApplication = async () => {
  const formEl = document.querySelector('form')

  if (!formEl.checkValidity()) {
    formEl.reportValidity()
    return
  }

  loading.value = true

  const formData = new FormData()
  formData.append("fullName", form.name)
  formData.append("email", form.email)
  formData.append("phone", form.mobile)
  formData.append("amount", form.amount)
  formData.append("term", form.term)
  formData.append("message", form.message || "")

  for (const key of ["idCopy", "bankstatement", "payslip"]) {
    if (form.files[key] instanceof File) {
      formData.append(key, form.files[key])
    }
  }

  try {
    const response = await axios.post("/api/apply", formData, {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          uploadProgress.value = Math.round((progressEvent.loaded * 100) / progressEvent.total)
        }
      }
    })

    if (response.data.success) {
      toast.success("Application sent successfully!")
      // reset form
      form.name = ""
      form.email = ""
      form.mobile = ""
      form.amount = ""
      form.term = 1

      form.files.idCopy = null
      form.files.bankstatement = null
      form.files.payslip = null

      uploadedFiles.idCopy = ""
      uploadedFiles.bankstatement = ""
      uploadedFiles.payslip = ""
      uploadProgress.value = 0

      loading.value = false
    } else {
      toast.error("Error: " + response.data.error)
      loading.value = false
    }

  } catch (err) {
    toast.error("Network error or server issue.")
    loading.value = false
  } finally {
    loading.value = false
  }
}

// JSON-LD Microdata
onMounted(() => {
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.text = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": "Online Loan Application",
    "description": "Apply online for a Greenline microloan with simple requirements and secure document upload.",
    "provider": {
      "@type": "Organization",
      "name": "Greenline Financials",
      "url": "https://greenline-ubvx.onrender.com"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "NAD",
      "eligibleRegion": { "@type": "Country", "name": "Namibia" },
      "description": "Loans between N$100 and N$5000 with flexible repayment terms up to 6 months."
    }
  })
  document.head.appendChild(script)
})
</script>

<template>
  <section
    class="text-primary flex flex-col gap-8"
    itemscope
    itemtype="https://schema.org/FinancialProduct"
  >
    <header class="flex flex-col gap-2">
      <h2 class="max-sm:text-2xl max-md:text-3xl text-4xl font-bold leading-tight" itemprop="name">
        Apply for a loan
      </h2>
      <p itemprop="description">
        Fill in the form and upload your documents to apply
      </p>
    </header>

    <form
      action=""
      method="post"
      class="max-sm:w-full w-1/2 flex flex-col gap-4"
      @submit.prevent="submitApplication"
      novalidate
    >
      <!-- Name -->
      <div class="flex flex-col">
        <label for="name" class="text-lg">Name</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          placeholder="John"
          required
          minlength="3"
          class="border border-primary p-2 rounded"
          @invalid="e => e.target.setCustomValidity('Please enter your full name (at least 3 characters).')"
          @input="e => e.target.setCustomValidity('')"
        />
      </div>

      <!-- Email -->
      <div class="flex flex-col">
        <label for="email" class="text-lg">Email</label>
        <input
          id="email"
          v-model="form.email"
          type="email"
          placeholder="example@gmail.com"
          required
          class="border border-primary p-2 rounded"
          @invalid="e => e.target.setCustomValidity('Please enter a valid email address.')"
          @input="e => e.target.setCustomValidity('')"
        />
      </div>

      <!-- Mobile -->
      <div class="flex flex-col">
        <label for="mobile" class="text-lg">Mobile number</label>
        <input
          id="mobile"
          v-model="form.mobile"
          type="text"
          placeholder="081 / +26481 / 26481"
          pattern="^(\+264|264|0)?81[- ]?[0-9]{3}[- ]?[0-9]{3}$"
          required
          class="border border-primary p-2 rounded"
          @invalid="e => e.target.setCustomValidity('Enter a valid Namibian number starting with 081, +26481, or 26481 (e.g., 081234567).')"
          @input="e => e.target.setCustomValidity('')"
        />
      </div>

      <!-- Loan Amount -->
      <div class="flex flex-col">
        <label for="amount" class="text-lg">Loan amount</label>
        <input
          id="amount"
          v-model="form.amount"
          type="number"
          placeholder="N$100 - N$5000"
          min="100"
          max="5000"
          required
          class="border border-primary p-2 rounded"
          @invalid="e => e.target.setCustomValidity('Please enter an amount between N$100 and N$5000.')"
          @input="e => e.target.setCustomValidity('')"
        />
      </div>

      <!-- Repayment Term -->
      <div class="flex flex-col">
        <label for="term" class="text-lg">Repayment term</label>
        <select
          id="term"
          v-model.number="form.term"
          required
          class="border border-primary p-2 rounded"
          aria-label="Select loan term"
        >
          <option v-for="n in 6" :key="n" :value="n">
            {{ n }} {{ n > 1 ? 'Months' : 'Month' }}
          </option>
        </select>
      </div>

      <!-- File Uploads -->
      <div
        v-for="(label, key) in { idCopy: 'ID Copy (PDF)', bankstatement: 'Bank Statement (PDF)', payslip: 'Payslip (PDF)' }"
        :key="key"
        class="flex flex-col relative group"
      >
        <label :for="key" class="border border-primary p-2 rounded cursor-pointer flex items-center justify-between">
          <span>{{ label }}</span>

          <!-- Checkmark animation -->
          <Motion
            v-if="uploadedFiles[key]"
            type="div"
            :initial="{ opacity: 0, x: 20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.3 }"
            class="flex items-center gap-2"
          >
            <Check class="size-6 text-green-500" />
            <Motion
              type="span"
              :initial="{ x: -20, opacity: 0 }"
              :animate="{ x: 0, opacity: 1 }"
              :transition="{ duration: 0.4, delay: 0.1 }"
              class="text-sm text-white bg-primary/50 rounded px-2 py-1 overflow-hidden whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {{ uploadedFiles[key] }}
            </Motion>
          </Motion>
        </label>

        <input
          :id="key"
          :name="key"
          type="file"
          accept="application/pdf"
          required
          class="absolute opacity-0 z-20 cursor-pointer"
          @change="e => handleFileUpload(e, key)"
          @invalid="e => e.target.setCustomValidity('Please upload your file in PDF format.')"
          @input="e => e.target.setCustomValidity('')"
        />
      </div>

      <!-- Submit -->
      <button
        type="submit"
        class="flex flex-row items-center justify-center gap-2 text-xl p-2 text-white rounded bg-accent cursor-pointer hover:bg-accent/95 transition-all"
        itemprop="potentialAction"
      >
        <Loader2 :class="loading? 'animate-spin block':'hidden'" /> Submit Application
      </button>
    </form>
  </section>
</template>
