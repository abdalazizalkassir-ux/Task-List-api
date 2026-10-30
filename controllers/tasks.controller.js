import Task from '../models/taskmodel.js';



const authenticateSession = async (req, res, next) => 
    { if ( req.session && req.session.user && req.session.user.firstName ) { return true; } else { return false; } };



export const TaskController = {

    

     createTask: async (req, res, next) => { try {
        // 1. Check authentication 
      const is_authenticated = await authenticateSession(req, res, next);
    if (!is_authenticated) {
            return res.status(401).send('Not logged in');
        }

     const { taskTitle } = req.body;

        // 2. Get task data and user ID
           if(!req.body.taskTitle){
            return res.status(400).send('Task title is required');
        }

   
    
        const userId = req.session.user.id;

        // 3. Create the task
        const newTask = new Task({
            taskTitle,
            userId
        });

        // 4. Save the task
        await newTask.save();

        // 5. Send success response
        return res.status(200).send('Done');

    } catch (err) {
        console.error('Create task error:', err);

        // 6. Send error response
        if (res.headersSent) {
            return next(err);
        }

        return res.status(500).send('ERROR');
    }
},


    deleteTask: async (req, res, next) => {
  const is_authenticated = await authenticateSession(req, res, next);
    if (!is_authenticated) {
            return res.status(401).send('Not logged in');
        }

    try{
    const taskId = req.params.id;
    const task = await Task.findOne({_id:taskId});
    if (!task){
    res.status(404).send(`not found`)
    }
    else{
    await Task.deleteOne({_id:taskId});
    res.status(200).json({message:`Task deleted`});
    }
    }catch(err){
    res.send(err);
    }

    },


    markAsCompleted: async (req, res, next) => {

            const is_authenticated = await authenticateSession(req, res, next);
            if (!is_authenticated) {
            return res.status(401).send('Not logged in');
        }
    try{
    const taskId = req.params.id;
    const task = await Task.findOne({_id:taskId});
    if(!task){
        return res.status(404).send(`Task not found`);
    }
    if(task.isCompleted == true){
    task.isCompleted = false;
    await task.save();
    return res.status(200).send(`Done`);
                            }
else{
    task.isCompleted = true;
    await task.save();
    return res.status(200).send(`Done`);
    }
    }catch(err){
        console.error('Mark as completed error:', err);
        if (res.headersSent) {
            return next(err);
        }
    res.status(500).send(err);
    }


    },

    getList: async (req, res, next) => {
              const is_authenticated = await authenticateSession(req, res, next);
    if (!is_authenticated) {
            return res.status(401).send('Not logged in');
        }

 
        try{
        const list = await Task.find({userId:req.session.user.id}) 
        if(list.length==0){
        res.json([]);}

    else{
    res.json(list);

    }
}catch(err){
    console.error('Get list error:', err);
    if (res.headersSent) {
        return next(err);
    }   
    res.status(500).send(`ERROR`);
    
}
    }


};