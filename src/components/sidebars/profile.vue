<template>
<div class="layout-content-main">
    <Card>
        <div class="content">
           <template v-if="Object.keys(profile).length > 0">
            <router-link :to="{name: 'profile', params: { userid:profile.name}}">
                <img class="avatar" src="http://res.cloudinary.com/dwwn5mrou/image/upload/v1495804973/iwjvmrtwvbmddrslfncv.png" id="userCardAvatar">
                <div class="header" >
                    {{profile.name}}
                </div>
            </router-link>
            <div class="meta">
                积分: {{this.$props.profile.integration}}
            </div>
            <div class="description">
                {{this.$props.profile.signature}}
            </div>
           </template>
        </div>
        <div class="prolinks">
           <template v-if="Object.keys(profile).length > 0">
            <a class="prohyper" :href="homepage">
                <Icon type="ios-home"></Icon> 个人网站
            </a>
            <a class="prohyper" :href="github">
                <Icon type="social-github"></Icon> GitHub主页
            </a>
            <router-link :to="{name: 'profile', params: { userid: profile.name}}" class="prohyper prohyperlast">
                <Icon type="settings"></Icon> 设置
            </router-link>
           </template>
        </div>
    </Card>
</div>
</template>

<script>

export default {
    props : {
        profile: {
            type: Object,
            default: {}
        }
    },
    components : {
        
    },
    created(){
    },
     data () {
      return {
          userid: 'lita',
          github: 'https://www.github.com/' + this.$props.profile.GitHub,
          homepage: this.$props.profile.personalWeb
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
.d
escription {
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
.description {
    text-align: left;
}
</style>