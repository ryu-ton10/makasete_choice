import { defineStore } from 'pinia';

export const useMembersStore = defineStore('members', {
  state: () => ({
    members: [] as Array<{ id: number; name: string; }>,
    numberOfGroup: 0
  }),
  actions: {
    addMember(member: { id: number; name: string; }) {
      this.members.push(member);
    },
    removeMember(memberId: number) {
      this.members = this.members.filter(member => member.id !== memberId);
    },
    changeNumberOfGroup(newNumber: number) {
      this.numberOfGroup = newNumber;
    }
  },
  getters: {
    totalMembers: (state) => {
      return state.members.length;
    }
  }
});