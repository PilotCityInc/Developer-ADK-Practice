<template>
  <ValidationObserver v-slot="{ invalid }" slim>
    <v-container class="module-default pa-0">
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
                <v-icon color="grey lighten-2" class="d-flex justify-center">
                  mdi-chevron-up
                </v-icon>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
      <v-progress-linear
        class="mt-3"
        color="#dedede"
        height="2"
        value="100"
        buffer-value="100"
        stream
      />
      <div>
        <div class="module-default__log-text">
          <validation-provider v-slot="{ errors }" slim rules="numeric|min_value:1|required">
            <v-text-field
              v-model="adkData.practiceLog[logIndex].minutes"
              placeholder="0"
              label="Enter Minutes"
              class="module-default__text-field"
              :readonly="userType === 'stakeholder'"
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
            :disabled="invalid || userType === 'stakeholder'"
            @click="process"
            >LOG MINUTES</v-btn
          >
        </div>
        <div class="module-default__log-btn-row mt-3">
          <v-btn :disabled="userType === 'stakeholder'" v-if="adkData.practiceLog.length > 1" depressed color="#ffffff" small @click="undo"
            ><v-icon left>mdi-undo</v-icon>Undo</v-btn
          >
        </div>
        <div class="tableview__column mt-12">
          <!-- <v-btn x-small outlined depressed class="mr-1 mb-2">Personal</v-btn> -->
          <!-- <v-btn class="ml-1 mb-2" x-small outlined depressed>Team</v-btn> -->
          <div class="tableview__total-log-title mt-6 b-2">Logged Time</div>
          <div class="tableview__total-log mb-6">
            {{ Math.floor(finalValueLog / 60) }}h {{ finalValueLog % 60 }}m
          </div>
          <!-- <div v-if="finalValueLog">
          <div class="tableview__total-log-title mt-6 b-2">Required Time Left</div>
          <div class="tableview__total-log mb-6">
            {{ Math.floor(adkData.defaultActivity.endEarlyActivity * 60) - finalValueLog }}m
          </div>
        </div> -->
          <div :key="tableRefresh">
            <v-data-table
              :headers="header"
              :items="adkData.practiceLog"
              sort-by="resource"
              :items-per-page="100"
              :hide-default-footer="true"
            >
              <!-- <template v-slot:item.delete>
              <v-btn small icon depressed @click="deleteLog(adkData.practiceLog[index])">
                <v-icon small> mdi-delete </v-icon>
              </v-btn>
            </template> -->
            </v-data-table>
          </div>
        </div>

        <!-- ENTER CONTENT HERE -->
        <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
        <!-- <div class="module-default__none">Design your activity here</div> -->
      </div>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from '@vue/composition-api';
