<template>
  <v-content>
    <!-- <v-container fluid>
      <v-layout row>
        <v-flex xs12>
            <v-select
            autocomplete
            label="Async items"
            :loading="loading"
            :items="groups"
            item-text="group_full_name"
            item-value="group_id"
            :search-input.sync="groupString"
            v-model="groupSelect"
          ></v-select>
        </v-flex>
      </v-layout>
      </v-container> -->

    <v-stepper v-model="e6" vertical>
      <v-stepper-step :complete="e6 > 1" step="1">
        Select an app
        <small>Summarize if needed</small>
      </v-stepper-step>

      <v-stepper-content step="1">
         <v-select
            autocomplete
            label="Async items"
            :loading="loading"
            :items="groups"
            item-text="group_full_name"
            item-value="group_id"
            :search-input.sync="groupString"
            v-model="groupSelect">
          </v-select>
        <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
        <v-btn flat @click="e6 = 1">Canceuul</v-btn>
      </v-stepper-content>

      <v-stepper-step :complete="e6 > 2" step="2">Configure analytics for this app</v-stepper-step>

      <v-stepper-content step="2">
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
import { getAllGroups } from '../api/groups'

import { debounce } from '../helpers/debounce'

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
  methods: {
    fetchGroups() {
      const params = this.searchParam
      this.loading = true
      getAllGroups(params)
        .then(({ data }) => (this.groups = data))
        .catch(err => console.log(err))
        .finally(() => (this.loading = false))
    }
  },
  computed: {
    searchParam() {
      return { search: { query: this.groupString } }
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
    this.debouncedFetch = debounce(this.fetchGroups, 2000)
  }
}
</script>

<style lang="scss" scoped>
</style>
