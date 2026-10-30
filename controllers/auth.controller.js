import bcrypt from 'bcrypt';
import User from'../models/usermodel.js';
 


export const Signup = async (req, res) => {
try {
    const { firstName, lastName, password, email } = req.body;

    if (!firstName) return res.status(400).send('First name required');
    if (!lastName) return res.status(400).send('Last name required');
    if (!password) return res.status(400).send('Password required');
    if (!email) return res.status(400).send('Email required');

    const hashedPassword = await bcrypt.hash(password, 10);
    const existEmail = await User.findOne({ email });

    if (existEmail) return res.status(400).send('The email is already used');

    const newUser = new User({
      firstName,
      lastName,
      password: hashedPassword,
      email
    });

    await newUser.save();

    // Regenerate session and log user in
    req.session.regenerate(error => {
      if (error) {
        return res.status(500).send('Error regenerating session');
      }

      req.session.user = { firstName: newUser.firstName, id: newUser._id };
      return res.status(201).send(`Logged in as ${newUser.firstName}`);

    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }




}




export const Login = async (req, res) =>{
    try{
const {email,password} = req.body;
if(!email&&!password)
return res.status(400).send(`Email and password required`);
else if(!email)
    return res.status(400).send(`Email required`);
else if(!password)
    return res.status(400).send(`Password required`);
else{
const emailExist = await User.findOne({email});
const passwordMatch = await bcrypt.compare(password,emailExist.password);
if(!emailExist)
    return res.status(401).send(`Email does not exist !`);
if(passwordMatch){
    req.session.regenerate(error=>{
        if(error){
            return res.status(500).send(`Error regenerating session`)
        }
        req.session.user = {firstName:emailExist.firstName,
                            id:emailExist._id
        };
        res.status(200).send(`Logged in as ${emailExist.firstName}`)

    })
}
else
    res.status(401).send(`Incorrect password !`)

 }   }catch(err){
        res.status(500).send(`Error logging in`)
    }
}



export const Logout = async (req, res) => {

    req.session.destroy(err=>{
        if(err) return res.status(500).send(`Error in destroying session`)
            else 
        {res.clearCookie('connect.sid',{path:'/'})
         return  res.status(200).send(`User logged out`)}
    })

}