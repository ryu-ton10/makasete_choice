<script setup lang="ts">
  import { useMembersStore } from './../store/members'
  import { shuffleMembers } from '~/interactor/shuffleinteractor'

  const store = useMembersStore()
  const members = store.members
  const memberName = ref('')
  const numberOfGroup = ref()
  let isInitialLoad = true

  const handleMemberNameInput = (event: KeyboardEvent) => {
    if (event.keyCode !== 13) return
    if (!memberName.value.trim()) return
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
  <div class="top">
    <div class="top__members">
      <div v-if="!members.length" class="top__member-no-cell">
        <p>メンバーがいません。メンバー名を入力してください。</p>
      </div>
      <div class="top__members-area">
        <div v-for="member in members" class="top__member-cell">
          <p>{{ member.name }}</p>
        </div>
      </div>
    </div>
    <div class="top__input">
      <p>メンバー名を入力</p>
      <UInput
        size="xl"
        placeholder="メンバー名を入力してください"
        v-model="memberName"
        @keydown.enter="handleMemberNameInput"
      >
        <template v-if="memberName?.length" #trailing>
        <UButton
          color="neutral"
          variant="link"
          size="sm"
          icon="i-lucide-circle-x"
          aria-label="Clear input"
          @click="memberName = ''"
        />
        </template>
      </UInput>
      <p>組み分け数を選択</p>
      <UInputNumber
        v-model="numberOfGroup"
        size="xl"
        :min="2"
        :max="members.length"
        :default-value="2"
        @change="handleNumberOfGroupChange"
        :increment="{
          color: 'neutral',
          variant: 'solid',
          size: 'lg'
        }"
        :decrement="{
          color: 'neutral',
          variant: 'solid',
          size: 'lg'
        }"
      />
    </div>

    <v-btn
      class="top__choice-button"
      type="button"
      @click="doShuffle"
      :disabled="members.length < numberOfGroup"
    >
      チョイスする
    </v-btn>

    <div class="top__result" v-show="!isInitialLoad">
      <div class="top__result-group" v-for="group in store.numberOfGroup">
        <h2 class="text-xl font-bold mb-2">{{ group }}</h2>
        <ul class="list-disc list-inside">
          <p v-for="member in store.getMembersByGroup(group)">
            {{ member.name }}
          </p>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .top {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 50px 100px;
    background-color: rgb(168, 168, 168);
  }
  .top__members {
    background-color: white;
    width: 100%;
    height: 50vh;
    padding: 50px 100px;
    border-radius: 30px;
  }
  .top__member-no-cell {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    color: gray;
    font-size: 1.5rem;
  }
  .top__members-area {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
    overflow: scroll;
    height: 100%;
  }
  .top__member-cell {
    border: 1px solid rgb(197, 194, 194);
    border-radius: 20px;
    box-shadow: 5px 5px 1px rgb(186, 186, 186);
    padding: 10px;
    margin: 5px;
    text-align: center;
    max-height: 50%;
    max-width: auto;
  }
  .top__input {
    margin: 30px 0;
    padding: 0 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    gap: 10px;
    width: 50%;
  }
  .top__input p {
    color: white;
    font-weight: bold;
  }
  .top__choice-button {
    background-color: white;
    border-radius: 30px;
    padding: 15px 50px;
    font-size: 1.5rem;
    font-weight: bold;
    box-shadow: 5px 5px 1px rgb(186, 186, 186);
    cursor: pointer;
    margin: 50px;
  }
  .top__choice-button:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
  .top__result {
    width: 100%;
    padding: 50px 100px;
    overflow: scroll;
  }
  .top__result-group {
    background-color: white;
    border-radius: 30px;
    display: grid;
    grid-template-columns: 1fr 3fr;
    padding: 20px;
    margin: 20px 0;
  }
  .top__result-group h2 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 5rem;
    color: gray;
  }
  .top__result-group ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    gap: 10px;
  }
  .top__result-group p {
    font-size: 1.5rem;
  }
</style>