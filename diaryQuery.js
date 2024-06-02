class DiaryQuery{
    constructor(data){
        this.set_data(data)
        this.contents = data.contents;
        this.images = data.images;
        this.global_props = data.global_props;
    }
    set_data(data){
        this.data = data;
    }
    get_data(){
        return this.data;
    }
    set_content(){

    }
    get_content(){
        return this.content;
    }
    set_images(){

    }
    get_images(){
        return this.images;
    }
    set_global_props(){
        return this.global_props;
    }
}