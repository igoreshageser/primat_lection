<template>
   <div>
     <div v-for="(table, index) in getTables" :key="index" class="table-wrapper">
        <div class="week-count">
          <span>{{ index }} неделя</span>
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
        return this.table
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
