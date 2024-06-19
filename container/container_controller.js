const container_controller = {
    template:   `<favourite-container-root 
                     :prepend_icon = config.icon 
                     :name = config.name 
                     :metadata=data 
                     @date_selected="date_selected"
                 ></favourite-container-root>`,
    props:{
        config:{
            type:Object
        },
        data:{
            type:Object
        },
        root_ref:{
            type:Object
        },
        root_event:{
            type:Object
        }
    },
    methods:{
      date_selected(data){
         (this.root_ref && this.root_event.click) ?
            this.root_ref.eventbus[this.root_event.click](data)
            :this.$emit('date_clicked')
        }
    },
}