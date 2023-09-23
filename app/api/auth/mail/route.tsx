import nodemailer from "nodemailer"

export async function POST(
    req: Request,
    res: Response,
) {
    try {
        const { recipientEmail, message } = await req.json()

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mdrifatkayser440@gmail.com',
                pass: 'isaisverystrong@4908', 
            },
        });
     
        const mailOptions = {
            from: 'mdrifatkayser440@gmail.com',
            to: recipientEmail,
            subject: 'Hello from PixieWear',
            text: message,
        };

    } catch (error) {
        console.error('Error sending email:', error);
    }
}
