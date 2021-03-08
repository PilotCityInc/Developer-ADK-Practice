<template>
  <div class="tableview__column mt-12">
    <v-btn x-small outlined depressed class="mr-1 mb-2">Personal</v-btn>
    <v-btn class="ml-1 mb-2" x-small outlined depressed>Team</v-btn>
    <div class="tableview__total-log-title mt-6 b-2">Logged Time</div>
    <div class="tableview__total-log mb-6">
      {{ Math.floor(finalValueLog / 60) }}h {{ finalValueLog % 60 }}m
    </div>
    <v-data-table
      v-model="studentDocument.data.adks[0].practiceLog"
      :headers="header"
      :items="studentDocument.data.adks[0].practiceLog"
      sort-by="resource"
      :items-per-page="100"
      :hide-default-footer="true"
    >
      <template v-slot:item.delete>
        <v-btn small icon depressed>
          <v-icon small> mdi-delete </v-icon>
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts">
import { ref } from '@vue/composition-api';
import { getModMongoDoc } from 'pcv4lib/src';
import { items, HEADER } from './const';

export default {
  name: 'TableView',
  props: {
    // eslint-disable-next-line vue/require-default-prop

    studentDoc: {
      required: true,
      type: Object as PropType<MongoDoc | null>,
      default: () => {}
    },
    teamDoc: {
      required: true,
      type: Object as PropType<MongoDoc | null>,
      default: () => {}
    },
    finalValueLog: Number
  },
  setup(props, ctx) {
    const studentDocument = getModMongoDoc(props, ctx.emit, {}, 'studentDoc', 'inputStudentDoc');
    const teamDocument = getModMongoDoc(props, ctx.emit, {}, 'teamDoc', 'inputTeamDoc');

    console.log(studentDocument.value.data.adks[0].practiceLog);

    // test function to check the values of the prop value being imported no need anymore
    function test() {
      console.log(props.finalValueLog);
    }
    return { header: ref(HEADER), items, test, studentDocument };
  }
};
</script>

<style lang="scss">
.tableview {
  &__column {
    text-align: center;
    // display: flex;
    flex-direction: column;
  }
  &__total-log {
    font-family: Raleway;
    font-size: 30px;
    font-weight: 800;
  }
  &__total-log-title {
    font-family: Raleway;
    font-size: 12px;
    letter-spacing: 1px;
    font-weight: 900;
    color: #000000;
    text-transform: uppercase;
  }
}
</style>
