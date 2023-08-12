odoo.define('pos_home_delivery.models', function(require) {
    "use strict";

    var { PosGlobalState, Order, Payment } = require('point_of_sale.models');
    const Registries = require('point_of_sale.Registries');

    const PosHomePosGlobalState = (PosGlobalState) => class PosHomePosGlobalState extends PosGlobalState {
        //@override
        async _processData(loadedData) {
            await super._processData(...arguments);
            this.users = loadedData['users'];
            this.product_delivery = loadedData['product_delivery'];
        }
    }
    Registries.Model.extend(PosGlobalState, PosHomePosGlobalState);

    const PosOrder = (Order) => class PosOrder extends Order {
        constructor(obj, options) {
            super(...arguments);
            this.d_name = this.d_name || "";
            this.mobile = this.mobile || "";
            this.email = this.email || "";
            this.address = this.address || "";
            this.street = this.street || "";
            this.city = this.city || "";
            this.zip = this.zip || "";
            this.delivery_date = this.delivery_date || "";
            this.person_id = this.person_id || "";
            this.order_note = this.order_note || "";
            this.delivery = this.delivery || false;
        }

        set_delivery_data(fields) {
            this.d_name = fields.d_name;
            this.mobile = fields.mobile;
            this.email = fields.email;
            this.address = fields.address;
            this.street = fields.street;
            this.city = fields.city;
            this.zip = fields.zip || "";
            this.delivery_date = fields.delivery_date;
            this.person_id = fields.person_id;
            this.order_note = fields.order_note;
        }

        set_delivery_status(delivery) {
            this.delivery = delivery;
        }

        get_delivery_status(delivery) {
            return this.delivery;
        }

        get_div_name(d_name) {
            return this.d_name;
        }

        get_div_email(email) {
            return this.email;
        }

        get_div_mobile(mobile) {
            return this.mobile;
        }

        get_div_location(address) {
            return this.address;
        }

        get_div_street(street) {
            return this.street;
        }

        get_div_city(city) {
            return this.city;
        }

        get_div_zip(zip) {
            return this.zip;
        }

        get_delivery_date(delivery_date) {
            return this.delivery_date;
        }

        get_div_person(person_id) {
            return this.person_id;
        }

        get_div_note(order_note) {
            return this.order_note;
        }

        init_from_JSON(json) {
            super.init_from_JSON(...arguments);
            this.d_name = json.d_name;
            this.mobile = json.mobile;
            this.email = json.email;
            this.address = json.address;
            this.street = json.street;
            this.city = json.city;
            this.zip = json.zip;
            this.delivery_date = json.delivery_date;
            this.person_id = json.person_id;
            this.order_note = json.order_note;
            this.delivery = json.delivery;
        }
        export_as_JSON() {
            const json = super.export_as_JSON(...arguments);
            json.d_name = this.d_name;
            json.mobile = this.mobile;
            json.email = this.email;
            json.address = this.address;
            json.street = this.street;
            json.city = this.city;
            json.zip = this.zip;
            json.delivery_date = this.delivery_date;
            json.person_id = this.person_id;
            json.order_note = this.order_note;
            json.delivery = this.delivery;
            return json;
        }
        add_paymentline(payment_method) {
            this.assert_editable();
            if (this.electronic_payment_in_progress()) {
                return false;
            } else {
                var order = this.pos.get_order();
                if (order.delivery) {
                    if (payment_method.is_home_delivery) {
                        this.assert_editable();
                        if (this.electronic_payment_in_progress()) {
                            return false;
                        } else {
                            var newPaymentline = Payment.create({}, { order: this, payment_method: payment_method, pos: this.pos });
                            this.paymentlines.add(newPaymentline);
                            this.select_paymentline(newPaymentline);
                            if (this.pos.config.cash_rounding) {
                                this.selected_paymentline.set_amount(0);
                            }
                            newPaymentline.set_amount(this.get_due());

                            if (payment_method.payment_terminal) {
                                newPaymentline.set_payment_status('pending');
                            }
                            return newPaymentline;
                        }
                    } else {
                        return false
                    }
                } else {
                    this.assert_editable();
                    if (this.electronic_payment_in_progress()) {
                        return false;
                    } else {
                        var newPaymentline = Payment.create({}, { order: this, payment_method: payment_method, pos: this.pos });
                        this.paymentlines.add(newPaymentline);
                        this.select_paymentline(newPaymentline);
                        if (this.pos.config.cash_rounding) {
                            this.selected_paymentline.set_amount(0);
                        }
                        newPaymentline.set_amount(this.get_due());

                        if (payment_method.payment_terminal) {
                            newPaymentline.set_payment_status('pending');
                        }
                        return newPaymentline;
                    }
                }

            }
        }
    }
    Registries.Model.extend(Order, PosOrder);

});