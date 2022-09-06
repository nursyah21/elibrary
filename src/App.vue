<script>
import { supabase } from './supabase';
export default {
  mounted() {
    this.visited()
  },
  methods: {
    async visited() {
      var d = new Date()
      var day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      var month = ['December', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November']

      const {data} = await supabase.from('visited').select().limit(1).order('visited_id', {ascending:false})

      var datas = {
        years: d.getFullYear(),
        months: d.getMonth(),
        dates: d.getDate(),
        days: d.getDay(),
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