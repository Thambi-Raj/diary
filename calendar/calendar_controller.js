const calendar_controller = {
    template: `<calendar-root 
                    :month = config.month
                    :year  = config.year 
                    :data = data    
                    :StartDayIndex = find_StartDayIndex()
                    :total_days = config.total_days
                    :total_row = find_row_in_month()
                    @date_selected="date_selected"
                    >
               </calendar-root>`,
    props: {
        config:{
            type:Object
        },
        root_ref: {
            type: Object
        },
        root_event:{
            type:Object
        },
        data:{
            type:Object
        }
    },
    data(){
        return{
            months:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        }
    },
    methods:{
        date_selected(data){
            (this.root_ref && this.root_event.click) 
                ? this.root_ref.eventbus[this.root_event.click](data)
                : this.$emit('date_clicked',data);
        },      
        find_row_in_month(){
            var day = new Date(this.config.year, this.months.indexOf(this.config.month), 1); 
            var dayOfWeek = day.getDay();
            var totalDays = this.config.total_days;
            var row = (dayOfWeek + totalDays) % 7 == 0 ? ((dayOfWeek + totalDays) / 7) : Math.ceil((dayOfWeek + totalDays) / 7);
            return row;
        }  ,
        find_StartDayIndex(){
            return new Date(this.config.year,this.months.indexOf(this.config.month), 1).getDay();
        }
    }

}