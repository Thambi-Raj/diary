const diary_controller = {
    template: `<diary-component 
                    :dropdown_selected="dropdown_selected" 
                    :dropdown_value = dropdown_value
                    :default_date=default_date 
                    :month_preview=month_preview  
                    :default_date_data="default_date_data"
                    :root_ref="root_ref"
                    :right_template = "right_template"
                    :dropdown_values="dropdown_values"
                    :favourite_data="favourite_data"
                    @button_clicked="button_clicked"
                    @dropdown_clicked="dropdown_clicked"
                    @preview_clicked="preview_clicked"
                    @add_to_fav="add_to_fav"
                    >
               </diary-component>`,
    props:{
        dropdown_value: {
            type: String
        },
        dropdown_selected: {
            type: [String,Number]
        },
        default_date: {
            type:Number
        },
        default_date_data:{
            type:Object
        },
        month_preview:{
            type:Object
        },
        root_ref:{
            type:Object
        }, 
        right_template:{
            type:String
        },
        dropdown_values:{
            type:Array
        },favourite_data:{
            type:Object
        }
    },
    methods: {
        button_clicked(name){
            (this.root_ref && this.root_ref.events.diary["button_clicked"])?
                 this.root_ref.ref.eventbus[this.root_ref.events.diary.button_clicked](name)
                 :this.$emit('button_clicked');
        },
        dropdown_clicked(year,month,view){
            (this.root_ref && this.root_ref.events.diary["dropdown_clicked"])?
                this.root_ref.ref.eventbus[this.root_ref.events.diary.dropdown_clicked](year,month,view)
                :this.$emit('dropdown_clicked')
           
        },
        preview_clicked(data){
            (this.root_ref && this.root_ref.events.diary["preview_clicked"])?
                this.root_ref.ref.eventbus[this.root_ref.events.diary.preview_clicked](data)
                :this.$emit('preview_clicked');
        
        },
        add_to_fav(date){
            (this.root_ref && this.root_ref.events.diary["favourite_icon_clicked"])?
                this.root_ref.ref.eventbus[this.root_ref.events.diary.favourite_icon_clicked](date)
                :this.$emit('favourite_icon_clicked')
            
        } 
    },
}