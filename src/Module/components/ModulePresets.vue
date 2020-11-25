<template>
  <v-container class="module-outcomes">
    <div class="module-outcomes__container">
      <!-- <v-divider class="presets__divider"></v-divider> -->
      <div class="presets__section-title">Minimum practice minutes before unlock</div>
      <v-text-field placeholder="# of minutes" filled rounded dense></v-text-field>
    </div>
  </v-container>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from '@vue/composition-api';
// import gql from 'graphql-tag';
export default {
  name: 'ModulePresets',
  components: {},
  apollo: {},
  setup() {
    const presets = reactive({
      group: ['Setup', 'Project', 'Screening', 'Internship'],
      required: ['Creator requires this activity', 'Yes', 'No'],
      lockOrder: ['Creator locked activity group and placement order', 'Yes', 'No'],
      deliverable: ['Yes', 'No'],
      notifications: ['Creator turned on by default', 'Turn on', 'Turn off'],
      accessibility: [
        'Creator has turned off accessibility anytime',
        'Creator has turned on accessibility anytime',
        'Yes',
        'No'
      ],
      endEarly: [
        'Creator has not allowed participants to end early after this activity',
        'Creator has allow end early option only at preset order placement',
        'Yes',
        'No'
      ]
    });
    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });
    return {
      ...toRefs(presets),
      setupInstructions
    };
  }
};
</script>

<style lang="scss">
.presets {
  &__reflection-buttons {
    margin-right: 10px;
    margin-top: 10px;
  }
  &__reflection {
    margin-left: auto;
  }
  &__divider {
    margin-top: 40px;
    margin-bottom: 40px;
  }
  &__section-title {
    color: #000000;
    font-size: 25px;
    font-weight: 800;
    text-align: center;
    margin-bottom: 40px;
  }
  &__nopresets {
    border-radius: 5px;
    // border: 1px solid #dedede;
    height: 100px;
    text-align: center;
    background-color: #dedede;
    font-weight: 700;
    color: #ffffff;
    font-size: 18px;
    padding-top: 35px;
  }
}
</style>
