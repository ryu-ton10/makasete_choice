<script setup lang="ts">
  import { useMembersStore } from './../../store/members'

  const store = useMembersStore()
  const members = store.members
  const numberOfGroup = store.numberOfGroup
</script>

<template>
  <div v-for="group in store.numberOfGroup" class="mb-6">
    <h2 class="text-xl font-bold mb-2">グループ {{ group }}</h2>
    <ul class="list-disc list-inside">
      <li v-for="member in members">{{ member.name }}</li>
    </ul>
  </div>
  <p class="text-lg font-semibold">組み分け数: {{ numberOfGroup }}</p>
</template>