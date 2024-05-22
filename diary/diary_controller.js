const diary_controller = {
    template: `<diary-component 
                    :dropdown_selected="dropdown_selected" 
                    :dropdown_value = dropdown_value
                    :default_date=default_date 
                    :month_preview=month_preview  
                    :default_date_data="default_date_data"
                    :root_ref="root_ref"
                    :right_template = "right_template"
                    :dropdown_values="dropdown_values"
                    :favourite_data="favourite_data"
                    @save_json="save_json"
                    >
               </diary-component>`,
    props:{
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
        root_ref:{
            type:Object
        }, 
        right_template:{
            type:String
        },
        dropdown_values:{
            type:Array
        },favourite_data:{
            type:Array
        }
    },
    emits: ["page_change", "change_dropdown_head", "change_dropdown_value", "save_json", "change_date", "add_favourite","update_month_preview","construct_container_format","change_editor_view"],
    methods: {
        save_json(json, date) {
           this.$emit('save_json',json,date);
        }
    },
}