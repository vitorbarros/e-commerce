var Product = require('./../entity/products');

var Service = function (req, res, next) {
    var findById = Product.findById(req.params.id).exec();
    var remove = Product.remove({
        _id: req.params.id
    });
    findById
        .then(function (product) {
            if (!product) {
                return res.status(404)
                    .json({
                        status: false,
                        data: {}
                    });
            }
            remove
                .exec()
                .then(function () {
                    return res.status(200)
                        .json({
                            status: true,
                            data: product
                        })
                })
                .catch(function (err) {
                    return res.status(500)
                        .json({
                            status: false,
                            data: err
                        });
                });
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