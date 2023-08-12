odoo.define('pos_home_delivery.NumpadWidget', function(require) {
    "use strict";

    const Registries = require('point_of_sale.Registries');
    let core = require('web.core');
    let _t = core._t;
    const ProductScreen = require('point_of_sale.ProductScreen');
    const NumpadWidget = require('point_of_sale.NumpadWidget');

    const BiNumpadWidget = NumpadWidget => class extends NumpadWidget {
        async sendInput(key) {
            if (key === 'Backspace') {
                if (this.env.pos.config.pos_verify_delivery) {
                    var self = this;
                    console.log('___this.env.pos.get_order()', this.env.pos.get_order());
                    var delivery = this.env.pos.get_order().delivery;
                    if (delivery == false) {
                        this.trigger('numpad-click-input', { key });
                    } else {
                        self.showPopup('ErrorPopup', {
                            'title': _t('Cannot Remove Product'),
                            'body': _t('This order already create home delivery , You can not remove the product'),
                        });
                    }

                } else {
                    this.trigger('numpad-click-input', { key });
                }
            } else {
                this.trigger('numpad-click-input', { key });
            }
        }
    };

    Registries.Component.extend(NumpadWidget, BiNumpadWidget);
    return NumpadWidget;
});