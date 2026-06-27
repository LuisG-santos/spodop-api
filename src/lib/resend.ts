import { Resend } from 'resend';
const secretKey = process.env.RESEND_API_KEY

const resend = new Resend(secretKey);

export default resend;