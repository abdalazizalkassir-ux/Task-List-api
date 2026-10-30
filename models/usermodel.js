import mongoose from 'mongoose';
const{Schema} = mongoose;
const userModel = new Schema({
firstName: {type:String},
lastName : {type:String},
password : {type:String},
email:{type:String,
    unique: true
}

});


export default mongoose.model('User',userModel,'user')