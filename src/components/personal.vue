<template>
<div class = "profile-rooter">
  <div class="layout-content-main">
  <Card>
    <div class="profile-outer">
        <h1 class="infos">基本信息</h1>
        <!--<div class="basic-outer"><h3 class="basic-info">基本信息</h3></div>-->
        <div class="ui items">
        </div>
        <div class="profile-content">
            <div class="profile-form">
                <form class="form">
                    <div class="field">
                        <label class="form-label">用户名</label>
                        <input type="text" readonly="" v-model="userName">
                    </div>
                    <div class="field">
                        <label class="form-label">Email</label>
                        <input type="text" v-model="email">
                    </div>
                    <div class="field">
                        <label class="form-label">个性签名</label>
                        <textarea rows="2" v-model="signature"></textarea>
                    </div>
                    <div class="field">
                        <label class="form-label">个人网站</label>
                        <input type="text" v-model="psite">
                    </div>
                    <div class="field">
                        <label class="form-label">GitHub</label>
                        <input type="text" v-model="github">
                    </div>
                    <div class="field">
                        <label class="form-label">积分</label>
                        <input type="text" readonly="" v-model="points">
                    </div>
                </form>
            </div>
            <div class="profile-avatar">
                <div class="ui grid">
                    <div class="centered row">
                        <img class="ui image" :src="imgDataUrl">
                    </div>
                    <div class="">
                        <button class="button-avatar" @click="toggleShow">set avatar</button>
                        <my-upload field="img.png"
                            @crop-success="cropSuccess"
                            @crop-upload-success="cropUploadSuccess"
                            @crop-upload-fail="cropUploadFail"
                            v-model="show"
                            :width="300"
                            :height="300"
                            url="/api/upload/avatar"
                            :params="params"
                            :headers="headers"
                            img-format="png"></my-upload>
                    </div>
                </div>
            </div>
        
        </div>
        <div class="submit-button" @click="updateInfo">
          <Button type="primary">修改信息</Button>
        </div>
    </div>
  </Card>
</div>

  <div class="layout-content-main">
    <Card>
      <div class="profile-outer">
          <h3>最近创建的话题</h3>
          <div class="profile-align">
              <div class="ui item">
                  <a href="/topic/2" style="font-weight: bold;"> Tests</a>
              </div>
              <div class="ui item">
                  <a href="/topic/1" style="font-weight: bold;"> Computed Properties and Watchers</a>
              </div>
          </div>
      </div>
    </Card>
  </div>
  <div class="layout-content-main">
  <Card>
    <div class="profile-outer">
        <h3 class="ribbon">最近参与的话题</h3>
        <div class="profile-align">
            <div class="ui item">
                <a href="/topic/1" style="font-weight: bold;"> Computed Properties and Watchers</a>
            </div>
        </div>
    </div>
    </Card>
  </div>
</div>
</template>

<script>
//import 'babel-polyfill'; // es6 shim
import myUpload from 'vue-image-crop-upload/upload-2';

