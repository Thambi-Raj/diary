var button_component = {
    template:`<div class="button-root">
                <div class="button" :class="{ active: active === icon_name }" @click="button_clicked">
                    <span class="material-symbols-outlined" v-if="icon_name">{{ icon_name }}</span>
                    <span>{{ button_name }}</span>
               </div>
              </div>`,
    props:{
        button_name:{
            type : String
        },
        icon_name:{
            type:String
        },
        active:{
            type:[String,Number]
        },
        root_ref:{
            type:Object
        }
    },
    emits:['button_clicked'],
    methods:{
        button_clicked(){
            this.root_ref.eventbus.change_right_template('container')
            this.root_ref.eventbus.change_head(this.icon_name);
        }
    }
    
}
