const container_component = {
    template: `<div id= "container-root" > 
                    <div id="container-head">
                        <div id="heading">
                            <i class="material-icons">favorite</i>
                            <span id="text"> &nbsp;{{name}}</span>
                        </div>
                    </div>
                    <div id="container-body">
                        <div v-for="(value, index) in timeline" :key="index">
                            <div id="head" >
                                {{value}}
                            </div>
                            <div id="content">
                                 <div id="container" v-for="(val, i) in content_data[value]" :key="i">
                                    <preview-controller 
                                        :date_config="{ year: get_year_month(value, 'year'), month: get_year_month(value), date: val }"
                                        :data="get_data(value, val)"
                                        @change_data="date_selected"
                                    >  
                                    </preview-controller>
                                    <span id="date">{{val}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
              </div>`
        ,
    props: {
        name: {
            type: String
        },
        prepend_icon: {
            type: String
        },
        metadata: {
            type: Object
        },
    },
    data() {
        return {
            content_data: {},
            timeline :[], 
        }
    },
    created() {
        this.construct_data_format();
        this.get_header_for_container();
    },
    methods: {
        construct_data_format(){
            var res = [], 
            keys =  Object.keys(this.metadata).sort((a, b) => b - a);
            var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            var prev_date = new Date(parseInt(keys[0]))
            var prev_key = month[prev_date.getMonth()] + ' ' + prev_date.getFullYear();
                for (var i = 0; i < keys.length; i++) {
                    var date = new Date(parseInt(keys[i]));
                    if (date.getMonth() == prev_date.getMonth() && date.getFullYear() == prev_date.getFullYear()) {
                        res.push(date.getDate());
                    } else {
                        this.content_data[prev_key] = res.sort();
                        res = [date.getDate()];
                        prev_key = month[date.getMonth()] + ' ' + date.getFullYear();
                        prev_date = date;
                    }
                }

                if (res.length != 0) this.content_data[prev_key] = res.sort();
        },

        get_header_for_container(){
            for(var key in this.content_data){
                this.timeline.push(key);
            }
        },
        get_year_month(key,year){
            var key_split = key.split(' ');
            return year == undefined ? key_split[0]: parseInt(key_split[1])
        },
        get_data(key,date){
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            var key_split= key.split(' ');
            var month = key_split[0];
            var year = parseInt(key_split[1]);
            var dat1= new Date(year,months.indexOf(month),date).getTime();
            return this.metadata[dat1];
        },
        date_selected(data){
            this.$emit('date_selected',data);
        }
    },
}