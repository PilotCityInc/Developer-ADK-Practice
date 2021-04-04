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
      <v-container class="pa-0">
        <div class="d-flex flex-column justify-center align-center">
          <div class="d-flex justify-center">
            <validation-provider v-slot="{ errors }" slim rules="numeric|min_value:1|required">
              <!-- <v-input
              v-model="adkData.practiceLog[logIndex].minutes"
              placeholder="0"
              label="Enter Minutes"
              outlined
              :error-messages="errors"
              class="module-default__minutes-log"
            ></v-input> -->
              <v-text-field
                v-model="minutes"
                placeholder="0"
                hide-details
                label="Enter Minutes"
                class="module-default__text-field2 mt-12"
                :readonly="userType === 'stakeholder'"
                outlined
                :error-messages="errors"
              ></v-text-field>
            </validation-provider>
          </div>
          <div class="d-flex justify-center">
            <!-- <v-btn
              x-large
              outlined
              class="module-default__log-btn2 mt-5"
              depressed
              :ripple="false"
              :disabled="invalid"
              @click="process"
            >
              LOG MINUTES
            </v-btn> -->
            <v-btn
              x-large
              outlined
              class="module-default__log-btn2 mt-5"
              depressed
              :ripple="false"
              :disabled="invalid || userType === 'stakeholder'"
              :loading="loading"
              @click="process"
              >LOG MINUTES</v-btn
            >
          </div>
          <v-alert v-if="success || error" class="mt-3" :type="success ? 'success' : 'error'">{{
            message
          }}</v-alert>
          <div class="d-flex justify-center">
            <v-btn
              v-if="adkData.practiceLog.length > 0"
              :disabled="userType === 'stakeholder'"
              depressed
              class="mt-2"
              color="#ffffff"
              small
              @click="undo"
              ><v-icon left>mdi-undo</v-icon>Undo</v-btn
            >
          </div>
        </div>
        <div class="pa-0 mt-10">
          <div class="tableview__total-log mb-6 d-flex justify-center">
            <div class="tableview__column">
              <v-btn
                x-small
                depressed
                class="mr-1 mb-3"
                :dark="filter === 'Personal' ? true : false"
                :outlined="filter !== 'Personal' ? true : false"
                @click="filter = 'Personal'"
                >Personal</v-btn
              >
              <v-btn
                class="ml-1 mb-3"
                x-small
                depressed
                :dark="filter === 'Team' ? true : false"
                :outlined="filter !== 'Team' ? true : false"
                @click="filter = 'Team'"
                >Team</v-btn
              >
              <div class="tableview__total-log-title mt-6 b-2">Logged Time</div>
              <div class="tableview__total-log mb-3">
                {{ Math.floor(finalValueLog / 60) }}h {{ finalValueLog % 60 }}m
              </div>
              <v-chip-group class="mb-6">
                <v-chip dark rounded>{{ requiredMinutes }} Minutes Required</v-chip>
                <v-chip dark rounded v-if="requiredMinutes - finalValueLog > 0">
                  {{ requiredMinutes - finalValueLog }} Minutes Left
                </v-chip>
                <v-chip dark rounded v-if="requiredMinutes - finalValueLog <= 0">
                  Minimum met. Keep logging!
                </v-chip>
              </v-chip-group>
              <!-- <div class="tableview__total-log-title">Total Minutes Required</div>
              <div class="tableview__total-log mb-6">{{ requiredMinutes }}m</div>
              <div v-if="requiredMinutes - finalValueLog > 0">
                <div class="tableview__total-log-title">Remaining Total Minutes</div>
                <div class="tableview__total-log mb-6">{{ requiredMinutes - finalValueLog }}m</div>
              </div>

              <div v-if="requiredMinutes - finalValueLog <= 0">
                <div class="tableview__total-log-title">
                  You Have met the required minimum amount of minutes! Please Keep Logging your
                  minutes if you continue to work on your project
                </div>
              </div> -->
              <div :key="tableRefresh" class="pa-0">
                <v-data-table
                  :headers="header"
                  :items="tableItems"
                  sort-by="time-stamp"
                  :items-per-page="100"
                  :hide-default-footer="true"
                >
                  <!-- <template v-slot:item.delete="{ item }">
                    <v-btn small icon depressed @click="deleteLog(item.id)">
                      <v-icon small> mdi-delete </v-icon>
                    </v-btn>
                  </template> -->
                </v-data-table>
              </div>
            </div>
          </div>
        </div>

        <!-- ENTER CONTENT HERE -->
        <!-- DESIGN YOUR ACTIVITY HERE / COMMENT OUT WHEN YOU'VE STARTED DESIGNING -->
        <!-- <div class="module-default__none">Design your activity here</div> -->
      </v-container>
    </v-container>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, computed, PropType, ref } from '@vue/composition-api';
