const previewSidebar_component = {
    template: ` 
                    <div id="head"> 
                    <div id="content">
                            <div id="month_dropdown">
                                <dropdown-controller 
                                    :selected="date_config.month"
                                    :data="months" 
                                    @change = "month_change"
                                >
                                </dropdown-controller>
                            </div>
                            <div id="year_dropdown">
                                <dropdown-controller 
                                    :selected="date_config.selected" 
                                    :data="years"
                                    @change="year_change" 
                                >
                            </dropdown-controller>
                            </div>
                    </div>
                    </div>
                    <div id="body" ref="scroll_container" >
                        <div id="day-container" v-for="date in date_config.total_days" :key="date" :class="{ active: date ===  this.date_config.date  }" >
                        <preview-controller 
                            :date_config = "set_date_config(date)"
                            :data="month_data[date]"
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
          date_config:{
            type:Object
          },
          months:{
            type:Array
          },
          years:{
            type:Array
          },
          month_data:{
            type:Object
          },
          favourite_data: {
            type: Object
          },
    },
    mounted() {
        var container_Rect = this.$refs.scroll_container.children[this.date_config.date - 1];
        var scrolltop = container_Rect.clientHeight * (this.date_config.date - 1);
        this.$refs.scroll_container.scrollTop = scrolltop;
      
    },
    emits:['dropdown_value_changed','add_to_fav','data_changed'],
    methods: {
        set_date_config(date){
            var data = {
                        year:this.date_config.selected,
                        month:this.date_config.month,
                        date:date,
                    }
            return data;
        },
        year_change(year){
            var data = {
                        year : year,
                        month :this.date_config.month,
                        view : 'editor'
                    };
            this.$emit('dropdown_value_changed',data);  
        },

        month_change(value){
            var data = {
                        year : this.date_config.selected,
                        month : value ,
                        view:'editor'
                    };
            this.$emit('dropdown_value_changed',data);  
        },
        data_changed(data){
            this.$emit('data_changed',data);
        },
        add_to_fav(date){
            this.$emit('add_to_fav',date);
        }
    }
}


