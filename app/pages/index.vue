<script setup lang="ts">
  const members = ref<string[]>([])
  const memberName = ref('')
  const numberOfGroup = ref()

  const handleMemberNameInput = (event: Event) => {
    console.log('Member name input value:', memberName.value);
    members.value.push(memberName.value);
    memberName.value = '';
  };

  const handleNumberOfGroupChange = (event: Event) => {
    // Access the committed value
    console.log('Change event value:', event);
    console.log('Number of groups:', numberOfGroup.value);
  };
</script>

<template>
  <div v-for="member in members">
    <p>{{ member }}</p>
  </div>
  <p>メンバー名を入力</p>
  <UInput v-model="memberName" @keyup.enter="handleMemberNameInput"/>
  <p>組み分け数を選択</p>
  <UInputNumber v-model="numberOfGroup" :min="2" :max="members.length" :default-value="2" @change="handleNumberOfGroupChange" />
  <NuxtLink to='/'>
    <UButton>チョイスする</UButton>
  </NuxtLink>
</template>