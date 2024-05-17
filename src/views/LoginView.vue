<template>
   <div class="flex items-center justify-center py-20">
      <form action="">
         <h1 class="text-5xl font-medium pb-8">Login</h1>
         <div class="flex flex-col pb-6">
            <label for="email" class="pb-2">Email Address</label>
            <input id="email" type="email" placeholder="Email" class="w-[500px] rounded-lg border border-gray-400 outline-blue-500  px-4 py-2">
         </div>
         <div class="flex flex-col">
            <label for="password" class="pb-2">Password</label>
            <input id="password" type="password" placeholder="Password" class="w-[500px] rounded-lg border border-gray-400 outline-blue-500 px-4 py-2"  >
         </div>

         <button class="text-white mt-6 px-6 py-2 rounded-lg bg-sky-500/100 hover:bg-cyan-600">Submit</button>
         <span class="block pt-4" >You don't have an account? <a href="/register" class="text-cyan-700 font-semibold">Register</a></span>
      </form>
   </div>
</template>

<script setup>

</script>