<template>
   <div  class="flex items-center justify-center py-20">
      <h1 class="px-4 text-xl font-medium">Create Room:</h1>
      <button @click="createRoom" class="text-white px-6 py-2 rounded-lg bg-sky-500/100 hover:bg-cyan-600">Create Room</button>
   </div>
</template>

<script>
   import axios from 'axios';
   import { findApiByName } from '@/assets/js/apiUtil';
   import axiosInstance from '../../assets/js/axios';
   import Cookies from 'js-cookie';

   export default{
      data(){
         return {roomId: ''}
      },
      methods: {
         async createRoom(){
            try{
               const userID = Cookies.get("UserID");
               const apiObject = findApiByName('rooms', 'create').url.replace(':userID', userID);
               await axiosInstance.post(apiObject).then(res => {
                  this.roomId = res.data.roomID;
                  this.$router.push(`/room/view/${this.roomId}`);
               })
            } catch(err){console.error('Create failed', err)}
         }
      }
   }


</script>