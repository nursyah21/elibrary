<script>
import { supabase } from '../supabase'

export default{
  created(){
    document.title = 'Login | elibrary-itts'
  },
  data(){
    return{
      isHidden: true,
      nim: "",
      password: ""
    }
  },
  methods:{
    checkPass(pass, hash){
      return bcrypt.compareSync(pass, hash)
    }
  }
}
</script>
<!-- login -->
<template>
  <div class="sm:bg-pale-gray h-screen flex justify-center items-center flex-col">
    
    <!-- card -->
    <div class="w-full sm:max-w-sm max-w-none  bg-white rounded-lg sm:border sm:shadow-md sm:h-fit">
    <div class="px-6 py-4">
      <div class="flex justify-center items-center flex-col">
        <img src="../assets/logo_itts.png" alt="" class="w-24 mt-5" />
        <a href="/">
          <h2 class="text-3xl font-bold text-center text-gray-700 mt-1 hover:underline">E-library itts</h2>
        </a>
      </div>
      <h3 class="text-center font-medium text-xl text-gray-700 mt-1">Login</h3>

      <form action="">
        <!-- nim -->
        <div class="w-full mt-4">
          <input ref="nim" class="w-full px-4 py-2 border rounded-md" type="text" placeholder="nim" title="input your nim" required>
        </div>
        <!-- password -->
        <div class="w-full mt-4">
          <input ref="password" class="w-full px-4 py-2 border rounded-md" type="password" placeholder="password"  title="input your password" required>
        </div>
        <!-- forget password -->
        <div class="mt-3 sm:flex sm:justify-between px-2">
          <a href="/forget-password" class="text-sm text-gray-600 hover:text-gray-500">forget password?</a>
          
          <!-- login -->
          <button type="submit" class="bg-blood text-white py-1 px-5 rounded-lg text-center w-full sm:w-fit mt-2 sm:mt-0 hover:underline">login</button>
        </div>
      </form>
    </div>

    <!-- create account -->
    <div class="bg-gray-50 p-4 text-center">
      <span class="text-sm text-gray-600">Don't have an account?</span>
      <a href="/register" class="text-blue-500 font-bold text-sm mx-2 hover:underline">Register</a>
    </div>

  </div>

  </div>

  
</template>
