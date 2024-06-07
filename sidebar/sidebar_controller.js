const sidebar_controller= {
    template: `
        <div id="side-pane">
            <sidebar-root 
                :leftpane_listitem = "leftpane_listitem" 
                :config_details=" config_details"  
                :list_values="list_values"
                :selected_item="config_details.month"
                @expand_list_change="expand_list_change"
                @listitem_clicked="listitem_clicked"
                >
            </sidebar-root >
        </div>
    `,
    props: {
        leftpane_listitem:{
            type:Object,
        },
        config_details:{
            type:Object
        },
        list_values:{
            type:Array
        },
        root_ref: {
            type: Object
        },
        root_event:{
            type:[Object],
        },
    },
    methods: {
        expand_list_change(data){
            (this.root_ref && this.root_event.duration_change)?
                this.root_ref.eventbus[this.root_event.duration_change](data)
                : this.$emit('duration_change',data)
        },
        listitem_clicked(data){
            (this.root_ref && this.root_event.favourite_click)?
                this.root_ref.eventbus[this.root_event.favourite_click](data)
                : this.$emit('favourite_click',data);
        }
    },
};
