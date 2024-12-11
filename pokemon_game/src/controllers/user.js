const {request, response}= require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');
const userQueries = require('../models/users');
require('dotenv').config();

const secret = process.env.SECRET;

const SALT_ROUNDS= 10;

const userProtected= async (req= resquest, res= response)=>{
    res.send({message: "YoU HAVE ACCESs!!!"});
}

const getAllUsers= async (req =request, res=response) => {
    let conn;

    try{

        conn=await pool.getConnection();
        const users = await conn.query(userQueries.getAll);
        res.send(users);
        return;

    }catch(err){
        res.status(500).json(err);
        return;
    }finally{
        if (conn) conn.end();
    }

};


const createUser = async (req =request, res=response) => {
    const {
        first_name,
        last_name,
        email,
        password
    }= req.body;

    if(!first_name ||!last_name ||!email||!password){
        res.status(400).json({message: "Missing requiered fields"});
        return;
        }

    let conn;
    try{
        conn= await pool.getConnection();
        const [user_exists] = await conn.query(userQueries.getByEmail, [email]);

        if(user_exists){
            res.status(409).json({message: 'user already fields'});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = await conn.query(userQueries.addUser, [first_name, last_name, email, hashedPassword]);

        if(newUser.affectedRows === 0 ){
            res.status(500).send({message: 'Error adding user'});
            return;
        }

        res.status(201).send({message: 'user created'});


    }catch(err){
        res.status(500).json(err);
        return;
    } finally{
        if(conn) conn.end();
    }
};

//Obtener user 

const getUser= async(req =request, res=response) =>{
    const {id}= req.params;

    if(isNaN(id)){
        res.status(400)
        return;
    }

    let conn;
    try{
        conn= await pool.getConnection();
        const  [user] = await conn.query(userQueries.getById, [+id]);

        if(!user){
            res.status(400).send({message: 'user not find'});
            return;
        }

        res.json(user);

    }catch(err){
        res.status(500).json(err);
        return;
    }finally{
        if(conn) conn.end();
    }
}

const updateUser = async(req =request, res=response) =>{
    const {id}=req.params;

    const{
        first_name,
        last_name,
        email
    }=req.body;

    if(isNaN(id)){
        res.status.send({menssage: 'Invalid user ID'});
        return;
    }

    if(!first_name || !last_name || !email){
        res.status.send({message:'Missing required fields'});
        return;
    }

    let conn;
    try{
        conn= await pool.getConnection();
        const  [user] = await conn.query(userQueries.getById, [id]);

        if(!user){
            res.status(400).send({message: 'user not find'});
            return;
        }

        const [emailExists]=await conn.query(userQueries.emailValid, [email, id]);
        if(emailExists){
            res.status(409).send({message: 'Email already in use'});
            return;
        }

        const updateUser = await conn.query(userQueries.editUser, [first_name, last_name, email, id]);

        if(updateUser.affectedRows===0){
            res.status(500).send({message:'user not update'});
            return;
        }

        res.send({message: 'user updated'})

    }   catch(err){
            res.status(500).json(err);
            return;

        }       finally{
                    if(conn) conn.end();
                }

}

//ELIMINAR 
const destroyUser= async(req =request, res=response) =>{
    const {id}=req.params;

    if(isNaN(id)) {
        res.status(400).send({message: 'Invalid user ID'});
        return;
    }

    let conn;
    try{
        conn = await pool.getConnection();
        const [user]= await conn.query(userQueries.getById, [id]);

        if(!user){
            res.status(404).send({message:'user not found'});
            return;
        }

        const deleteUser= await conn.query(userQueries.deleteUser,[id]);
        if(deleteUser.affectedRows===0){
            res.status(500).send({message:'error deleting user'});
            return;
        }

        res.send("Usuario eliminado exitosamente");
        }catch(err){
            res.status(500).json(err);
            return;

        }       finally{
                    if(conn) conn.end();
                }

}


module.exports = {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    destroyUser,
    userProtected

                
                }