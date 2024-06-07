const calendar_controller = {
    template: `<calendar-root 
                    :month=date_config.month
                    :year =date_config.year 
                    :root_ref="root_ref"
                    :month_data = month_data
                    @open_diary="open_diary"
                    >
               </calendar-root>`,
    props: {
        date_config:{
            type:Object
        },
        root_ref: {
            type: Object
        },
        root_event:{
            type:Object
        },
        month_data:{
            type:Object
        }
    },
    methods:{
        open_diary(data){
            (this.root_ref && this.root_event.click) 
                ? this.root_ref.eventbus[this.root_event.click](data)
                : this.$emit('date_clicked',data);
        }
    }

}