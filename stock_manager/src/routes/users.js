const {Router} = require('express');
const {getAll,getById, createUser, updateUser,deleteUser}=require('../controllers/users');

const router =Router();

router.get('/',getAll);
router.get('/:id',getById);  /////////////////////////

///
router.post('/',createUser);
router.put('/:id',updateUser);
router.delete('/',deleteUser);
module.exports=router;


