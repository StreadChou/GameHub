<template>
  <div class="q-pa-md">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated class="bg-cyan-8">
        <q-toolbar>
          <q-toolbar-title>Header</q-toolbar-title>
          <q-btn flat @click="leftDrawerOpen = !leftDrawerOpen" round dense icon="menu"/>
        </q-toolbar>
      </q-header>

      <q-drawer v-model="leftDrawerOpen" show-if-above :width="200" :breakpoint="400"
                style="border-right: 1px solid #ddd">
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; ">
          <q-list padding>
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="inbox"/>
              </q-item-section>

              <q-item-section>
                Inbox
              </q-item-section>
            </q-item>

            <q-item active clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="star"/>
              </q-item-section>

              <q-item-section>
                Star
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="send"/>
              </q-item-section>

              <q-item-section>
                Send
              </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="drafts"/>
              </q-item-section>

              <q-item-section>
                Drafts
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>

        <div class="absolute-top q-px-sm q-gutter-y-md" style="height: 150px">
          <Login></Login>
        </div>
      </q-drawer>

      <q-page-container>
        <router-view/>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script lang="ts">

import {defineComponent, ref} from 'vue'
import Login from "components/auth/Login.vue";

export default defineComponent({
  name: 'MainLayout',
  components: {Login},
  setup() {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
    }
  }
})
</script>
