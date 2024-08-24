module.exports = {
    apps: [
        {
            name: "index",
            script: "./dist/index.js",
            instances: "1",
            env: {
                "PORT": 443
            },
            env_production: {
                "PORT": 443,
                "CA_CERT": process.env.CA_CERT,
                "CERT_PEM": process.env.CERT_PEM,
                "KEY_PEM": process.env.KEY_PEM
            }
        }
    ]
}