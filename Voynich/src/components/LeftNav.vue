<template>
    <div id="sidebar-wrapper">
        <div class="user-title">
            <div style="margin: auto; display: flex;">
                <div class="user-image"></div>
                <div class="user-name"> Jeong Chaewon </div>
            </div>
        </div>
        <div style="display: flex; flex-direction: column; height: 90%;">
            <div class="sidebar-nav">
                <div >
                    <router-link to="/" style="text-decoration: none; color: white;">
                        <div id="nav-home" class="bar-wrapper">
                            <div class="menu-icon home">
                                <i class="fas fa-home icon"></i>
                            </div>
                            홈
                        </div>
                    </router-link>
                </div>
                <div :class="{'active':hostingMenuActive}" @click="loadHostingMenu()">
                    <router-link to="/hosting" style="text-decoration: none; color: white;">
                        <div id="nav-hosting" class="bar-wrapper">
                            <div class="menu-icon hosting">
                                <i class="fas fa-video icon"></i>
                            </div>
                            회의 호스팅
                        </div>
                    </router-link>
                </div>
                <div :class="{'active':participateMenuActive}" @click="loadParticipateMenu()">
                    <router-link to="/participate" style="text-decoration: none; color: white;">
                        <div id="nav-participate" class="bar-wrapper participate">
                            <div class="menu-icon">
                                <i class="fas fa-user icon"></i>
                            </div>
                            회의 참가
                        </div>
                    </router-link>
                </div>
                <hr>
                <div style="height: 40px; margin-top: 10px;">
                    <h6 class="my-room" > 내 회의 리스트 </h6>
                </div>
                <div>
                    <div class="bar-wrapper" :class="{'active': roomsActive[0]}" @click="loadRoomMenu(0)">
                        <router-link to="/conference" style="text-decoration: none; color: black">
                            <div class="room-icon">
                                <i class="fas fa-user-friends" style="margin-right: 20px;"></i>
                                <span style="color: black; font-size: 14px;"> Skkrypto 운영진 </span>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div>
                    <div class="bar-wrapper" :class="{'active': roomsActive[1]}" @click="loadRoomMenu(1)">
                        <router-link to="/conference" style="text-decoration: none; color: black">
                            <div class="room-icon">
                                <i class="fas fa-user-friends" style="margin-right: 20px;"> </i>
                                <span style="color: black; font-size: 14px;"> Skkrypto 개발팀 </span>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div>
                    <div class="bar-wrapper" :class="{'active': roomsActive[2]}" @click="loadRoomMenu(2)">
                        <router-link to="/conference" style="text-decoration: none; color: black">
                            <div class="room-icon">
                                <i class="fas fa-user-friends" style="margin-right: 20px;"></i>
                                <span style="color: black; font-size: 14px;"> Skkrypto 기획팀 </span>
                            </div>
                        </router-link>
                    </div>
                </div>
                <div>
                    <div class="bar-wrapper" :class="{'active': roomsActive[3]}" @click="loadRoomMenu(3)">
                        <router-link to="/conference" style="text-decoration: none; color: black">
                            <div class="room-icon">
                                <i class="fas fa-user-friends" style="margin-right: 20px;"></i>
                                <span style="color: black; font-size: 14px;"> Skkrypto 인사팀 </span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
<!--            <div class="room-title"> 참여하는 방 리스트 </div>-->
        </div>
    </div>
</template>

<script>
  export default {
    name: "LeftNav",
    data(){
      return{
         hostingMenuActive: false,
         participateMenuActive: false,
         roomsActive: [false,false,false,false]
      }
    },
    methods:{
        loadHostingMenu(){
          this.hostingMenuActive = true;
          this.participateMenuActive = false;
          for(let i=0;i<this.roomsActive;i++){
            this.$set(this.roomsActive, index, false);
          }
        },
        loadParticipateMenu(){
          this.hostingMenuActive = false;
          this.participateMenuActive = true;
          for(let i=0;i<this.roomsActive;i++){
            this.$set(this.roomsActive, index, false);
          }
        },
        loadRoomMenu(index){
          this.hostingMenuActive = false;
          this.participateMenuActive = false;
          for(let i=0;i<this.roomsActive;i++){
            this.roomsActive[i] = false;
          }
          this.$set(this.roomsActive, index, true);
        }
    },
    props:['user']
  }
</script>

<style scoped>
    /*#sidebar-wrapper::-webkit-scrollbar{*/
    /*    background-color: #B591D5;*/
    /*    width: 10px;*/
    /*}*/

    .active .fa-user-friends{
        color: #432361;
        margin-right: 20px;
    }

    .active .fa-user{
        color: #432361;
    }

    .active .fa-video{
        color: #432361;
    }

    .active{
        background-color: lightgray;
        border-left: 5px solid #432361;
        width: 100% !important;
    }
    .room-icon{
        width: 100%;
        color: #AAAAAA;
        margin-right: 20px;
    }

    .my-room{
        color: black;
        font-size: 16px;
        margin-left: 1.5rem;
        margin-top: 5px;
        font-weight: 600;
    }

    hr{
        margin-bottom: 0;
        margin-top: 1rem;
        border: 0;
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        width: 90%;
    }

    .icon{
        width: 16px;
        height: 16px;
        display: flex;
        margin: auto;
        color: #AAAAAA
    }

    .menu-icon{
        width: 16px;
        height: 16px;
        margin-right: 20px;
    }

    .bar-wrapper{
        font-size: 0.9rem;
        color: black;
        width: 200px;
        cursor: pointer;
        display: flex;
        align-items: center;
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }

    .bar-wrapper:hover{
        text-decoration: none;
        /*box-shadow: black;*/
        box-shadow: 1px 1px 20px #aaaaaa;
        width: 100%;
    }

    .room-title{
        color: white;
        margin-top: .5rem;
        margin-left: 1rem;
        margin-bottom: .5rem;
        font-family: fantasy;
        font-weight: bold;
        font-size: 0.9rem;
        line-height: 1.2;
    }

    .sidebar-nav div{
        line-height: 40px;
    }

    .sidebar-nav{
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 250px;
        margin: 0;
        padding: 1rem 0 0 0;
        list-style: none;
    }

    .user-image {
        /*background-size: 50px 50px;*/
        border-radius: 50%;
        width: 32px;
        height: 32px;
        color: #8B6CA8;
        background: white url("../assets/voynich.png") center;
        background-size: cover;
    }
    .user-name{
        font-family: fantasy;
        display: flex;
        margin: auto auto auto 20px;
    }

    .user-title{
        display: flex;
        background-color: #432361;
        color: white;
        height: 50px;
    }


    #sidebar-wrapper{
        box-shadow: inset -7px 0 9px -7px rgba(0, 0, 0, 0.4);
        /*background: #A365A5;*/
        background: rgb(239, 239, 239);
        height: 100%;
        width: 250px;
        z-index: 9000;
        position: fixed;
        top: 0;
        left: 250px;
        margin-left: -250px;
        overflow-y: hidden;
        overflow-x: hidden;
        transition: all 0.5s ease;
    }
</style>