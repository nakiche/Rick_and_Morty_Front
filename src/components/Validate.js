const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const regexPass= /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,10}$/


export default function Validate(inputs) {
 var errors = {};

 //console.log(inputs.username.length)
//username validation
 if (!inputs.username) {
   errors.username = 'Se requiere un nombre';
}else if (inputs.username.length>35) {
   errors.username = 'No debe ser > a 35 caracteres';
}else if (!regexEmail.test(inputs.username)) {
   errors.username = 'Debe ser un correo electrónico';
}
if (!regexPass.test(inputs.password)){
  errors.password = 'Debe contener al menos un numero y entre 6 y 10 caracteres';
}

return errors;
}