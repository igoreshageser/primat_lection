<template>
  <div class="tree-container"></div>
</template>

<script>
import { tree } from './Tree'
export default {
  name: 'Tree-Sector',
  props: {
    lections: {
      type: [Array, Object],
      default: () => {}
    }
  },
  watch: {
    lections() {
      tree(this.lections)
    }
  }
}
</script>

<style>
.node {
  cursor: pointer;
}

.node circle {
  fill: #fff;
  stroke: steelblue;
  stroke-width: 1.5px;
}

.node text {
  font: 10px sans-serif;
}

.link {
  fill: none;
  stroke: #ccc;
  stroke-width: 1.5px;
}
</style>
