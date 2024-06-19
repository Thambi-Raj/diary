const sidebar_controller= {
    template: `
        <div id="side-pane">
            <main-sidebar-root  
                :config = "config"  
                @expand_list_change = "expand_list_change"
                @listitem_clicked = "listitem_clicked" >
            </main-sidebar-root >
        </div>`,
    props: {
        config:{
            type:Object
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
