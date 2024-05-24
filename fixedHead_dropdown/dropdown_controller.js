var dropdown_controller = {
    template: `<div :class="active == name ? 'section clicked' : 'section' "  > 
                    <dropdown-root  
                        :icon=icon 
                        :name='name'
                        :default_selected='default_selected'
                        :dropdown_data=" dropdown_data"
                        :active ='active' 
                        :root_ref="root_ref"
                        @change_value = change_value
                    >
                    </dropdown-root>
               </div>
        `,
    props:{
        default_selected:{
            type: String,
        },
        dropdown_data:{
            type: Array,
        },
        name:{
            type:[String,Number],
        },
        icon:{
            type:String
        },
        active:{
            type:[String,Number]
        },
        default_selected:{
            type:String
        },
        root_ref:{
            type:Object
        }
    },
    emits:['change_value','change_active'],
    methods: {
        change_value(year,month){
            console.log(month);
            this.root_ref.eventbus.open_calendar(year,month);
        },
    }           
}
