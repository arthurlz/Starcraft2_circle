<template>
    <div class="layout-content">
       <div class="header">
            <label class="title">文章标题</label>
            <input v-model="title" placeholder="请输入..." @blur="checkTitle" class="input-title"></input>
        </div>
        <div class='editor'>
            <textarea class="input-md" v-model='content' debounce='100'></textarea>
            <div class="outputHtml" v-html='markedToHtml'></div>
        </div>
        <div class="post-blog">
            <Button type="primary" size="large" @click="postBlog"> 发布 </Button>
        </div>
    </div>
</template>

<script>
import marked from 'marked';
import hlj from 'highlight.js'
import 'highlight.js/styles/github-gist.css'
export default {
    props: {
         userid: {
            type: String
        }
    },
    components : {
     },
    data () {
      return {
          content : '',
          title : ''
      }
    },
    methods : {
        postBlog () {
            const token = sessionStorage.getItem('token');
            if(token) {
                console.log(this.$props.userid)
                this.axios.post('/api/topic/post',{user_id: this.$props.userid, title: this.title, content: this.content},
                    {headers : {Authorization : 'Bearer ' + token}})
                .then((res) => {
                    if(res.data) {
                        console.log(res.data);
                        this.$router.push('/')
                    }
                }, (err) => {

                });
            }else {
                this.$router.push('/')
            }
        },
        checkTitle () {
            
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
            return marked(this.content);
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
}
.editor {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
}
.input-md {
    display: block;
    resize: vertical;
    padding: 5px 7px;
    line-height: 1.5;
    width: 45%;
    color: #1f2d3d;
    background-color: #fff;
    background-image: none;
    border: 1px solid #bfcbd9;
    border-radius: 4px;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
.outputHtml {
    background: #f0f5f5;
    margin: 0px 0px 0px 20px;
    height: 500px;
    overflow-y: auto;
    width: 45%;
    text-align: left;
}
.header {
    text-align: left;
    padding-bottom: 30px;
}
.title {
    font-size: 14px;
}
.post-blog {
    text-align: left;
    padding: 40px 0 0 6px;
}
.input-title {
    height:30px;
    width: 300px;
    margin-left: 50px;
    /*border-radius: 3px;*/
}
</style>