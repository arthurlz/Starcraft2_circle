<template>
<div>
    <div class="layout-content">
    <Card>
            <div class="reply-count">
                {{this.$props.replies.length}}回复
            </div>
            <template v-for="reply in this.$props.replies">
            <div class="divider"></div>
            <div class="comments">
                <div class="comment">
                    <router-link :to="{name: 'profile', params: { userid: reply.user_id}}" class="avatar">
                        <img class="avatar" :src="reply.avatarUrl">
                    </router-link>
                    <div class="content" id="1">
                        <router-link :to="{name: 'profile', params: { userid: reply.user_id}}" class="author">
                             {{reply.user_id}}
                        </router-link>
                        <div class="metadata">
                            <div class="date">1 个月前</div>
                        </div>
                        <div class="markdown-body" v-html="markedToHtml(reply.content)">
                        </div>
                        <div class="actions">
                            <a class="upvote word-style" id="" alt="upvote">
                                <Icon type="thumbsup"></Icon>
                                <span id="supportNum1">{{reply.support}}</span>
                            </a>
                            <a class="reply word-style" id="reply1" @click="toggle()">
                                <Icon type="reply"></Icon>
                            </a>
                        </div>
                        <transition name="fold">
                            <div class="reply-content" v-show="isReplyShow">
                                <textarea id="editor1" placeholder="请输入回复内容" class="editor">@lita 
                                </textarea>
                            </div>
                        </transition>
                     </div>
                  </div>
               </div>
               </template>
        </Card>
    </div>
    <div class="layout-content">
        <Card>
            <h2 class="reply-title">添加回复</h2>
            <div class="reply-content">
                <textarea v-model='content' id="editor" placeholder="正文不能为空" class="editor"></textarea>
            </div>
            <div @click="submitComment">
                <Button type="success">发布</Button>
            </div>
        </Card>
    </div>
</div>
</template>

<script>
import marked from 'marked';
import hlj from 'highlight.js'
import 'highlight.js/styles/github-gist.css'

export default {
    props : {
        metaInfo : {
            type: Object,
            default: function () { return {} }
        },
        replies : {
            type: Array,
            default: function () { return [] }
        }
    },
    created () {
    },
    data () {
      return {
          isReplyShow: false,
          content: ''
      }
    },
    methods : {
        toggle () {
            this.isReplyShow = !this.isReplyShow;
        },
        submitComment () {
          const token = sessionStorage.getItem('token');
          if(token) {
            this.axios.post('/api/postReply/', {content: this.content,
                                                topic_id: this.$props.metaInfo._id,
                                                user_id: this.$props.metaInfo.curUser} 
            ).then((res) => {
                if(res.data.ok) {
                    this.$emit('postComment')
                } else {

                }
            })
          }
        },
        markedToHtml(content){
            marked.setOptions({
                highlight: function (code) {
                    return hlj.highlightAuto(code).value;
                }
            });
            return marked(content);
        }
    },
    computed:{
    }
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
.reply-count{
    font-size: 1.28em;
    border: none;
    margin: 0.5rem 0 1rem;
    padding: 0;
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    font-weight: 700;
    line-height: 1.2857em;
    text-transform: none;
    color: rgba(0,0,0,.87);
}
.divider{
    border-top: 1px solid rgba(34,36,38,.15);
    border-bottom: 1px solid rgba(255,255,255,.1);
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
}
.avatar{
    height: 35px;
    float: left;
}
.content {
    margin-left: 3.5em;
    max-width: 600px;
}
.author {
    font-size: 1em;
    color: rgba(0,0,0,.87);
    font-weight: 700;
}
.metadata {
    display: inline-block;
}
.date{
    line-height: 1.2;
    color: rgba(0,0,0,.4);
    font-size: .875em;
}
.markdown-body {
    word-wrap: break-word;
    font-size: 16px;
    text-size-adjust: 100%;
    color: #333;
    font-family: "Helvetica Neue",Helvetica,"Segoe UI",Arial,freesans,sans-serif;
    margin: 10px auto;
}
.word-style {
    color: rgba(0,0,0,.4);
    font-size: .97em;
}

.reply-content {
    margin: 0 0 10px 0;
    padding: 0;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 0 0 3px 3px;
    box-shadow: 0 0 4px 0 rgba(0,0,0,.1) inset;
    background-color: #fff;
    padding: .5em 0 1em;
}
.editor{
    border-right: 1px solid #ddd!important;
    border-bottom-right-radius: 0!important;
    height: 200px;
    position: relative;
    display: inline-block;
    border: none!important;
    border-radius: 0 0 3px 3px!important;
    outline: 0!important;
    width: 100%;
    /*height: 100%;*/
    min-height: 60px;
    resize: none!important;
    background-color: transparent!important;
    font: 16px/20px 'Helvetica Neue',Arial,'Liberation Sans',FreeSans,'Hiragino Sans GB',sans-serif!important;
    margin: 0;
    color: #333;
    word-break: break-all;
    word-wrap: break-word;
    text-align: left;
}
.reply-title {
    padding-bottom: 15px;
}
</style>