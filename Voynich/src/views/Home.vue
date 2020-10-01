<template>
    <div style="display: flex;">
        <div style="display: flex; width: 100%; flex-direction: column">
            <img src="../assets/logo.png" style="margin: auto;">
            <div class="button-area" style="margin: auto; position: relative; top: -80px;">
                <router-link to="/hosting" style="text-decoration: none; padding: 20px;">
                    <button class="hosting-button" type="submit">
                        <i class="fas fa-video" style="margin-right: 10px"></i>
                        회의 호스팅
                    </button>
                </router-link>

                <router-link to="/participate" style="text-decoration: none; padding: 20px;">
                    <button class="participate-button">
                        <i class="fas fa-user" style="margin-right: 10px;"></i>
                        회의 참가
                    </button>
                </router-link>
            </div >

            <div class="content-area">
                <div style="color: white; font-weight: 400; font-size: 2rem; margin-bottom: 10px;"> 보이니치는 블록체인 기반 화상 회의 플랫폼입니다. </div>
                <div style="color: white; font-weight: 200; font-size: 1.5rem; margin-bottom: 10px;"> 중요한 회의의 보안을 철저히 지켜주는 안전한 회의 플랫폼,</div>
                <div style="color: white; font-weight: 200; font-size: 1.5rem;"> 보이니치를 무제한으로 사용해보세요!</div>
            </div>

            <div class="login-area">
                <a href="/auth/google" style="text-decoration: none; padding: 20px;">
                    <button class="login-button">
                        <i class="fab fa-google-plus-g" style="margin-right: 10px;"></i>
                        Google+ Login
                    </button>
                </a>

<!--                <router-link to="/auth/google" style="text-decoration: none; padding: 20px;">-->
<!--                    <button class="login-button">-->
<!--                        <i class="fab fa-google-plus-g" style="margin-right: 10px;"></i>-->
<!--                        Google+ Login-->
<!--                    </button>-->
<!--                </router-link>-->
<!--                <button class="login-button" @click="login()">-->
<!--                    <i class="fab fa-google-plus-g" style="margin-right: 10px;"></i>-->
<!--                    Google+ Login-->
<!--                </button>-->
            </div>
        </div>
    </div>
</template>

<script>
  import '@fortawesome/fontawesome-free/css/all.css';
  import '@fortawesome/fontawesome-free/js/all.js';
  import {loginUser} from '../api/index';

  export default {
    name: "Home",
    methods:{
      async login(){
        const userData = {
          email: 'yjm950516@gmail.com',
          password: '12345678'
        };

        this.$store.commit('setUser', userData);
        const data =  await loginUser(userData);
        console.log(data);
        this.$store.commit('setToken', data.token);
      }
    },
    computed:{
      isUserLogin(){
        return this.$store.getters.isLogin;
      }
    }
  }
</script>

<style scoped>
    .hosting-button{
        border: none;
        text-align: center;
        outline: none;
        font-weight: 600;
        font-size: 14px;
        /*color: white;*/
        color: white;
        background-color: #B591D5;
        width: 250px;
        height: 50px;
        /*background-color: #B591D5;*/
        border-radius: 5px;
        margin-right: 5px;
        cursor: pointer;
    }

    .participate-button{
        text-align: center;
        border: none;
        outline: none;
        font-weight: bold;
        font-size: 14px;
        color: white;
        width: 250px;
        height: 50px;
        background-color: #8B6CA8;
        border-radius: 5px;
        margin-left: 5px;
        cursor: pointer;
    }

    .content-area{
        flex-direction: column;
        justify-content: center;
        text-align: center;
        display: flex;
        height:250px;
        background-color: #432361;
        position: relative;
        top: -30px;
    }

    .login-area{
        display: flex;
        margin: auto;
        height: 100px;
    }

    .login-button{
        width: 250px;
        background-color: #A365A5;
        margin: auto;
        height: 50px;
        border: none;
        color: white;
        border-radius: 5px;
        outline: none;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
    }


    .login-button:hover{
        color:#8B6CA8 !important;
        background:#fff;
    }

    button{
        color:#fff;
        border:none;
        position:relative;
        height:60px;
        font-size:1.6em;
        padding:0 2em;
        cursor:pointer;
        transition:800ms ease all;
        outline:none;
    }

    button:hover{
        background:#fff;
        color:#8B6CA8 !important;
    }

    button:before,button:after{
        content:'';
        position:absolute;
        top:0;
        right:0;
        height:2px;
        width:0;
        background: #8B6CA8 !important;
        transition:400ms ease all;
    }
    button:after{
        right:inherit;
        top:inherit;
        left:0;
        bottom:0;
    }
    button:hover:before,button:hover:after{
        width:100%;
        transition:800ms ease all;
    }

</style>