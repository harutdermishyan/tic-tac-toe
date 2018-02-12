<template>
  <div id="app">
    <div class="container mt-5">
      <start-game></start-game>
    </div>
  </div>
</template>

<script>
  import StartGame from './components/StartGame/index.vue';

    export default {
        name: 'app',
        data () {
            return {

            }
        },
        components: {
           StartGame
        },
        methods: {

        }
    }
</script>

<style src="./style.css" lang="css"></style>
