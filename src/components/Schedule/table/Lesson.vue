<template>
    <div>
        {{ getLessonName }}
    </div>
</template>

<script>
export default {
  name: 'Schedule-Table-Lesson',
  props: {
    lesson: {
      type: Object
    }
  },
  computed: {
    getLessonName() {
      if (this.lesson) {
        return this.lesson.lesson_name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
