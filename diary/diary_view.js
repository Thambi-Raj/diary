const diary_component = {
    template: `
        <div id="left-container-root">
            <sidebar-controller 
                v-if="right_template !== 'editor'" 
                :dropdown_selected="dropdown_selected" 
                :dropdown_value="dropdown_value"
                :month="dropdown_values"
                :root_ref="root_ref"
                :active="actived" 
                >
            </sidebar-controller>
            <previewSidebar-controller v-else 
                :year="dropdown_selected" 
                :month="dropdown_value"
                :date="default_date"
                :month_Array="dropdown_values"
                :data="month_preview"
                :favourite_data="favourite_data"
                :root_ref="root_ref"
            >
            </previewSidebar-controller>
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
                @save_json_content="save_json"
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
            type:Array
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
        }
    },
    emits: ['change_page','page_change', 'change_dropdown_value', 'change_dropdown_head',"save_json","change_date","add_fav"," change_left_pane","change_editor_view","get_favourite_data","update_month_preview"],
    data() {
        return {
            result_template: '',
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            favourite_template:'calendar',
            actived:this.dropdown_selected
        };
    },
    methods: {
        save_json(json,date) {   
         this.$emit('save_json', json,date);
        }
    }
};
