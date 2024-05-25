<template>
   <div>
      <h2>Join Room</h2>
      <input v-model="roomID" placeholder="Enter Room ID" />
      <button @click="joinRoom">Join Room</button>
      <p v-if="room && room.roomFoundStatus == 0"> {{ room.message }}</p>
      <div v-if="room && room.roomFoundStatus != 0">
         <h3>Room ID: {{ room.room.roomID }}</h3>
         <p>Number of Users: {{ room.room.countUser }}</p>
      </div>
   </div>
</template>

<script>
   import SockJS from 'sockjs-client';
   import Stomp from 'stompjs';
   import Cookies from 'js-cookie';
   import { findApiByName } from '@/assets/js/apiUtil';
   import axiosInstance from '../../assets/js/axios';

   export default {
      data (){
         return {
            roomID: '',
            room: '',
            stompClient: ''
         };
      },
      methods: {
         async joinRoom() {
            const userID = Cookies.get("UserID");
            const apiObject = findApiByName('rooms', 'join').url;
            try{
               await axiosInstance.post(apiObject, null, {
                  params: {
                     userID: userID,
                     roomID: this.roomID,
                  }
               }).then(res => {this.room = res.data})
               console.log(this.room)
               // this.stompClient.send('/app/joinRoom', {}, JSON.stringify(this.room));
            } catch (err){console.error('Error joining room:', err);}
         },
         // connectWebSocket() {
         //    const socket = new SockJS('http://localhost:8080/ws');
         //    this.stompClient = Stomp.over(socket);
         //    this.stompClient.connect({}, frame => {
         //       console.log('Connected: ' + frame);
         //       this.stompClient.subscribe('/topic/room', message => {
         //          const updatedRoom = JSON.parse(message.body);
         //          if (updatedRoom.roomID === this.room.roomID) {
         //             this.room = updatedRoom;
         //          }
         //       });
         //    });
         // },
         // created() {
         //    this.connectWebSocket();
         // },
      }
   }
</script>
