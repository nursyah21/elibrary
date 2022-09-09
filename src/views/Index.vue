<script>
import router from '../router';
import {ProgressiveImage} from 'vue-progressive-image'
import { Footer } from '../components';
export default{
  components:{
    ProgressiveImage,
    Footer
  },
  data(){
    return{
      q:"",
      text: "ilmu peluang dan statistika untuk insinyur dan ilmuwan",
      search: false
    }
  },
  methods:{
    searchs(){
        router.push({query: {q: this.q}})
    },
    menu(){
      console.log('menu')
    }
  }
}
</script>

<!-- login -->
<template>
  <div class="h-screen p-3">
   <!-- navbar -->
   <div class="flex border-b items-center pb-2 bg-white z-10 w-full top-0">
     <!-- logo itts -->
     <div>
      <img @click="menu" src="../assets/menu.svg" alt="" class="w-8 hover:opacity-60">
     </div>
     <!-- search bar -->
     <form @submit.prevent="searchs" class="flex mx-3 border px-2 rounded-lg w-full ">
      <img src="../assets/search.svg" alt="" class="w-6 mr-1 opacity-40">

      <input v-model="q" type="text" class="text-sm w-full outline-none" placeholder="search" name="q"  id="" title="search" autocomplete="off">
      </form>

     <!-- user icon  -->
     <div class="">
      <a href="/dashboard">
        <img src="../assets/account.svg" alt="account" class="w-8 hover:opacity-40" >
      </a>
     </div>
   </div>

    <!-- list books -->
    <div class="grid grid-cols-2 sm:grid-cols-5 mt-1">
      <div v-for="i in 30" class="text-gray-600 max-w-fit text-center m-2 hover:underline hover:opacity-60">
        <div class="xl:w-52">
          <ProgressiveImage src="/41.jpg" alt="" /> 
          <div class="text-left text-sm px-2">
            <a href="/book">{{text}}</a>
          </div>
        </div>
      </div>
    </div>
      
    
    <!-- footer -->
    <Footer />
    
  </div>

  
</template>
