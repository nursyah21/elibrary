<script>
import {Footer, Modal} from "../components"
import { supabase } from "../supabase"
import qrcode from 'qrcode'

export default{
  components:{
    Footer,
    Modal
  },
  created(){
    const nim = localStorage.getItem('nim')
    const pass = localStorage.getItem('pass')
    //console.log(nim + " " + pass)
    //if(window.location.pathname.toLowerCase() == '/dashboard' && (nim === null || pass === null)) window.location = '/login' 

    document.title = 'Dashboard | elibrary-itts'
  },
  data(){
    return{
      isHidden: true,
      isNotLogin: false,
      isHome: true,
      isCatalog: false,
      isUser: false,
      isRented: false,
      isOpt: false,
      isAdmin: true,
      isQrcode: false,
      isInsertBook: false,
      nim:"",
      book:"",
      modalHidden:true,
      uploadbook:false,
      
      modalbook:{
        title:"",
        author:"",
        publisher:"",
        label:"",
        located:"",
        pages:"",
        available:""
      }
    }
  },
  mounted(){
    this.genCharts()
    // temporary
    this.isHome = false
    this.isCatalog = true
    this.isInsertBook = true
  },
  methods:{
    logoutFunc(){
      this.$data.isHidden = !this.$data.isHidden
    },
    // home
    async getDataLibrary(){
      const {data} = await supabase.from('visited').select().match({is_website:false}).limit(30).order('visited_id', {ascending:false})
      return data
    },
    async getDataWebsite(){
      const {data} = await supabase.from('visited').select().match({is_website:true}).limit(30).order('visited_id', {ascending:false})
      return data
    },
    async genCharts(){
      // initial data
      const data = {
      labels: [],
      datasets: [{
        name: "Website", chartType: "line",
        values: []
      },{
        name: "Library", chartType: "line",
        values: []}
      ]}
      new frappe.Chart("#chart", {
        title: `${new Date().getFullYear()} ${['December', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'][new Date().getMonth()]}`,
        data: data,
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
      })
      
      const library = await this.getDataLibrary()
      const website = await this.getDataWebsite()
      
      const labels = [], datasetsWeb = [], datasetsLib = []
      
      try{
        website.forEach(i=>{
          labels.push(i.visited_id)
          datasetsWeb.push(i.views)
        })
        library.forEach(i=>{datasetsLib.push(i.counts)})
      }catch(e){}

      const newdata = {
      labels: labels,
      datasets: [{
        name: "Website", chartType: "line",
        values: datasetsWeb
      },{
        name: "Library", chartType: "line",
        values: datasetsLib}
      ]}
      new frappe.Chart("#chart", {
        title: "2022 September",
        data: newdata,
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
      })
    },
    genQrcode(){
      this.isQrcode = ! this.isQrcode
      const canvas = document.querySelector('#canvas')
      
      qrcode.toCanvas(canvas, 'test',{width:400}, (err) =>{
        if(err) console.log(err)
        console.log('success')
      })
    },
    inputUser(){
      console.log(this.nim)
    },
    // navbar
    movePage(e){
      this.isHome = false
      this.isCatalog = false
      this.isUser = false
      this.isRented = false
      this.isOpt = false

      this[e] = true
    },
    // catalog
    async inputBook(mode){
      if(mode === 0){ // search

      }
      if(mode === 1){ // open or close modal insert book
        this.modalHidden = !this.modalHidden
        console.log(this.isInsertBook)
      }
      if(mode === 2){ // submit data
      }
      if(mode === 3) { // reset data
        Object.entries(this.modalbook).forEach(i=>{
          this.modalbook[i[0]] = ""
        })
        const file = this.$refs.imgfile.files
        const {error, data} = await supabase.storage.from('image').remove([`${file[0].name}`])
        if(!error) console.log('delete success')
        console.log(data)

        this.$refs.formCatalog.reset()
        this.$refs.imgIB.src = "src/assets/upload.svg"
      }
    },
    async uploadImage(e){
      const file = e.target.files[0]
      this.$refs.imgIB.src = URL.createObjectURL(file)
      const {error} = await supabase.storage.from('image').upload(`${file.name}`, file)
      
      if(!error)console.log('upload success')
    }
  }

}
</script>
  
