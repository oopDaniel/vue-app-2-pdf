<template lang="pug">
  .page
    .flex-center-v
      h1.name Daniel Chiang
      h4.title Software Engineer
    .flex-center
      .left.flex-center
        span (+1) 800-800-8080
      .right.flex-center
        span google@gmail.com
    h4.title(v-for="n in 40") This is line {{n}}

</template>

<style lang="stylus" scoped>
  .name
    margin-top 2rem
  .title
    color steelblue
    margin 1rem
  .left
    flex 1
  .right
    flex 1
</style>
