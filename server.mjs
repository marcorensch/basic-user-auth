import express from 'express';
import bcrypt from 'bcrypt';

const app = express();
const users = [];

// Allow JSON requests
app.use(express.json());

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = { name: req.body.name, password: hashedPassword };
        console.log(hashedPassword)
        users.push(user);
        res.status(201).send();
    }catch{
        res.status(500).send();
    }
});

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name = req.body.name);
    if(user == null){
        return res.status(400).send('Cannot find user');
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            res.send('Success');
        }else{
            res.send('Not Allowed');
        }
    }catch (err){
        res.status(500).send();
    }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
})