<template>
  <!-- navbar -->
  <div class="flex py-2 px-2  justify-between border-b text-gray-500" :class="{hidden: isNotLogin}">
    <div class="flex text-sm items-center">
      <!-- logo itts -->
      <a href="/">
        <img class="w-20 sm:w-16 hover:opacity-40 mx-1 mr-4" src="../assets/logo_itts.png" alt="">
      </a>
      
      <!-- navbar button -->
      <div ref="navbar" :class="{hidden: !isAdmin}">
        <!-- beranda -->
        <button @click="movePage('isHome')" class="mx-2 hover:-translate-y-0.5" :class="{'underline':isHome}">beranda</button>
        <!-- katalog -->
        <button @click="movePage('isCatalog')" class="mx-2 hover:-translate-y-0.5" :class="{'underline':isCatalog}">katalog</button>
        <!-- pengguna -->
        <button @click="movePage('isUser')" class="mx-2 hover:-translate-y-0.5" :class="{'underline':isUser}">pengguna</button>
        <!-- dipinjam -->
        <button @click="movePage('isRented')" class="mx-2 hover:-translate-y-0.5" :class="{'underline':isRented}">dipinjam</button>
        <!-- pengaturan -->
        <button @click="movePage('isOpt')" class="mx-2 hover:-translate-y-0.5" :class="{'underline':isOpt}">pengaturan</button>
      </div>
    </div>
    
  </div>
  
  <!-- admin -->
  <div :class="{hidden: !isAdmin}" class="mb-8">
  
  <!-- beranda -->
   <!-- modal qrcode -->
   <div class="flex h-screen w-screen fixed top-0 justify-center items-center bg-white z-20" :class="{hidden: !isQrcode}">
        <canvas id="canvas"></canvas>
        <button @click="genQrcode" class="fixed top-0 right-0 m-3 hover:opacity-40">
          <img src="../assets/close.svg" alt="">
        </button>
      </div>

  <div :class="{hidden: !isHome}" class="p-3">
    <!-- chart -->
    <div id="chart" class="p-5 py-9 border shadow-md overflow-hidden"></div>

    <!-- input user -->
    <div class="flex m-1 items-center">
      <form @submit.prevent="inputUser">
        <input v-model="nim" type="text" class="border outline-none p-1 px-2 text-sm rounded-md" placeholder="input nim" title="input nim">
      </form>
      <!-- qrcode -->
      <button @click="genQrcode" class="flex items-center border p-1 text-gray-500 m-2 rounded-md hover:underline">
        <img src="../assets/qrcode.svg" alt="" class="w-7 mr-2">qr code
      </button>
     

    </div>

    <!-- table rented locker -->
    <h1 class="text-xl sm:text-2xl text-gray-500 my-1 mb-3 mx-3 underline" >rented locker</h1>
    
    <div class="overflow-x-scroll">
      <table class="w-full">
          <tr>
            <th class="sm:w-20">id</th>              
            <th>nim</th>
            <th>located</th>
            <th>time</th>
          </tr>
          <tbody v-for="i in 0">
            <tr class="text-sm">
              <td class="text-center">{{i}}</td>
              <td>1201202040</td>
              <td>{{i}}</td>
              <td>{{i}}</td>
            </tr>
          </tbody>
      </table>
    </div>

  </div>

  <!-- katalog -->
  <div class="p-3" :class="{hidden: !isCatalog}">
    <div class="flex items-center">
      <form @submit.prevent="inputBook(0)" class="sm:w-3/4">
        <input v-model="book" type="text" class="border text-sm px-3 p-1 outline-none w-full" placeholder="search book" title="search book">
      </form>
      <button @click="inputBook(1)" class="border p-1 text-gray-500 m-2 rounded-md hover:underline w-1/4">new book</button>
    </div>

    <!-- modal insertbook -->
    <Modal :class="{hidden:modalHidden}">
      <div class="p-3 w-full flex-col flex sm:flex-row">

        <!-- image -->
        <form ref="formCatalog" class="flex flex-col text-sm text-center text-gray-500 w-full mt-10 sm:mt-0 mb-5 sm:mb-0 sm:w-1/3 border-4 p-3 border-dashed">
          <div class="h-full flex justify-center p-3 items-center">
            <img ref="imgIB" src="../assets/upload.svg" alt="" class="max-h-24 sm:max-h-48">
          </div>
          <div>
            <div class="overflow-hidden">
              <input ref="imgfile" type="file" accept="image/*" placeholder="upload" @change="uploadImage">
            </div>
            upload image
          </div>
        </form>

        <div class="border-2 sm:mx-2 sm:ml-5 p-3 text-gray-500 rounded-md shadow sm:w-2/3 h-full w-full">
          <table>
            <tr v-for="i in ['title','author','publisher','label','located','pages','available']">
              <td class="border-none">{{i}}</td>
              <td class="border-none w-full">
                <input v-model="modalbook[i]" type="text" class="border outline-none px-2 p-0.5 text-sm w-full">
              </td>
            </tr>
          </table>
          <div class="mt-3 bottom-0">
            <input type="submit" value="submit" class="p-1 px-5 rounded-md text-white bg-blue-500 hover:underline hover:bg-blue-300">
            <input @click="inputBook(3)" type="submit" value="reset" class="p-1 px-5 ml-5 rounded-md text-white bg-amber-500 hover:underline hover:bg-amber-300">
          </div>
        </div>
        <div class="h-20"></div>
      </div>

      <button @click="inputBook(1)" class="fixed top-0 right-0 m-3 hover:opacity-40">
        <img src="../assets/close.svg" alt="" class="w-8">
      </button>
      
    </Modal>
    
    
    <!-- table book -->
    <div class="overflow-x-scroll" :class="{hidden: !modalHidden}">
      <table class="w-full">
      <tr>
        <th class="sm:w-16">id</th>
        <th>image</th>
        <th>title</th>
        <th>author</th>
        <th>publisher</th>
        <th>label</th>
        <th>located</th>
        <th>pages</th>
        <th>available</th>
      </tr>
      <tbody>
        
      </tbody>
    </table>
    </div>
    
  </div>
  
  <!-- pengguna -->
  <div :class="{hidden: !isUser}">pengguna</div>
  
  <!-- dipinjam -->
  <div :class="{hidden: !isRented}">dipinjam</div>
  
  <!-- pengaturan -->
  <div :class="{hidden: !isOpt}">pengaturan</div>

  </div>
    
  <Footer />
    
    
</template>

  