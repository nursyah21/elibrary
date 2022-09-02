<script>
import { supabase } from "../supabase"
import bcrypt from 'bcryptjs'

export default{
  data(){
    return{
      isHidden: true,
      nim: "",
      email:"",
      password:"",
      confirmPassword:""
    }
  },
  setup(){
    document.title = 'Register | elibrary-itts'
  },
  methods:{
    register(e){
      e.preventDefault();
      
      const hash = this.encryptPass(this.password)
      
      const check = this.checkPass(this.confirmPassword, hash)
      console.log(`${this.password} ${this.confirmPassword} ${check} ${hash}`)

      //this.isHidden = false
    },
    encryptPass(pass){
      const salt = bcrypt.genSaltSync(10)
      return bcrypt.hashSync(pass, salt)
    },
    checkPass(pass, hash){
      return bcrypt.compareSync(pass, hash)
    }
  }
}
</script>
  
  <!-- register -->
<template>
  <div class="bg-pale-gray h-screen flex sm:justify-center items-center flex-col">
    
    <!-- card -->
  <div class="w-full max-w-sm  bg-white rounded-lg border shadow-md sm:h-fit">
    <div class="px-6 py-4">
      <h2 class="text-3xl font-bold text-center text-blood">E-library itts</h2>
      <h3 class="text-center font-medium text-xl text-blood mt-1">Register</h3>

      <form @submit="register">

        <!-- nim -->
        <div class="w-full mt-4">
          <input v-model="nim" class="w-full px-4 py-2 border rounded-md" type="text" placeholder="nim" title="input your nim">
        </div>

        <!-- email -->
        <div class="w-full mt-4">
          <input v-model="email" class="w-full px-4 py-2 border rounded-md" type="email" placeholder="email" title="input your email">
        </div>
        
        <!-- password -->
        <div class="w-full mt-4">
          <input v-model="password" class="w-full px-4 py-2 border rounded-md" type="password" placeholder="password"  title="input your password">
        </div>

        <!-- confirm-password -->
        <div class="w-full mt-4">
          <input v-model="confirmPassword" class="w-full px-4 py-2 border rounded-md" type="password" placeholder="confirm password"  title="confirm your password">
        </div>

        <!-- submit -->
        <div class="mt-3 sm:flex sm:justify-between px-2">
          <button type="submit" class="bg-blood text-white py-1 px-5 rounded-lg text-center w-full sm:w-fit mt-2 sm:mt-0">submit</button>
        </div>
      </form>
    </div>

    <!-- create account -->
    <div class="bg-gray-50 p-4 text-center">
      <span class="text-sm text-gray-600">Already have an account?</span>
      <a href="/login" class="text-blue-500 font-bold text-sm mx-2 hover:underline">Login</a>
    </div>

  </div>

  <!-- logo itts -->
  <div class="mt-1">
    <img src="/logo_itts.png" alt="" class="w-24 mt-5">
  </div>

  <!-- modal -->
  <div ref="logout" class="w-screen h-screen fixed top-0" :class="{hidden: isHidden}">
    <div class="flex justify-center items-center h-screen flex-col">
      <div class="fixed bg-white z-0 w-screen h-screen opacity-80"></div>
  
      <div class="z-10 text-center text-blood text-sm">
        <img src="/loading-red-1.svg" alt="" class="w-20 mb-2">
        loading
      </div>
      
      
    </div>
  </div>

  </div>

  
</template>
  