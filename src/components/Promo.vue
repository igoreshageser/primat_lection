<template>
<div class="wrapper">
   <div class="promo">
      <div class="typewriter">
         <mouse />
         <h3>
            Не можешь найти лекцию?
            Поможем!
         </h3>
      </div>
   </div>
   <div>
     <selectors  @getLection="getLection"/>
   </div>
   <div>
     <tree :lections="lections" />
   </div>
</div>
</template>
<script>
import Mouse from "@/components/Promo/Mouse";
import Selectors from "@/components/Promo/Selectors";
import Tree from "@/components/Promo/Tree/Tree-Wrapper";

export default {
  name: "Promo",
  components: {
    Tree,
    Mouse,
    Selectors
  },
  data: () => ({
    lections: {}
  }),
  methods: {
    getLection(lections) {
      this.lections = lections;
    }
  }
};
</script>
<style lang="scss" scoped>
.promo {
  position: relative;

  height: 100vh;
  width: 100%;
  background: black;
  display: flex;
  align-items: center;
  justify-content: center;

  &_latter {
    color: white;
    font-size: 1vw;
  }
}

/* The typing effect */
@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

/* The typewriter cursor effect */
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: orange;
  }
}

@media screen and (max-width: 480px) {
  .typewriter h3 {
    color: #fff;
    overflow: hidden;
    margin: 0 auto;
    letter-spacing: 0.15em;
  }
}

@media screen and (min-width: 481px) {
  .typewriter h3 {
    color: #fff;
    overflow: hidden;
    border-right: 0.15em solid orange;
    white-space: nowrap;
    margin: 0 auto;
    letter-spacing: 0.15em;
    word-wrap: break-word;
    animation: typing 3.5s steps(30, end), blink-caret 0.5s step-end infinite;
  }
}
</style>
