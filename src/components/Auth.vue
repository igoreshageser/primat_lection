<template>
<v-content>
  <v-layout
    column
    wrap>
    <v-flex xs12 class="my-3">
        <div class="text-xs-center">
          <h2 class="headline">
              Приветствуем!
          </h2>
          <span class="subheading">
          Заполнением формы, ты обеспечиваешь себе более комфортное использование бота
          </span>
        </div>
    </v-flex>
    <v-flex xs12 md4>
        <v-stepper v-model="step" vertical>
          <!-- first step -->
          <v-stepper-step :complete="step > 1" step="1">
              Группа
          </v-stepper-step>
          <v-stepper-content step="1">
              <spinner-wave v-if="groupLoading" />
              <v-select
                v-else
                prepend-icon="group"
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

      <!-- second step -->
      <v-stepper-step :complete="step > 2" step="2">Определить курс</v-stepper-step>

      <v-stepper-content step="2">
        <v-select
          prepend-icon="class"
          label="Выбери свой курс"
          :items="courses"
          v-model="courseSelect">
        </v-select>
        <v-btn color="primary" @click="courseSave">Continue</v-btn>
        <v-btn flat @click="step = 2">Cancel</v-btn>
      </v-stepper-content>

      <!-- third step -->
      <v-stepper-step step="3">Регистрация</v-stepper-step>
      <v-stepper-content step="3">
        <div class="mb-5">
          <p>Давай проверим то, что мы о тебе узнали</p>
          <div>
            <p><strong>Группа:</strong> {{ userGroup.group }}</p>
            <p><strong>Курс:</strong> {{ userGroup.course }}</p>
          </div>
        </div>
        <v-btn color="primary" @click="submitHandler">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

  </v-stepper>
    </v-flex>
  </v-layout>
  </v-content>
</template>

<script>
import { mapState } from 'vuex'

import { getGroup, createUser } from '../api/auth'
import { getAllGroups } from '../api/groups'

import { debounce } from '../helpers/debounce'
import { createUserData } from '../helpers/createData'

import SpinnerWave from '../components/Common/Spinner'

export default {
  name: 'Auth',
  data: () => ({
    step: 1,
    loading: false,
    groupLoading: false,
    userGroup: '',

    // first step
    groups: [],
    groupString: '',
    groupSelect: '',

    // second step
    courses: [1, 2, 3, 4, 5],
    courseSelect: ''
  }),
  components: {
    SpinnerWave
  },
  computed: {
    ...mapState(['currentUser']),
    searchParam() {
      if (this.groupString) {
        return { search: { query: this.groupString } }
      }
      return null
    },
    isGroupSelectValid() {
      return !this.groupSelect
    }
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
    checkUserGroup () {
      const id = this.groupSelect
      this.groupLoading = true

      getGroup(id)
        .then(({ data }) => {
          this.userGroup = data
          this.groupCheck(data)
          this.groupLoading = false
          console.log(data)
        })
        .catch(err => console.log(err))
    },
    groupCheck(group) {
      if (!group.course) {
        this.step = 2
      } else {
        this.step = 3
        this.courseSelect = group.course
      }
    },
    courseSave() {
      this.userGroup.course = this.courseSelect
      this.step = 3
    },
    submitHandler() {
      const { currentUser, userGroup } = this
      const userObj = { ...currentUser, ...userGroup }
      const newUser = createUserData(userObj)

      console.log(newUser)
      createUser(newUser)
        .then(d => console.log(d))
        .catch(err => console.log(err))
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
