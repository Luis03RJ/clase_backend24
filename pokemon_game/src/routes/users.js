const {Router} =  require('express');
    const { getAllUsers,createUser,getUser,updateUser,destroyUser, userProtected } = require('../controllers/user');
const verifyToken = require('../middlewares/verifyToken');

const router = Router();

router.get('/',verifyToken,getAllUsers);//sescion iniciada 
router.get('/protected',verifyToken,userProtected);
router.get('/:id',verifyToken, getUser);//sesion iniciada
router.post('/',verifyToken,createUser);//secion iniciada y usuario administrador
router.put('/:id',verifyToken ,updateUser);//secion iniciada y usuario administrador
router.delete('/:id',verifyToken, destroyUser);//secion iniciada y usuario administrador



module.exports=router;