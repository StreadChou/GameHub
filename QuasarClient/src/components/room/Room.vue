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
    <q-card-section>
      <q-btn flat label="开始游戏" @click="startGame"/>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {listen, request} from "src/pinus/PinusHelper";

export default defineComponent({
  name: "Room",
  setup() {
    const roomId = ref<number>(0);
    const password = ref<number>(0);
    const master = ref<string>("");

    const playerList = ref<{ uid: string, cards: { suit: number, rank: number }[] }[]>([]);

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

    enum GamePushRoute {
      OnReceivedPoker = "onReceivedPoker",
    }

    const onPlayerJoinRoom = (route: string, data: any, info: any) => {

    }

    const startGame = async () => {
      if (!roomId.value) return;
      await request("room.roomHandler.startGame", {roomId: roomId.value});
      await listen([GamePushRoute.OnReceivedPoker], onPlayerJoinRoom);
    }

    return {
      roomId, password, master, playerList,
      setRoomInfo, joinPlayer, startGame,
    };
  }
})
</script>

<style scoped>

</style>
