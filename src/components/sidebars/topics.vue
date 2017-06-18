<template>
<div class="layout-content-main">
    <Card>
        <div class="topics">
            <div class="header">你的话题</div>
            <div class="divider"></div>
            <div class="linklists" id="user_card_list">
                <a class="item" href="/topic/2">Tests</a>
                <a class="item" href="/topic/1">Computed Properties and Watchers</a>
            </div>
        </div>
        <a class="create-topic" href="/topic/create">
            <div class="visible">
                <Icon type="plus-round"></Icon>
                发表话题
            </div>
        </a>
 
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
.divider {
    border-top: 1px solid rgba(34,36,38,.15);
    margin: 1rem 0;
}
.header {
    text-align:left;
    font-weight: 700;
    font-size: 1.28571429em;
    color: rgba(0,0,0,.87);
}
.item {
    color: rgba(0,0,0,.4);
    text-align: left;
}  
.linklists {
    display: flex;
    flex-direction: column;
}

a.create-topic {
    color: #a812e8;
}

.visible {
    padding: 3px;
    border: 1px solid;
    transition: all 0.3s ease 0s;
}

div.visible:hover {
    background: #d5abe8;
}

a.item:hover {
    color: #d5abe8;
}
</style>