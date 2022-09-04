<script>
</script>

<template>
  <div class="sm:bg-pale-gray h-screen flex justify-center items-center flex-col">
    
    <!-- card -->
    <div class="w-full sm:max-w-sm max-w-none  bg-white rounded-lg sm:border sm:shadow-md sm:h-fit">
    <div class="px-6 py-4">
      <div class="flex justify-center items-center flex-col">
        <img src="/logo_itts.png" alt="" class="w-24 mt-5" />
        <h2 class="text-3xl font-bold text-center text-gray-700 mt-1">E-library itts</h2>
      </div>
      <h3 class="text-center font-medium text-xl text-gray-700 mt-1">Forget Password</h3>

      <form action="">
        <!-- email -->
        <div class="w-full mt-4">
          <input v-model="email" class="w-full px-4 py-2 border rounded-md" type="text" placeholder="email itts" title="input your email itts" required>
        </div>
        
        <!-- forget password -->
        <div class="mt-3 sm:flex sm:justify-between px-2">
          <p class="text-sm text-gray-600 hover:text-gray-500"></p>
          
          <!-- login -->
          <button type="submit" class="bg-blood text-white py-1 px-5 rounded-lg text-center w-full sm:w-fit mt-2 sm:mt-0 hover:underline">submit</button>
        </div>
      </form>
    </div>

    <!-- create account -->
    <div class="bg-gray-50 p-4 text-center">
      <span class="text-sm text-gray-600">
        you can only submit once / day <br>
        or you can visit library to change password
      </span>
    </div>

  </div>
  </div>
</template>
