
var dropdown_component = {
    // :icon=icon 
    // :name='name'
    // :selected='selected'
    // :data=" data"
    // :expand =expand 
    // @change_value = change_value
    template:`
    <div class="expandable-list-root" >
        <div id="dropdown_head" @click = change_activestate :class=" show ? 'active' : '' " ref="dropdown">
            <span :class = "icon ?'material-symbols-outlined':'hide'">{{icon}}</span>
            <span>{{name}}</span>
            <span class="material-symbols-outlined drop_down"> {{dropdown_icon}} </span>
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
            dropdown_icon:this.expand  ? "arrow_drop_up":'arrow_drop_down',
            show:this.expand
        }
    },
    watch:{
        expand(){
            this.dropdown_icon = this.expand  ? "arrow_drop_up":'arrow_drop_down';
            this.show = this.expand ? true:false;
        }
    },
    methods:{
        change_value(value){
            var data={year:this.name,month:value};
            this.$emit('change_value',data);
        },
        change_activestate(){
                console.log('aaa');
                this.dropdown_icon = this.dropdown_icon=="arrow_drop_up" ?"arrow_drop_down":"arrow_drop_up";
                this.show=!this.show;
                var data={year:this.name,month:this.data[0]};
                this.$emit('change_value',data);
        }
    }
}
