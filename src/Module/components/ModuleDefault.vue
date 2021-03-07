<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <!-- <v-container class="module-default__container"> -->
    <div class="module-default__instructions">
      <v-expansion-panels v-model="showInstructions" class="module-default__instructions" flat>
        <v-expansion-panel>
          <v-expansion-panel-header
            v-show="showInstructions"
            hide-actions
            class="pa-0"
            @click="showInstructions = true"
          >
            <template v-slot="{ open }">
              <v-scroll-y-transition hide-on-leave>
                <div v-if="!open" class="d-flex flex-column justify-center">
                  <v-icon color="grey lighten-2" class="d-flex justify-center">
                    mdi-chevron-down
                  </v-icon>
                  <div color="grey lighten-2" class="module-default__collapse-title">
                    INSTRUCTIONS
                  </div>
                </div>
              </v-scroll-y-transition>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <Instruct readonly />
            <div @click="showInstructions = true">
              <div class="module-default__collapse-title">CLOSE</div>
              <!-- <div class="hr"/> OPTIONAL -->
              <v-icon color="grey lighten-2" class="d-flex justify-center"> mdi-chevron-up </v-icon>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-progress-linear
      class="module-default__collapse-divider"
      color="#dedede"
      height="2"
      value="100"
      buffer-value="100"
      stream
    />
    <div class="module-edit__container">
      <div class="module-default__log-text">
        <validation-provider v-slot="{ errors }" slim rules="numeric|min_value:1">
          <v-text-field
            v-model="adkData.practiceLog[logIndex].minutes"
            placeholder="0"
            label="Enter Minutes"
            class="module-default__text-field"
            outlined
            :error-messages="errors"
          ></v-text-field>
        </validation-provider>
      </div>
      <div class="module-default__log-btn-row">
        <v-btn
          x-large
          outlined
          class="module-default__log-btn"
          depressed
          :ripple="false"
          :disabled="invalid"
          @click="logMinutes"
          >LOG MINUTES</v-btn
        >
      </div>
      <div class="module-default__log-btn-row mt-3">
        <v-btn depressed color="#ffffff" small><v-icon left>mdi-undo</v-icon>Undo</v-btn>
      </div>
      <Table class="module-default__table-view"></Table>

      <!-- ENTER CONTENT HERE -->
      <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
      <!-- <div class="module-default__none">Design your activity here</div> -->
    </div>
    <!-- </v-container> -->
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from '@vue/composition-api';
import { getModAdk, getModMongoDoc } from 'pcv4lib/src';
import Instruct from './ModuleInstruct.vue';
import Table from './TableView.vue';
import MongoDoc from '../types';

export default defineComponent({
  name: 'ModuleDefault',
  components: {
    Instruct,
    Table
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

    const initPracticeDefault = {
      practiceLog: [
        {
          minutes: '',
          timestamp: '',
          firstName: 'Me',
          lastName: 'Meme'
        }
      ]
    };
    const { adkData } = getModAdk(
      props,
      ctx.emit,
      'Practice',
      initPracticeDefault,
      'studentDoc',
      'inputStudentDoc'
    );

    // const minutes = ref('');

    const logIndex = ref(adkData.value.practiceLog.length - 1);
    // console.log(logIndex.value);

    function logMinutes() {
      // timestamp, figure out way to only display month, day, and time ex: Jul 12 at 8:10pm
      let timestamp = new Date();
      const unixtime = timestamp.valueOf();
      timestamp = new Date(unixtime);

      const log = ref({
        minutes: '',
        timestamp: '',
        // need a way to get student firstName and student LastName
        firstName: 'Me',
        lastName: 'Me'
      });
      // console.log(`Minutes logged: ${minutes.value}`);
      adkData.value.practiceLog.push(log.value);
      adkData.value.practiceLog[logIndex.value].timestamp = timestamp;
      console.log(adkData.value.practiceLog);
      // eslint-disable-next-line no-plusplus
      logIndex.value++;
      console.log(logIndex.value);
    }

    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });

    return {
      studentDocument,
      // minutes,
      setupInstructions,
      showInstructions: 'true',
      adkData,
      logMinutes,
      logIndex
    };
  }
  // setup() {
  //   const logMinutes = ref('');
  //   const setupInstructions = ref({
  //     description: '',
  //     instructions: ['', '', '']
  //   });
  //   const showInstructions = ref(true);
  //   return {
  //     setupInstructions,
  //     showInstructions,
  //     logMinutes
  //   };
  // }
});
</script>

