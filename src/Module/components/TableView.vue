<template>
  <div class="tableview__column mt-12">
    <v-btn x-small outlined depressed class="mr-1 mb-2">Personal</v-btn>
    <v-btn class="ml-1 mb-2" x-small outlined depressed>Team</v-btn>
    <div class="tableview__total-log-title mt-6 b-2">Logged Time</div>
    <div class="tableview__total-log mb-6">00h 00m</div>
    <v-data-table
      :headers="header"
      :items="items"
      sort-by="resource"
      items-per-page="100"
      hide-default-footer="true"
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
import { items, HEADER } from './const';

export default {
  name: 'TableView',
  setup() {
    return { header: ref(HEADER), items };
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
