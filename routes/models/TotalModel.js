const mongoose=require('mongoose')
const {Schema,model}=mongoose

const totalSchema=new Schema({
    orders:{
        type:[],
        required:true,
    }
},{
    timestamps:true,
})

const totalModel=model('total',totalSchema)
module.exports=totalModel