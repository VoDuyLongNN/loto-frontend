<template>
   <div class="flex items-center justify-center py-20">
      <form @submit.prevent="register">
         <h1 class="text-5xl font-medium pb-8">Register</h1>
         <div class="flex flex-col pb-6">
            <label for="email" class="pb-2">Email Address</label>
            <input v-model="user.email" id="email" type="email" placeholder="Email" class="w-[500px] rounded-lg border border-gray-400 outline-blue-500  px-4 py-2">
         </div>

         <div class="flex flex-col pb-6">
            <label for="password" class="pb-2">Password</label>
            <input v-model="user.password" id="password" type="password" placeholder="Password" class="w-[500px] rounded-lg border border-gray-400 outline-blue-500 px-4 py-2"  >
         </div>

         <div class="flex flex-col pb-6">
            <label for="password" class="pb-2">Repeat password</label>
            <input v-model="user.repeatPassword" id="repassword" type="password" placeholder="Repeat your password" class="w-[500px] rounded-lg border border-gray-400 outline-blue-500 px-4 py-2"  >
         </div>

         <div class="flex flex-col pb-6">
            <label for="name" class="pb-2">Name</label>
            <input v-model="user.name" id="name" type="text" placeholder="Name" class="w-[500px] rounded-lg border border-gray-400 outline-blue-500  px-4 py-2">
         </div>

         <div class="flex flex-col pb-6">
            <label for="gender" class="pb-2">Gender</label>
            <select v-model="user.gender" name="" id="gender" class="w-[500px] rounded-lg border border-gray-400 outline-blue-500  px-4 py-2 cursor-pointer">
               <option value="Male">Male</option>
               <option value="Female">Female</option>
               <option value="Other">Other</option>
            </select>
         </div>

         <div class="flex flex-col pb-6">
            <label for="phone" class="pb-2">Phone</label>
            <input v-model="user.phone" id="phone" type="text" placeholder="Phone" class="w-[500px] rounded-lg border border-gray-400 outline-blue-500  px-4 py-2">
         </div>

         <span v-if="validate.error === false" class="text-red-500 font-semibold text-sm border-2 border-red-500 block px-4 py-4 bg-red-200">{{ validate.message }}</span>
         <button :disabled="isSubmitting" type="submit" class="text-white mt-6 px-6 py-2 rounded-lg bg-sky-500/100 hover:bg-cyan-600">Register</button>
         <span class="block pt-4" >You already have an account? <a href="/login" class="text-cyan-700 font-semibold">Login</a></span>
      </form>

      
   </div>
</template>

<script>
import axios from 'axios';
import { findApiByName } from '@/assets/js/apiUtil';

export default{
   data() {
      return{
         user: {
            email: '',
            password: '',
            repeatPassword: '',
            name: '',
            gender: '',
            phone: '',
         },
         validate: {
            error: false,
            message: '',
            isSubmitting: false,
         }
      }
   },
   methods: {
      async register() {
         try {
            this.validate.isSubmitting = true;
            if(!this.user.email || !this.user.password || !this.user.name || !this.user.repeatPassword || !this.user.gender || !this.user.phone){
               this.isValidate(false, "Vui lòng nhập đủ thông tin!");
               return;
            }
            else{
               this.isValidate(true, '');
               if(this.user.repeatPassword != this.user.password){
                  this.isValidate(false, "Mật khẩu nhập lại không khớp!");
                  return;
               } else{
                  if(this.user.password.length < 6){
                     this.isValidate(false, "Mật khẩu phải ít nhất 6 kí tự!");
                     return;
                  }
                  const apiObject = findApiByName('auth', 'register').url;
                  await axios.post(apiObject, {
                     email: this.user.email,
                     password: this.user.password,
                     name: this.user.name,
                     gender: this.user.gender,
                     phone: this.user.phone,
                  }).then((res) => {
                     if(res.data.status == "INTERNAL_SERVER_ERROR"){
                        this.isValidate(false, "Email đã tồn tại!");
                     } else {
                        this.$router.push('/login');
                     }
                  })
               }  
            }
            this.validate.isSubmitting = false;
         } catch (error) {
            this.validate.isSubmitting = false;
            console.error('Registration failed!', error);
         }
      },
      isValidate(error, message){
         this.validate.error = error;
         this.validate.message = message;
      }
   },   
}
</script>