import { getModAdk, getModMongoDoc, loading } from 'pcv4lib/src';
// import { ObjectID, ObjectId } from 'bson';
import Instruct from './ModuleInstruct.vue';
import Table from './TableView.vue';
import MongoDoc, { TableItem } from '../types';
import { HEADER } from './const';

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
    userType: {
      required: true,
      type: String
      // participant: '',
      // organizer: '',
      // stakeholder: ''
    },
    userDoc: {
      required: true,
      type: Object as PropType<MongoDoc>,
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
    const programDoc = computed({
      get: () => props.value,
      set: newVal => {
        ctx.emit('input', newVal);
      }
    });

    const index = programDoc.value.data.adks.findIndex(function findOfferObj(obj) {
      return obj.name === 'tinker';
    });

    const teamDocument = getModMongoDoc(props, ctx.emit, {}, 'teamDoc', 'inputTeamDoc');
    const initPracticeDefault = {
      practiceLog: [],
      minimumHoursNow: 3
    };
    const { adkData: teamAdkData, adkIndex } = getModAdk(
      props,
      ctx.emit,
      'tinker',
      initPracticeDefault,
      'teamDoc',
      'inputTeamDoc'
    );

    const minutes = ref();
    const adkData = ref(teamAdkData.value);
    // eslint-disable-next-line radix
    const requiredMinutes = ref(parseInt(programDoc.value.data.adks[index].minimumHoursNow) * 60);
    // console.log(adkData.value.practiceLog);

    const logIndex = ref(adkData.value.practiceLog.length - 1);
    // console.log(logIndex.value);
    const lengthPractice = ref(0);
    const tableRefresh = ref(0);
    const finalValueLog = ref(0);

    if (adkData.value.practiceLog.length > 0) {
      while (lengthPractice.value < adkData.value.practiceLog.length) {
        // eslint-disable-next-line radix
        finalValueLog.value += parseInt(adkData.value.practiceLog[lengthPractice.value].minutes);

        lengthPractice.value += 1;
        // console.log(finalValueLog.value)
      }
    }

    function logMinutes() {
      // timestamp, figure out way to only display month, day, and time ex: Jul 12 at 8:10pm
      const timestamp = new Date();
      const unixtime = timestamp.valueOf();
      const date = new Date(unixtime).toLocaleDateString('en-us');
      // console.log(date);

      const log = ref({
        minutes: minutes.value,
        timestamp: date,
        name: `${props.userDoc.data.firstName} ${props.userDoc.data.lastName}`,
        // eslint-disable-next-line @typescript-eslint/camelcase
        user_id: props.userDoc.data._id
      });
      // console.log(props.userDoc.data._id);
      // eslint-disable-next-line no-plusplus
      adkData.value.practiceLog.push(log.value);
      // console.log(adkData.value.practiceLog);
      // eslint-disable-next-line no-plusplus
      logIndex.value++;
      minutes.value = '';

      lengthPractice.value = 0;

      // for the final value logging
      finalValueLog.value = 0;
      tableRefresh.value += 1;

      while (lengthPractice.value < adkData.value.practiceLog.length) {
        // console.log(adkData.value.practiceLog[lengthPractice.value].minutes);
        // eslint-disable-next-line radix
        finalValueLog.value += parseInt(adkData.value.practiceLog[lengthPractice.value].minutes);

        lengthPractice.value += 1;
        // console.log(finalValueLog.value)
      }

      // TODO: get the actual expected minimum log time.
      // eslint-disable-next-line radix
      if (finalValueLog.value >= parseInt(adkData.value.minimumHoursNow) * 60) {
        return props.teamDoc?.update(() => ({
          isComplete: true,
          adkIndex
        }));
      }
      return props.teamDoc!.update();
    }

    function undo() {
      if (adkData.value.practiceLog.length > 0) {
        logIndex.value -= 1;

        // console.log(adkData.value.practiceLog[adkData.value.practiceLog.length - 2].minutes);
        // eslint-disable-next-line radix
        finalValueLog.value -= parseInt(
          adkData.value.practiceLog[adkData.value.practiceLog.length - 1].minutes
        );
        // console.log(finalValueLog.value);

        adkData.value.practiceLog.pop();

        tableRefresh.value += 1;
        if (
          finalValueLog.value <
          // eslint-disable-next-line radix
          parseInt(programDoc.value.data.adks[index].minimumHoursNow) * 60
        ) {
          console.log('Does not reach required time');
          props.teamDoc?.update(() => ({
            isComplete: false,
            adkIndex
          }));
          props.teamDoc?.update();
        }
      }
    }

    const filter = ref('Personal');
    const tableItems = computed(() => {
      return adkData.value.practiceLog.filter((item: TableItem) => {
        // console.log(item);
        if (filter.value === 'Personal') return item.user_id.equals(props.userDoc.data._id);
        return true;
      });
    });

    // function deleteLog(id: ObjectID) {
    //   console.log(id);
    //   adkData.value.practiceLog = adkData.value.practiceLog.filter((item: TableItem) => {
    //     return item.id !== id;
    //   });
    //   teamDocument.value.update();
    // }

    const setupInstructions = ref({
      description: '',
      instructions: ['', '', '']
    });

    return {
      finalValueLog,
      setupInstructions,
      showInstructions: 'true',
      adkData,
      // logMinutes,
      logIndex,
      undo,
      teamDocument,
      ...loading(logMinutes, 'Minutes Logged', 'Could not log at this time'),
      header: ref(HEADER),
      tableRefresh,
      // deleteLog,
      minutes,
      tableItems,
      filter,
      programDoc,
      index,
      requiredMinutes
    };
  }
});
</script>

