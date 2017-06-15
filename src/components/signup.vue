<template>
    <Row type="flex" justify="space-between" class="top" align="middle">
        <i-col span="8" push="8">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
            <Form-item label="姓名" prop="name">
                <Input v-model="formCustom.name" placeholder="请输入姓名"></Input>
            </Form-item>
            <Form-item label="密码" prop="passwd">
                <Input type="password" v-model="formCustom.passwd"></Input>
            </Form-item>
            <Form-item label="确认密码" prop="passwdCheck">
                <Input type="password" v-model="formCustom.passwdCheck"></Input>
            </Form-item>
            <!--
            <Form-item label="年龄" prop="age">
                <Input type="text" v-model="formCustom.age" number></Input>
            </Form-item>
            -->
            <Form-item>
                <Button type="primary" @click="handleSubmit('formCustom')">注册</Button>
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
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            // const validateAge = (rule, value, callback) => {
            //     if (!value) {
            //         return callback(new Error('年龄不能为空'));
            //     }
            //     // 模拟异步验证效果
            //     setTimeout(() => {
            //         if (!Number.isInteger(value)) {
            //             callback(new Error('请输入数字值'));
            //         } else {
            //             if (value < 18) {
            //                 callback(new Error('必须年满18岁'));
            //             } else {
            //                 callback();
            //             }
            //         }
            //     }, 1000);
            // };
            
            return {
                formCustom: {
                    name: '',
                    passwd: '',
                    passwdCheck: ''
                },
                ruleCustom: {
                    name: [
                        { validator: validateName, trigger: 'blur' }
                    ],
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
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
                        this.axios.post('/api/signup',userInfo).then((response) => {
                            sessionStorage.setItem('token',response.data.token);
                            console.log(response.data)
                            this.$router.push('/')
                        }, (err) => {
                            console.log(err)
                        })
                        this.$Message.success('提交成功!');
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