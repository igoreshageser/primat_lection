<template>
  <v-flex lg6 mx-auto class="selector-wrapper">
    <div>
      <v-alert v-model="alert" dismissible color="success">
        <p>
          Ухх, вижу, что первый раз зашел почитать лекции! Как ими пользоваться? Об этом можно почитать вот
          <a
            href="https://telegra.ph/Kak-delat-lekcii-02-03"
          >тут</a>.
          <br>А чтобы найти нужную тебе лекцию, необходимо заполнить
          <span class="colored-help">все</span> следующие поля.
        </p>
      </v-alert>
    </div>
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
</template>

<script>
import { mapState } from "vuex";

import { getAllFlow } from "../../api/flow";
import { getAbstractFlowItems } from "../../api/abstract";

import { getPrettyName } from "../../helpers/prettyName";
import { USER_HELP_POPUP_KEY } from "../../../config/global.js";

export default {
  name: "Selector",
  data: () => ({
    flowSelector: "",
    coursesSelector: "",
    semestersSelector: "",

    flows: [],
    courses: [],
    semesters: [],

    fetchedData: {},
    alert: true
  }),
  computed: {
    ...mapState(["currentUser"])
  },
  methods: {
    selectFlow({ text }) {
      const { fetchedData } = this;
      this.courses = Object.keys(fetchedData[text]).map(course => ({
        text: course
      }));
    },
    selectCourse({ text }) {
      const { fetchedData, flowSelector } = this;
      const { text: flow } = flowSelector;

      if (fetchedData[flow][text]) {
        const semesters = fetchedData[flow][text];
        this.semesters = semesters.sort().map(semester => ({ text: semester }));
      }
    },
    selectSemestr({ text }) {
      const param = {
        course: this.coursesSelector.text,
        flow: this.flowSelector.text,
        semester: text
      };
      this.fetchLection(param);
    },
    parseFlowData(flows) {
      return Object.values(flows).map(item => {
        const { flow, courses } = item;
        this.checkUserFlow(flow);
        this.fetchedData[flow] = courses;
        return { text: flow };
      });
    },
    async fetchFlow() {
      try {
        const flows = await getAllFlow();
        this.flows = this.parseFlowData(flows);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchLection(param) {
      try {
        const lections = await getAbstractFlowItems(param);
        this.createTreeDate(lections);
      } catch (error) {
        console.log(error);
      }
    },
    checkUserFlow(flow) {
      if (flow === this.currentUser.flow) {
        this.flowSelector = { text: flow };
      }
    },
    createTreeDate(lection) {
      const treeData = {
        name: "Предметы",
        children: []
      };
      treeData.children = lection.map(({ abstracts, subject }) => ({
        name: getPrettyName(subject),
        children: abstracts
      }));
      this.$emit("getLection", treeData);
    }
  },
  mounted() {
    this.fetchFlow();
    this.alert = !localStorage.getItem(USER_HELP_POPUP_KEY);
    localStorage.setItem(USER_HELP_POPUP_KEY, false);
  }
};
</script>

<style lang="scss" >
.application--wrap {
  min-height: initial;
}
.selector-wrapper {
  max-width: 400px;
  margin: 40px;
  padding: 0 15px;
}

$spacer: 8px;

.p-5 {
  padding-top: ($spacer * 3);
  padding-bottom: ($spacer * 3);
}

.colored-help {
  border-bottom: 1px dashed red;
}
</style>
