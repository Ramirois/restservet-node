const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
} = require('../controllers/usuarios');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/bd-validators');


const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'no es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], usuariosPut);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe de ser mas de 6 caracteres').isLength({ min: 6 }),
    // check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'El rol ingresado no es valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.delete('/:id', usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router