<template>
    <div class="chat-container">
        <div class="chat-output">
            <div class="chat-bubble last">
                <div class="context">
                    <div class="avatar-box">
                        <div class="avatar"></div>
                        <div class="chat-name"> 여정민 </div>
                    </div>

                    <div class="chat-message"> 이거뭐야? </div>
                    <div class="chat-time"> 오후 2시 10분 </div>
                </div>
            </div>

            <div class="chat-bubble me last">
                <div class="context">
                    <div class="avatar-box">
                        <div class="avatar"></div>
                        <div class="chat-name"> 여정민 </div>
                    </div>

                    <div class="chat-message"> 나도몰라 </div>
                    <div class="chat-time"> 오후 2시 10분 </div>
                </div>
            </div>
            <div class="chat-bubble last">
                <div class="context">
                    <div class="avatar-box">
                        <div class="avatar"></div>
                        <div class="chat-name"> 여정민 </div>
                    </div>

                    <div class="chat-message"> 저거는 뭘까? </div>
                    <div class="chat-time"> 오후 2시 10분 </div>
                </div>
            </div>

        </div>
        <form class="chat-input">
            <textarea  required v-model="message"></textarea>
            <i class="fas fa-paper-plane send-button"></i>
        </form>
    </div>
</template>

<script>
  export default {
    name: "ChatBox",
    data(){
      return{
        message: ''
      }
    }
  }
</script>

<style scoped>
    .chat-container{
        width: 300px;
        height: 800px;
        margin-left: 20px;
        background: lightgray;
    }

    .chat-container .chat-output::-webkit-scrollbar{
        display: none;
        -ms-overflow-style: none;
    }

    .chat-output{
        padding: 15px 20px;
        height: calc(100% - 60px);
        overflow-y: scroll;
    }

    .chat-bubble .context {
        margin-top: 5px;
        max-width: 60%;
    }

    .chat-bubble:first-child {
        margin-top: 0;
    }

    .chat-bubble.me {
        display: flex;
        justify-content: flex-end;
    }

    .chat-bubble.me .chat-time{
        width: 90px;
        text-align: center !important;
    }

    .chat-bubble .avatar {
        background: url("../assets/voynich.png") center !important;
        width: 24px;
        height: 24px;
        min-width: 24px;
        min-height: 24px;
        margin-left: 0;
        margin-right: 10px;
        background-size: 24px !important;
        border-radius: 50%;
    }

    .chat-bubble .chat-name {
        font-size: x-small;
        display: inline;
        color: rgba(0, 0, 0, 0.4);
    }

    .chat-bubble .freezing {
        padding: 15px 20px;
        border-radius: 0 10px 10px 10px;
        background: cyan;
        white-space: pre-line;
        word-break: break-word;
        user-select: text;
        color: yellow;
    }

    .chat-bubble .chat-time {
        width: 90px;
        display: none;
        font-size: x-small;
        color: rgba(0, 0, 0, 0.4);
        text-align: center;
    }

    .chat-bubble.continue .avatar {
        opacity: 0;
    }

    .chat-bubble.continue .chat-name {
        display: none;
    }
    .chat-bubble.last .chat-time {
        display: block;
    }

    .chat-bubble.me .chat-message {
        border-radius: 10px 10px 0 10px;
        background: #8B6CA8;
        color: white;
    }

    .chat-bubble .chat-message {
        font-size: 11px;
        padding: 15px 20px;
        border-radius: 0 10px 10px 10px;
        background: rgb(248, 248, 248);
        white-space: pre-line;
        word-break: break-word;
        user-select: text;
        width: 90px;
        max-width: 100px;
    }


    .chat-bubble.me .chat-time {
        text-align: left;
    }

    .chat-bubble.last .chat-time {
        display: block;
    }

    .chat-bubble.continue .avatar {
        opacity: 0;
    }

    .avatar-box{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 5px;
    }

    .chat-input textarea {
        font-size: 18px;
        max-height: 40px;
        width: 300px;
        height: 40px;
        outline: none;
        background-color: white;
    }

    .chat-input {
        margin-top: 20px;
        padding: 10px 0 !important;
    }
    .chat-input > * {
        float: left;
    }

    .chat-input img {
        padding: 4px 0;
    }

    .chat-input textarea:focus, input:focus{
        font-size: 11px;
    }

    .send-button{
        width: 20px;
        height: 20px;
        position: relative;
        left: 270px;
        top: -30px;
        color: blueviolet;
    }
</style>