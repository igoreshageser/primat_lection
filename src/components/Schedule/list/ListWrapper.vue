<template>
   <div>
     <div v-for="(list, index) in getList" :key="index" class="week-wrapper">
      <div class="week-count">
        <span>{{ index }} неделя</span>
      </div>
      <Week :week="list" />
    </div>
   </div>
</template>

<script>
import Week from './Week'

export default {
  name: 'List-Wrapper',
  props: {
    lists: {
      type: Object
    }
  },
  components: {
    Week
  },
  computed: {
    getList() {
      if (this.lists) {
        return this.lists
      }
    }
  }
}
</script>
