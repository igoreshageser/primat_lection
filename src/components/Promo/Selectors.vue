<template>
  <v-app class="p-5">
       <v-flex lg6 mx-auto class="selector-wrapper">
        <v-select
          :items="flows"
          v-model="flowSelector"
          label="Select Flow"
          @change="selectFlow"
          single-line
        ></v-select>
         <v-select
          :items="courses"
          v-model="coursesSelector"
          label="Select Course"
          @change="selectCourse"
          single-line
        ></v-select>
        <v-select
          :items="semesters"
          @change="selectSemestr"
          v-model="semestersSelector"
          label="Select Semestr"
          single-line
        ></v-select>
      </v-flex>
  </v-app>
</template>

<script>
import { getAllFlow } from '../../api/flow'
import { getAbstractFlowItems } from '../../api/abstract'

export default {
  name: 'Selector',
  data: () => ({
    flowSelector: '',
    coursesSelector: '',
    semestersSelector: '',

    flows: [],
    courses: [],
    semesters: [],

    fetchedData: {}
  }),
  methods: {
    selectFlow({ text }) {
      const { fetchedData } = this
      this.courses = Object.keys(fetchedData[text]).map(course => ({
        text: course
      }))
    },
    selectCourse({ text }) {
      const { fetchedData, flowSelector } = this
      const { text: flow } = flowSelector

      if (fetchedData[flow][text]) {
        const semesters = fetchedData[flow][text]
        this.semesters = semesters.sort().map(semester => ({ text: semester }))
      }
    },
    selectSemestr({ text }) {
      const param = {
        course: this.coursesSelector.text,
        flow: this.flowSelector.text,
        semester: text
      }
      this.fetchLection(param)
    },
    parseFlowData(flows) {
      return Object.values(flows).map(item => {
        const { flow, courses } = item
        this.fetchedData[flow] = courses
        return { text: flow }
      })
    },
    fetchFlow() {
      getAllFlow()
        .then(flows => (this.flows = this.parseFlowData(flows)))
        .catch(err => console.log(err))
    },
    fetchLection(param) {
      getAbstractFlowItems(param)
        .then((lections) => this.createTreeDate(lections))
        .catch(err => console.log(err))
    },
    createTreeDate(lection) {
      const treeData = {
        name: 'Предметы',
        children: []
      }
      treeData.children = lection.map(({ abstracts, subject }) => ({
        name: subject,
        children: abstracts
      }))
      this.$emit('getLection', treeData)
    }
  },
  mounted() {
    this.fetchFlow()
  }
}
</script>

<style lang="scss" >
.application--wrap {
  min-height: initial;
}
.selector-wrapper {
  width: 400px;
}

$spacer: 8px;

.p-5 {
  padding-top: ($spacer * 3);
  padding-bottom: ($spacer * 3);
}
</style>
