<template>
    <div class="lesson-wrapper">
        <span class="lesson-name">{{ getLessonName }}</span>
        <span>{{ getLessonType }}</span>
        <span>{{ getLessonRoom }}</span>
        <a :href="getTeachersUrl" target="_blank">
          {{ getTeacherName }}
        </a>
    </div>
</template>

<script>
export default {
  name: 'Schedule-Table-Lesson',
  props: ['lesson'],
  computed: {
    getLessonName() {
      if (this.lesson) {
        return this.lesson.lesson_name
      }
    },
    getLessonType() {
      if (this.lesson) {
        return this.lesson.lesson_type
      }
    },
    getLessonRoom() {
      if (this.lesson) {
        return this.lesson.lesson_room
      }
    },
    getTeacherName() {
      if (this.lesson) {
        return this.lesson.teacher_name
      }
    },
    getTeachersUrl() {
      if (this.lesson) {
        // const [ teacher ] = this.lesson.teachers
        // return teacher ? teacher.teacher_url : ''
        return 'kek'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/variables";
.lesson {
  &-wrapper {
    display: flex;
    flex-direction: column;
    min-height: 50px;
    a {
      white-space: nowrap;
      text-decoration: none;
      color: $blue-main-color;
    }
  }
  &-name {
    @include bold-font;
    color: grey;
  }
}
</style>
