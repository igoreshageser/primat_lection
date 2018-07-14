<template>
    <table>
        <thead>
            <tr>
                <th v-for="(day, index) in getWeekDays" :key="index">
                  {{ day }}
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(day, index) in getTable" :key="index" >
              <td v-for="(lesson, index) in day" :key="index">
                {{ lesson ? lesson.lesson_name : 'Pusto' }}
              </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
  name: 'Schedule-Table',
  props: {
    table: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getTable() {
      if (this.table) {
        return this.table
      }
    },
    getWeekDays: () => ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  }
}
</script>

<style lang="scss" scoped>
</style>
