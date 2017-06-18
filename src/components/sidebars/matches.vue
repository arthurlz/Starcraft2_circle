<template>
<div class="layout-content-main">
    <Card>
        <img src="../../assets/LotV-header-logo.png">
        <div class="title">
            Starcraft2 Matches
        </div>
        <div class="divider"></div>
        <div class="demo-spin-container" v-show="!isDone">
            <Spin fix size="large"></Spin>
        </div>
        <table>
            <tbody>
                <tr v-for="match in matches">
                    <td class="teamLeft">{{match.leftTeam}}</td>
                    <td class="treamMiddle">VS</td>
                    <td class="teamRight">{{match.rightTeam}}</td>
                </tr>
            </tbody>
        </table>
    </Card>
</div>
</template>

<script>

export default {
     components : {
        
     },
    created(){
        this.getmatch();
    },
     data () {
      return {
          matches: [],
          isDone: false
      }
    },
    methods : {
        getmatch () {
            this.isDone = false;
            this.axios.get('/api/getmatches').then((res) => {
                console.log(res.data);
                this.matches = res.data.matches;
                this.isDone = true;
            }, (err) => {
                console.log(err)
            })
        },
    }
}
</script>

<style scoped>
.layout-content-main{
    padding: 10px;
}
.title {
    text-align: center;
    font-weight: 700;
    font-size: 1.28571429em;
    color: rgba(0,0,0,.87);
}
.divider {
    border-top: 1px solid rgba(34,36,38,.15);
    margin: 1rem 0;
}
img {
    height: 45px;
}
.teamLeft {
    padding-left: 15px;
    padding-right: 10px;
    padding-bottom: 4px;
}
.treamMiddle {
    padding-bottom: 4px;
}
.teamRight {
    padding-bottom: 4px;
    padding-left : 10px;
}
.demo-spin-container{
    display: inline-block;
    width: 200px;
    height: 100px;
    position: relative;
}

</style>