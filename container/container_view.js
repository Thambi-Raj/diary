const container_component = {
    template: `<div id="container-root" v-if="preview"> 
                    <div id="container-head">
                        <div id="heading">
                            <span class="material-symbols-outlined ">{{span}}</span>
                            <span id="text">{{name}}</span>
                        </div>
                    </div>
                    <div id="container-body">
                        <div v-for="(value, index) in month" :key="index">
                            <div id="head" >
                                {{value}}
                            </div>
                            <div id="content">
                                 <div id="container" v-for="(val, i) in content_data[value]" :key="i">
                                    <preview-controller 
                                        :date_config="{ year: get_year_month(value, 'year'), month: get_year_month(value), date: val }"
                                        :data="get_data(value, val)"
                                        @change_data="open_diary"
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
        span: {
            type: String
        },
        container_data: {
            type: Object
        },
    },
    data() {
        return {
            content_data: {},
            month :[], 
            preview:true
        }
    },
    created() {
        this.construct_container();
        this.get_month();
    },
    methods: {
        construct_container(){
            var res = [], 
            keys =  Object.keys(this.container_data).sort((a, b) => b - a);
            var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            this.content_data = this.content_data || {};
            if (keys.length > 0) {
                var prev_date = new Date(parseInt(keys[0])), prev = month[prev_date.getMonth()] + ' ' + prev_date.getFullYear();
                for (var i = 0; i < keys.length; i++) {
                    var date = new Date(parseInt(keys[i]));
                    if (date.getMonth() == prev_date.getMonth() && date.getFullYear() == prev_date.getFullYear()) {
                        res.push(date.getDate());
                    } else {
                        this.content_data[prev] = res;
                        res = [date.getDate()];
                        prev = month[date.getMonth()] + ' ' + date.getFullYear();
                        prev_date = date;
                    }
                }
                if (res.length != 0) this.content_data[prev] = res;
            }
        },
        get_month(){
            for(var key in this.content_data){
                this.month.push(key);
            }
        },
        get_year_month(key,year){
            var key_split = key.split(' ');
            return year == undefined ?key_split[0]: parseInt(key_split[1])
        },
        get_data(key,date){
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var key_split= key.split(' ');
            var month = key_split[0];
            var year =parseInt(key_split[1]);
            var dat1= new Date(year,months.indexOf(month),date).getTime();
            return this.container_data[dat1];
        },
        open_diary(data){
            this.$emit('open_diary',data);
        }

    },
}