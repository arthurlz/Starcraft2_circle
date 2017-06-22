<template>
    <div class="layout-content">
    <Card>
            <div class="reply-count">
                2回复
            </div>
            <div class="divider"></div>
            <div class="comments">
                <div class="comment">
                    <a class="avatar" href="/user/lita">
                        <img class="avatar" src="http://res.cloudinary.com/dwwn5mrou/image/upload/v1495804973/iwjvmrtwvbmddrslfncv.png">
                    </a>
                    <div class="content" id="1">
                        <a class="author" href="/user/lita">lita</a>
                    <div class="metadata">
                        <div class="date">1 个月前</div>
                    </div>
                    <div class="markdown-body">
                        <p>you are gorgeous</p>
                    </div>
                    <div class="actions">
                        <a class="upvote word-style" id="" alt="upvote">
                            <Icon type="thumbsup"></Icon>
                            <span id="supportNum1">0</span>
                        </a>
                        <a class="reply word-style" id="reply1">
                            <Icon type="reply"></Icon>
                        </a>
                    </div>
                 </div>
              </div>
                <div class="ui divider"></div>
                <div class="comment">
                    <a class="avatar" href="/user/lira">
                    <img src="http://res.cloudinary.com/hezf/image/upload/v1467186691/vwuj8a3tpuqoy5fzuzlw.png">
                    </a>
                    <div class="content" id="2">
                    <a class="author" href="/user/lira">lira</a>
                    <div class="metadata">
                        <div class="date">1 个月前</div>
                    </div>
                    <div class="markdown-body">
                        <p>Yes , I supposed it did</p>
                    </div>
                    <div class="actions">
                        <a id="support2">
                        <i class="thumbs up icon button" title="点赞"></i>
                        <span id="supportNum2">0</span>
                        </a>
                        <a id="reply2">
                        <i class="reply icon" title="回复"></i>
                        </a>
                    </div>
                    <div class="ui accordion" id="testContent2">
                        <div class="title" style="display: none">
                            不显示
                        </div>
                        <div class="content">
                            <div class="mditor fixed">
                                <div class="head">
                                <div class="toolbar"><i data-cmd="bold" class="fa fa-bold" title="粗体 shift+alt+b shift+alt+b"></i><i data-cmd="italic" class="fa fa-italic" title="斜体 shift+alt+i shift+alt+i"></i><i data-cmd="underline" class="fa fa-underline" title="下划线 shift+alt+e shift+alt+e"></i><i data-cmd="strikethrough" class="fa fa-strikethrough" title="删除线 shift+alt+d shift+alt+d"></i><i data-cmd="header" class="fa fa-header" title="标题 shift+alt+h shift+alt+h"></i><i data-cmd="quote" class="fa fa-quote-left" title="引用 shift+alt+q shift+alt+q"></i><i data-cmd="code" class="fa fa-code" title="代码 shift+alt+c shift+alt+c"></i><i data-cmd="list-ol" class="fa fa-list-ol" title="有序列表 shift+alt+o shift+alt+o"></i><i data-cmd="list-ul" class="fa fa-list-ul" title="无序列表 shift+alt+u shift+alt+u"></i><i data-cmd="link" class="fa fa-link" title="链接 shift+alt+l shift+alt+l"></i><i data-cmd="table" class="fa fa-table" title="表格 shift+alt+t shift+alt+t"></i><i data-cmd="line" class="fa fa-minus" title="分隔线 shift+alt+n shift+alt+n"></i><i data-cmd="image" class="fa fa-image" title="图片 shift+alt+p shift+alt+p"></i><i data-cmd="help" class="fa fa-question" title="帮助 shift+alt+/ shift+alt+/"></i></div>
                                <div class="control"><i data-cmd="togglePreview" class="fa fa-columns" title="预览 shift+alt+v shift+alt+v"></i><i data-cmd="toggleFullScreen" class="fa fa-arrows-alt" title="全屏 shift+alt+f shift+alt+f"></i></div>
                                </div>
                                <div class="body">
                                <textarea name="content" id="editor2" placeholder="请输入回复内容" class="editor" style="height: 200px;">@lira 
                                        </textarea>
                                <div class="viewer" style="height: 200px;"></div>
                                </div>
                                <div class="calc">
                                <div class="editor" style="height: 200px;"><br></div>
                                </div>
                            </div>
                            <button class="ui basic button" id="submitBtn2">回复</button>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="ui divider"></div>
            </div>
        </Card>
    </div>
</template>

<script>
export default {
    components : {
     },
    data () {
      return {
      }
    },
    methods : {
    },
    computed:{
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
</style>