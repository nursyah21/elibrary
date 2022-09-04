<script>
import router from '../router';
export default{
  mounted(){
    this.$refs.menu.src = '/menu.svg'
  },
  data(){
    return{
      q:""
    }
  },
  methods:{
    search(e){
      e.preventDefault();
      if(this.q == ''){
        router.replace({path:'/'})
      }else{
        router.replace({query: {q: this.q}})
      }
    }
  }
}
</script>

<!-- login -->
<template>
  <div class="h-screen p-3">
   <!-- navbar -->
   <div class="flex border-b pb-3">
     <!-- logo itts -->
     <div>
       <img src="/logo_itts.png" alt="" class="w-20">
     </div>
     <!-- search bar -->
     <form @submit="search" class="flex mx-3 border p-1 px-2 rounded-lg w-3/4">
      <img src="/search.svg" alt="" class="w-6 mr-1 opacity-40">

      <input v-model="q" type="text" class="text-sm w-full outline-none" placeholder="search" name="q"  id="" title="search" autocomplete="off">
       <!-- filter -->
       <button class="ml-2 mr-1">
        <img ref="menu" src="/menu.svg" alt="" class="w-7 hover:opacity-40">
       </button>
      </form>

     <!-- user icon  -->
     <div class="right-3 sm:fixed">
      <img src="/account.svg" alt="account" class="w-10 hover:opacity-40">
     </div>
   </div>
    <!-- list books -->
    <div class="grid grid-cols-2 sm:grid-cols-6">
      <div v-for="i in 60" class="text-gray-600 max-w-fit text-center m-2 hover:underline">
        <div>
          <img src="/41.jpg" alt="" class="w-40 sm:w-48"> 
        </div>
        <a href="/book" class="mt-3">Ilmu peluang</a>
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
