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
              <td></td>
              <td v-for="(lesson, index) in day" :key="index">
                <div>
                  <Lesson :lesson="lesson"></Lesson>
                </div>
              </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import Lesson from './Lesson'

export default {
  name: 'Schedule-Table',
  props: {
    table: {
      type: Object,
      default: () => {}
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
        div {
          min-height: 50px;
        }
      }
    }
  }
}
</style>
