<template>
<div>
   <div class="signup-container">
      <div class="container signup">
         <div class="signup-header">
            <button>Войти</button>
         </div>
         <div class="signup-form">
            <div class="signup-form-logo">
               <!-- <h1> -->
               <!-- KPI<span>bot</span> -->
               <!-- </h1> -->
               <img src="../assets/logopng.png" alt="">
            </div>
            <div>
               <div class="signup-form-bottom">
                  <span>
                  Все твои лекции в одном месте
                  </span>
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="options-wrapper">
      <div class="container options">
         <div class="options-item">
            <div>
               <div class="card-image card-image-writing"></div>
            </div>
            <div class="options-item-about">
               <div class="options-item-about__head">
                  Читай лекции
               </div>
               <div class="options-item-about__body">
                  Все лекции в твоем телефоне.
                  Найти и почитать свою лекци ты можешь <a href="#">тут</a>,
                  а добавить новую <a href="#">тут</a>.
               </div>
            </div>
         </div>
         <div class="options-item">
            <div>
               <div class="card-image card-image-timetable"></div>
            </div>
            <div class="options-item-about">
               <div class="options-item-about__head">
                  Узнавай расписание
               </div>
               <div class="options-item-about__body">
                  Все знаешь где и когда твоя пара.
                  Посмотреть свое расписание и узнать больше информации  о паре
                  ты можешь <a href="#">тут</a>.
               </div>
            </div>
         </div>
         <div class="options-item">
            <div>
               <div class="card-image card-image-future"></div>
            </div>
            <div class="options-item-about">
               <div class="options-item-about__head">
                  чета еще будет :3
               </div>
               <div class="options-item-about__body">
                  Все лекции в твоем телефоне.
                  Все лекции в твоем телефоне.
                  Все лекции в твоем телефоне.
                  Все лекции в твоем телефоне.
               </div>
            </div>
         </div>
      </div>
   </div>
   <div class="footer-wrapper">
      <div class="footer container">
         <div class="footer-links">
            Все вопросы и пожелания <a href="#">сюда</a>
         </div>
      </div>
   </div>
</div>
</template>

<script>
export default {
  name: 'Main'
}
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  background-color: white;
  font-size: 16px;
  color: #363945;
  -webkit-font-smoothing: antialiased;
}

.container {
  margin: 0 auto;
  max-width: 960px;
  position: relative;
  padding: 20px 0;
}

.signup {
  max-width: 1430px;
  min-height: 650px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &-container {
    background: url("../assets/tic-tac-toe-white-a8e65fed56843e6e7892a82b2c19b0f6.png");
    background-color: #3ea9f5;
    background-repeat: repeat;
    background-size: 209px;
    font-family: "WhitneySemiBold", "Avenir", Helvetica, sans-serif;
    background-position: 50% -1%;
  }
  &-header {
    margin-top: 26px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: white;
    font-family: "WhitneySemiBold", "Avenir", Helvetica, sans-serif;
    button {
      padding: 10px 15px;
      font-size: 18px;
      background-color: transparent;
      border: 1px solid rgba($color: white, $alpha: 0.77);
      border-radius: 4px;
      cursor: pointer;
      transition: 0.2s;
      color: white;
      font-family: "WhitneyLight";
      &:hover {
        border: 1px solid rgba($color: white, $alpha: 1);
      }
    }
  }
  &-form {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    min-height: 600px;
    &-bottom {
      text-align: center;
      font-family: "WhitneyLight";
      font-size: 18px;
      color: white;
    }
    &-logo {
      img {
        width: 500px;
        height: 500px;
      }
    }
  }
}

.options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  &-wrapper {
    padding: 80px 40px;
    padding-bottom: 20px;
    background-color: #f5f5f5;
  }
  &-item {
    flex: 1 1 300px;
    flex-direction: column;
    overflow: hidden;
    margin: 0 20px 40px;
    min-height: 300px;
    background: #fff 50%;
    background-size: cover;
    border-radius: 5px;
    box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
      1px 3px 8px rgba(39, 44, 49, 0.03);
    transition: all 0.5s ease;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 1px rgba(39, 44, 49, 0.1),
        0 3px 16px rgba(39, 44, 49, 0.07);
      transition: all 0.3s ease;
      transform: translate3D(0, -1px, 0);
    }
    &-about {
      &__head {
        text-align: center;
        font-family: "WhitneySemiBold", "Avenir", Helvetica, sans-serif;
        padding: 5px 0;
        border-bottom: 1px solid lightgray;
      }
      &__body {
        font-family: "WhitneyLight";
        padding: 15px 15px;
      }
    }
  }
}

.card-image {
  height: 200px;
  background-repeat: no-repeat;
  background-size: cover;
  &-writing {
    background-image: url("../assets/writing-1209121_960_720.jpg");
  }
  &-timetable {
    background-image: url("../assets/hand-with-pen-mark-calendar_1325-126.jpg");
    background-position: center center;
  }
  &-future {
    background-image: url("../assets/maxresdefault.jpg");
    background-position: center center;
  }
}

.footer {
  padding: 15px 10px;
  font-family: "WhitneyLight";
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  &-wrapper {
    background-color: #3ea9f5;
  }
}

// fonts
@font-face {
  font-family: "WhitneyLight";
  src: url("../assets/fonts/WhitneyLight/WhitneyLight.eot");
  src: url("../assets/fonts/WhitneyLight/WhitneyLight.eot?#iefix")
      format("embedded-opentype"),
    url("../assets/fonts/WhitneyLight/WhitneyLight.woff") format("woff"),
    url("../assets/fonts/WhitneyLight/WhitneyLight.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: "WhitneyLight";
  src: url("../assets/fonts/WhitneyLight/WhitneyLight.eot");
  src: url("../assets/fonts/WhitneyLight/WhitneyLight.eot?#iefix")
      format("embedded-opentype"),
    url("../assets/fonts/WhitneyLight/WhitneyLight.woff") format("woff"),
    url("../assets/fonts/WhitneyLight/WhitneyLight.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: "WhitneyMedium";
  src: url("../assets/fonts/WhitneyMedium/WhitneyMedium.eot");
  src: url("../assets/fonts/WhitneyMedium/WhitneyMedium.eot?#iefix")
      format("embedded-opentype"),
    url("../assets/fonts/WhitneyMedium/WhitneyMedium.woff") format("woff"),
    url("../assets/fonts/WhitneyMedium/WhitneyMedium.ttf") format("truetype");
  font-style: normal;
  font-weight: normal;
}

@font-face {
  font-family: "WhitneySemiBold";
  src: url("../assets/fonts/WhitneySemiBold/WhitneySemiBold.eot");
  src: url("../assets/fonts/WhitneySemiBold/WhitneySemiBold.eot?#iefix")
      format("embedded-opentype"),
    url("../assets/fonts/WhitneySemiBold/WhitneySemiBold.woff") format("woff"),
    url("../assets/fonts/WhitneySemiBold/WhitneySemiBold.ttf")
      format("truetype");
  font-style: normal;
  font-weight: normal;
}
</style>
