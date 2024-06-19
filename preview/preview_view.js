const preview_component = {
    template: `
    <div class="preview-root">
        <div id="content" @click="content_click($event.currentTarget, date, $event)" :class="{'full_width':!show_date}">
            <div id="first" v-if="show_date">
                <span>{{ date }}</span>
                <br>
                <span>{{ month }}</span>
            </div>
            <div id="second">
               <div id="favourite" v-if="favourite && data">
                 <i  
                    :class="check_favourite(date) ? 'fa fa-heart' : 'fa fa-heart-o'">
                </i>
                </div>
                <div id="editor" :class="{ 'hide': !data }">                             
                    <editor-controller 
                        :preview="false" 
                        :config="{date_config:{year:year,month:month,date:date}}"
                        :data = "data"
                        :root_ref=root_ref
                    >
                    </editor-controller>
                </div>
            </div>
        </div>
    </div>`
    ,
    props: {
        show_date: {
            type: Boolean,
            default: false
        },
        data: {
            type: [Object, Boolean],
        },
        favourite:{
            type:[Object,Boolean]
        },
        date: {
            type: [Number, String],
            default: 0
        },
        month: {
            type: String,
            default: 'Jan'
        },
        year: {
            type: [String, Number],
            default: 2024
        },
        root_ref: {
            type: Object
        },
    },
    methods: {
        check_favourite() {
            var month = { "Jan": 0, "Feb": 1, "Mar": 2, "Apr": 3, "May": 4, "Jun": 5, "Jul": 6, "Aug": 7, "Sep": 8, "Oct": 9, "Nov": 10, "Dec": 11 };
            var timestamp = new Date(this.year, month[this.month], this.date).getTime();
            if (this.favourite.data[timestamp]) {
                return true;
            }
            return false;
        },
        content_click(e, date, event) {
            if (event.srcElement.tagName == 'I' && event.srcElement.classList.contains('fa')) {
                this.update_favourite_icon(e,date,event);
                this.$emit('add_to_fav', date);                
            }
            else if (!e.classList.contains('active')) {
                var data = { 'year': this.year, 'month': this.month, 'date': this.date };
                this.$emit('change_data', data);
            }
        },
        update_favourite_icon(e,date,event){
                event.srcElement.classList.contains('fa-heart') ?
                    (event.srcElement.classList.remove('fa-heart'), event.srcElement.classList.add('fa-heart-o')) :
                    (event.srcElement.classList.remove('fa-heart-o'), event.srcElement.classList.add('fa-heart'));
        }
    }
}