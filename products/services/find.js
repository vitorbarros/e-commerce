var Product = require('./../entity/products');

var service = function (req, res) {
    var find = {};
    if (req.params.id) {
        find = Product.findById(req.params.id).exec();
    }
    if (!req.params.id) {
        find = Product.find({}).exec();
    }
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
                });
        })
        .catch(function (err) {
            res.status(500)
                .json({
                    status: false,
                    data: err
                });
        });
};

module.exports = service;