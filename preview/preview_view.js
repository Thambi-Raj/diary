const preview_component={
    template:`
    <div class="preview-root">
        <div id="content" @click="content_click($event.currentTarget, date, $event)" :class="{'full_width':!show_date}">
            <div id="first" v-if="show_date">
                <span>{{ date }}</span>
                <br>
                <span>{{ month }}</span>
            </div>
            <div id="second">
               <div id="favourite" v-if="favourite_access && data">
                 <i  
                    :class="check_favourite(date) ? 'fa fa-heart' : 'fa fa-heart-o'">
                </i>
                </div>
                <div id="editor" :class="{ 'hide': !data }">                             
                    <editor-controller :data="data || {}" :preview="false" :date=date :month="month" :year="year"></editor-controller>
                </div>
            </div>
        </div>
    </div>`
        ,
    props:{
        show_date:{
            type:Boolean,
            default:false
        },
        favourite_access:{
            type:Boolean,
            default:false
        },
        data:{
            type:[Object,Boolean],
            default:{}
        },
        favourite_data:{
            type:Array,
            default:false
        },
        date:{
            type: [Number,String],
            default:0
        },
        month:{
            type:String,
            default:'Jan'
        },
        year: {
            type: [String, Number],
            default: 2024
        },
        root_ref:{
            type:Object
        },
    },
   
    methods:{
       check_favourite(){
            for(var i=0;i<this.favourite_data.length;i++){
               var key = Object.keys(this.favourite_data[i])[0];
               if( key  == (this.month+'_'+this.year)){
                  if(this.favourite_data[i][key].includes(this.date+"")){
                        return true;  
                  }
               }
            }
            return false;
       },
       content_click(e,date,event) {
        if(event.srcElement.tagName=='I' && event.srcElement.classList.contains('fa')){
            event.srcElement.classList.contains('fa-heart') ? 
            (event.srcElement.classList.remove('fa-heart'), event.srcElement.classList.add('fa-heart-o')) :
            (event.srcElement.classList.remove('fa-heart-o'), event.srcElement.classList.add('fa-heart'));   
            this.root_ref.eventbus.add_to_favourite(date);
            // this.$emit('add_fav',date);
        }
        else if(!e.classList.contains('active')){
            if(this.root_ref.right_template==='container'){
                this.root_ref.eventbus.change_head(this.year);
            }
            this.root_ref.eventbus.change_value(this.month)
            this.root_ref.eventbus.change_date(parseInt(date));
            this.root_ref.eventbus.change_right_template('editor');
            // this.$emit('change_date', date);
        }
    },
    }
        
}
// this.$emit('add_fav',date);
//         }
//         else if(!e.classList.contains('active')){
//             this.$emit('change_date', date);