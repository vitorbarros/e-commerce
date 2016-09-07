//4:10
var Product = require('./../entity/products');

var Service = function (req, res, next) {
    var findById = Product.findById(req.params.id).exec();
    var update = Product.update({
        _id: req.params.id
    }, {
        $set: req.body
    }, {
        multi: false
    }).exec();

    findById
        .then(function (result) {
            update
                .then(function (result) {
                    if (!result) {
                        return res.status(400)
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