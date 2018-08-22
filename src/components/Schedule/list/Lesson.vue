<template>
  <div class="lesson-container">
    <div class="lesson-wrapper">
        <div class="lesson-info">
          <span>{{ getLessonName }}</span>
          <span>{{ getTeacherName }}</span>
        </div>
        <!-- <div class="lesson-more-button" @click="openMoreBlock"> -->
          <!-- Узнать больше -->
        <!-- </div> -->
    </div>
    <div v-if="showMoreBlock" class="lesson-container-more">
      <div class="lesson-container-more__info">
         <span>{{ getFullName }}</span>
         <a :href="getTeacherUrl" target="_blank">Страница преподователя</a>
         <div class="lections-wrapper">
           <span>Лекции:</span>
           <ul>
             <li v-for="(lection, index) in lections" :key="index">
               <a :href="getLectionUrl(lection)" target="_blank">{{ getLectionName(lection) }}</a>
             </li>
           </ul>
         </div>
      </div>
      <!-- <div class="lesson-container-more__map" v-if="lections && getLocation()"> -->
        <!-- <Map :location="getLocation()" /> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
import { getAbstractFlowItems } from '../../../api/abstract'

import Map from './Map'

export default {
  name: 'Schedule-Lesson',
  props: ['lesson'],
  components: {
    Map
  },
  data: () => ({
    showMoreBlock: false,
    lections: []
  }),
  computed: {
    getLessonName() {
      if (this.lesson) {
        return this.lesson.lesson_name
      }
      return ''
    },
    getTeacherName() {
      if (this.lesson) {
        return this.lesson.teacher_name
      }
      return ''
    },
    getFullName() {
      if (this.lesson) {
        const [ teacher ] = this.lesson.teachers
        return teacher.teacher_full_name
      }
      return ''
    },
    getTeacherUrl() {
      if (this.lesson) {
        const [ teacher ] = this.lesson.teachers
        return teacher.teacher_url
      }
      return ''
    },
    getParam() {
      const param = {
        course: 3,
        flow: 'кв',
        semester: 2
      }
      return param
    }
  },
  methods: {
    openMoreBlock() {
      this.showMoreBlock = !this.showMoreBlock
      if (this.showMoreBlock) {
        this.fetchLection()
      }
    },
    fetchLection() {
      getAbstractFlowItems(this.getParam)
        .then(({ data }) => (this.lections = data))
        .catch(err => console.log(err))
    },
    getLectionUrl(lection) {
      const { abstracts } = lection
      const [ data ] = abstracts
      return data.telegraph_url
    },
    getLectionName(lection) {
      const { abstracts } = lection
      const [ data ] = abstracts
      return data.name
    },
    getLocation() {
      const { rooms } = this.lesson
      const [ build ] = rooms
      const coord = {
        lat: build.room_latitude,
        lng: build.room_longitude
      }
      return coord
    }
  }
}
</script>

<style lang="scss" scoped>
.lesson {
  &-container {
    border: 1px solid #cccccc;
    border-top: none;
  }
  &-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 10px;
    transition: 0.2s;
    &:hover {
      background-color: darken($color: white, $amount: 10);
      transition: 0.2s;
    }
  }
  &-info {
    display: flex;
    flex-direction: column;
  }
  &-more {
    &-button {
      cursor: pointer;
    }
  }
  &-container-more {
    padding: 15px 10px;
    border-top: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
    &__info {
      display: flex;
      flex-direction: column;
      .lections-wrapper {
        padding: 15px 10px;
      }
    }
    &__map {
      width: 50%;
      height: 100%;
    }
  }
}
</style>
