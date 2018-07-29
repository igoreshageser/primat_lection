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

      <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

      <v-stepper-content step="2">
        <SpinnerWave v-if="loading" />
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
        <v-btn flat @click="e6 = 1">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 3" step="3">Select an ad format and name ad unit</v-stepper-step>

      <v-stepper-content step="3">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
        <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
        <v-btn flat>Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-step step="4">View setup instructions</v-stepper-step>
      <v-stepper-content step="4">
        <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
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
    loading: false,
    groupString: '',
    groupSelect: '',

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
      getGroup(id).then(d => console.log(d)).then(() => this.loading = false).catch(err => console.log(err))
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

<style lang="scss" scoped>
</style>
