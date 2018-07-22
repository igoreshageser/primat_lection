<template>
   <div>
     <div v-for="(table, index) in getTables" :key="index" class="table-wrapper">
        <div class="week-count">
          <span>{{ index + 1}} неделя</span>
        </div>
        <Table :table="table" :isCurrentWeek="isCurrentWeek(index)"></Table>
      </div>
   </div>
</template>

<script>
import Table from './Table'

export default {
  name: 'List-Wrapper',
  props: {
    table: {
      type: Object
    },
    weekNumber: {
      type: Number
    }
  },
  components: {
    Table
  },
  computed: {
    getTables() {
      if (this.table) {
        const [ first, second ] = Object.values(this.table)
        return [
          first,
          second
        ]
      }
    }
  },
  methods: {
    isCurrentWeek(index) {
      return this.weekNumber === Number(index)
    }
  }
}
</script>
