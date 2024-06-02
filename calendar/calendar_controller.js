const calendar_controller = {
    template: `<calendar-root 
                    :month=data.month
                    :year =data.year 
                    :root_ref="root_ref"
                    :month_preview = data.month_preview
                    @open_diary="open_diary"
                    >
               </calendar-root>`,
    props: {
        data:{
            type:Object
        },
        root_ref: {
            type: Object
        },
        root_event:{
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