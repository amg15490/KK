odoo.define('pos_home_delivery.ActionpadWidget', function(require) {
    "use strict";

    const Registries = require('point_of_sale.Registries');
    let core = require('web.core');
    const { _t } = require('web.core')
    const ProductScreen = require('point_of_sale.ProductScreen');

    const BiProductScreen = (ProductScreen) =>
        class extends ProductScreen {
            setup() {
                super.setup();
            }

            async _clickProduct(event) {
                var self = this;
                var delivery = this.env.pos.get_order().delivery;
                if (delivery == false) {
                    super._clickProduct(event);
                } else {
                    self.showPopup('ErrorPopup', {
                        'title': _t('Add New Product'),
                        'body': _t('This order already create home delivery , you can not add new product.'),
                    });
                }
            }
        };
    Registries.Component.extend(ProductScreen, BiProductScreen);
    return ProductScreen;
});