<style lang="scss">
.module-default {
  &__minutes-log {
    width: 150px;
    height: 150px;
    border: 1px solid #000000;
    border-radius: 5px;
  }
  &__log-text {
    // display: flex;
    // max-width: 200px;
    // margin-left: auto;
    // margin-right: auto;
    // max-height: 150px;
    // height: 150px !important;
  }

  &__text-field2 {
    // width: 100px;
    &.v-input__slot {
      // width: 150px;
      // height: 150px;
    }
    &.v-text-field--filled > .v-input__control > .v-input__slot,
    .v-text-field--full-width > .v-input__control > .v-input__slot,
    .v-text-field--outlined > .v-input__control > .v-input__slot {
      // min-width: 150px;
      // min-height: 150px;
    }

    &.v-text-field--outlined > .v-input__control > .v-input__slot {
      width: 175px;
      height: 175px;
      font-family: 'Raleway';
      font-size: 50px;
      font-weight: 700;
    }
    &.v-input input {
      max-height: none;
      text-align: center;
    }
  }
  &__text-field {
    &.v-input input {
      // max-height: none;
    }
    &.v-text-field--outlined > .v-input__control > .v-input__slot {
      // min-height: 150px;
      // min-width: 150px;
    }
    &.v-text-field--outlined .v-label {
      // top: 22px;
    }

    // &.v-text-field--filled > .v-input__control > .v-input__slot,
    // .v-text-field--full-width > .v-input__control > .v-input__slot,
    // .v-text-field--outlined > .v-input__control > .v-input__slot {
    //   min-height: 150px !important;
    // }
    &.v-text-field {
      // width: 150px;
      // padding-top: 10px;
    }

    &.v-input {
      // font-size: 50px;
      // font-weight: 700;
    }

    &.v-input input {
      // max-height: none;
      // text-align: center;
    }
    // text-align: center !important;
    // font-family: Raleway;
    // font-weight: 800;
    // font-size: 50px;
  }
  &__log-btn2 {
    width: 175px;
    &.v-btn:not(.v-btn--round).v-size--default {
      // min-height: 34px;
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
