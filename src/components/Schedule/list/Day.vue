<template>
  <div v-if="isShowDay" class="day-wrapper">
    <span class="day-dayName">{{ getDayName }}</span>
    <div  v-for="(lesson, index) in getDayLessons" :key="index">
      <lesson :lesson="lesson" />
    </div>
  </div>
</template>

<script>
import Lesson from "./Lesson";

export default {
  name: "Schedule-Day",
  props: {
    day: {
      type: Object
    }
  },
  components: {
    Lesson
  },
  computed: {
    getDayName() {
      if (this.day) {
        return this.day.day_name;
      }
      return "";
    },
    getDayLessons() {
      if (this.day) {
        return this.day.lessons;
      }
      return [];
    },
    isShowDay() {
      return this.getDayLessons.length > 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.day {
  &-dayName {
    background-color: #3372df;
    width: 100%;
    padding: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
  }
}
</style>
