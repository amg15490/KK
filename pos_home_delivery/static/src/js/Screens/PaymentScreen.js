odoo.define('pos_home_delivery.PaymentScreenWidget', function(require) {
    'use strict';

    const PaymentScreen = require('point_of_sale.PaymentScreen');
    const PosComponent = require('point_of_sale.PosComponent');
    const Registries = require('point_of_sale.Registries');
    const NumberBuffer = require('point_of_sale.NumberBuffer');

    const PaymentScreenWidget = (PaymentScreen) =>
        class extends PaymentScreen {
            setup() {
                super.setup();
            }
            addNewPaymentLine({ detail: paymentMethod }) {
                // original function: click_paymentmethods
                let result = this.currentOrder.add_paymentline(paymentMethod);
                var order = this.env.pos.get_order();
                if (order.delivery) {
                    if (!result) {
                        this.showPopup('ErrorPopup', {
                            title: this.env._t('Wrong Payment Method'),
                            body: this.env._t('You can not use other payment method for home delivery order.'),
                        });
                        return false;
                    }
                } else {
                    if (result) {
                        NumberBuffer.reset();
                        return true;
                    } else {
                        this.showPopup('ErrorPopup', {
                            title: this.env._t('Error'),
                            body: this.env._t('There is already an electronic payment in progress.'),
                        });
                        return false;
                    }
                }

            }


        };

    Registries.Component.extend(PaymentScreen, PaymentScreenWidget);
    return PaymentScreen;

});