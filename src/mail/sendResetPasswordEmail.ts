import resend from '../lib/resend.js'
export const sendResetPassworEmail = async (email: string, code:string) => {
    await resend.emails.send({
        from: "spodop.resetpassword@support.com",
        to: email,
        subject: "Código de verificação para resetar sua senha",
        html: `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
            </head>
            <body style="margin:0; padding:0; background-color:#f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5; padding:40px 20px;">
                    <tr>
                        <td align="center">
                            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:460px; background-color:#ffffff; border-radius:12px; padding:48px 40px; text-align:center;">
                                <tr>
                                    <td>
                                        <h1 style="margin:0 0 8px; font-size:22px; font-weight:600; color:#18181b;">
                                            Redefinição de senha
                                        </h1>
                                        <p style="margin:0 0 32px; font-size:15px; color:#71717a; line-height:1.5;">
                                            Use o código abaixo para redefinir sua senha. Ele expira em alguns minutos.
                                        </p>
                                        <div style="background-color:#f4f4f5; border-radius:8px; padding:20px; margin:0 0 32px;">
                                            <span style="font-size:32px; font-weight:700; letter-spacing:6px; color:#18181b;">
                                                ${code}
                                            </span>
                                        </div>
                                        <p style="margin:0; font-size:13px; color:#a1a1aa; line-height:1.5;">
                                            Se você não solicitou isso, ignore este email.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
            </html>
        `
    });
}
   