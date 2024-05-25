<template>
   <div class="flex items-center justify-between px-8 bg-gray-100	h-16 fixed top-0 left-0 right-0">
      <ul class="flex">
         <li ><a href="/" class="pl-0 px-6 text-base hover:text-sky-400/100">Home</a></li>
         <li ><a href="/create-room" class="px-6 text-base hover:text-sky-400/100">Create Room</a></li>
         <li ><a href="/room/join" class="px-6 text-base hover:text-sky-400/100">Join Room</a></li>
      </ul>

      <div class="relative flex items-center" ref="dropdownContainer">
         <div class="h-12 w-12 rounded-full truncate">
            <img src="../assets/img/non-avt.jpg" alt="" class="w-full h-full object-cover cursor-pointer" @click="toggleDropdown">
         </div>

         <div v-if="dropdownVisible" class="absolute right-0 top-0 mt-14 w-48 bg-white border rounded shadow-lg">
            <ul class="py-1">
               <div class="flex items-center pl-4 hover:bg-gray-100" @click="goToProfile">
                  <i class="fa-solid fa-user"></i><li @click="goToProfile" class="block px-4 py-2 text-gray-800 cursor-pointer">Profile</li>
               </div>
              <div class="flex items-center pl-4 hover:bg-gray-100" @click="goToProfile">
                  <i class="fa-solid fa-gear"></i><li class="block px-4 py-2 text-gray-800 cursor-pointer">Setting</li>
              </div>
              <div class="flex items-center pl-4 hover:bg-gray-100" @click="logOut">
                  <i class="fa-solid fa-right-from-bracket"></i><li class="block px-4 py-2 text-gray-800 cursor-pointer">Logout</li>
              </div>
            </ul>
         </div>
      </div>
   </div>
</template>

<script setup>
   import { ref, onMounted, onBeforeUnmount  } from 'vue';
   import { useRouter } from 'vue-router';
   import Cookies from 'js-cookie';

   const dropdownVisible = ref(false);
   const dropdownContainer = ref(null);
   const router = useRouter();

   const toggleDropdown = () => {
      dropdownVisible.value = !dropdownVisible.value;
   };

   const logOut = () => {
      dropdownVisible.value = false;
      Cookies.remove('auth');
      Cookies.remove('UserID');
      router.push('/login');
   };

   const handleClickOutside = (event) => {
      if (dropdownContainer.value && !dropdownContainer.value.contains(event.target)) {
         dropdownVisible.value = false;
      }
   };

   onMounted(() => {
      document.addEventListener('click', handleClickOutside);
   });

   onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside);
   });
</script>