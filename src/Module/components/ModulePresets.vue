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
        <validation-provider v-slot="{ errors }" slim rules="required">
          <v-select
            v-model="adkData.minimumHours"
            label="Minimum logged hours"
            :error-messages="errors"
            :items="minimumHours"
            x-large
            outlined
          ></v-select>
          <div center class="module-setup__save-button">
            <v-btn
              center
              class="mt-12"
              x-large
              outlined
              depressed
              :loading="loading"
              @click="process()"
              >Save</v-btn
            >
          </div>
          <v-alert v-if="success || error" class="mt-3" :type="success ? 'success' : 'error'">{{
            message
          }}</v-alert>
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
import { defineComponent, PropType, toRefs, reactive, ref } from '@vue/composition-api';
import { loading, getModAdk, getModMongoDoc } from 'pcv4lib/src';
import Instruct from './ModuleInstruct.vue';
import { group, required, deliverable, endEarly, minimumHours } from './const';
import MongoDoc from '../types';
// import gql from 'graphql-tag';

export default defineComponent({
  name: 'ModulePresets',
  components: {
    Instruct
  },
  props: {
    value: {
      required: true,
      type: Object as PropType<MongoDoc>
    },
    studentDoc: {
      required: true,
      type: Object as PropType<MongoDoc | null>,
      default: () => {}
    }
  },
  setup(props, ctx) {
    const studentDocument = getModMongoDoc(props, ctx.emit, {}, 'studentDoc', 'inputStudentDoc');

    const initPracticePresets = {
      minimumHours: '10',
      defaultActivity: {
        groupActivity: 'Screening',
        requiredActivity: 'Yes',
        deliverableActivity: 'No',
        endEarlyActivity: 'Yes',
        required: false
      }
    };

    const { adkData } = getModAdk(
      props,
      ctx.emit,
      'Practice',
      initPracticePresets,
      'studentDoc',
      'inputStudentDoc'
    );

    const presets = reactive({
      group,
      required,
      deliverable,
      endEarly,
      minimumHours
    });

    // function minuteCheck() {
    // console.log(programDoc.data.adks[index].maxCharacters);
    // }

    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });

    return {
      setupInstructions,
      studentDocument,
      adkData,
      ...toRefs(presets),
      ...loading(studentDocument.value.update, 'Saved Successfully', 'Could not save at this time')
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
.module-setup {
  &__save-button {
    display: flex;
    justify-content: center;
  }
}
</style>
