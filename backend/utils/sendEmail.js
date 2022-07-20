const nodemailer = require('nodemailer')
const {google} = require('googleapis')


const oAuth2Client = new google.auth.OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
oAuth2Client.setCredentials({refresh_token: process.env.REFRESH_TOKEN})
// const sendEmail = async options => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         auth: {
//             user: process.env.SMTP_FROM_EMAIL,
//             pass: process.env.SMTP_PASSWORD
//         }
//     })

//     const message = {
//         from: `${process.env.SMTP_FROM_NAME}<${process.env.SMTP_FROM_EMAIL}`,
//         to: options.email,
//         subject: options.subject,
//         text: options.message
//     }

//     await transporter.sendMail(message)
// }
    const sendMail = async options => {
        try {
            const accessToken = await oAuth2Client.getAccessToken()
            const transporter = nodemailer.createTransport({
                service : 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'mentesnot.ertibu@gmail.com',
                    clientId: process.env.CLIENT_ID,
                    refreshToken : process.env.REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })

            const message = {
                from :'NEDROXX 📧 <mentesnot.ertibu@gmail.com>',
                to : options.email,
                subject: options.subject,
                text: options.message
            }
            console.log("Ladies and gentlemen we got here")
            console.log("reciever : "+options.email)
            const result = await transporter.sendMail(message)
            return(result)
        }
        catch(error) {
            return (error)
        }
    }

module.exports = sendMail 