
var expandable_list_component = {
    template:`
    <div class="expandable-list-root" >
        <div id="dropdown_head" @click = switch_dropdown :class="expand ? 'active' : '' " ref="dropdown">
            <span :class = "prepend_icon ?'material-symbols-outlined':'hide'">{{prepend_icon}}</span>
            <span id="name">{{name}}</span>
            <div id="count" v-if="data_count['total']>0">
             {{data_count['total']}}
            </div>
            <span class="material-symbols-outlined drop_down"  v-if="show">
                arrow_drop_up
            </span>
            <span class="material-symbols-outlined drop_down"  v-else>
                arrow_drop_down
            </span>
        </div>
        <div id="dropdown_body"  ref="dropdown" v-if="show">
            <div class="dropdown-item" v-for="(value,index) in  data" :class="{ selected : value === selected }" @click="updateDropdownValue(value)">
                <span id="content">
                 {{value}}
                </span> 
                <div id="count" v-if="data_count[index]>0">
                    {{data_count[index]}}
                </div>
            </div>
            
        </div>
    </div>`,
   
    props:{
        prepend_icon:{
            type:String
        },
        name:{
            type:[Number,String],
        },
        selected:{
            type: [Number,String,Boolean],
        },
        data:{
            type: Array,
        },
        expand:{
            type:Boolean
        },
        data_count:{
            type:Object,
            default:false
        }
    },
    data(){
        return {
            show:this.expand
        }
    },
    methods:{
        updateDropdownValue(value){
            var data={year:this.name,month:value};
            this.$emit('updateDropdownValue',data);
        },
        switch_dropdown(){
            this.show = !this.show;
        },
  
    }
}
