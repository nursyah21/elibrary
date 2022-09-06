<script>
//import { VFrappeChart } from "vue-frappe-chart/node_modules/frappe-charts/dist/frappe-charts.min.esm"
import Footer from "../components/Footer.vue"
import { supabase } from "../supabase"
import qrcode from 'qrcode'

export default{
  components:{
    Footer
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
      isAdmin: true,
      isQrcode: false,
      nim:""
    }
  },
  mounted(){
    this.genCharts()
  },
  methods:{
    logoutFunc(){
      this.$data.isHidden = !this.$data.isHidden
    },
    logout(){
      window.location = '/login'
      localStorage.clear()
    },
    home(){
      window.location = '/'
    },
    async getDataLibrary(){
      const {data} = await supabase.from('visited').select().eq('is_website',false).limit(30)
      return data
    },
    async getDataWebsite(){
      const {data} = await supabase.from('visited').select().eq('is_website',true).limit(30)
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
      //console.log('test',{library:library}, {website:website})
      const labels = [], datasetsWeb = [], datasetsLib = []
      
      try{
        website.forEach(i=>{
          labels.push(`${i.dates} ${['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][i.days]}`)
          datasetsWeb.push(i.counts)
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
    }
  }
}
</script>
  
<template>
  <!-- navbar -->
  <div class="flex py-2 px-2  justify-between border-b text-gray-500" :class="{hidden: isNotLogin}">
    <div class="flex text-sm items-center">
      <!-- logo itts -->
      <div>
        <img @click="home" class="w-20 sm:w-16 hover:opacity-40 mx-1 mr-4" src="/logo_itts.png" alt="">
      </div>
      
      <!-- navbar button -->
      <div :class="{hidden: !isAdmin}">
        <!-- beranda -->
        <button class="mx-2 hover:-translate-y-0.5" :class="{'underline':isHome}">beranda</button>
        <!-- katalog -->
        <button class="mx-2 hover:-translate-y-0.5" :class="{'underline':isCatalog}">katalog</button>
        <!-- pengguna -->
        <button class="mx-2 hover:-translate-y-0.5" :class="{'underline':isUser}">pengguna</button>
        <!-- dipinjam -->
        <button class="mx-2 hover:-translate-y-0.5" :class="{'underline':isRented}">dipinjam</button>
        <!-- pengaturan -->
        <button class="mx-2 hover:-translate-y-0.5" :class="{'underline':isRented}">pengaturan</button>
      </div>
    </div>
    
  </div>
  
  <!-- admin -->
  <div :class="{hidden: !isAdmin}" class="mb-8">
  <!-- beranda -->

    <!-- chart -->
    <div id="chart" class="p-5 py-9 border shadow-md overflow-hidden"></div>

    <!-- input user -->
    <div class="flex m-1 items-center">
      <form @submit.prevent="inputUser">
        <input v-model="nim" type="text" class="border outline-none p-1 px-2 text-sm rounded-md" placeholder="nim" title="input nim">
      </form>
      <!-- qrcode -->
      <button @click="genQrcode" class="flex items-center border p-1 text-gray-500 m-2 rounded-md hover:underline">
        <img src="/qrcode.svg" alt="" class="w-7 mr-2">qr code
      </button>
      <!-- modal qrcode -->
      <div class="flex h-screen w-screen fixed top-0 justify-center items-center bg-white" :class="{hidden: !isQrcode}">
        <canvas id="canvas"></canvas>
        <button @click="genQrcode" class="fixed top-0 right-0 m-3 hover:opacity-40">
          <img src="/close.svg" alt="">
        </button>
      </div>

    </div>

    <!-- table rented locker -->
    <h1 class="text-xl sm:text-2xl text-gray-500 my-1 mb-3 mx-3 underline">rented locker</h1>
    <table class="border w-full">
        <tr>
          <th class="sm:w-20">id</th>              
          <th>nim</th>
          <th>located</th>
          <th>time</th>
        </tr>
        <tbody v-for="i in 10">
          <tr class="text-sm">
            <td class="text-center">{{i}}</td>
            <td>1201202040</td>
            <td>{{i}}</td>
            <td>{{i}}</td>
          </tr>
        </tbody>
    </table>

    </div>
    
  <Footer />
    
    
</template>

  