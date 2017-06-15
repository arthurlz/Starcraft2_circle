<template>
  <Menu mode="horizontal" theme="dark" class="menu-right">
        <Menu-item name="1" class="positions">
          <a><img :src="imgPath"  class="iconPosition"></img></a>
        </Menu-item>
        <Menu-item name="2" >
            注册
        </Menu-item>
        <Menu-item name="3" >
            登录
        </Menu-item>
        <Menu-item name="4" >
            关于
        </Menu-item>
    </Menu>

</template>

<script>
export default {
  name: 'nav',
  data () {
    return {
      imgPath : require("../assets/logo.jpg")
    }
  },
  methods : {
    test () {
      console.log(1212);
      this.axios.get('/api/fuck').then((response) => {
       console.log(response.data)
      }, (err) => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.iconPosition {
  margin-left : 30px;
}

a:hover {
}

.positions {
  margin-right : 850px;
}

img {
  height : 60px;
}

.menu-right {
  float : right;
}
</style>
