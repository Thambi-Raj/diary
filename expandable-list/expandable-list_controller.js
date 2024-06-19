var expandable_list_controller = {
    template: `<div :class="isExpand  ? 'section clicked' : 'section'"  > 
                    <expandable-list-root  
                        :prepend_icon=prepend_icon 
                        :name = name
                        :selected = selected
                        :data = "sublist"
                        :data_count = "data_count"
                        :expand = expanded 
                        @updateDropdownValue = updateDropdownValue   
    
                    </expandable-list-root>
               </div>
        `,
    props: {
        prepend_icon: {
            type: String
        },
        name: {
            type: [String, Number],
        },
        selected: {
            type: [String, Boolean],
        },
        sublist: {
            type: Array,
        },
        isExpand: {
            type: Boolean
        },
        root_ref: {
            type: Object
        },
        root_events: {
            type: Object,
        },
        data_count:{
            type:Object,
            default:false
        }
    },
    data() {
        return {
            expanded: this.isExpand,
        }
    },
    methods: {
        updateDropdownValue(data) {
            this.root_ref && this.root_events.change
                ? this.root_ref.eventbus[this.root_events.change](data)
                : this.$emit('changed', data);
        },
    }
}
