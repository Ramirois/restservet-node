const Role = require('../models/role');
const Usuario = require('../models/usuario');


const esRoleValido = async(rol = '') => {
    const existRol = await Role.findOne({ rol });
    if (!existRol) {
        throw new Error(`El rol ${ rol } no esta registrado en la BD`)
    }
}

const emailExiste = async(correo) => {
    const existEmail = await Usuario.findOne({ correo });
    if (existEmail) {
        throw new Error(`El E-mail ${correo} ya esta registrado`);
    }
}

const existeUsuarioPorId = async(id) => {
    const existUsuario = await Usuario.findById(id);
    if (!existUsuario) {
        throw new Error(`El ID ${id} no existe`);
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}