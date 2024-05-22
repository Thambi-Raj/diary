const sidebar_component = {
    template: `
        <div>
            <dropdown-controller
                v-for="(name, index) in  dropDown_head"
                :icon="'clinical_notes'"
                :name="name"
                :default_selected="dropdown_value"
                :dropdown_data="month_array"
                :active="dropdown_selected"
                :root_ref="root_ref"
             ></dropdown-controller>
            <button-controller 
                :button_name="'Favourites'" 
                :icon_name="'favorite'" 
                :root_ref="root_ref"
                :active="dropdown_selected">
                
            </button-controller>
        </div>
    `,
    props: {
        dropdown_selected: [String,Number],
        dropdown_value: String,
        month_array:Array,
        root_ref:{
            type:Object
        }
    },
    data(){
        return{
            dropDown_head:[2024,2023]
        }
    },
    methods: {
    }
};
{/* <button-controller 
                :button_name="'Bookmarks'" 
                :icon_name="'bookmarks'" 
                :root_ref="root_ref"
                :active="dropdown_selected">
                @change_active="change_activestate" 
            </button-controller> */}