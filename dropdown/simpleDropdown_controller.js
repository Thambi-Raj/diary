const simple_dropdown_controller={
    template:
    ` <simple-dropdown-root
      :selected_value ="selected_value"
      :data="data"
      :width="width"
      :tag="tag"
      :name="name"
      :default_val="default_val"
      @change_dropdown_value="change_drop"
      >
     </simple-dropdown-root>`,
     data(){
        return{
          selected_value:this.default_val 
        }
     },
     props:{
        width:{
            type:String
        },
        data:{
            type:Array
        },
        tag:{
            type:String
        },
        name:{
            type:String
        },
        default_val:{
            type:[String,Number]
        }
     },
     watch:{
         default_val(){
             this.selected_value = this.default_val
        }
     },
     methods:{
        change_drop(data,background){
            this.selected_value = this.tag =='span'?background :data;;
            if(this.name.startsWith('Font')){
                this.$emit('change_format',data,background,'font');
            }
            else{
            background== 'back_ground' ? this.$emit('change_background',data):
                  this.$emit('change_format',data,background);
            }
        }
     }
     
}