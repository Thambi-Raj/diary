const search_button_controller={
    template:`<div :class="active===id ? 'section clicked' : 'section' " :id=id>
                 <search-btn-root  
                    :button_name=button_name    
                    :icon_name = icon_name 
                    :result=this.p @match_value=search_value 
                    @click = change_activestate 
                    :active ='active' 
                    :id='id'
                    @get_data="get_data">
                 
                 </search-btn-root>
              </div>`,
    data(){
        return {
            result: ['thambi', 'raj'],
            p:['thambi','raj'],
            show_drop:this.active ===this.id    ,
            bgcolor:'red'
        };
    },
    props: {
        button_name: {
            type: String
        },
        icon_name: {
            type: String
        },
        id:{
            type:String
        },
        active:{
            type:String
        },
        color:{
            type:String
        },

    },
    emits:['change_active','get_mention'],
    methods:{
        search_value(value){
             this.p  = this.result.filter(d=> d.includes(value))
        },
        change_activestate(){
          this.clicked = !this.clicked;
          this.$emit('change_active',this.id,'input');
        },
        get_data(name){
            this.$emit('get_mention',name);
        }
    }
}
