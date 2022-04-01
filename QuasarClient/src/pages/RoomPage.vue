<template>
  <q-page>
    <h5>当前房间 {{ roomId }}</h5>
    <q-card>
      <q-card-section>
        <q-btn label="创建房间" @click="createRoom"/>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {listen, request} from "src/pinus/PinusHelper";

export default defineComponent({
  name: "RoomPage",
  setup() {
    const roomId = ref(0);

    const onRoom = (route: string, data: any, info: any) => {

    }

    const createRoom = () => {
      listen(["onRoom"], onRoom);
      request("room.roomHandler.createRoom", {});
    }


    return {roomId, createRoom}
  }
})
</script>

<style scoped>

</style>
