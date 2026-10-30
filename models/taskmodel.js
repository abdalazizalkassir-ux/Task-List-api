import mongoose from 'mongoose';
const{Schema} = mongoose;
const taskModel = new Schema({
userId:{type:String},
taskTitle:{type:String},
isCompleted:{type:Boolean,default:false}
});


export default mongoose.model('Task',taskModel,'task')