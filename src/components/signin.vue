<template>
    <Row type="flex" justify="space-between" class="top" align="middle">
        <i-col span="8" push="8">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
            <Form-item label="姓名" prop="name">
                <Input v-model="formCustom.name" placeholder="请输入姓名"></Input>
            </Form-item>
            <Form-item label="密码" prop="passwd">
                <div @keyup.enter="handleSubmit('formCustom')">
                    <Input type="password" v-model="formCustom.passwd" ></Input>
                </div>
            </Form-item>
            <Form-item>
                <Button type="primary" @click="handleSubmit('formCustom')" >登录</Button>
                <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
            </Form-item>
        </Form>
        </i-col>
    </Row>
</template>
<script>
    export default {
        data () {
            const validateName = (rule, value, callback) => {
                if(!/^[a-z0-9_]+$/i.test(value)) {
                    callback(new Error('只能包含字母数字_'));
                } else {
                    callback();
                }
            };
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            
            return {
                formCustom: {
                    name: '',
                    passwd: ''
                },
                ruleCustom: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        let userInfo = {
                            name : this.formCustom.name,
                            password : this.formCustom.passwd
                        }
                        this.axios.post('/api/signin',userInfo).then((res) => {
                            if(res.data.success) {
                                sessionStorage.setItem('token',res.data.token);
                                console.log(res.data)
                                this.$Message.success('登陆成功!');
                                this.$router.push('/')
                            } else {
                                this.$Message.error('用户不存在或者密码错误');
                            }                            
                        }, (err) => {
                            console.log(err)
                        })                       
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style scoped>
 .top {
        position: absolute;
        top:50%;
        left:50%;
        width:100%;
        transform:translate(-50%,-50%);
        text-align: center;

 }

</style>