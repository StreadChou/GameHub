<template>
  <q-page>
    <q-card flat>
      <q-card-section>
        <q-input standout model-value="" type="number" v-model="roomId" label="房间ID"/>
      </q-card-section>
      <q-card-section>
        <q-btn label="创建房间" @click="createRoom"/>
        <q-btn label="加入房间" @click="joinRoom"/>
      </q-card-section>
      <q-card-section>
        <Room ref="RoomRef"></Room>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {listen, request} from "src/pinus/PinusHelper";
import Room from "components/room/Room.vue";


export default defineComponent({
  name: "RoomPage",
  components: {Room},
  setup() {
    const roomId = ref(0);


    const RoomRef = ref<any>(null);

    enum RoomPushRoute {
      OnRoomInfo = "onRoomInfo",
      OnPlayerJoinRoom = "onPlayerJoinRoom",
      OnPlayerLeaveRoom = "onPlayerLeaveRoom",
    }

    const onRoomInfo = (route: string, data: any, info: any) => {
      RoomRef.value.setRoomInfo(data);
    }
    const onPlayerJoinRoom = (route: string, data: any, info: any) => {
      RoomRef.value.joinPlayer(data);
    }

    const createRoom = async () => {
      await listen([RoomPushRoute.OnRoomInfo], onRoomInfo);
      await listen([RoomPushRoute.OnPlayerJoinRoom], onPlayerJoinRoom);
      const createResponse = await request("room.roomHandler.createRoom", {});
      if (createResponse.code == 200) {
        roomId.value = createResponse.data.roomId;
        await joinRoom()
      }
    }

    const joinRoom = async () => {
      if (roomId.value) {
        await request("room.roomHandler.joinRoom", {roomId: roomId.value});
      }
    }


    return {roomId, RoomRef, createRoom, joinRoom}
  }
})
</script>

<style scoped>

</style>
