var Purchase = require('./../entity/purchase');
var Shopping = require('./../../shopping/entity/shopping');

var Service = function (req, res, next) {
    var purchase = new Purchase(req.body);

    purchase.shopping = req.params.shoppingId;

    Shopping
        .findById(req.params.shoppingId)
        .populate('products')
        .exec()
        .then(function (shopping) {
            if (!shopping) {
                return res.status(404)
                    .json({
                        status: false,
                        data: {}
                    });
            }
            var total = 0;
            shopping.products.forEach(function (product) {
                total += product.price;
            });
            purchase.total = total;
            purchase.save()
                .then(function (purchase) {
                    if (!purchase) {
                        return res.status(400)
                            .json({
                                status: false,
                                data: {}
                            });
                    }
                    return res.status(200)
                        .json({
                            status: true,
                            data: purchase
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