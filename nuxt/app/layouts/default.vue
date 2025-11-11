<template>
  <div class="grid grid-rows-[72px_1fr] h-dvh">
    <UHeader :toggle="false" class="bg-amber-50 h-full" />
    <UMain class="bg-amber-100 p-40">
      <UContainer class="flex flex-col justify-center items-center">
        <slot />
      </UContainer>
    </UMain>
  </div>
</template>
