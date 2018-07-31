<template>
  <v-content>
    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        Группа
      </v-stepper-step>

      <v-stepper-content step="1">
         <v-select
            autocomplete
            label="Выбери свою группу"
            placeholder="Начни вводить название своей группы"
            :loading="loading"
            :items="groups"
            item-text="group_full_name"
            item-value="group_id"
            :search-input.sync="groupString"
            v-model="groupSelect">
          </v-select>

        <v-btn color="primary" :disabled="isGroupSelectValid" @click="checkUserGroup">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">Определить группу</v-stepper-step>

      <v-stepper-content step="2">
        <SpinnerWave v-if="loading" />
        <div>
          <p v-if="step2.errorMessage" class="orange--text darken-4">Упс, мы нашли несколько похожих групп, выбери свою, пожалуйста.</p>
          <p v-else class="green--text accent-4">Отлично! Мы нашли твою группу!</p>
        </div>
        <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
        <v-btn flat @click="e6 = 3">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">Определить курс</v-stepper-step>

      <v-stepper-content step="3">
        <v-select
          v-if="step3.showCourseSelect"
          autocomplete
          label="Выбери свой курс"
          :loading="loading"
          :items="courses"
          v-model="courseSelect">
        </v-select>
        <p v-else class="green--text accent-4">Отлично! Теперь мы знаем с какого ты курса.</p>
        <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step step="4">Регистрация</v-stepper-step>
      <v-stepper-content step="4">
        <div class="mb-5">
          <p>Давай проверим то, что мы о тебе узнали</p>
          <div>
            <p><strong>Группа:</strong> КВ - 51</p>
            <p><strong>Курс:</strong> 4</p>
          </div>
        </div>
        <v-btn color="primary" @click="e6 = 1">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>
  </v-stepper>
  </v-content>
</template>

<script>
import { getGroup } from '../api/auth'
import { getAllGroups } from '../api/groups'

import { debounce } from '../helpers/debounce'

import SpinnerWave from '../components/Common/Spinner'

export default {
  name: 'test',
  data: () => ({
    groups: [],
    courses: [1, 2, 3, 4, 5],
    loading: false,

    groupString: '',
    groupSelect: '',
    courseSelect: '',
    userGroup: {},

    step2: {
      successMessage: false,
      valid: false
    },

    step3: {
      showCourseSelect: false,
      valid: false
    },
    // step
    e6: 1
  }),
  components: {
    SpinnerWave
  },
  methods: {
    fetchGroups() {
      if (!this.searchParam) return
      this.loading = true
      const params = this.searchParam
      getAllGroups(params)
        .then(({ data }) => (this.groups = data))
        .catch(err => console.log(err))
        .finally(() => (this.loading = false))
    },
    checkUserGroup() {
      const id = this.groupSelect
      this.e6 = 2
      this.loading = true
      getGroup(id)
        .then(({ data }) => {
          this.loading = false
          this.stateCheck(data)
        })
        .catch(err => console.log(err))
    },
    stateCheck(groupObj) {
      if (typeof groupObj === 'object') {
        this.step2.successMessage = true
        this.userGroup = groupObj
        if (!groupObj.course) {
          this.step3.showCourseSelect = true
        }
      } else if (Array.isArray(groupObj)) {
        this.step2.errorMessage = true
      }
    }
  },
  computed: {
    searchParam() {
      if (this.groupString) {
        return { search: { query: this.groupString } }
      }
      return null
    },
    // stepper validate
    isGroupSelectValid() {
      return !this.groupSelect
    }
  },
  watch: {
    groupString() {
      if (this.groupString) {
        this.debouncedFetch()
      }
    }
  },
  created() {
    this.debouncedFetch = debounce(this.fetchGroups, 1000)
  }
}
</script>
