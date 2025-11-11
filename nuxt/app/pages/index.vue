<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui'
import * as v from 'valibot'

const _schema = v.object({
  url: v.pipe(v.string(), v.url('Invalid url')),
})

type Schema = v.InferOutput<typeof _schema>

const toast = useToast()

async function handleSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({ title: 'Success', description: 'The form has been submitted.', color: 'success' })
  console.log(event.data)
}
</script>

<template>
  <div class="w-full">
    <h1 class="text-2xl font-bold mb-4">Archive URL</h1>
    <ArchiveForm @submit="handleSubmit" />
  </div>
</template>
