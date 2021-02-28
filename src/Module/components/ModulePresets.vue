<template>
  <v-container class="module-outcomes">
    <div class="module-outcomes__container">
      <!-- <v-divider class="presets__divider"></v-divider> -->
      <div class="presets__section-title">General</div>
      <!-- <div class="presets__nopresets">No tweaking necessary</div> -->
      <ValidationObserver v-slot="{}" slim>
        <!-- <v-container class="module-outcomes">
          <div class="module-outcomes__container"> -->
        <!-- <v-divider class="presets__divider"></v-divider> -->
        <!-- <div class="presets__section-title">Minimum practice minutes before unlock</div> -->
        <validation-provider v-slot="{ errors }" slim rules="numeric|required|min_value:1">
          <v-select
            v-model="hours"
            label="Minimum logged hours"
            :error-messages="errors"
            :items="minimumHours"
            x-large
            outlined
          ></v-select>
        </validation-provider>
        <!-- </div>
        </v-container> -->
      </ValidationObserver>
      <v-divider class="presets__divider"></v-divider>
      <div class="presets__section-title">Instructions</div>
      <Instruct v-model="setupInstructions" />
      <v-divider class="presets__divider"></v-divider>
      <div class="presets__section-title">Defaults</div>

      <v-select
        disabled
        :items="group"
        label="What activity group does this belong to?"
        outlined
      ></v-select>
      <v-select
        disabled
        :items="required"
        label="Is this activity required for participants to complete?"
        outlined
      ></v-select>

      <!-- <v-select
        :items="lockOrder"
        label="Lock activity group and placement order?"
        outlined
      ></v-select> -->
      <v-select disabled :items="deliverable" label="Is this a deliverable?" outlined></v-select>
      <!-- <v-select
        :items="accessibility"
        label="Make this activity accessible to participants anytime?"
        outlined
      ></v-select> -->
      <v-select
        disabled
        :items="endEarly"
        label="Allow participants to end program early after completion of this activity?"
        outlined
      ></v-select>
      <!-- POST-ACTIVITY REFLECTION -->
      <!-- <v-text-field
        label="Post-Activity Reflection"
        placeholder="Now that you know the scope of the project, provide a summary of your interpretation."
        outlined
        hide-details
      ></v-text-field>
      <div class="presets__reflection">
        <v-btn class="presets__reflection-buttons" small depressed outlined>Save</v-btn>
        <v-btn class="presets__reflection-buttons" small depressed outlined>Preview</v-btn>
      </div> -->
      <v-divider class="presets__divider"></v-divider>
      <!-- If activity is required, show button below, make tooltip show up while disabled, right now tooltip doesn't show up -->
      <!-- <div>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="red" disabled v-bind="attrs" v-on="on">Delete Activity</v-btn>
          </template>
          <span>Required activities cannot be deleted</span>
        </v-tooltip>
      </div> -->
      <!-- Delete break when the two delete buttons above and below have been integrated as one solution -->
      <br />
      <!-- If activity is optional, show button below -->
      <div><v-btn color="red" disabled depressed>Delete Activity</v-btn></div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import Instruct from './ModuleInstruct.vue';
// import gql from 'graphql-tag';
export default defineComponent({
  name: 'ModulePresets',
  components: {
    Instruct
  },
  data() {
    return {
      hours: '',
      minimumHours: [
        '1 Hour',
        '2 Hours',
        '3 Hours',
        '4 Hours',
        '5 Hours',
        '6 Hours',
        '7 Hours',
        '8 Hours',
        '9 Hours',
        '10 Hours',
        '11 Hours',
        '12 Hours',
        '13 Hours',
        '14 Hours',
        '15 Hours',
        '16 Hours',
        '17 Hours',
        '18 Hours',
        '19 Hours',
        '20 Hours',
        '21 Hours'
      ],
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
