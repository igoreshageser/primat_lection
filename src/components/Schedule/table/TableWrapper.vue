<template>
   <div>
     <div v-for="(table, index) in getTables" :key="index" class="table-wrapper">
        <div class="week-count">
          <span>{{ index + 1}} неделя</span>
        </div>
        <table-view :table="table" :isCurrentWeek="isCurrentWeek(index)"></table-view>
      </div>
   </div>
</template>

<script>
import TableView from './Table'

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
    TableView
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
