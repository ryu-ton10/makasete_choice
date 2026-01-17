<script setup lang="ts">
  import { useMembersStore } from './../../store/members'
  import { shuffleMembers } from '~/interactor/shuffleinteractor'

  const store = useMembersStore()
  const members = store.members
  const numberOfGroup = store.numberOfGroup

  onMounted(() => {
    shuffleMembers()
  })
</script>

<template>
  <div v-for="group in store.numberOfGroup" class="mb-6">
    <h2 class="text-xl font-bold mb-2">グループ {{ group }}</h2>
    <ul class="list-disc list-inside">
      <li v-for="member in store.getMembersByGroup(group)">
        {{ member.name }}
      </li>
    </ul>
  </div>
  <p class="text-lg font-semibold">組み分け数: {{ numberOfGroup }}</p>
</template>