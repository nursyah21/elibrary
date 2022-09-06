<script>
//import { VFrappeChart } from "vue-frappe-chart/node_modules/frappe-charts/dist/frappe-charts.min.esm"
import Footer from "../components/Footer.vue"

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
      isRented: false
    }
  },
  mounted(){
    //document.querySelector('#chart').innerHTML = 'as'
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
    genCharts(){
      const data = {
      labels: ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"
      ],
      datasets: [{
        name: "Website", chartType: "line",
        values: [25, 40, 30, 35, 8, 52, 17, 100]
      },{
        name: "Library", chartType: "line",
        values: [25, 50, 0, 15, 18, 32, 27, 400]}
      ]}
      
      const chart = new frappe.Chart("#chart", {
        title: "2022 September",
        data: data,
        height: 250,
        colors: ['#7cd6fd', '#743ee2']
      })
    }
  }
}
</script>
  
<template>
  <!-- navbar -->
  <div class="flex py-2 px-2 justify-between border-b text-gray-500" :class="{hidden: isNotLogin}">
    <div class="flex text-sm">
      <!-- logo itts -->
      <img @click="home" class="w-16 hover:opacity-40 mx-1 mr-4" src="/logo_itts.png" alt="">
      
      <!-- navbar button -->
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
  
  <!-- admin -->
  <div class="">
    <!-- beranda -->
      <!-- chart -->
      
      <div id="chart" class="p-5 py-9 border shadow-md overflow-hidden"></div>
    </div>
    
  <Footer />
    
    
</template>

<!-- modal logout -->
<!-- <div ref="logout" class="w-screen h-screen fixed top-0" :class="{hidden: isHidden}">
  <div class="flex justify-center items-center h-screen flex-col">
    <div class="fixed bg-white z-0 w-screen h-screen opacity-80"></div>

    <button class="bg-turqoise text-white py-2 px-10 rounded-2xl mb-2 hover:opacity-40 z-10" @click="logoutFunc()">
      cancel
    </button>
    
    <button class="bg-blood text-white py-2 px-10 rounded-2xl hover:opacity-40 z-10" @click="logout()">
      log out
    </button>
  </div>
</div> -->
  