<script>
import { supabase } from './supabase';
export default {
  mounted() {
    this.visited()
  },
  methods: {
    async visited() {
      if(this.update)return

      const {data} = await supabase.from('visited').select().limit(1).order('visited_id', {ascending:false})

      var datas = {
        years: new Date().getFullYear(),
        months: new Date().getMonth(),
        dates: new Date().getDate(),
        days: new Date().getDay(),
        counts: 1,
        is_website: true
      }
      try{
        if(datas.years === data[0].years && datas.months === data[0].months && datas.dates === data[0].dates)
          datas.counts += data[0].counts
        this.updateVisited(datas, data[0].visited_id)
      }catch(e){
        this.insertVisited(datas)
      }
    },
    async updateVisited(datas,id){
      const { data } = await supabase.from('visited').update(datas).eq('visited_id',id)
    },
    async insertVisited(datas){
      const { data } = await supabase.from('visited').insert(datas)
    }
  }
}
</script>

<template>
  <div>
    <router-view />
  </div>
</template>