const diary_component = {
    template: `
        <div id="left-container-root">
            <div id="calendar-side-bar"  v-if="right_template !== 'editor'" >
                    <dropdown-controller
                        v-for="(name, index) in  dropDown_head"
                        :icon="'clinical_notes'"
                        :name="name"
                        :default_selected="dropdown_value"
                        :dropdown_data="dropdown_values"
                        :active="dropdown_selected"
                        :root_ref="root_ref"
                        @dropdown_clicked="dropdown_clicked"
                    ></dropdown-controller>
                    <button-controller 
                        :button_name="'Favourites'" 
                        :icon_name="'favorite'" 
                        :root_ref="root_ref"
                        :active="dropdown_selected"
                        @button_clicked="button_clicked">
                    </button-controller>
            </div>
            <div class="content-sidebar" v-show="right_template == 'editor'" id="c-sidebar">
                    <div id="head"> 
                       <div id="content">
                        <simple-dropdown-controller width="sidebar-dropdown" :default_val="dropdown_value" :data="dropdown_values" :name="'month'" :tag="'-'" @change_format="editor_month_change"></simple-dropdown-controller>
                        <simple-dropdown-controller width="sidebar-dropdown" :default_val="dropdown_selected" :data="dropDown_head" :name="'year'" :tag="'-'" @change_format="editor_year_change"></simple-dropdown-controller>
                       </div>
                     </div>
                    <div id="body" ref="scroll_container" >
                        <div id="day-container" v-for="date in total_count" :key="date" :class="{ active: date === this.default_date }" >
                        <preview-controller 
                            :year="dropdown_selected"
                            :month="dropdown_value"
                            :favourite_data="favourite_data"
                            :data="month_preview[date]"
                            :date="date"
                            :root_ref="root_ref"
                            :show_date="true"
                            :favourite_access="true"
                            @add_to_favourite="add_to_fav"
                            @change_data="preview_clicked">
                        </preview-controller>
                        </div>
                    </div>
            </div>
        </div>
        <div id="right-container-root">
        <calendar-controller v-if="right_template === 'calendar'" 
                :month="dropdown_value"
                :year="dropdown_selected" 
                :month_preview="month_preview"
                :root_ref="root_ref">
        </calendar-controller>
        <editor-controller v-if= "right_template === 'editor'"  
                :data="default_date_data" 
                :date="default_date"
                :month="dropdown_value"
                :year="dropdown_selected"
                :root_ref=root_ref
                :back="favourite_template"
                :preview="true">
        </editor-controller>
        <container-controller  v-if ="right_template === 'container'"
                 name="Favourites"
                :span="dropdown_selected"
                :favourite_data="favourite_data"
                :root_ref="root_ref">
        </container-controller>
        </div>
        `,
    props: {
        dropdown_value: {
            type: String
        },
        dropdown_selected: {
            type: [String,Number]
        },
        default_date: {
            type:Number
        },
        default_date_data:{
            type:Object
        },
        month_preview:{
            type:Object
        },
        favourite_data:{
            type:Object
        },
        root_ref:{
            type:Object
        },
        right_template:{
            type:String
        },
        dropdown_values:{
            type:Array
        }
    },
    watch:{
        right_template(ne,old){
            if(ne =='editor' && old == 'container'){
                this.favourite_template = 'container';
            }
            else{
                this.favourite_template = 'calender';
            }
        },
        dropdown_value(){
            this.total_days_in_month();
        },
        dropdown_selected(){
            this.total_days_in_month();
        }
    },
    created(){
        this.total_days_in_month();
    },
    data() {
        return {
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            favourite_template:'calendar',
            dropDown_head:[2024,2023],
            total_count:0
        };
    },
    methods: {
        total_days_in_month(){
            var month = this.months.indexOf(this.dropdown_value);
            this.total_count = new Date(this.dropdown_selected, month + 1, 0).getDate();
        },
        button_clicked(name){
            this.$emit('button_clicked',name);
        },
        dropdown_clicked(year,month){
           this.$emit('dropdown_clicked',year,month);
        },
        editor_month_change(month){
           this.$emit('dropdown_clicked',this.dropdown_selected,month,'editor')
        },
        editor_year_change(year){
            this.$emit('dropdown_clicked',year,this.dropdown_values[0],'editor')
        },
        preview_clicked(data){
            this.$emit('preview_clicked',data);
        },
        add_to_fav(date){
            this.$emit('add_to_fav',date);
        }
    }
};
