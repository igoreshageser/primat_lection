<template>
  <div class="promo">
    <div class="typewriter">
      <Mouse />
      <h3>
        Не можешь найти лекцию?
        Поможем!
      </h3>
    </div>
  </div>
</template>

<script>
import Mouse from '@/components/Promo/Mouse'

export default {
  name: 'Promo',
  components: {
    Mouse
  }
}
</script>

<style lang="scss" scoped>
.promo {
  height: 100vh;
  width: 100%;
  background: black;
  //background: white;
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
    font-family: monospace;
    overflow: hidden;
    margin: 0 auto;
    letter-spacing: 0.15em;
  }
}

@media screen and (min-width: 481px) {
  .typewriter h3 {
    color: #fff;
    font-family: monospace;
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
