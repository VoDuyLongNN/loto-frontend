<template>
   <div class="flex items-center justify-center py-20">
      <form @submit.prevent="login">
         <h1 class="text-5xl font-medium pb-8">Login</h1>
         <div class="flex flex-col pb-6">
            <label for="email" class="pb-2">Email Address</label>
            <input v-model="user.email" id="email" type="email" placeholder="Email" class="w-[500px] rounded-lg border border-gray-400 outline-blue-500  px-4 py-2">
         </div>
         <div class="flex flex-col pb-6">
            <label for="password" class="pb-2">Password</label>
            <input v-model="user.password" id="password" type="password" placeholder="Password" class="w-[500px] rounded-lg border border-gray-400 outline-blue-500 px-4 py-2"  >
         </div>

         <span v-if="validate.message" class="text-red-500 font-semibold text-sm border-2 border-red-500 block px-4 py-4 bg-red-200">{{ validate.message }}</span>
         <button class="text-white mt-6 px-6 py-2 rounded-lg bg-sky-500/100 hover:bg-cyan-600">Submit</button>
         <span class="block pt-4" >You don't have an account? <a href="/register" class="text-cyan-700 font-semibold">Register</a></span>
      </form>
   </div>
</template>

<script>
import axios from 'axios';
import { findApiByName } from '@/assets/js/apiUtil';
import Cookie from 'js-cookie';

export default{
   data() {
      return {
         user: {
            email: '',
            password: '',
            isLogin: 'true'
         },
         validate: {
            message: '',
         }
      }
   },

   methods: {
      async login(){
         try {
            const apiObject = findApiByName('auth', 'login').url;
            await axios.post(apiObject, {
               email: this.user.email,
               password: this.user.password
            }).then((res) => {
               if(res.data.status == 500){
                  this.validate.message = 'Login failed, Check your email or password again!'; 
               }
               else{
                  this.user.isLogin = true;
                  Cookie.set('auth', res.data.token, this.changeTime(res.data.expirationTime));
                  Cookie.set('UserID', res.data.userID, this.changeTime(res.data.expirationTime))
                  this.$router.push('/');   
               }
            });
         }catch(error){
            this.user.isLogin = false;
            console.error('Login failed', error)
         }
      },
      changeTime(timeString) {
         const dateObject = new Date(timeString);
         dateObject.getTime() / 1000;
      }
   }
}
</script>