const previewSidebar_component = {
    template: `<div class="content-sidebar">
                    <div id="head"> 
                        <span class="material-symbols-outlined" @click="back">logout</span>
                        <simple-dropdown-controller width="sidebar-dropdown" :default_val="month" :data="month_array" :name="'month'" :tag="'-'" @change_format="change_month"></simple-dropdown-controller>
                        <simple-dropdown-controller width="sidebar-dropdown" :default_val="year" :data="year_Array" :name="'year'" :tag="'-'" @change_format="change_year"></simple-dropdown-controller>
                    </div>
                    <div id="body" ref="scroll_container">
                        <div id="day-container" v-for="date in total_count" :key="date" :class="{ active: date === this.date }" >
                        <preview-controller 
                            :year="year"
                            :month="month"
                            :favourite_data="favourite_data"
                            :data="data[date]"
                            :date="date"
                            :root_ref="root_ref"
                            :show_date="true"
                            :favourite_access="true">
                        </preview-controller>
                        </div>
                    </div>
                </div>`
,
    props: {
        year: {
            type: [Number,String],
        },
        month: {
            type: String
        },
        date:{
            type:Number
        },
        month_array: {
            type: Array
        },
        total_count: {
            type: Number
        },
        data:{
            type:Object
        },
        favourite_data:{
            type:Array
        },
        root_ref:{
            type:Object
        },
    },
    mounted() {
        var container_Rect = this.$refs.scroll_container.children[this.date - 1];
        var scrolltop = container_Rect.clientHeight * (this.date - 1);
        this.$refs.scroll_container.scrollTop = scrolltop;
    },
    data() {
        return {
            year_Array: [2023, 2024],
        }
    },
    methods: {
        add_hover_class(e){
              e.srcElement.classList.remove('default_class');
              e.srcElement.classList.add('hover')
        },
        remove_hover_class(e){
            e.srcElement.classList.remove('hover')
            e.srcElement.classList.add('default_class');
        },
        change_month(val){
            this.root_ref.eventbus.change_value(val)
        },
        change_year(val){
            this.root_ref.eventbus.change_head(val);
            this.root_ref.eventbus.get_dropdown_values(val);
            this.root_ref.eventbus.change_value(this.month_array[0]);
        },
        back() {
            this.root_ref.eventbus.change_right_template('calendar');  
        },
    }
}


{/* <div id="drop-down">
<div id="drop-down-head" @click="show_drop('b')">
   <span>{{year2}}</span>
   <span class="material-symbols-outlined" >arrow_drop_down</span>
</div>
<div id="option" v-show="year_drop">
   <span v-for = "yea in year" @click = "change_drop(1,yea)">
       {{yea}}
   </span>
</div>
</div> */}