
var expandable_list_component = {
    template:`
    <div class="expandable-list-root" >
        <div id="dropdown_head" @click = change_activestate :class=" show ? 'active' : '' " ref="dropdown">
            <span :class = "icon ?'material-symbols-outlined':'hide'">{{icon}}</span>
            <span>{{name}}</span>
            <span class="material-symbols-outlined drop_down"  v-if="show">
                arrow_drop_up
            </span>
            <span class="material-symbols-outlined drop_down"  v-else>
                arrow_drop_down
            </span>
            

        </div>
        <div id="dropdown_body" :class="{ hide: !this.show }" ref="dropdown" v-if="show">
            <div class="dropdown-item" v-for="value in  data" :class="{ selected : value === selected}" @click="change_value(value)">{{value}}</div>
        </div>
    </div>`,
    props:{
        icon:{
            type:String
        },
        name:{
            type:[Number,String],
        },
        selected:{
            type: [Number,String],
        },
        data:{
            type: Array,
        },
        expand:{
            type:Boolean
        }
    },
    emits:['change_value','change_activestate'],
    data(){
        return {
            show:this.expand
        }
    },
    watch:{
        expand(){
            this.show = this.expand ? true:false;
        }
    },
    methods:{
        change_value(value){
            var data={year:this.name,month:value};
            this.$emit('change_value',data);
        },
        change_activestate(){
                this.show=!this.show;
                var data={year:this.name,month:this.selected};
                this.$emit('change_value',data);
        }
    }
}
