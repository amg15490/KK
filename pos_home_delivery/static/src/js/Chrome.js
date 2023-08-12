odoo.define('pos_home_delivery.Chrome', function(require) {
    'use strict';

    const Chrome = require('point_of_sale.Chrome');
    const Registries = require('point_of_sale.Registries');

    const CustomChrome = Chrome => class extends Chrome {
        openCashControl() {
//            if (this.shouldShowCashControl()) {
//                this.showPopup('CashOpeningPopup');
//            }
        }
    };

    Registries.Component.extend(Chrome, CustomChrome);

    return Chrome;
 });