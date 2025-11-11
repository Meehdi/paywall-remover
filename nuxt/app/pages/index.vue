<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as v from 'valibot'

const _schema = v.object({
  url: v.pipe(v.string(), v.url('Invalid url')),
})

type Schema = v.InferOutput<typeof _schema>

const toast = useToast()
const isLoading = ref(false)
const content = ref<string | null>(null)
const iframeRef = ref<HTMLIFrameElement | null>(null)

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  isLoading.value = true

  try {
    const response = await $fetch('/api/archive', {
      method: 'POST',
      body: {
        url: event.data.url
      }
    })

    content.value = response.content

    // Inject content into iframe
    nextTick(() => {
      if (iframeRef.value && content.value) {
        const iframeDoc = iframeRef.value.contentDocument || iframeRef.value.contentWindow?.document
        if (iframeDoc) {
          iframeDoc.open()
          iframeDoc.write(content.value)
          iframeDoc.close()
        }
      }
    })

    toast.add({
      title: 'Success',
      description: 'Content retrieved successfully.',
      color: 'success'
    })

    console.log('Response:', response)
  } catch (error: any) {
    toast.add({
      title: 'Error',
      description: error.data?.message || 'Failed to fetch content',
      color: 'error'
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="w-full">
    <h1 class="text-2xl font-bold mb-4">Archive URL</h1>
    <ArchiveForm @submit="handleSubmit" :loading="isLoading" />

    <!-- Display the fetched content in an isolated iframe -->
    <div v-if="content" class="mt-6">
      <h2 class="text-xl font-semibold mb-2">Fetched Content:</h2>
      <div class="border border-gray-300 rounded overflow-hidden">
        <iframe
            ref="iframeRef"
            class="w-full bg-white"
            style="height: 600px; border: none;"
            sandbox="allow-same-origin"
            title="Archived page content"
        ></iframe>
      </div>
    </div>
  </div>
</template>
