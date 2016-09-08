var Shopping = require('./../entity/shopping');

var Service = function (req, res, next) {
    var find = Shopping.find({}).exec();

    find
        .then(function (result) {
            if (!result) {
                return res.status(404)
                    .json({
                        status: false,
                        data: {}
                    });
            }
            return res.status(200)
                .json({
                    status: true,
                    data: result
                })
        })
        .catch(function (err) {
            return res.status(500)
                .json({
                    status: false,
                    data: err
                });
        });
};

module.exports = Service;