<template lang="pug">
  .page
    .flex-center-v
      h1 2nd Page
    .flex-center
    h4.title(v-for="n in 40") This is line {{n + 20}}
</template>

<style lang="stylus" scoped>
  .title
    color violet
    margin .5rem
</style>
