<template>
  <div class="flex justify-center h-[100vh] items-center">
    <div class="text-center">
      <h1 class="text-[#46773D] text-4xl mb-3">Login</h1>
      <div class="w-[356px] h-[258px] border-[#46773D] border-[2px] rounded-3xl p-3 px-4">

        <div class="text-left text-[#46773D] mt-4">
          <p class="ml-1 mb-1">username / email</p>
          <input type="text" name="username" class="w-full border-[#46773D] border rounded-3xl p-1 px-3" placeholder="username / email">
          
          <p class="ml-1 mb-1 mt-3">password</p>
          <input type="text" name="password" class="w-full border-[#46773D] border rounded-3xl p-1 px-3" placeholder="password">
          
          <div class="text-center mt-4">
            <button onclick="load()" class="w-[38%] border-[#46773D] border rounded-3xl p-1 px-3 hover:bg-[#46773D] hover:text-white" placeholder="password">submit</button>
          </div>
        </div>
      </div>
      <div id="loading" class="text-[#46773D] justify-center mt-3 hidden">
        please wait... 
        <img src="/loading.svg" alt="" class="h-[30px] ml-3">
      </div>
    </div>
    
  </div>

</template>
