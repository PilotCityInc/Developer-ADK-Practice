<template>
  <v-app>
    <Module
      v-model="programDocStub"
      :user-doc="userDoc"
      :team-doc="teamDoc"
      :user-type="userTypeStub"
      @inputTeamDoc="teamDoc = $event"
    />
  </v-app>
</template>

<script lang="ts">
// import ApolloExample from './components/ApolloExample.vue';
import { defineComponent, Ref, ref } from '@vue/composition-api';
import { ObjectId } from 'bson';
import Module from './Module/Module.vue';
import MongoDoc from './Module/types';

export default defineComponent({
  name: 'App',

  components: {
    Module
  },
  setup() {
    const programDocStub: Ref<MongoDoc> = ref({
      data: {
        // firstName: 'me',
        // lastName: 'test',
        // _id: new ObjectId(1),
        // team: null as null | ObjectId,
        adks: []
      },
      update: () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },
      changeStream: {}
    });
    const userDoc: Ref<MongoDoc> = ref({
      data: {
        _id: new ObjectId(),
        firstName: 'Test First',
        lastName: 'Test Last',
        adks: []
      },
      update: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },
      changeStream: {}
    });
    const teamDoc: Ref<MongoDoc | null> = ref({
      data: {
        adks: []
      },
      update: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(true);
            // reject(new Error('REJECTED'));
          }, 3000);
        });
      },
      changeStream: {}
    });
    const userTypeStub = 'participant';
    if (userTypeStub === 'participant') teamDoc.value = null;

    return {
      programDocStub,
      userDoc,
      userTypeStub,
      teamDoc
    };
  }
});
</script>
