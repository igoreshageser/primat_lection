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
            <tr v-for="(day, dayIndex) in getTable" :key="dayIndex" >
              <td></td>
              <td v-for="(lesson, lessonIndex) in day" :key="lessonIndex" :class="{'isToday': isToday(lessonIndex)}">
                <Lesson :lesson="lesson"></Lesson>
              </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { format } from 'date-fns'
import Lesson from './Lesson-table'

export default {
  name: 'Schedule-Table',
  props: {
    table: {
      type: Object,
      default: () => {}
    },
    isCurrentWeek: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Lesson
  },
  computed: {
    getTable() {
      if (this.table) {
        return this.table
      }
    },
    getWeekDays: () => ['', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  },
  methods: {
    isToday(day) {
      const today = Number(format(new Date(), 'd')) - 1
      /**
       * if Sunday and current day - monday
       */
      const sundayCondition = today === 6 && day === 1
      if (sundayCondition) {
        return true
      }
      return (today === day) && this.isCurrentWeek
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/variables";
table {
  // reset vuetify style
  border-spacing: 0;
  width: 100%;
  margin-bottom: 20px;

  thead {
    background-color: $blue-main-color;
    th {
      @include bold-font;
      color: $text-color-light;
      padding: 10px 26px 10px;
      text-align: center;
      border: none;
    }
  }

  tbody {
    tr {
      td {
        padding: 10px 16px;
        font-size: 14px;
        border-bottom: 1px solid #cccccc;
        border-left: 1px solid #cccccc;
        &:last-child {
          border-right: 1px solid #cccccc;
        }
      }
    }
  }
}

.isToday {
  background-color: darken($color: $light-background, $amount: 7);
}
</style>
