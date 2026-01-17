import { useMembersStore } from '@/store/members';

export const shuffleMembers = (): Array<{ groupId: number; name: string; }> => {
  const membersStore = useMembersStore();
  const members = membersStore.members.slice();

  // 配列自体をシャッフルする
  members.sort(() => Math.random() - 0.5);

  // グループIDを振る
  let groupId = 1;
  for (let member of members) {
    if (groupId > membersStore.numberOfGroup) {
      groupId = 1;
    } else {
      member.groupId = groupId;
    }
    groupId++;
  }

  return members;
};