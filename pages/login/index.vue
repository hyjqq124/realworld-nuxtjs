<template>
    <div class="auth-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-6 offset-md-3 col-xs-12">
                    <h1 class="text-xs-center">
                        {{ isLogin ? "Sign in" : "Sign up" }}
                    </h1>
                    <p class="text-xs-center">
                        <nuxt-link to="/login" v-if="!isLogin"
                            >Have an account?</nuxt-link
                        >
                        <nuxt-link to="/register" v-if="isLogin"
                            >Need an account?</nuxt-link
                        >
                    </p>

                    <ul class="error-messages">
                        <template v-for="(message, faild) in errors">
                            <li v-for="(msg, index) in message" :key="index">
                                {{ faild }} {{ msg }}
                            </li>
                        </template>
                    </ul>

                    <form @submit.prevent="onSubmit">
                        <fieldset class="form-group" v-if="!isLogin">
                            <input
                                class="form-control form-control-lg"
                                type="text"
                                placeholder="Your Name"
                                v-model="user.username"
                                required
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                class="form-control form-control-lg"
                                type="email"
                                placeholder="Email"
                                v-model="user.email"
                                required
                            />
                        </fieldset>
                        <fieldset class="form-group">
                            <input
                                class="form-control form-control-lg"
                                type="password"
                                placeholder="Password"
                                minlength="8"
                                v-model="user.password"
                                required
                            />
                        </fieldset>
                        <button class="btn btn-lg btn-primary pull-xs-right">
                            {{ isLogin ? "Sign in" : "Sign up" }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { login, register } from "@/api/user";
// 仅在客户端加载 js-cookie
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name: "LoginIndex",
    computed: {
        isLogin() {
            console.log(this.$route.name);
            return this.$route.name == "login";
        },
    },
    data() {
        return {
            user: {
                username: "",
                email: "",
                password: "",
            },
            errors: {},
        };
    },
    methods: {
        async onSubmit() {
            try {
                const { data } = this.isLogin
                    ? await login({ user: this.user })
                    : await register({ user: this.user });
                this.$router.replace("/");
                this.$store.commit('setUser', data.user)
                // 为了防止页面刷新数据丢失，我们需要把数据持久化
                Cookie.set('user', data.user)
            } catch (error) {
                this.errors = error.response.data.errors;
            }
        },
    },
};
</script>

<style></style>
