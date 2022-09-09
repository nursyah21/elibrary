<script>
import { supabase } from "../supabase"
import bcrypt from 'bcryptjs'
import { Loading,Utils } from "../components"

export default{
  components:{
    Loading,
    Utils
  },
  data(){
    return{
      isLoading: false,
      form:{
        nim: "",
        email:"",
        password:"",
        confirmPassword:"",
      },
      formWrong:{
        nim: false,
        email: false,
        password: false,
        confirmPassword: false,
        alreadyNim:"",
        alreadyEmail:""
      }
    }
  },
  mounted(){
    document.title = 'Register | elibrary-itts'
    this.test()
  },
  methods:{
    async test(){
      var {data} = await supabase.from('users').select("*").match({'nim': '1201202040'})
      if(data.length === 1){
        console.log('test data',data[0].nim)
      }

      var {data} = await supabase.from('users').select("*").match({'email': '1201202040'})
      
      if(data.length === 1){
        console.log('test email',data[0].email)
      }
      
    },
    async register(e){
      e.preventDefault();
      
      this.formWrong.nim = (!Utils.methods.checkNim(this.form.nim)) ? true : false
      this.formWrong.email = (!Utils.methods.checkEmail(this.form.email)) ? true : false
      this.formWrong.password = (!(this.form.password.length >= 8)) ? true : false
      this.formWrong.confirmPassword = (!(this.form.password == this.form.confirmPassword)) ? true : false
      
      if(this.formWrong.nim || this.formWrong.email || this.formWrong.password || this.formWrong.confirmPassword) return
      
      const hash = Utils.methods.encryptPass(this.form.password)

      this.activeModal(false)

      const data_user = {
        nim: this.form.nim,
        email: this.form.email.trim(),
        passwords: hash,
        created_at: new Date().toLocaleDateString(),
        visited_library: 0
      }
      
      // var nim = async function(){
      //   return data
      // }
      const {data} = await supabase.from('users').select("*").match({'nim': this.form.nim})

      console.log('test', data)
      return
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
        <img src="../assets/logo_itts.png" alt="" class="w-24 mt-5" />
        <a href="/">
          <h2 class="text-3xl font-bold text-center text-gray-700 mt-1 hover:underline">E-library itts</h2>
        </a>
      </div>
      <h3 class="text-center font-medium text-xl text-gray-700 mt-1">Register</h3>

      <form @submit.prevent="register">

        <!-- nim -->
        <div class="w-full mt-4">
          <input v-model="form.nim" class="w-full px-4 py-2 border rounded-md" type="text" placeholder="nim" title="input your nim">
          <p class="text-sm text-blood px-2 mt-1" :class="{hidden: !formWrong.nim}">nim length: 10 <br>nim only contain number</p>
          <p class="text-sm text-blood px-2 mt-1">{{formWrong.alreadyNim}}</p>
        </div>

        <!-- email -->
        <div class="w-full mt-4">
          <input v-model="form.email" class="w-full px-4 py-2 border rounded-md" type="email" placeholder="email itts" title="input your email itts">
          <p class="text-sm text-blood px-2 mt-1" :class="{hidden: !formWrong.email}">use email ittelkom-sby</p>
          <p class="text-sm text-blood px-2 mt-1">{{formWrong.alreadyEmail}}</p>
        </div>
        
        <!-- password -->
        <div class="w-full mt-4">
          <input v-model="form.password" class="w-full px-4 py-2 border rounded-md" type="password" placeholder="password"  title="input your password">
          <p class="text-sm text-blood px-2 mt-1" :class="{hidden: !formWrong.password}">min password length: 8</p>
        </div>

        <!-- confirm-password -->
        <div class="w-full mt-4">
          <input v-model="form.confirmPassword" class="w-full px-4 py-2 border rounded-md" type="password" placeholder="confirm password"  title="confirm your password">
          <p class="text-sm text-blood px-2 mt-1" :class="{hidden: !formWrong.confirmPassword}">confirm password not same</p>
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


  <!-- loading -->
  <Loading :class="{hidden: !isLoading}" />

  </div>

  
</template>
  