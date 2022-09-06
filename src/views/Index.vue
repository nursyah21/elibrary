<!-- <script setup>
</script> -->

<script>
import router from '../router';
import {ProgressiveImage} from 'vue-progressive-image'

export default{
  components:{
    ProgressiveImage
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
    }
  }
}
</script>

<!-- login -->
<template>
  <div class="h-screen p-3">
   <!-- navbar -->
   <div class="flex border-b py-2 fixed bg-white z-10 w-full top-0">
     <!-- logo itts -->
     <div>
      <img src="/logo_itts.png" alt="" class="w-16">
     </div>
     <!-- search bar -->
     <form @submit.prevent="searchs" class="flex mx-3 border px-2 rounded-lg w-3/4 sm:w-5/6">
      <img src="/search.svg" alt="" class="w-6 h-6 mr-1 opacity-40">

      <input v-model="q" type="text" class="text-sm w-full outline-none" placeholder="search" name="q"  id="" title="search" autocomplete="off">
       <!-- filter -->
       <button class="">
        <img ref="menu" src="/menu.svg" alt="" class="w-7 hover:opacity-40">
       </button>
      </form>

     <!-- user icon  -->
     <div class="right-3 mr-5 sm:mr-0 sm:fixed">
      <a href="/dashboard">
        <img src="/account.svg" alt="account" class="w-8 fill-red-600  stroke-red-600 hover:opacity-40" >
      </a>
     </div>
   </div>

   <!-- modal list search -->
   <div>

   </div>

    <!-- list books -->
    <div class="grid grid-cols-2 sm:grid-cols-5 mt-10">
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
    <div class="bg-gray-50 p-4 text-center">
      <span class="text-sm text-gray-600">
        Copyright 2022 ittelkom surabaya <br>
        Powered by <a href="https://github.com/nursyah21/elibrary" class="hover:underline">elibrary</a>
      </span>
    </div>
  </div>

  
</template>
