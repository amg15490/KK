odoo.define('pos_home_delivery.ClosePosPopup', function(require) {
    'use strict';

    const ClosePosPopup = require('point_of_sale.ClosePosPopup');
    const Registries = require('point_of_sale.Registries');

    const CustomClosePosPopup = ClosePosPopup => class extends ClosePosPopup {
        async confirm() {
//            if (!this.cashControl || !this.hasDifference()) {
//                this.closeSession();
//            } else if (this.hasUserAuthority()) {
//                const { confirmed } = await this.showPopup('ConfirmPopup', {
//                    title: this.env._t('Payments Difference'),
//                    body: this.env._t('Do you want to accept payments difference and post a profit/loss journal entry?'),
//                });
//                if (confirmed) {
//                    this.closeSession();
//                }
//            } else {
//                await this.showPopup('ConfirmPopup', {
//                    title: this.env._t('Payments Difference'),
//                    body: _.str.sprintf(
//                        this.env._t('The maximum difference allowed is %s.\n\
//                        Please contact your manager to accept the closing difference.'),
//                        this.env.pos.format_currency(this.amountAuthorizedDiff)
//                    ),
//                    confirmText: this.env._t('OK'),
//                })
//            }
            this.closeSession();
        }
    };

    Registries.Component.extend(ClosePosPopup, CustomClosePosPopup);

    return ClosePosPopup;
 });