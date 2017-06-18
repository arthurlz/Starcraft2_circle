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
                <form class="ui form">
                    <div class="field">
                        <label class="form-label">用户名</label>
                        <input type="text" readonly="" value="lita">
                    </div>
                    <div class="field">
                        <label class="form-label">Email</label>
                        <input type="text" readonly="" value="luneth929@gmail.com">
                    </div>
                    <div class="field">
                        <label class="form-label">个性签名</label>
                        <textarea readonly="" rows="2">I love you</textarea>
                    </div>
                    <div class="field">
                        <label class="form-label">个人网站</label>
                        <input type="text" readonly="" value="">
                    </div>
                    <div class="field">
                        <label class="form-label">GitHub</label>
                        <input type="text" readonly="" value="Loveppears">
                    </div>
                    <div class="field">
                        <label class="form-label">积分</label>
                        <input type="text" readonly="" value="12">
                    </div>
                </form>
            </div>
            <div class="profile-avatar">
                <div class="ui grid">
                    <div class="centered row">
                        <img class="ui image" src="http://res.cloudinary.com/dwwn5mrou/image/upload/v1495804973/iwjvmrtwvbmddrslfncv.png">
                    </div>
                </div>
            </div>
        </div>
    </div>
  </Card>
</div>

  <div class="layout-content-main">
    <Card>
      <div class="profile-outer">
          <h3>最近创建的话题</h3>
          <!--<div class="basic-outer"><h3 class="basic-info">最近创建的话题</h3></div>-->
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
export default {
  data () {
    return {
      
    }
  },
  methods : {
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
  padding: 10px;
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
input {
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    margin: 0;
    outline: 0;
    -webkit-appearance: none;
    tap-highlight-color: rgba(255,255,255,0);
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
    tap-highlight-color: rgba(255,255,255,0);
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
</style>
