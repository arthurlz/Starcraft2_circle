<template>
    <div class="layout">
        <Menu mode="horizontal" theme="dark">
          <div class="img-position"><a href="/"><img class="layout-logo" :src="imgPath"></img></a></div>
          <div class="layout-nav">
            <Menu-item name="1" v-show='Object.keys(userInfo).length === 0' class="menu-align">
                <router-link :to="{path: '/signup'}">
                    注册
                </router-link>
            </Menu-item>
            <Menu-item name="2" v-show='Object.keys(userInfo).length === 0'>
                <router-link :to="{path: '/signin'}">
                    登录
                </router-link>
            </Menu-item>
            <Menu-item name="2">
              <template v-if="Object.keys(userInfo).length > 0">
                <router-link :to="{name: 'profile', params: { userid: userInfo.name}}">
                    {{userInfo.name}}
                </router-link>
               </template>
            </Menu-item>
            <Menu-item name="3">
                <router-link :to="{path: '/new'}">
                    关于
                </router-link>
            </Menu-item>
            <Menu-item name="3" >
                    <div @click="signOut()" v-if="Object.keys(userInfo).length > 0">退出</div>
            </Menu-item>
          </div>
        </Menu>
        <div class="layout-content">
            <Row >
                <i-col span="14" offset="2">
                  <transition name = 'fade'>
                   <keep-alive>
                    <router-view></router-view>
                  </keep-alive>
                  </transition>
                    <div class="layout-content-main" v-show="this.$route.path === '/'">
                        <Card>
                            <div class="segment">
                                <div class="selected items">
                                    <div class="item">
                                        <!--<router-link :to="{name: 'profile', params: { profile:userInfo}}">
                                        </router-link>-->
                                        <a href="/user/lita" class="ui spacing" style="width: 50px;">
                                        <img src="http://res.cloudinary.com/dwwn5mrou/image/upload/v1495804973/iwjvmrtwvbmddrslfncv.png">
                                        </a>
                                        <div class="top content spacing">
                                            <a class="header" href="/topic/1">Computed Properties and Watchers</a>
                                            <div class="meta">
                                            <span class="cinema">
                                                <a class="header" href="/user/1"></a>
                                                发布于9 天前●
                                                回复2●
                                                浏览8
                                            </span>
                                            </div>
                                        </div>
                                        <div class="middle spacing right floated">
                                            <div class="ui horizontal list">
                                            <div class="">
                                                <a class="" href="/user/lira">
                                                <img class="ui avatar image" style="width: 3em;height: 3em;" src="http://res.cloudinary.com/hezf/image/upload/v1467186691/vwuj8a3tpuqoy5fzuzlw.png">
                                                </a>
                                            </div>
                                            <div>
                                                <div class="content" style="font-size: smaller">9 天前</div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        </Card>
                         <Card>
                            <div class="segment">
                                <div class="selected items">
                                    <div class="item">
                                        <a href="/user/lita" class="ui spacing" style="width: 50px;">
                                        <img src="http://res.cloudinary.com/dwwn5mrou/image/upload/v1495804973/iwjvmrtwvbmddrslfncv.png">
                                        </a>
                                        <div class="top content spacing">
                                            <a class="header" href="/topic/1">Computed Properties and Watchers</a>
                                            <div class="meta">
                                            <span class="cinema">
                                                <a class="header" href="/user/1"></a>
                                                发布于9 天前●
                                                回复2●
                                                浏览8
                                            </span>
                                            </div>
                                        </div>
                                        <div class="middle spacing right floated">
                                            <div class="ui horizontal list">
                                            <div class="">
                                                <a class="" href="/user/lira">
                                                <img class="ui avatar image" style="width: 3em;height: 3em;" src="http://res.cloudinary.com/hezf/image/upload/v1467186691/vwuj8a3tpuqoy5fzuzlw.png">
                                                </a>
                                            </div>
                                            <div>
                                                <div class="content" style="font-size: smaller">9 天前</div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        </Card>
                    </div>
                </i-col>
                <i-col span="5" offset="1" class="layout-line">
                 <template v-if="Object.keys(userInfo).length > 0">
                  <profile :profile="userInfo"></profile>
                  <topic :profile="userInfo"></topic>
                 </template>
                  <div class="demo-spin-container" v-show="!userInfo">
                     <Spin fix size="large"></Spin>
                  </div>
                    <match></match>
                  <!--<button @click="getmatch">get starcraft2 matches</button>-->
                </i-col>
            </Row>
        </div>
        <!--
        <my-modal :pmodal6="modal6" @closeD='closeDialog'></my-modal>
        -->
        <div class="layout-copy">
          2011-2017 &copy; Brain-fucking
        </div>
    </div>
</template>

<script>
// import MyModal from './dialog'
import Profile from './sidebars/profile'
import Topic from './sidebars/topics'
import Match from './sidebars/matches'
export default {
     components : {
        Profile,
        Topic,
        Match
     },
    created(){
      const userInfo = this.getUserInfo();
      console.log(userInfo);
      console.log(this.$route.path);
    },
     data () {
      return {
         //modal6: false,
         imgPath : require('../assets/logo.jpg'),
         userInfo : {}
      }
    },
    methods : {
        getUserInfo () {
          const token = sessionStorage.getItem('token');
          console.log(token);
          if(token) {
            this.axios.get('/api/auth',{headers : {Authorization : 'Bearer ' + token}}).then((res) => {
                  console.log(res.data);
                  this.userInfo = res.data;
            }, (err) => {
                  console.log(err)
            })
          }
        },
        signOut () {
            console.log(12120)
            sessionStorage.clear();
            location.reload()
        }
    }
}
</script>

<style scoped>
.header {
  text-align:left;
  font-weight: 700;
  font-size: 1.28571429em;
  color: rgba(0,0,0,.87);
}
.layout-copy{
    text-align: center;
    padding: 10px 0 20px;
    color: #9ea7b4;
}
.img-position{
  padding-left : 12%;
}
.layout{
    /*border: 1px solid #d7dde4;
    background: #f5f7f9;*/
}
.layout-logo{
    width: 100px;
    height: 40px;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 20px;
}
.layout-nav{
    /*display: flex;
    justify-content: flex-end;*/
}
ul{
   display: grid;
   grid-template-columns: 76% 24%;
}
.layout-assistant{
    width: 300px;
    margin: 0 auto;
    height: inherit;
}
.layout-breadcrumb{
    padding: 10px 15px 0;
}
.layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
}
.layout-content-main{
    padding: 10px;
}

.layout-line {
    /*border-left: thin solid rgb(153,154,29);*/
}

/*0604*/
.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom : -50px;
}
img {
    height : 60px;
}
.spacing {
    margin-bottom : 50px;
}
</style>