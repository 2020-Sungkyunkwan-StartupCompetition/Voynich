<template>
    <div class="container">
        <div class="bannger-image">
            <img src="../assets/voynich.png">
        </div>
        <div class="url-container">
            <span class="conference-title"> Skkrypto 개발팀 회의</span>
            <input type="text" class="url-text" v-model="message">
            <button class="copy-button" type="button"
               v-clipboard:copy="message"
               v-clipboard:success="onCopy"
               v-clipboard:error="onError">
                <i class="fas fa-copy" style="width: 24px; height: 24px; color: #8B6CA8"></i>
            </button>
        </div>

        <div class="conference-container">
            <div class="video-container">
                <div class="sub-videos">
                    <div class="sub-video"></div>
                    <div class="sub-video2"></div>
                    <div class="sub-video3"></div>
                    <div class="sub-video4"></div>
                </div>
                <div class="main-video">
                    <div class="toggle-box">
                        <div class="mic-option">
                            <i class="fas fa-microphone" style="width: 32px; height: 32px; color: #432361"></i>
                            <div class="text"> 마이크 </div>
                        </div>
                        <div class="camera-option">
                            <i class="fas fa-video" style="width: 32px; height: 32px; color: #432361"></i>
                            <div class="text"> 캠설정</div>
                        </div>
                        <div class="share-option">
                            <i class="far fa-square" style="width: 32px; height: 32px; color: #432361"></i>
                            <div class="text"> 화면 공유 </div>
                        </div>
                    </div>
                </div>
            </div>
            <chat-box></chat-box>
        </div>
    </div>
</template>

<script>
  import 'expose-loader?$!expose-loader?jQuery!jquery'
  import '@fortawesome/fontawesome-free/css/all.css';
  import '@fortawesome/fontawesome-free/js/all.js';
  import ChatBox from "../components/ChatBox";

  export default {
    name: "Conference",
    data(){
      return{
        message: 'Copy These Text22'
      }
    },
    components:{
      ChatBox
    },
    methods:{
      onCopy(e) {
        alert('You just copied: ' + e.text);
      },
      onError(e) {
        alert('Failed to copy texts');
      }
    }
  }
</script>

<style scoped>
    .conference-title{
        font-size: 30px;
        font-weight: 900;
    }

    .copy-button{
        border: none;
        background: white;
    }

    .url-text{
        display: none;
    }

    .url-container{
        margin: auto;
    }

    .container{
        display: flex;
        flex-direction: column;
    }
    .bannger-image{
        margin: auto;
    }

    .video-container{
       display: flex;
       flex-direction: column;
    }
    .main-video{
        width: 100%;
        background: url("../assets/conference.png") center;
        background-size: cover;
        max-width: 800px;
        display: flex;
        height: 600px;
        margin: auto;
    }

    .sub-videos{
        display: flex;
        flex-direction: row;
        margin: auto;
        /*background-color: rgb(239, 239, 239);*/
        width: 800px;
        height: 200px;
    }

    .sub-video2{
        background: url("../assets/people5.jpg") center;
        background-size: cover;
        margin: auto;
        width: 180px;
        height: 180px;
    }

    .sub-video{
        background: url("../assets/people6.jpg") center ;
        background-size: cover;
        /*background-color: #8B6CA8;*/
        margin: auto;
        width: 180px;
        height: 180px;
    }

    .sub-video3{
        background: url("../assets/people7.jpg") center ;
        background-size: cover;
        /*background-color: #8B6CA8;*/
        margin: auto;
        width: 180px;
        height: 180px;
    }
    .sub-video4{
        background: url("../assets/people9.jpg") center ;
        background-size: cover;
        /*background-color: #8B6CA8;*/
        margin: auto;
        width: 180px;
        height: 180px;
    }

    .conference-container{
        display: flex;
        margin: auto;
        width: 900px;
    }

    .mic-option {
        display: flex;
        width: 48px;
        height: 52px;
        margin: auto 20px;
        flex-direction: column;
        align-items: center;
    }

    .text{
        margin: auto;
        font-size: 10px;
        white-space: nowrap;
        text-align: center;
    }

    .camera-option{
        width: 48px;
        height: 52px;
        margin: auto 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .share-option{
        width: 48px;
        height: 52px;
        margin: auto 20px;
        flex-direction: column;
        align-items: center;
        display: flex;
    }

    .toggle-box{
        display: flex;
        align-items: flex-end;
        justify-content: center;
        width: 100%;
        margin-top: auto;
        height: 60px;
        background-color: lightgray;
    }

</style>