import { getModAdk, getModMongoDoc, loading } from 'pcv4lib/src';
import Instruct from './ModuleInstruct.vue';
import Table from './TableView.vue';
import MongoDoc from '../types';
import { items, HEADER } from './const';

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
    },
    teamDoc: {
      required: true,
      type: Object as PropType<MongoDoc | null>,
      default: () => {}
    },
    loggedNum: Number
  },
  setup(props, ctx) {
    const studentDocument = getModMongoDoc(props, ctx.emit, {}, 'studentDoc', 'inputStudentDoc');
    const teamDocument = getModMongoDoc(props, ctx.emit, {}, 'teamDoc', 'inputTeamDoc');

    const initPracticeDefault = {
      practiceLog: [
        {
          minutes: '0',
          timestamp: '',
          name: '',
          team: teamDocument.value.data.name
        }
      ]
    };
    const { adkData, adkIndex } = getModAdk(
      props,
      ctx.emit,
      'Practice',
      initPracticeDefault,
      'studentDoc',
      'inputStudentDoc'
    );

    console.log(adkData.value.practiceLog);

    // const minutes = ref('');
    // console.log(adkData.defaultActivity.endEarlyActivity);

    const logIndex = ref(adkData.value.practiceLog.length - 1);
    // console.log(logIndex.value);
    const lengthPractice = ref(0);
    const tableRefresh = ref(0);
    const finalValueLog = ref(0);

    function logMinutes() {
      // timestamp, figure out way to only display month, day, and time ex: Jul 12 at 8:10pm
      const timestamp = new Date();
      const unixtime = timestamp.valueOf();
      const date = new Date(unixtime).toLocaleDateString('en-us');
      // console.log(date);

      const log = ref({
        minutes: '',
        timestamp: '',
        name: '',
        team: teamDocument.value.data.name
      });
      // console.log(`Minutes logged: ${minutes.value}`);
      // console.log(adkData.value.practiceLog);
      adkData.value.practiceLog.push(log.value);
      adkData.value.practiceLog[logIndex.value].timestamp = date;
      adkData.value.practiceLog[
        logIndex.value
      ].name = `${studentDocument.value.data.firstName} ${studentDocument.value.data.lastName}`;
      // console.log(adkData.value.practiceLog);
      // eslint-disable-next-line no-plusplus
      logIndex.value++;

      lengthPractice.value = 0;

      // for the final value logging
      finalValueLog.value = 0;
      tableRefresh.value += 1;

      while (lengthPractice.value <= logIndex.value - 1) {
        // console.log(adkData.value.practiceLog[lengthPractice.value].minutes);
        // eslint-disable-next-line radix
        finalValueLog.value += parseInt(adkData.value.practiceLog[lengthPractice.value].minutes);

        lengthPractice.value += 1;
      }
      // console.log(adkData.value.practiceLog);

      // TODO: get the actual expected minimum log time. Maybe `adkData.defaultActivity.endEarlyActivity * 60`?
      if (finalValueLog.value > 100) { 
        adkData.value.update(() => ({
          isComplete: true,
          adkIndex: adkIndex
        }))
      }
      return new Promise((resolve, reject) => {
        studentDocument.value.update();
        resolve(true);
      });
    }

    function undo() {
      const log = ref({
        minutes: '',
        timestamp: '',
        name: '',
        team: teamDocument.value.data.name
      });
      // eslint-disable-next-line no-plusplus
      if (adkData.value.practiceLog.length > 2) {
        logIndex.value -= 2;

        // console.log(adkData.value.practiceLog[adkData.value.practiceLog.length - 2].minutes);
        // eslint-disable-next-line radix
        finalValueLog.value -= parseInt(
          adkData.value.practiceLog[adkData.value.practiceLog.length - 2].minutes
        );
        // console.log(finalValueLog.value);

        adkData.value.practiceLog.pop();
        adkData.value.practiceLog.pop();

        // console.log(adkData.value.practiceLog);

        adkData.value.practiceLog.push(log.value);
        adkData.value.practiceLog[
          logIndex.value
        ].name = `${studentDocument.value.data.firstName} ${studentDocument.value.data.lastName}`;
        // eslint-disable-next-line no-plusplus
        logIndex.value++;
        tableRefresh.value += 1;
      } else {
        // eslint-disable-next-line radix
        finalValueLog.value -= parseInt(
          adkData.value.practiceLog[adkData.value.practiceLog.length - 2].minutes
        );
        logIndex.value -= 2;
        adkData.value.practiceLog.pop();
        adkData.value.practiceLog.pop();
        adkData.value.practiceLog.push(log.value);
        // adkData.value.practiceLog[0].name = `${studentDocument.value.data.firstName} ${studentDocument.value.data.lastName}`;
        // eslint-disable-next-line no-plusplus
        logIndex.value++;
        tableRefresh.value += 1;
        // console.log('last log');
      }
    }

    function deleteLog(item: string) {
      console.log(item);
    }

    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });

    return {
      studentDocument,
      finalValueLog,
      // minutes,
      setupInstructions,
      showInstructions: 'true',
      adkData,
      // logMinutes,
      logIndex,
      undo,
      teamDocument,
      ...loading(logMinutes, 'Logged Successfully', 'Could not log at this time'),
      items,
      header: ref(HEADER),
      tableRefresh,
      deleteLog
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
      // min-height: 34px;
      // width: 150px;
    }

    // height: 100%;
    // width: 200px;
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
    // margin-bottom: 75px;
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
