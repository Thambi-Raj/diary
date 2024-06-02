const container_controller = {
    template:   `<container-root 
                     :name = header.name 
                     :span = header.icon 
                     :container_data=data 
                     @open_diary="open_diary"
                 ></container-root>`,
    props:{
     header:{
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
      open_diary(data){
         (this.root_ref && this.root_event.click)?
            this.root_ref.eventbus[this.root_event.click](data)
            :this.$emit('date_clicked')
        }
    },
}