import express from 'express';
import { Signup,Login,Logout} from '../controllers/auth.controller.js';
 

function AuthRoutes(){



const Router = express.Router();


Router.post('/signup', Signup);
Router.post('/login', Login);
Router.get('/logout', Logout);





return Router;
};



export default  AuthRoutes;