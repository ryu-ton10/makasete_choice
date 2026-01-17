import { defineStore } from 'pinia';

export const useMembersStore = defineStore('members', {
  state: () => ({
    members: [] as Array<{ groupId: number; name: string; }>,
    numberOfGroup: 2
  }),
  actions: {
    addMember(member: { groupId: number; name: string; }) {
      this.members.push(member);
    },
    removeMember(name: string) {
      this.members = this.members.filter(member => member.name !== name);
    },
    changeNumberOfGroup(newNumber: number) {
      this.numberOfGroup = newNumber;
    }
  },
  getters: {
    totalMembers: (state) => {
      return state.members.length;
    },
    getMembersByGroup: (state) => {
      return (groupId: number) => {
        return state.members.filter(member => member.groupId === groupId);
      };
    }
  }
});