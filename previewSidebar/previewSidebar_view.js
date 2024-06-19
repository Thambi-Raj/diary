const previewPanel_component = {
    template: `
                <div id="head"> 
                    <div id="content">
                            <div id="month_dropdown">
                                <dropdown-controller 
                                    :selected="selected.month"
                                    :data="months" 
                                    @change = "month_change"
                                >
                                </dropdown-controller>
                            </div>
                            <div id="year_dropdown">
                                <dropdown-controller 
                                    :selected="selected.year" 
                                    :data="years"
                                    @change="year_change" 
                                >
                                </dropdown-controller>
                            </div>
                    </div>
                </div>
                <div id="body" ref="scroll_container" >
                        <div id="day-container" v-for="date in total_days" :key="date" :class="{ active: date ===  this.selected.date  }" >
                            <preview-controller 
                                :date_config = "set_date_config(date)"
                                :data="data[date]"
                                :favourite="{acess:true,data:favourite_data}"
                                :show_date="true"
                                @date_changed = "data_changed"
                                @add_to_favourite="add_to_fav"
                            >
                            </preview-controller>
                        </div>
                </div>
                `
,
 
    props: {
          selected:{
            type:Object
          },
          months:{
            type:Array
          },
          years:{
            type:Array
          },
          total_days:{
            type:Number
          },
          data:{
            type:Object
          },
          favourite_data: {
            type: Object
          },
    },
    mounted() {
        var container_Rect = this.$refs.scroll_container.children[this.selected.date - 1];
        var scrolltop = container_Rect.clientHeight * (this.selected.date - 1);
        this.$refs.scroll_container.scrollTop = scrolltop;
      
    },
    emits:['dropdown_value_changed','date_change','add_favourite'],
    methods: {
        set_date_config(date){
            var data = {
                        year:this.selected.year,
                        month:this.selected.month,
                        date:date,
                    }
            return data;
        },
        year_change(year){
            var data = {
                        year: year,
                        month: this.selected.month,
                        view: 'editor'
                    };
            this.$emit('dropdown_value_changed',data);  
        },

        month_change(value){
            var data = {
                        year: this.selected.year,
                        month: value ,
                        view: 'editor'
                    };
            this.$emit('dropdown_value_changed',data);  
        },
        data_changed(data){
            this.$emit('date_change',data);
        },
        add_to_fav(date){
            this.$emit('add_favourite',date);
        }
    }
}


