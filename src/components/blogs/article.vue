<template>
<div>
    <div class="layout-content">
    <Card>
        <div class="article-content">
            <h1 class="header">Computed Properties and Watchers</h1>
            <div class="item side-info">
                •发布于1 个月前•作者 lita•11次浏览
            </div>
            <div class="">
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
            </div>
            <div class="divider"></div>
            <div class="markdown-body">
                <p>In-template expressions are very convenient, but they are really only meant for simple operations. Putting too much logic into your templates can make them bloated and hard to maintain. For example:</p>
                <p></p>
                <div>
                message.split('').reverse().join('') 
                </div>
                At this point, the template is no longer simple and declarative. You have to look at it for a second before realizing that it displays message in reverse. The problem is made worse when you want to include the reversed message in your template more than once.
                That’s why for any complex logic, you should use a computed property.
                <p></p>
            </div>
        </div>
    </Card>
    </div>
    <reply></reply>
</div>
</template>

<script>
import marked from 'marked';
import hlj from 'highlight.js'
import 'highlight.js/styles/github-gist.css'
import Reply from './reply'
export default {
    components : {
        Reply
     },
    data () {
      return {
          input : ''
      }
    },
    methods : {
    },
    computed:{
        markedToHtml(){
            marked.setOptions({
                highlight: function (code) {
                    return hlj.highlightAuto(code).value;
                }
            });
            // console.log(this.article.content);
            return marked(this.input);
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