<template>
<div>
    <div class="layout-content">
    <Card>
        <div class="article-content">
            <h1 class="header">{{topics.title}}</h1>
            <div class="item side-info">
                •发布于1 个月前•作者 {{topics.user_id}}•{{topics.pv}}次浏览
            </div>
            <div class="">
                <template v-if="topics.user_id === this.curUser">
                <div class="buttons">
                    <a class="edit-topic" id="editTopic" href="/topic/1/edit">
                        <Icon type="edit"></Icon>编辑
                    </a>
                    <div class="delete-button">
                        <a class="edit-topic" href="/topic/1/delete">
                            <Icon type="trash-a"></Icon>删除
                        </a>
                    </div>
                </div>
                </template>
            </div>
            <div class="divider"></div>
            <template v-if="topics.content">
                <div class="markdown-body"  v-html="markedToHtml"></div>
            </template>
            
        </div>
    </Card>
    </div>
    <reply :metaInfo="{curUser,_id: this.topics._id}" :replies="this.replies" @postComment="refresh"></reply>
</div>
</template>

<script>
import marked from 'marked';
import hlj from 'highlight.js'
import 'highlight.js/styles/github-gist.css'
import Reply from './reply'
export default {
    props:{
      user: {
          type: String
      },
      uid: {
          type: String
      }
    },
    components : {
        Reply
     },
    created () {
        this.updatePV()
        this.getCurUser();
        this.getTopics();
    },
    data () {
      return {
          input : '',
          curUser: '',
          topics: {},
          replies: []
      }
    },
    methods : {
        updatePV() {
          const token = sessionStorage.getItem('token');
          if(token) {
            this.axios.put('/api/updatePV/' + this.$props.user + '/' + this.$props.uid,
             {headers : {Authorization : 'Bearer ' + token}}).then((res) => {
                res.data
            })
          }
        },
        getCurUser() {
          const token = sessionStorage.getItem('token');
          if(token) {
            this.axios.get('/api/get_cur_user',
             {headers : {Authorization : 'Bearer ' + token}}).then((res) => {
                this.curUser = res.data.name
            })
          }
        },
        getTopics() {
          const token = sessionStorage.getItem('token');
          if(token) {
            this.axios.get('/api/' + this.$props.user + '/topic/' + this.$props.uid,
                {headers : {Authorization : 'Bearer ' + token}}).then((res) => {
                  console.log(res.data)
                  this.topics = res.data;
                  return this.axios.get('/api/getReplies/' + this.$props.uid,
                        {headers : {Authorization : 'Bearer ' + token}}).then((res) => {
                            console.log(res.data)
                            this.replies = res.data
                        })
            }, (err) => {
                  console.log(err)
            })
          }
        },
        refresh () {
            console.log("event caller")
            this.getTopics();
        }
    },
    computed:{
        markedToHtml(){
            marked.setOptions({
                highlight: function (code) {
                    return hlj.highlightAuto(code).value;
                }
            });
            // console.log(this.article.content);
            return marked(this.topics.content);
        }
  },
}
</script>

<style scoped>
.layout-content{
    min-height: 200px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
    text-align: left;
}
.header {
    text-align: left;
    padding-bottom: 15px;
}
.edit-topic {
    color: #495060;
    padding-right: 20px;
}
.buttons{
    display: flex;
}
.item{
    padding-bottom: 20px;
}
.side-info {
    font-size: 1rem;
    line-height: 1.4285em;
    color: rgba(0,0,0,.87);
}
.divider{
    margin: 1rem 0;
    line-height: 1;
    height: 0;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .05em;
    color: rgba(0,0,0,.85);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    font-size: 1rem;
    border-top: 1px solid rgba(34,36,38,.15);
    border-bottom: 1px solid rgba(255,255,255,.1);
}
.markdown-body{
    text-size-adjust: 100%;
    color: #333;
    overflow: hidden;
    font-family: "Helvetica Neue",Helvetica,"Segoe UI",Arial,freesans,sans-serif;
    font-size: 16px;
    line-height: 1.6;
    word-wrap: break-word;
}
</style>