import resend from '../lib/resend.js'
export const sendResetPassworEmail = async (email: string, code:string, name:string) => {
    await resend.emails.send({
        from: "reset-password@spodop.com.br",
        to: email,
        subject: "Código de verificação para resetar sua senha",
        html: resetPasswordHtml(code, name)
    });
}

function resetPasswordHtml(code: string, name:string) {
    return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0; padding:0; background-color:#ffffff; font-family: 'Georgia', 'Times New Roman', Times, serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#ffffff;">
        <tr>
            <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0" style="max-width:500px;">
                    <!-- Header verde -->
                    <tr>
                        <td align="center" style="background-color:#22c55e; padding:24px 20px;">
                            <span style="font-size:22px; font-weight:700;font-family: -apple-system; letter-spacing:1px;">🐛SPODOP</span>
                        </td>
                    </tr>
                    <!-- Corpo -->
                    <tr>
                        <td style="background-color:#ffffff; padding:32px 28px 0;">
                            <p style="margin:0 0 24px; font-size:15px; color:#1a1a1a; line-height:1.6;">
                                Olá, ${name}
                            </p>
                            <p style="margin:0 0 6px; font-size:15px; color:#1a1a1a; line-height:1.6;">
                                Você solicitou a redefinição da sua senha.
                            </p>
                            <p style="margin:0 0 20px; font-size:15px; color:#1a1a1a; line-height:1.6;">
                                Este é o seu código de verificação:
                            </p>
                            <p style="margin:0 0 28px; font-size:34px; font-weight:700; color:#22c55e; letter-spacing:4px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                                ${code}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#ffffff; padding:0 28px;">
                            <p style="margin:0 0 24px; font-size:14px; color:#1a1a1a; line-height:1.6;">
                                O código de verificação é válido por <strong>5 minutos</strong>. Não compartilhe este código com ninguém.
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="background-color:#ffffff; padding:0 28px 32px;">
                            <p style="margin:0; font-size:14px; color:#1a1a1a; line-height:1.6;">
                                Se você não solicitou esta redefinição, entre em contato com o suporte imediatamente.
                            </p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td align="center" style="border-top:1px solid #e5e5e5; padding:16px 28px;">
                            <a href="https://google.com" style="margin:0; font-size:13px; color:#22c55e;">
                                Suporte &bull; SpoDop
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>
    `;
}
   