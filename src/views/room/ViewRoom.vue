<template>
   <div>
      <h1>Room ID: {{ roomId }}</h1>
      <p>Welcome to the room!</p>
      <p>Number of users in this room: {{ userCount }}</p>
    </div>
</template>

<script>
   import { findApiByName } from '@/assets/js/apiUtil';
   import axiosInstance from '../../assets/js/axios';
   export default {
   data() {
      return {
         roomId: this.$route.params.roomID,
         userCount: ''
      };
   },
   methods: {
      async fetchUserCount() {
         const apiObject = findApiByName('rooms', 'count').url.replace(':roomID', this.roomId);
         try {
            const response = await axiosInstance.post(apiObject);
            this.userCount = response.data;
         } catch (error) {
            console.error('Error fetching user count:', error);
         }
      }
   },
   mounted() {
         this.fetchUserCount();
      }
   };
</script>