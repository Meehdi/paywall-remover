<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'

const schema = v.object({
  url: v.pipe(v.string(), v.url('Invalid url')),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  url: '',
})

const emit = defineEmits<{
  submit: [event: FormSubmitEvent<Schema>]
}>()

function onSubmit(event: FormSubmitEvent<Schema>) {
  emit('submit', event)
}
</script>

<template>
  <UForm :schema="schema" :state="state"  @submit="onSubmit">
    <UFormField label="Url" name="url" >
      <div class="flex gap-4">
        <UInput v-model="state.url" class="w-full" />
        <UButton type="submit" color="neutral">
          Submit
        </UButton>
      </div>

    </UFormField>


  </UForm>
</template>
