const { client } = require("../../Config/dbConnent");

//users collection
const Users = client.db('Kalender').collection('users');

const postUser = (app) => {
    app.post('/users', async (req, res) => {
        try {
            const query = { email: req.query.email }
            const findUser = await Users.findOne(query);
            if (findUser) {
                res.send("no need to register again");
            }
            else {
                const result = await Users.insertOne(req.body)
                res.send({
                    success: true,
                    message: "User posted"
                })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}


//get users
const getUsers = (app) => {
    app.get("/users", async (req, res) => {
        try {
            const query = {};
            const result = await Users.find(query).toArray();
            res.send({
                success: true,
                data: result
            })
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

//updateUsers
const updateUser = (app) => {
    app.put("/users", async (req, res) => {
        try {
            const query = { email: req.query.email }
            const findUser = await Users.findOne(query);
            if (findUser) {
                res.send("no need to register again");
            }
            else {
                const res = await Users.insertOne(req.body)
                res.send({
                    success: true,
                    message: "User posted"
                })
            }
        } catch (error) {
            res.send({
                success: false,
                message: error.message
            })
        }
    })
}

module.exports = { Users, postUser, getUsers, updateUser }