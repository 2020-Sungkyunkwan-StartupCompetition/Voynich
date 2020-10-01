<template id="ask">
    <div class="container" v-if="showHosting">
        <div class="bannger-image">
            <img src="../assets/voynich.png">
        </div>
        <form style="width: 900px; margin: auto;s">
            <div class="col-12 form-group">
                <input type="text" class="form-control hint-field" value="필수 항목 표시입니다." disabled>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6" style="display: flex; flex-direction: column-reverse">
                    <input required type="text" class="form-control input-field" id="inputEmail4" placeholder="회의 방 이름을 입력해주세요.">
                    <label for="inputEmail4">회의 방 이름</label>
                </div>
                <div class="form-group col-md-6">
                    <label> 호스트 이름</label>
                    <input class="form-control" id="disabledInput" type="text" placeholder="Jeong Chaewon" style="background: lightgray; opacity: 0.9;" disabled>
                </div>
            </div>
            <div class="form-group" style="display: flex; flex-direction: column-reverse">
                <input type="text" class="form-control input-field" id="inputAddress" placeholder="1234 Main Street">
                <label for="inputAddress">Address</label>
            </div>
            <div class="form-group" style="display: flex; flex-direction: column-reverse">
                <textarea class="form-control input-field" id="exampleFormControlTextarea1" rows="3" placeholder="회의 목적을 입력해주새요."></textarea>
                <label for="exampleFormControlTextarea1">Description</label>
            </div>
            <div class="form-group" style="display: flex; flex-direction: column-reverse">
                <div class="input-group">
                    <div class="input-group-prepend">
                        <div class="input-group-text">+</div>
                    </div>
                    <input required type="text" class="form-control input-field" id="inlineFormInputGroupUsername" placeholder="회의에 초대받을 사람 ID를 입력해주세요.">
                </div>
                <label for="inlineFormInputGroupUsername"> Invitation </label>
            </div>
            <div class="form-row">
                <div class="form-group col-md-6">
                    <label for="inputCity">City</label>
                    <input type="text" class="form-control" id="inputCity">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputState">State</label>
                    <select id="inputState" class="form-control">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                </div>
                <div class="form-group col-md-2">
                    <label for="inputZip">Zip</label>
                    <input type="text" class="form-control" id="inputZip">
                </div>
            </div>
            <div class="form-group">
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck">
                    <label class="form-check-label" for="gridCheck">
                        Check me out
                    </label>
                </div>
            </div>
            <div style="margin-left: auto; display: flex;">
                <button class="cancel-button" type="reset" style="margin-left: auto;">
                    취소
                </button>
                <button class="hosting-button" type="submit" @click="showingRoom">
                    제출
                </button>
            </div>
        </form>
        <form>
            <div class="row">
                <div class="card">
                    <div class="row">
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div v-else-if="showRoom">
        <h2 id="room">Video room</h2>
        <p id="displayId"></p>
        <h3 id="placeRemote">remoteVideo</h3>
        <video autoplay playsinline id="remoteVideo"></video>
        <h3 id="placeLocal">localVideo</h3>
        <video autoplay playsinline id="localVideo"></video>
    </div>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.min.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
  import Peer from 'peerjs';

  export default {
    name: "Hosting",
    data(){
      return{
          showHosting: true,
          showRoom: false,
          peer: null,
          conn: null,
          userId: null,
          localStream: null,
          remoteStream: null,
          constraints: {video: true, audio: false},
          pcConfig: {
              'iceServers': [
                  { 'urls': 'stun:stun.l.google.com:19302' },
                  { 'urls': 'stun:stun.services.mozilla.com' }
              ]
          },
          room: null
      }
    },
    mounted() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    },
    methods: {
        showingRoom() {
            this.room = document.getElementById('inputEmail4').value;
            console.log(this.room);
            this.peer = new Peer('skkrypto', {
                host: 'https://15.165.111.45',
                port: 9000,
                path: '/peerjs/myapp'
            });
            this.showHosting = false;
            this.showRoom = true;
            this.localStart();
            this.showId();
            this.listenConnecting();
            this.waitingCall();
            console.log(this.peer);
        },
        //////////// webRTC //////////////
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
        //////////// peer js ///////////////////////
        showId() {
          this.peer.on('open', () => {
              document.getElementById("displayId").innerHTML = this.peer.id;
              console.log('peer open')
          })
        },
        connecting() {
            let peerId = this.userId;
            this.conn = this.peer.connect(peerId);

            this.conn.on('open', () => {
                this.conn.send('room is ready');
            })

            this.conn.on('data', (data) => {
                if (data === "user is ready") {
                    navigator.getUserMedia(this.constraints, (stream) => {
                        let call = this.peer.call(peerId, stream);
                        call.on('stream', (stream) => {
                            this.remoteStream = stream;
                            this.recStream(this.remoteStream, 'remoteVideo')
                        })
                    })
                } else {
                    alert('connecting error 2');
                }
            })
        },
        listenConnecting() {
            this.peer.on('connection', (connection) => {

                connection.on('data', (data) => {
                    let join = confirm(data + ' 참여하길 원합니다');
                    this.userId = data;
                    if (join === true) {
                        this.connecting();
                        connection.send({perm: 'allow', name: this.room})
                    } else {
                        alert('거절하셨습니다.')
                        connection.send({perm: 'refuse', name: this.room})
                    }
                })

                connection.on('open', () => {
                    console.log('connection success 1');
                });
            });
        },
        waitingCall() {
            this.peer.on('call', (call) => {
                call.answer(this.localStream);
                call.on('stream', (stream) => {
                    this.remoteStream = stream;
                    this.recStream(stream, 'remoteVideo');
                })
            })
        }
    }
  }

</script>

<style scoped>

    .cancel-button{
        border: none;
        text-align: center;
        outline: none;
        font-weight: 600;
        font-size: 14px;
        /*color: white;*/
        color: white;
        background-color: lightgray;
        width: 150px;
        height: 50px;
        /*background-color: #B591D5;*/
        border-radius: 5px;
        margin-right: 5px;
        cursor: pointer;
    }
    .hosting-button{
        border: none;
        text-align: center;
        outline: none;
        font-weight: 600;
        font-size: 14px;
        /*color: white;*/
        color: white;
        background-color: #B591D5;
        width: 150px;
        height: 50px;
        /*background-color: #B591D5;*/
        border-radius: 5px;
        margin-right: 5px;
        cursor: pointer;
    }

    .container{
        display: flex;
        flex-direction: column;
    }

    .bannger-image{
        margin: auto;
    }

    .row{
        margin-right: -0.75rem;
        margin-left: -0.75rem;
        display: flex;
        flex-wrap: wrap;
    }

    .card {
        border-radius: 11px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        overflow: hidden;
        padding: 15px 30px;
        border: none;
        margin-bottom: 1.5rem;
    }

    .hint-field {
        padding-left: 15px;
        font-size: 13px;
        border: none;
        color: #898989;
        background: transparent radial-gradient(circle at 3px, #46a0f5 2px, transparent 3px);
    }

    .input-field:focus, .hint-field:focus {
        box-shadow: none;
        border-color: #46a0f5;
        color: #3e3a39;
    }

    .input-field {
        font-size: 15px;
    }

    .input-field:not(:disabled):required {
        padding-right: 25px;
        background: radial-gradient(circle at calc(100% - 15px), #46a0f5 2px, transparent 3px);
    }

    .input-field:focus, .hint-field:focus {
        box-shadow: none;
        border-color: #46a0f5;
        color: #3e3a39;
    }

    .input-field:focus + label {
        color: #46a0f5;
    }



</style>