export default {
  props : {
      userid: {
          type: String
      }
  },
  components : {
    myUpload
  },
  data () {
    return {
      userInfo: {},
      userName: '',
      email: '',
      signature: '',
      psite: '',
      github: '',
      points: '',
      show: false,
      params: {
        //   token: '123456798',
        //   name: 'avatar'
      },
      headers: {
          smail: '*_~'
      },
      //field : name(),
	  imgDataUrl: '' // the datebase64 url of created image
    }
  },
  computed: {
    name () {
        return Math.random().toString().sub(3,10) + ".png"
    }
  },
  created () {
    this.getUserInfo();
  },
  methods : {
    getUserInfo () {
      const token = sessionStorage.getItem('token');
      //console.log(token);
      if(token) {
        console.log(this.$props.userid);
        this.axios.get('/api/user/' + this.$props.userid,{headers : {Authorization : 'Bearer ' + token}}).
          then((res)=>{
                  //console.log(res.data);
                  this.userInfo = res.data;
                  this.userName = res.data.name;
                  this.email = res.data.email;
                  this.signature = res.data.signature;
                  this.psite = res.data.personalWeb;
                  this.github = res.dataGitHub;
                  this.points = res.data.integration;
                  this.imgDataUrl = res.data.avatarUrl;
        }, (err) => {
        })
      }
    },
    updateInfo () {
        const token = sessionStorage.getItem('token');
          if(token) {
            this.userInfo.name = this.userName;
            this.userInfo.email = this.email;
            this.userInfo.signature = this.signature;
            this.userInfo.personalWeb = this.psite;
            this.userInfo.GitHub = this.github;
            this.userInfo.integration = this.points;
            this.axios.post('/api/user/update',this.userInfo,{headers : {Authorization : 'Bearer ' + token}}).
              then((res)=>{
                      //console.log(res.data);
                      //this.userInfo = res.data;
                      this.getUserInfo();
              }, (err) => {
            })
        }
      },

    toggleShow() {
            this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field){
        //console.log('-------- crop success --------');
        //this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field){
        //console.log('-------- upload success --------');
        //console.log(jsonData);
        this.imgDataUrl = jsonData.result.cloudinary.url
        this.userInfo.avatarUrl = this.imgDataUrl;
        //console.log('field: ' + field);
        this.show = !this.show;
        this.updateInfo();
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field){
        // console.log('-------- upload fail --------');
        // console.log(status);
        // console.log('field: ' + field);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.layout-content-main{
    padding: 10px;
}
.profile-content {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
}
.profile-form {
  padding: 10px 10px 10px 0;
  width: 50%!important;
}
.form-label {
    display: block;
    margin: 0 0 .28571429rem;
    color: rgba(0,0,0,.87);
    font-size: .92857143em;
    font-weight: 700;
    text-align: left;
}
.image {
    height: 150px;
}
input {
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    margin: 0;
    outline: 0;
    -webkit-appearance: none;
    line-height: 1.2142em;
    padding: .67861429em 1em;
    font-size: 1em;
    background: #FFF;
    border: 1px solid rgba(34,36,38,.15);
    color: rgba(0,0,0,.87);
    border-radius: .28571429rem;
    box-shadow: 0 0 0 0 transparent inset;
    -webkit-transition: color .1s ease,border-color .1s ease;
    transition: color .1s ease,border-color .1s ease;
    width: 100%;
}
input:focus {
    border: 1px solid #CCE2FF;
}
textarea {
    margin: 0;
    -webkit-appearance: none;
    padding: .78571429em 1em;
    background: #FFF;
    border: 1px solid rgba(34,36,38,.15);
    outline: 0;
    color: rgba(0,0,0,.87);
    border-radius: .28571429rem;
    box-shadow: 0 0 0 0 transparent inset;
    -webkit-transition: color .1s ease,border-color .1s ease;
    transition: color .1s ease,border-color .1s ease;
    font-size: 1em;
    line-height: 1.2857;
    resize: vertical;
    width: 100%;
    vertical-align: top;
}
textarea:focus {
    border: 1px solid #CCE2FF;
}
.ui.items {
    margin: 1.5em 0;
}
/*.basic-outer {
    width: 6rem;
}
.basic-info {
    padding: 10px;
    text-align: left;
    background: #f4b642;
    border-radius: 8px;
}*/
.profile-align {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

h1 {
    text-align: center;
    position: relative;
    color: #fff;    
    margin: 0 -30px 30px -30px;
    padding: 10px 0; 
    text-shadow: 0 1px rgba(0,0,0,.8);
    background-color: #16a085;
    background-image:  linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,0));
    -moz-box-shadow: 0 2px 0 rgba(0,0,0,.3);
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,.3);
    box-shadow: 0 2px 0 rgba(0,0,0,.3);
}

h1:before, 
h1:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-color: transparent;
    bottom: -10px;
}

h1:before {
    border-width: 0 10px 10px 0;
    border-right-color: #138a72;
    left: 0;
}

h1:after {
    border-width: 0 0 10px 10px;
    border-left-color: #138a72;
    right: 0;
}

.ui.item {
  padding: 5px 0 5px 0;
}

h3 {
    text-align: center;
    position: relative;
    color: #fff;    
    margin: 0 -30px 30px -30px;
    padding: 10px 0; 
    text-shadow: 0 1px rgba(0,0,0,.8);
    background-color: #7f29a5;
    background-image:  linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,0));
    -moz-box-shadow: 0 2px 0 rgba(0,0,0,.3);
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,.3);
    box-shadow: 0 2px 0 rgba(0,0,0,.3);
}

h3:before, 
h3:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-color: transparent;
    bottom: -10px;
}

h3:before {
    border-width: 0 10px 10px 0;
    border-right-color: #491360;
    left: 0;
}

h3:after {
    border-width: 0 0 10px 10px;
    border-left-color: #491360;
    right: 0;
}

h3.ribbon {
    text-align: center;
    position: relative;
    color: #fff;    
    margin: 0 -30px 30px -30px;
    padding: 10px 0; 
    text-shadow: 0 1px rgba(0,0,0,.8);
    background-color: #b78c1f;
    background-image:  linear-gradient(rgba(255,255,255,.3), rgba(255,255,255,0));
    -moz-box-shadow: 0 2px 0 rgba(0,0,0,.3);
    -webkit-box-shadow: 0 2px 0 rgba(0,0,0,.3);
    box-shadow: 0 2px 0 rgba(0,0,0,.3);
}

h3.ribbon:before, 
h3.ribbon:after {
    content: '';
    position: absolute;
    border-style: solid;
    border-color: transparent;
    bottom: -10px;
}

h3.ribbon:before {
    border-width: 0 10px 10px 0;
    border-right-color: #664d0f;
    left: 0;
}

h3.ribbon:after {
    border-width: 0 0 10px 10px;
    border-left-color: #664d0f;
    right: 0;
}

.submit-button {
    font-weight: 400;
    border-radius: .28571429rem;
    display: flex;

}

.button-avatar {
    color: white;
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    background: rgb(66, 184, 221); /* this is a light blue */
    margin-left : 24px;
    margin-top : 10px;
}

.button-avatar:hover {
    background: rgb(21, 100, 125);
}
</style>
