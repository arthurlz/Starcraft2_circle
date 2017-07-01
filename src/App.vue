<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data (){
    return {
      imgPath : require("./assets/logo.jpg")
    }
  }
}
</script>

<style>
html body {
  margin : 0px;
  padding : 0px;
  font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
  background: #f5f7f9;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*background: #f5f7f9;*/
  border: 1px solid #d7dde4;
}

</style>
