const dropdown_component = {
    template: `<div class="drop-down-root" v-if="format !== 'image'">
    <div id="drop-down-head" @click="switch_dropdown"  ref="dropdown">
        <span :class="{ 'material-symbols-outlined': format === 'tag' }">{{check_fixed_head()}}</span>
        <span class="material-symbols-outlined">{{dropdown_icon}}</span>
    </div>
    <div id="option" v-if="dropdown_visible">
        <span v-for="element in data" @click="updateDropdownValue(element)" :class="{ 'clicked': check_selected(element,selected), 'material-symbols-outlined': format === 'tag' && !fixed_head }">
            {{element}}
        </span>
    </div>
    </div>
    <div class="drop-down-root" v-else>
        <div id="drop-down-head" @click="switch_dropdown"  ref="dropdown">
            <img :src="getImageUrl(selected)" class="drop-down-image">
            <span class="material-symbols-outlined">{{dropdown_icon}}</span>
        </div>
        <div id="option" v-if="dropdown_visible" >
            <div v-for="element in data" :key="element" class="image_dropdown" :class="{ 'clicked': element == selected }" @click="updateDropdownValue(element)">
                <img :src="getImageUrl(element)" class="drop-down-image" >
            </div>
        </div>
    </div>`
,

    props: {
        data: { type: Array },
        format: { type: String },
        selected:{type:[String,Number]},
        fixed_head:{
            type:String
        }
    },
    data() {
        return {
            dropdown_visible: false,
            dropdown_icon:"arrow_drop_down",
        }
    },
    methods: {
        switch_dropdown() {
            this.dropdown_visible = !this.dropdown_visible;
            this.dropdown_icon = this.dropdown_icon=="arrow_drop_up" ?"arrow_drop_down":"arrow_drop_up";
        },
        updateDropdownValue(data) {
            this.dropdown_visible = false;
            this.$emit('updateDropdownValue', data);  
        },
        getImageUrl(image) {
            return image ? `../${image}`: `../${this.select}`;
        },
        check_fixed_head(){
            if(this.fixed_head) {
                return this.fixed_head 
            }
            else{
                 return this.selected;
            } 
        },
        check_selected(element,selected){
            return element == selected;
        }
    },
    mounted() {
        window.addEventListener('click', (event) =>{
            if (this.$refs.dropdown &&  !this.$refs.dropdown.contains(event.target)) {
                this.dropdown_visible = false;
                this.dropdown_icon="arrow_drop_down"
            }
        });
    },
    destroyed() {
        window.removeEventListener('click', (event) =>{
            if (!this.$refs.dropdown.contains(event.target)) {
                this.dropdown_visible = false;
                this.dropdown_icon="arrow_drop_down"
            }
        });
    },
};
