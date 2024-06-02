var dropdown_controller = {
    template: `<div :class="expand ? 'section clicked' : 'section' "  > 
                    <expandable-list-root  
                        :icon=prepend_icon 
                        :name=name
                        :selected='selected_item'
                        :data="items"
                        :expand =expand 
                        @change_value = change_value    
                    >
                    </expandable-list-root>
               </div>
        `,
    props:{
        prepend_icon:{
            type:String
        },
        name:{
            type:[String,Number],
        },
        selected_item:{
            type: String,
        },
        items:{
            type: Array,
        },
        expand:{
            type:Boolean
        },
        root_ref:{
            type:Object
        },
        root_events:{
            type:Object,
        }
    },
    methods: {
        change_value(data){
            this.root_ref && this.root_events.change 
                ? this.root_ref.eventbus[this.root_events.change](data)
                : this.$emit('dropdown_clicked',data);
        },
        
    }           
}
