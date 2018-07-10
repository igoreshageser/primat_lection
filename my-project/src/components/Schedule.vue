<template>
  <div class="schedule-wrapper">
    <div class="container">
        <button @click="changeTableMode">toggle</button>
        <div v-if="isListMode">
          <div v-for="(week, index) in weeks" :key="index" class="week-wrapper">
              <div class="week-count">
                <span>{{ index }} неделя</span>
              </div>
              <Week :week="week" />
          </div>
        </div>
        <div v-else>
          table
        </div>
    </div>
  </div>
</template>

<script>
import { getSchedule } from '../api/schedule'

import Week from '@/components/Schedule/list/Week'

export default {
  name: 'Schedule',
  data: () => ({
    weeks: {},
    isListMode: false
  }),
  components: {
    Week
  },
  methods: {
    fetchTimetable() {
      getSchedule()
        .then(({ weeks }) => (this.weeks = weeks))
        .catch(err => console.log(err))
    },
    changeTableMode () {
      this.isListMode = !this.isListMode
    }
  },
  mounted() {
    this.fetchTimetable()
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
