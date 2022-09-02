<script>
export default{
  created(){
    const nim = localStorage.getItem('nim')
    const pass = localStorage.getItem('pass')
    console.log(nim + " " + pass)
    if(window.location.pathname.toLowerCase() == '/dashboard' && (nim === null || pass === null)) window.location = '/login' 

    document.title = 'Dashboard | elibrary-itts'
  },
  data(){
    return{
      isHidden: true,
      isNotLogin: false
    }
  },
  methods:{
    logoutFunc(){
      this.$data.isHidden = !this.$data.isHidden
    },
    logout(){
      window.location = '/login'
      localStorage.clear()
    }
  }
  }
  </script>
  
  <template>
    <!-- navbar -->
    <div class="flex p-3 justify-between h-16 border-b-4" :class="{hidden: isNotLogin}">
      <!-- logo itts -->
      <a href="/">
        <img class="w-24" src="/logo_itts.png" alt="">
      </a>
      
      <!-- admin -->
      <button @click="logoutFunc" class="hover:opacity-40">
        <img src="/account.svg" alt="">
      </button>
    </div>
    
    <!-- modal logout -->
    <div ref="logout" class="w-screen h-screen fixed top-0" :class="{hidden: isHidden}">
      <div class="flex justify-center items-center h-screen flex-col">
        <div class="fixed bg-white z-0 w-screen h-screen opacity-80"></div>

        <button class="bg-turqoise text-white py-2 px-10 rounded-2xl mb-2 hover:opacity-40 z-10" @click="logoutFunc()">
          cancel
        </button>
        
        <button class="bg-blood text-white py-2 px-10 rounded-2xl hover:opacity-40 z-10" @click="logout()">
          log out
        </button>
      </div>
    </div>
  
    <div class="flex" :class="{hidden: isNotLogin}">
      <!-- sidebar -->
      <div class="w-64 h-screen border-r-2 flex-col">
        <!-- beranda -->
        <button class="text-white bg-blood w-full p-2 hover:opacity-40">
          beranda
        </button>
  
        <!-- katalog -->
        <button class="text-blood bg-white w-full p-2 hover:opacity-40">
          katalog
        </button>
  
        <!-- pengguna -->
        <button class="text-blood bg-white w-full p-2 hover:opacity-40">
          pengguna
        </button>
  
        <!-- dipinjam -->
        <button class="text-blood bg-white w-full p-2 hover:opacity-40">
          dipinjam
        </button>
      </div>
  
      <router-view />
  
    </div>
  
  </template>
  