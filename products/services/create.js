var Product = require('./../entity/products');

var Service = function (req, res, next) {
    var product = new Product(req.body);
    product
        .save()
        .then(function (product) {
            if (!product) {
                return res.status(404)
                    .json({
                        status: false,
                        data: {}
                    });
            }
            return res.status(200)
                .json({
                    status: true,
                    data: product
                });
        })
        .catch(function (err) {
            return res.status(500)
                .json({
                    status: false,
                    data: err
                })
        });
};

module.exports = Service;