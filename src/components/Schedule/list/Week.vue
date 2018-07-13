<template>
  <div>
      <Day v-for="(day, index) in week.days" :day="day" :key="index" />
  </div>
</template>

<script>
import Day from './Day'

export default {
  name: 'Schedule-Week',
  props: {
    week: {
      type: Object
    }
  },
  components: {
    Day
  }
}
</script>

<style lang="scss" scoped>
</style>
