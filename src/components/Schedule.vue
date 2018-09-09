<template>
  <div class="schedule-wrapper">
    <div class="container">
      <div class="schedule-content">
        <!-- <div class="schedule-toggler"> -->
          <!-- <button @click="changeTableMode">{{ getTogglerText }}</button> -->
        <!-- </div> -->
        <component
          :is="getScheduleView"
          :weekNumber="weekNumber"
          :table="tables"
          :lists="lists"
          mode='error'
          toggleModal>
          <span slot="header">
            Неполадочки
          </span>
          <span slot="content">
            Для того, чтобы пользоваться расписанием необходимо зарегистрироваться или авторизоваться
          </span>
        </component>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getSchedule } from '../api/schedule'
import { getWeekNumber } from '../api/week-number.js'

import Modal from '../components/Common/Modal'
import Spinner from '../components/Common/Spinner'
import ListWrapper from './Schedule/list/ListWrapper'
import TableWrapper from './Schedule/table/TableWrapper'

export default {
  name: 'Schedule',
  data: () => ({
    lists: {},
    tables: {},

    isListMode: false,
    loading: false,

    weekNumber: 1
  }),
  components: {
    Modal,
    Spinner,
    ListWrapper,
    TableWrapper
  },
  computed: {
    ...mapState(['currentUser']),
    fetchParams: () => ({ table: true }),
    getTogglerText() {
      return this.isListMode ? 'Таблицей' : 'Списком'
    },
    getScheduleView() {
      if (!Object.values(this.currentUser).length) {
        return Modal
      }

      if (this.loading) {
        return Spinner
      } else if (this.isListMode) {
        return ListWrapper
      }
      return TableWrapper
    }
  },
  methods: {
    fetchListsTimetable() {
      this.loading = true
      const id = this.currentUser.groupId

      getSchedule(id)
        .then(({ weeks }) => (this.lists = weeks))
        .catch(err => console.log(err))
        .finally(() => (this.loading = false))
    },
    fetchTableTimeTable() {
      this.loading = true
      const id = this.currentUser.groupId

      getSchedule(id, this.fetchParams)
        .then(data => (this.tables = data))
        .catch(err => console.log(err))
        .finally(() => (this.loading = false))
    },
    fetchWeekNumber() {
      getWeekNumber()
        .then(({ data }) => (this.weekNumber = data))
        .catch(err => console.log(err))
    },
    changeTableMode() {
      this.isListMode = !this.isListMode
      if (this.isListMode) {
        this.fetchListsTimetable()
      } else {
        this.fetchTableTimeTable()
      }
    }
  },
  mounted() {
    this.fetchTableTimeTable()
    this.fetchWeekNumber()
  }
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.schedule {
  &-wrapper {
    width: 100%;
    height: 100%;
    font-family: "Roboto", sans-serif;
    font-weight: 300;
    .container {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      .week {
        &-wrapper {
          padding: 15px 5px;
        }
        &-count {
          @include bold-font;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        }
      }
    }
  }
  &-toggler {
    display: flex;
    width: 1080px;
    button {
      @include bold-font;
      padding: 5px 10px;
      font-size: 18px;
      background-color: transparent;
      border: 1px solid rgba($color: $blue-main-color, $alpha: 0.77);
      border-radius: 4px;
      cursor: pointer;
      transition: 0.2s;
      color: $blue-main-color;
      &:hover {
        border: 1px solid rgba($color: $blue-main-color, $alpha: 1);
      }
    }
  }
  &-content {
    width: 100%;
  }
}

.table-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

// reset style
@media only screen and (min-width: 960px) {
  .container {
    max-width: 1080px;
  }
}
</style>
