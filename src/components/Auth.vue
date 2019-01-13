<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs10 sm12 offset-xs1 mb-5>
        <div class="text-xs-center mb-5">
          <h2 class="headline">Приветствуем!</h2>
          <span
            class="subheading"
          >Заполнением формы, ты обеспечиваешь себе более комфортное использование бота</span>
        </div>

        <v-stepper v-model="step">
          <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">Name of step 1</v-stepper-step>

            <v-divider></v-divider>

            <v-stepper-step :complete="step > 2" step="2">Name of step 2</v-stepper-step>

            <v-stepper-step step="3">Name of step 3</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content step="1">
              <spinner-wave v-if="groupLoading"/>
              <v-select
                v-else
                prepend-icon="group"
                autocomplete
                label="Выбери свою группу"
                placeholder="Начни вводить название своей группы"
                :loading="loading"
                :items="groups"
                item-text="group_full_name"
                item-value="group_id"
                :search-input.sync="groupString"
                v-model="groupSelect"
              ></v-select>
              <v-btn color="primary" :disabled="isGroupSelectValid" @click="checkUserGroup">Дальше</v-btn>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-select
                prepend-icon="class"
                label="Выбери свой курс"
                :items="courses"
                :disabled="disabledSelector"
                v-model="courseSelect"
              ></v-select>
              <v-btn color="primary" @click="courseSave">Дальше</v-btn>
              <v-btn flat @click="step = 1">Назад</v-btn>>
            </v-stepper-content>

            <v-stepper-content step="3">
              <div class="mb-5">
                <p>Давай проверим то, что мы о тебе узнали</p>
                <div>
                  <p>
                    <strong>Группа:</strong>
                    {{ userGroup.group }}
                  </p>
                  <p>
                    <strong>Курс:</strong>
                    {{ userGroup.course }}
                  </p>
                </div>
              </div>
              <v-btn color="primary" @click="submitHandler">Дальше</v-btn>
              <v-btn flat @click="step = 2">Назад</v-btn>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>

        <modal :toggleModal="openModal" mode="success">
          <span slot="header">
            <span class="white--text">Регистрация прошла успешно</span>
            <v-icon class="white--text">done_all</v-icon>
          </span>
          <span slot="content" class="bold">+1 к защите от отчисления ;)</span>
        </modal>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import { getGroup, createUser } from "../api/auth";
import { getAllGroups } from "../api/groups";

import { debounce } from "../helpers/debounce";
import { createUserData } from "../helpers/createData";

import SpinnerWave from "@/components/Common/Spinner";
import Modal from "@/components/Common/Modal";

export default {
  name: "Auth",
  data: () => ({
    step: 1,
    loading: false,
    groupLoading: false,
    openModal: false,
    userGroup: "",

    // first step
    groups: [],
    groupString: "",
    groupSelect: "",

    // second step
    courses: [1, 2, 3, 4, 5],
    disabledSelector: false,
    courseSelect: ""
  }),
  components: {
    Modal,
    SpinnerWave
  },
  computed: {
    ...mapState(["currentUser"]),
    searchParam() {
      return this.groupString ? this.groupString : "";
    },
    isGroupSelectValid() {
      return !this.groupSelect;
    }
  },
  methods: {
    fetchGroups() {
      if (!this.searchParam) return;
      this.loading = true;
      const params = this.searchParam;

      getAllGroups(params)
        .then(groups => (this.groups = [...groups]))
        .catch(err => console.log(err))
        .finally(() => (this.loading = false));
    },
    checkUserGroup() {
      const id = this.groupSelect;
      this.groupLoading = true;

      getGroup(id)
        .then(({ data }) => {
          this.userGroup = data;
          this.groupCheck(data);
          this.groupLoading = false;
        })
        .catch(err => console.log(err));
    },
    groupCheck(group) {
      if (!group.course) {
        this.step = 2;
        this.disabledSelector = false;
      } else {
        this.step = 3;
        this.disabledSelector = true;
        this.courseSelect = group.course;
      }
    },
    courseSave() {
      this.userGroup.course = this.courseSelect;
      this.step = 3;
    },
    submitHandler() {
      const { currentUser, userGroup } = this;
      const userObj = { ...currentUser, ...userGroup };
      const user = createUserData(userObj);

      createUser(user)
        .then(({ data }) => {
          this.$store.commit("setCurrentUser", {
            ...this.currentUser,
            ...data
          });
          localStorage.setItem("user", JSON.stringify(data));
          this.openModal = true;
        })
        .catch(err => console.log(err));
    }
  },
  watch: {
    groupString() {
      if (this.groupString) {
        this.debouncedFetch();
      }
    }
  },
  created() {
    this.debouncedFetch = debounce(this.fetchGroups, 1000);
  }
};
</script>
