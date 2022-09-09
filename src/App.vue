<script>
import { supabase } from './supabase';
export default {
  mounted() {
    this.visited()
  },
  methods: {
    async visited() {

      const {data} = await supabase.from('visited').select().match({visited_id: new Date().toDateString(), is_website:true})
      const prevcount = (data.length == 0) ? 0 : data[0].views
      
      var datas = {
        visited_id: new Date().toDateString(),
        views: 1+prevcount,
        is_website: true
      }
      if(prevcount != 0){
        await supabase.from('visited').update({views: datas.views}).match({visited_id: datas.visited_id, is_website: datas.is_website})
      }else{
        await supabase.from('visited').insert(datas)
      }
      
    }
  }
}
</script>

<template>
  <div>
    <router-view />
  </div>
</template>