<style lang="scss">
.module-default {
  &__log-text {
    display: flex;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
    // max-height: 150px;
    // height: 150px !important;
  }
  &__text-field {
    &.v-input input {
      max-height: none;
    }
    &.v-text-field--outlined > .v-input__control > .v-input__slot {
      min-height: 150px;
      min-width: 150px;
    }
    &.v-text-field--outlined .v-label {
      top: 22px;
    }

    // &.v-text-field--filled > .v-input__control > .v-input__slot,
    // .v-text-field--full-width > .v-input__control > .v-input__slot,
    // .v-text-field--outlined > .v-input__control > .v-input__slot {
    //   min-height: 150px !important;
    // }
    &.v-text-field {
      // width: 150px;
      padding-top: 10px;
    }

    &.v-input {
      font-size: 50px;
      font-weight: 700;
    }

    &.v-input input {
      // max-height: none;
      text-align: center;
    }
    // text-align: center !important;
    // font-family: Raleway;
    // font-weight: 800;
    // font-size: 50px;
  }
  &__log-btn {
    &.v-btn:not(.v-btn--round).v-size--default {
      min-height: 34px;
      width: 150px;
    }

    height: 100%;
    width: 200px;
  }

  &__log-btn-row {
    text-align: center;
  }

  &__table-view {
    width: 100%;
    // padding-left: 10px;
    // padding-right: 10px;
    // margin-bottom: 20px;
  }
  &__none {
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

  &__collapse-divider {
    margin-top: 15px;
    margin-bottom: 75px;
    margin-right: none;
    margin-left: none;
    padding-right: none;
    padding-left: none;
    width: 100%;
  }
  &__collapse-title {
    color: #dedede;
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    letter-spacing: 1px;
    font-size: 13px;
    //  text-uppercase font-weight-bold text-subtitle-2 text-center
  }
  &__container {
    // width: 100%;
    // padding: none;
    // margin: none;
    margin-top: 0px;
    padding: 0px;
  }
  &__employer-title {
    font-size: 25px;
    font-weight: 700;
  }
  &__scope {
    font-size: 22px;
    font-weight: 800;
    text-align: center;
    max-width: 95%;
    margin: auto;
  }
  &__youtube {
    height: 400px;
    width: 95%;
    border-radius: 25px;
    // margin: 0px;
    background-color: #dedede;
    // text-align: center;
    // justify-content: center;
    // align-items: center;
    // padding-top: auto;
    // padding-bottom: auto;
  }
  &__about {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }
  &__faq {
    font-size: 15px;
    font-weight: 700;
    text-align: center;
    max-width: 90%;
    margin: auto;
    line-height: 30px;
  }
  &__faq-chat {
    display: flex;
    flex-direction: column;
    text-align: left;
    margin-bottom: 5%;
  }
  &__faq-chat-line {
    margin: 5px;
  }
  &__faq-avatar {
    margin: 5px;
  }
  &__faq-question {
    // text-align: left;
    font-family: 'Raleway';
    font-size: 16px;
    font-weight: 800;
    color: #404142;
  }
  &__faq-answer {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: white;
    font-style: italic;
  }
  &__faq-answer-dark {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0px;
    color: #404142;
    font-style: italic;
  }
  &__faq-answer-dark-highlight {
    text-align: left;
    font-family: 'Raleway';
    font-size: 13px;
    font-weight: 800;
    letter-spacing: 0px;
    color: #404142;
  }
  &__specs-title {
    font-weight: 800;
  }
}
</style>
