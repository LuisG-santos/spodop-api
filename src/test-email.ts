import { sendResetPassworEmaiTest } from './mail/sendResetPasswordEmail.js'

sendResetPassworEmaiTest()
    .then(() => console.log('Email enviado!'))
    .catch((err) => console.error('Erro:', err))
