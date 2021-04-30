<template>
  <q-page class="row items-center justify-evenly">
    <q-btn @click="requestTest" label="Click To Test"></q-btn>
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',
  data() {
    return {}
  },
  methods: {
    async requestTest() {
      console.log(this);
      let host = "127.0.0.1";
      let port = "3010";
      await this.$pinus.initSync({host: host, port: port, log: true})
      let response = await this.$pinus.requestSync("connector.entryHandler.entry", "hello pinus");
      console.log(response);
    },
  },
}
</script>
