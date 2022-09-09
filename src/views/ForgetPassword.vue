<script>
import mailjet from '../mailjet';

export default{
  mounted(){
    this.sendmail()
    mailjet()
  },
  data(){
    return{
      isvalid:true
    }
  },
  methods:{
    async sendmail(e){

      // try{
      //   await axios.post('https://api.mailjet.com/v3/send',{
      //     withCredentials: false,
          
      //     auth:{
      //       'username': import.meta.env.MAILJET_PUBLIC,
      //       'password': import.meta.env.MAILJET_PRIVATE
      //     },
      //     data:{
      //       "FromEmail":"nursyahjaya@outlook.com",
      //         "FromName":"Elibrary itts",
      //         "Recipients":[
      //           {
      //             "Email":"nurysahjaya@gmail.com",
      //             "Name":"user"
      //           }
      //         ],
      //         "Subject":"Reset password elibrary!",
      //         "Html-part":"<h3>Elibrary</h3><br />please click link below to reset password:<br/><a>link</a>"
      //     }
      //   })
      //   console.log('success')
      // }catch(e){
      //   console.log(e)
      // }
      
    }
  }
}
</script>

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
      <h3 class="text-center font-medium text-xl text-gray-700 mt-1">Forget Password</h3>

      <form  @submit.prevent="sendmail">
        <!-- email -->
        <div class="w-full mt-4">
          <input v-model="email" class="w-full px-4 py-2 border rounded-md" type="email" placeholder="email itts" title="input your email itts" required>
          <span class="text-sm text-blood opacity-70 px-3" :class="{hidden: isvalid}">use email ittelkom-sby</span>
        </div>
        
        <!-- forget password -->
        <div class="mt-3">
          
          <button type="submit" class="bg-blood text-white py-1 px-5 rounded-lg text-center w-full mt-2 sm:mt-0 hover:underline">submit</button>
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
