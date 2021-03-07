<template>
  <v-app>
    <Module
      v-model="programDocStub"
      :student-doc="studentDoc"
      :team-doc="teamDoc"
      @inputStudentDoc="studentDoc = $event"
      @inputTeamDoc="teamDoc = $event"
    />
  </v-app>
</template>

<script lang="ts">
// import ApolloExample from './components/ApolloExample.vue';
import { defineComponent, Ref, ref } from '@vue/composition-api';
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
    const studentDoc: Ref<MongoDoc> = ref({
      data: {
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
    const teamDoc: Ref<MongoDoc> = ref({
      data: {
        name: 'Team',
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
    return {
      programDocStub,
      studentDoc,
      teamDoc
    };
  }
});
</script>
