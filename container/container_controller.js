const container_controller = {
    template:   `<container-root 
                     :name = name 
                     :span=span 
                     :container_data=favourite_data 
                     :root_ref=root_ref
                 ></container-root>`,
    props:{
     name:{
        type:String,
     },
     span:{
        type:String
     },
     favourite_data:{
      type:Array
     },
     root_ref:{
      type:Object
     }
    },
    methods:{

    },
}