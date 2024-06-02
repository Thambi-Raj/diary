const simple_dropdown_component = {
    template: `<div class="drop-down-root" v-if="tag !== 'image'">
    <div id="drop-down-head" @click="show_drop"  ref="dropdown">
        <span :class="{ 'material-symbols-outlined': tag === 'span' }">{{selected}}</span>
        <span class="material-symbols-outlined">{{dropdown_icon}}</span>
    </div>
    <div id="option" v-if="dropdown_visible">
        <span v-for="element in data" @click="change_drop(element)" :class="{ 'clicked': element == selected, 'material-symbols-outlined': tag === 'span' }">
            {{element}}
        </span>
    </div>
    </div>
    <div class="drop-down-root" v-else>
        <div id="drop-down-head" @click="show_drop"  ref="dropdown">
            <img :src="getImageUrl(selected)" class="drop-down-image">
            <span class="material-symbols-outlined">{{dropdown_icon}}</span>
        </div>
        <div id="option" v-if="dropdown_visible" >
            <div v-for="element in data" :key="element" class="image_dropdown" :class="{ 'clicked': element == selected }" @click="change_drop(element)">
                <img :src="getImageUrl(element)" class="drop-down-image" >
            </div>
        </div>
    </div>`
,
    props: {
        data: { type: Array },
        tag: { type: String },
        selected:{type:[String,Number]}
    },
    data() {
        return {
            dropdown_visible: false,
            dropdown_icon:"arrow_drop_down",
        }
    },
    methods: {
        show_drop() {
            this.dropdown_visible = !this.dropdown_visible;
            this.dropdown_icon = this.dropdown_icon=="arrow_drop_up" ?"arrow_drop_down":"arrow_drop_up";
        },
        change_drop(data) {
            this.dropdown_visible = false;
            this.$emit('change_dropdown_value', data);
            
        },
        hide_drop() {
            this.dropdown_visible = false;
            this.dropdown_icon="arrow_drop_down"
        },
        getImageUrl(image) {
            return `../${image}`;
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
