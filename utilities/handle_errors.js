module.exports = (error, res) => {
    console.error(error, ":error handler:\n")
    if (error && error.response && error.response.status == 401) {
        return res.status(401).send({
            message: "Action not permitted",
            success: false,
            data: {}
        })
    }
    if (error && error.response && error.response.status == 400) {
        return res.status(400).send({
            message: "Request has been blocked on our side",
            success: false,
            data: {}
        })
    }
    if (error && error.sqlMessage) {
        return res.status(401).send({
            message: error.sqlMessage,
            success: false,
            data: {}
        })
    }
    return res.status(500).send({
        message: "Internal Server error, please contact your customer care",
        success: false,
        data: {}
    });
}

