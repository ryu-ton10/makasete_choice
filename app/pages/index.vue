<script setup lang="ts">
  import { useMembersStore } from './../store/members'
  import { shuffleMembers } from '~/interactor/shuffleinteractor'

  const store = useMembersStore()
  const members = store.members
  const memberName = ref('')
  const numberOfGroup = ref()
  let isInitialLoad = true

  const handleMemberNameInput = () => {
    store.addMember({ groupId: 1, name: memberName.value });
    memberName.value = '';
  };

  const handleNumberOfGroupChange = () => {
    store.changeNumberOfGroup(numberOfGroup.value);
  };

  const doShuffle = () => {
    isInitialLoad = false;
    shuffleMembers();
  }

</script>

<template>
  <div v-for="member in members">
    <p>{{ member.name }}</p>
  </div>
  <p>メンバー名を入力</p>
  <UInput v-model="memberName" @keyup.enter="handleMemberNameInput"/>
  <p>組み分け数を選択</p>
  <UInputNumber v-model="numberOfGroup" :min="2" :max="members.length" :default-value="2" @change="handleNumberOfGroupChange" />

  <UButton @click="doShuffle">チョイスする</UButton>

  <div v-show="!isInitialLoad">
    <div v-for="group in store.numberOfGroup" class="mb-6">
      <h2 class="text-xl font-bold mb-2">グループ {{ group }}</h2>
      <ul class="list-disc list-inside">
        <li v-for="member in store.getMembersByGroup(group)">
          {{ member.name }}
        </li>
      </ul>
    </div>
    <p class="text-lg font-semibold">組み分け数: {{ store.numberOfGroup }}</p>
  </div>
</template>