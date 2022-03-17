<template>
  <div>
    <q-input dense standout model-value="" v-model="loginData.uid" label="UID"/>
    <q-input dense standout model-value="" v-model="loginData.token" label="token"/>
    <q-btn dense label="登录" @click="loginFunction"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import {init, request} from "src/pinus/PinusHelper";

const Chance = require('chance');

export default defineComponent({
  name: "Login",
  setup() {
    const loginData = ref({
      uid: "",
      token: "",
    })

    const loginFunction = async function () {
      const chance = new Chance();
      const uid = loginData.value.uid || chance.guid({version: 5});
      const token = loginData.value.token || chance.string({length: 20});
      await init();
      await request("connector.entryHandler.login", {uid, token});

    }

    return {loginData, loginFunction}
  }
})
</script>

<style scoped>

</style>
