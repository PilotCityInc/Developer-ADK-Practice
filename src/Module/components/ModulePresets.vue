<template>
  <ValidationObserver v-slot="{}" slim>
    <v-container class="module-outcomes">
      <div class="module-outcomes__container">
        <!-- <v-divider class="presets__divider"></v-divider> -->
        <div class="presets__section-title">Minimum practice minutes before unlock</div>
        <validation-provider v-slot="{ errors }" slim rules="numeric|required|min_value:1">
          <v-text-field
            v-model="minutes"
            placeholder="# of minutes"
            :error-messages="errors"
            filled
            rounded
            dense
          ></v-text-field>
        </validation-provider>
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
// import gql from 'graphql-tag';
export default defineComponent({
  name: 'ModulePresets',
  components: {},
  data() {
    return {
      minutes: '',
      setupInstructions: {
        description: '',
        instructions: ['', '', '']
      }
    };
  }
  // setup() {
  //   const minutes = ref('');
  //   const setupInstructions = ref({
  //     description: '',
  //     instructions: ['', '', '']
  //   });
  //   return {
  //     minutes,
  //     setupInstructions
  //   };
  // }
});
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
