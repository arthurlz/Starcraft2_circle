<template>
    <div class="layout-content">
        <div id='editor'>
            <textarea id='input' v-model='input' debounce='100'></textarea>
            <div class="outputHtml" id='output' v-html='markedToHtml'></div>
        </div>
    </div>
</template>

<script>
import marked from 'marked';
import hlj from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'
export default {
    components : {
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
}
.outputHtml{
    text-align: left;
}

#input, #output {
  display: block;
  position: absolute;
  top: 0px;
  width: 50vw;
  height: 100vh;
  padding: 20px;
  outline: none;
  border: none;
}

#input {
  left: 0px;
  border-right: 1px solid #eee;
}
#output {
  right: 0px;
}

</style>