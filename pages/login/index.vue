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
                        <nuxt-link to="/register" v-if="!isLogin"
                            >Need an account?</nuxt-link
                        >
                    </p>

                    <ul class="error-messages">
                        <li>That email is already taken</li>
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
import { login } from "@/api/user";
export default {
    name: "LoginIndex",
    computed: {
        isLogin() {
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
        };
    },
    methods: {
        async onSubmit() {
            const { data } = await login({user: this.user});
            console.log(data);
        },
    },
};
</script>

<style></style>
