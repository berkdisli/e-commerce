require('dotenv').config()

const dev = {
    app: {
        serverPort: process.env.SERVER_PORT || 3002,
        jwtSecretKey: process.env.JWT_ACTIVATION_SECRET_KEY || "4124h89024124+E€FASFSFRF325!",
        smtpUsername: process.env.SMTP_USERNAME || "berkdisli17@gmail.com",
        smtpPassword: process.env.SMTP_PASSWORD || "hwtfzezgzlxpgnfb",
        clientURL: process.env.CLIENT_URL || 3000,
        sessionSecretKey: process.env.SESSION_SECRET_KEY || "FA89SF908!ASFHjhsdfj",
        jwtAuthorizationKey: process.env.JWT_AUTHORIZATION_SECRET_KEY || "FA89SF908!ASFHjhsdfj"
    },
    db: {
        url: process.env.DB_URL || "mongodb+srv://berkdisli:p9u9IlnQKo1MrnCm@cluster0.fqvhdfy.mongodb.net/users"
    },
}

module.exports = dev;