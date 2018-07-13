<template>
  <div class="schedule-wrapper">
    <div class="container">
        <button @click="changeTableMode">toggle</button>
        <div v-if="isListMode">
          <div v-for="(list, index) in lists" :key="index" class="week-wrapper">
              <div class="week-count">
                <span>{{ index }} неделя</span>
              </div>
              <Week :week="list" />
          </div>
        </div>
        <div v-else>
          <div v-for="(table, index) in tables" :key="index">
              <div class="week-count">
                <span>{{ index }} неделя</span>
              </div>
              <Table :table="table"></Table>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { getSchedule } from '../api/schedule'

// import Week from './Schedule/table/Week'
// import Table from './Schedule/list/Table'
import Week from './Schedule/list/Week'
import Table from './Schedule/table/Table'

export default {
  name: 'Schedule',
  data: () => ({
    lists: {},
    tables: {},

    isListMode: false
  }),
  components: {
    Week,
    Table
  },
  computed: {
    fetchParams: () => ({ table: true })
  },
  methods: {
    fetchListsTimetable() {
      getSchedule()
        .then(({ weeks }) => (this.lists = weeks))
        .catch(err => console.log(err))
    },
    fetchTableTimeTable() {
      getSchedule(this.fetchParams)
        .then(data => (this.tables = data))
        .catch(err => console.log(err))
    },
    changeTableMode () {
      this.isListMode = !this.isListMode
      if (this.isListMode) {
        this.fetchListsTimetable()
      } else {
        this.fetchTableTimeTable()
      }
    }
  },
  mounted() {
    this.fetchTableTimeTable()
  }
}
</script>

<style lang="scss" scoped>
.schedule-wrapper {
  width: 100%;
  height: 100%;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  .container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    .week {
      &-wrapper {
        padding: 15px 5px;
      }
      &-count {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
