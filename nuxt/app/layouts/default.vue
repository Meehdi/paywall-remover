<template>
  <div class="grid grid-rows-[72px_1fr] h-dvh">
    <UHeader :toggle="false" class="bg-amber-50 h-full" />
    <UMain class="bg-amber-100 py-10 px-20">
      <UContainer class="flex items-center">
        <slot />
      </UContainer>
    </UMain>
  </div>
</template>
