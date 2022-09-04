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
      confirmPassword:"",
      status:"loading",
      isLoading: true,
      nimWrong: false,
      emailWrong: false,
      passwordWrong: false,
      confirmWrong: false,
    }
  },
  setup(){
    document.title = 'Register | elibrary-itts'
  },
  methods:{
    async register(e){
      e.preventDefault();
      
      this.nimWrong = (!this.checkNim(this.nim)) ? true : false
      this.emailWrong = (!this.checkEmail(this.email)) ? true : false
      this.passwordWrong = (!(this.password.length >= 8)) ? true : false
      this.confirmWrong = (!(this.password == this.confirmPassword)) ? true : false
      
      if(this.nimWrong || this.emailWrong || this.passwordWrong || this.confirmWrong) return
      
      const hash = this.encryptPass(this.password)

      this.activeModal(false)

      const data_user = {
        nim: this.nim,
        email: this.email.trim(),
        passwords: hash,
        created_at: new Date().toLocaleDateString(),
        visited_library: 0
      }
      
      const {data} = await supabase.from('users').select("*").eq('nim', this.nim)
      
      try{
        if(this.nim === data[0].nim){
          this.isLoading = false
          this.status = "already registered"
        }
      }catch(e){
        this.insertUser(data_user)
      }
      
    },
    async insertUser(data){
      const {status} = await supabase.from('users').insert(data)
      
      this.isLoading = false
      
      if(status === 201)this.status = "success"
      
    }
    ,
    activeModal(reload){
      this.isHidden = !this.isHidden
      
      if(this.status == "success") location.href = "/login"
      else if(reload)location.reload()
    }
    ,
    checkNim(nim){
      if(nim.length != 10)return false
      return /^\d+$/.test(nim)
    },
    checkEmail(email){
      return /.*@(student.*.)?ittelkom-sby.ac.id$/.test(email.trim())
    },
    encryptPass(pass){
      return bcrypt.hashSync(pass, bcrypt.genSaltSync(10))
    }
  }
}
</script>
  
  <!-- register -->
<template>
  <div class="sm:bg-pale-gray h-screen flex justify-center items-center flex-col">
    
    <!-- card -->
  <div class="w-full sm:max-w-sm max-w-none  bg-white rounded-lg sm:border sm:shadow-md sm:h-fit">
    <div class="px-6 py-4">
      <div class="flex justify-center items-center flex-col">
        <img src="/logo_itts.png" alt="" class="w-24 mt-5" />
        <h2 class="text-3xl font-bold text-center text-gray-700 mt-1">E-library itts</h2>
      </div>
      <h3 class="text-center font-medium text-xl text-gray-700 mt-1">Register</h3>

      <form @submit="register">

        <!-- nim -->
        <div class="w-full mt-4">
          <input v-model="nim" class="w-full px-4 py-2 border rounded-md" type="text" placeholder="nim" title="input your nim">
          <p class="text-sm text-blood px-2 mt-1" :class="{hidden: !nimWrong}">
            nim length: 10 <br>
            nim only contain number
          </p>
        </div>

        <!-- email -->
        <div class="w-full mt-4">
          <input v-model="email" class="w-full px-4 py-2 border rounded-md" type="email" placeholder="email itts" title="input your email itts">
          <p class="text-sm text-blood px-2 mt-1" :class="{hidden: !emailWrong}">use email ittelkom-sby</p>
        </div>
        
        <!-- password -->
        <div class="w-full mt-4">
          <input v-model="password" class="w-full px-4 py-2 border rounded-md" type="password" placeholder="password"  title="input your password">
          <p class="text-sm text-blood px-2 mt-1" :class="{hidden: !passwordWrong}">min password length: 8</p>
        </div>

        <!-- confirm-password -->
        <div class="w-full mt-4">
          <input v-model="confirmPassword" class="w-full px-4 py-2 border rounded-md" type="password" placeholder="confirm password"  title="confirm your password">
          <p class="text-sm text-blood px-2 mt-1" :class="{hidden: !confirmWrong}">confirm password not same</p>
        </div>

        <!-- submit -->
        <div class="mt-3 sm:flex sm:justify-between px-2">
          <button type="submit" class="bg-blood text-white py-1 px-5 rounded-lg text-center w-full sm:w-fit mt-2 sm:mt-0 hover:underline">submit</button>
        </div>
      </form>
    </div>

    <!-- create account -->
    <div class="bg-gray-50 p-4 text-center">
      <span class="text-sm text-gray-600">Already have an account?</span>
      <a href="/login" class="text-blue-500 font-bold text-sm mx-2 hover:underline">Login</a>
    </div>

  </div>


  <!-- modal -->
  <div ref="logout" class="w-screen h-screen fixed top-0" :class="{hidden: isHidden}">
    <div class="flex justify-center items-center h-screen flex-col">
      <div class="fixed bg-white z-0 w-screen h-screen opacity-80"></div>
  
      <div class="z-10 text-center text-blood text-sm">
        <img src="/loading-red-1.svg" alt="" class="w-20 mb-2" :class="{hidden: !isLoading}">
        <div :class="{hidden: !isLoading}">{{status}}</div>

        <div class="w-full flex justify-center">
          <button @click="activeModal(true)" class="bg-blood mt-2 text-white p-2 border-none rounded-lg px-3 hover:underline" :class="{hidden: isLoading}">{{status}}</button>
        </div>
      </div>
      
      
    </div>
  </div>

  </div>

  
</template>
  