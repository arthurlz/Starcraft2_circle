<template>
<div class="layout-content-main">
    <Card>
        <div class="content">
            <a href="/#/profile">
                <img class="avatar" src="http://res.cloudinary.com/dwwn5mrou/image/upload/v1495804973/iwjvmrtwvbmddrslfncv.png" id="userCardAvatar">
                <div class="header" >
                    lita
                </div>
            </a>
            <div class="meta">
                积分: 12
            </div>
            <div class="description">
                "I love you"
            </div>
        </div>
        <div class="prolinks">
            <a class="prohyper" href=""><Icon type="ios-home"></Icon> 个人网站</a>
            <a class="prohyper" href="Loveppears"><Icon type="social-github"></Icon> GitHub主页</a>
            <a class="prohyper prohyperlast" href="/userSetting/lita"><Icon type="settings"></Icon> 设置</a>
        </div>
    </Card>
</div>
</template>

<script>

export default {
     components : {
        
     },
    created(){
    },
     data () {
      return {
      }
    },
    methods : {
    }
}
</script>

<style scoped>
    .layout-content-main{
        padding: 10px;
    }
    img {
        height : 60px;
    }
    .avatar {
      float:right;
      margin: 0;
      width: 50px;
      height: 50px;
    }
    .header {
      text-align:left;
      font-weight: 700;
      font-size: 1.28571429em;
      color: rgba(0,0,0,.87);
    }
    .meta {
      text-align: left;
    }
    .description {
      text-align: left;
    }
    .prolinks {
      border-bottom-width: 1px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .prohyper {
      color: grey;
      padding: 5px;
      width: 100%;
      border: 1px solid #e9eaec;
      border-radius: 3px;
      border-bottom: none;
    }
    .prohyperlast {
      border-bottom: 1px solid #e9eaec;
    }
    .personalSites {
      color: grey;
      padding: 5px;
      width: 100%;
      border: 1px solid #e9eaec;
      border-radius: 3px;
    }
</style>