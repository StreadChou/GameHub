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
    requestTest() {
      console.log(this);
      let host = "127.0.0.1";
      let port = "3010";
      this.$pinus.init({
        host: host,
        port: port,
        log: true
      }, () => {
        this.$pinus.request("connector.entryHandler.entry", "hello pinus", function (data) {
          alert(data.msg);
        });
      });
    },
  },
}
</script>
