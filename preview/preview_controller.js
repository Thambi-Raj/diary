const preview_controller = {
    template: `<preview-root
                    :show_date="show_date"
                    :data="check_available_data(data)"
                    :favourite="favourite"
                    :date="date_config.date"
                    :month="date_config.month"
                    :year="date_config.year"
                    @add_to_fav="add_fav"
                    @change_data="change_data"
                ></preview-root>`,
   
    props: {
        show_date: {
            type: Boolean,
            default: false
        },
        favourite:{
            type:[Object,Boolean],
            default:false
        },
        data:{
            type:Object
        },
        date_config:{
            type:Object
        },
        root_ref:{
            type:[Object,Boolean],
            default:false
        },
        root_event:{
            type:[Object,Boolean],
            default:false
        },
    },
    methods: {
        check_available_data(data) {
          if(data){
            return data;
          }
            return false;
        },
        add_fav(date) {
            this.root_ref && this.root_event.add_to_fav 
                ? this.root_ref.eventbus[this.root_event.add_to_fav](date)
                : this.$emit('add_to_favourite',date);
        },
        change_data(data) {
            this.root_ref && this.root_event.click 
                ? this.root_ref.eventbus[this.root_event.click](data)
                : this.$emit('date_changed',data);
        },
        
    }
};
