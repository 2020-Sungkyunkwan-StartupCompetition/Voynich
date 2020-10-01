<template>
    <div class="container" v-if="showParticipate">
        <div class="bannger-image">
            <img src="../assets/voynich.png">
        </div>
        <div class="participate-container">
            <div class="url-container">
                <span class="conference-title"> 회의 참가 </span>
            </div>
            <div style="display: flex; margin: auto;">
                <input type="text" class="form-control hint-field mt-3" placeholder="회의에 참여할 URL을 입력해주세요" style="width: 250px;">
            </div>

            <div class="form-group">
                <input id="url" class="form-control form-control-lg" v-model="peerId" type="text" placeholder="example:https://voynich.us/room1" style="height: 50px;">
                <button class="participate-button" @click="getPermission">
                    <div style="margin: auto">
                        회의 참가
                    </div>
                </button>
            </div>
        </div>
    </div>
    <div v-else-if="showJoin">
        <h2 id="room">Video room</h2>
        <p id="displayId"></p>
        <h3 id="placeLocal">localVideo</h3>
        <video autoplay playsinline id="localVideo"></video>
        <h3 id="placeRemote">remoteVideo</h3>
        <video autoplay playsinline id="remoteVideo"></video>
    </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import Peer from 'peerjs';

  export default {
    name: "Participate",
    data() {
        return {
            showParticipate: true,
            showJoin: false,
            peer: null,
            peerId: null,
            localStream: null,
            remoteStream: null,
            constraints: {video: true, audio: false},
            pcConfig: {
                'iceServers': [
                    { 'urls': 'stun:stun.l.google.com:19302' },
                    { 'urls': 'stun:stun.services.mozilla.com' }
                ]
            },
        }
    },
    mounted() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    },
    methods: {
        getPermission() {
            this.peer = new Peer({
                host: 'https://15.165.111.45',
                port: 9000,
                path: '/peerjs/myapp',
                key: 'peerjs'
            })
            console.log(this.peer)
            console.log(this.peerId);
            this.connecting();
            this.localStart();
            this.listenConnecting();
            this.waitingCall();
        },
        showingJoin() {
            this.showParticipate = false;
            this.showJoin = true;
        },
        //////////// webRTC /////////////////
        recStream(stream, elemid) {
            let video = document.getElementById(elemid);

            video.srcObject = stream;
            this.remoteStream = stream;
        },
        getLocalStream(stream) {
            this.localStream = stream;
            this.recStream(stream, 'localVideo');
        },
        handleLocalMediaStreamError(error) {
            console.log('navigator.getUserMedia error: ', error);
        },
        localStart() {
            if (navigator.mediaDevices === undefined) {
                navigator.mediaDevices = {};
            }

            if (navigator.mediaDevices.getUserMedia === undefined) {
                navigator.mediaDevices.getUserMedia = function (constraints) {
                    let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                    if (!getUserMedia) {
                        return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                    }

                    return new Promise((resolve, reject) => {
                        getUserMedia.call(navigator, constraints, resolve, reject);
                    });
                }
            }

            navigator.mediaDevices.getUserMedia(this.constraints)
                .then(this.getLocalStream)
                .catch(this.handleLocalMediaStreamError)
        },
        /////////////// peer js //////////////////////////
        connecting() {
            let conn = this.peer.connect(this.peerId);

            conn.on('open', () => {
                conn.send(this.peer.id);
            })

            conn.on('data', (data) => {
                if (data.perm === 'refuse') {
                    alert('입장 거절당하셨습니다');
                } else if (data.perm === 'allow') {
                    alert('입장합니다');
                    document.getElementById('displayId').innerHTML = data.name;
                } else {
                    alert('connecting error 3');
                }
            })
        },
        listenConnecting() {
            this.peer.on('connection', (connection) => {
                connection.on('data', (data) => {
                    if (data === 'room is ready') {
                        this.showingJoin();
                        navigator.getUserMedia(this.constraints, (stream) => {
                            let call = this.peer.call(connection.peer, stream);
                            call.on('stream', (stream) => {
                                this.remoteStream = stream;
                                this.recStream(this.remoteStream, 'remoteVideo')
                            })
                        })
                    } else {
                        alert('conencting error 1');
                    }
                })

                connection.on('open', () => {
                    connection.send('user is ready');
                })
            })
        },
        waitingCall() {
            this.peer.on('call', (call) => {
                call.answer(this.localStream);
                call.on('stream', (stream) => {
                    this.remoteStream = stream;
                    this.recStream(stream, 'remoteVideo')
                })
            })
        }
    }
  }
</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
    }

    .bannger-image{
        margin: auto;
    }

    .conference-title{
        font-size: 30px;
        font-weight: 900;
    }

    .participate-container{
        display: flex;
        flex-direction: column;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        background: white;
        height: 300px;
        width: 500px;
        border-radius: 15px;
        margin: auto;
    }
    .url-container{
        display: flex;
        margin: auto;
    }

    #url{
        width: 450px;
        margin: auto auto 10px auto;
    }

    .participate-button{
        display: flex;
        margin: auto;
        text-align: center;
        border: none;
        outline: none;
        font-weight: bold;
        font-size: 14px;
        color: white;
        width: 450px;
        height: 50px;
        background-color: #8B6CA8;
        border-radius: 5px;
        cursor: pointer;
    }

    .form-group{
        display: flex;
        margin: auto;
        flex-direction: column;
    }

    .input-field:focus, .hint-field:focus {
        box-shadow: none;
        border-color: #46a0f5;
        color: #3e3a39;
    }

    .hint-field {
        padding-left: 15px;
        font-size: 13px;
        border: none;
        color: #898989;
        background: transparent radial-gradient(circle at 3px, #46a0f5 2px, transparent 3px);
    }


</style>