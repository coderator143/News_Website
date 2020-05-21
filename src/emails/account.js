const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = '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'

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'codebustershan.619@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'codebustershan.619@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye, ${name}. I hope to see you back sometime soon.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}