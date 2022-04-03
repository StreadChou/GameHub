<template>
  <q-card square flat bordered>
    <q-card-section>
      room: {{ roomId }} : {{ password }} : {{ master }}
    </q-card-section>
    <q-card-section>
      <div v-for="item of playerList">
        {{ item.uid }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: "Room",
  setup() {
    const roomId = ref<number>(0);
    const password = ref<number>(0);
    const master = ref<string>("");

    const playerList = ref<any[]>([]);

    const setRoomInfo = (roomInfo: any) => {
      roomId.value = roomInfo.roomId;
      password.value = roomInfo.password;
      master.value = roomInfo.master;
      playerList.value = roomInfo.playerList;
    }


    const joinPlayer = (data: any) => {
      if (playerList.value.some(ele => ele.uid == data.uid)) return;
      playerList.value.push(data);
    }

    return {
      roomId, password, master, playerList,
      setRoomInfo, joinPlayer
    };
  }
})
</script>

<style scoped>

</style>
