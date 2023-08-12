odoo.define('pos_home_delivery.DeliveryOrderWidget', function(require) {
    'use strict';

    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');
    const { useListener } = require("@web/core/utils/hooks");
    const { onMounted } = owl;
    var field_utils = require('web.field_utils');

    // formerly DeliveryOrderWidgetWidget
    class DeliveryOrderWidget extends AbstractAwaitablePopup {

        setup() {
            super.setup();
            let order = this.env.pos.get_order();
            this.name = order.get_div_name();
            this.mobile = order.get_div_mobile();
            this.email = order.get_div_email();
            this.address = order.get_div_location();
            this.street = order.get_div_street();
            this.city = order.get_div_city();
            this.zip = order.get_div_zip();
            this.person_id = order.get_div_person();
            this.order_note = order.get_div_note();
            this.delivery_date = order.get_delivery_date();
            this.delivery_note = order.delivery_note;
            onMounted(this.onMounted);
        }

        onMounted() {
            $('#dell_date').datetimepicker({
                format: 'YYYY-MM-DD HH:mm:ss',
                inline: true,
                sideBySide: true
            });

            let order = this.env.pos.get_order();
            $('.delivery-detail').hide();

            $('#delivery_date').hide();
            $('#street').hide();
            $('#zip').hide();
            $('#mobile').hide();
            $('#d_name').hide();
            $('#city').hide();
            $('#address').hide();
            $('#delivery_person').hide();
            $('#bi_delivery_note').hide();
            $('#dd_date').hide();

            $('#form1,#apply_shipping_address').click(function() {
                if ($('#apply_shipping_address').is(':checked')) {
                    $('#apply_shipping_address').prop('checked', false);
                } else {
                    $('#apply_shipping_address').prop('checked', true);
                }

                if ($('#apply_shipping_address').is(':checked')) {
                    $('.delivery-detail').show();
                    $('#default').hide()
                } else {
                    $('.delivery-detail').hide();
                    $('#default').show()

                    $('#delivery_date').hide();
                    $('#street').hide();
                    $('#zip').hide();
                    $('#mobile').hide();
                    $('#d_name').hide();
                    $('#city').hide();
                    $('#address').hide();
                    $('#delivery_person').hide();
                    $('#bi_delivery_note').hide();
                    $('#dd_date').hide();
                }
            });
        }

        async create() {
            let self = this;
            let order = this.env.pos.get_order();
            let order_lines = self.get_orderline_data()
            let rpc1 = false;
            if (order_lines.length > 0) {
                let fields = {};
                $('.detail').each(function(idx, el) {
                    fields[el.name] = el.value || false;
                });
                if (!fields.delivery_date) {
                    $('#dd_date').show()
                    setTimeout(function() { $('#dd_date').hide() }, 3000);
                    $('#tab2').prop('checked', true);
                    return
                }
                order.set_delivery_data(fields);

                this.d_date = new Date(fields.delivery_date);
                fields.delivery_date = this.d_date;

                let partner = order.get_partner();
                let delivery_product = self.env.pos.product_delivery[0];

                let order_date = new Date();
                let order_data = {
                    'order_no': order.name || order.uid || false,
                    'session_id': order.pos.pos_session.id || order.pos_session_id,
                    'order_date': order_date || false,
                    'cashier_id': order.pos.user.id || false,
                }
                let orderlines = self.get_orderline_data();
                let notes = $('.order_note').val();
                let delivery_person = $('.person_id').val();
                let delivery_note = $('.delivery_note').val();
                let other_addrs = $("#apply_shipping_address").is(':checked') ? 1 : 0;

                let result = {
                    'form_data': fields,
                    'order_data': order_data,
                    'line_data': order_lines,
                    'partner': partner,
                    'other_addrs': other_addrs,
                }

                let date_delivery = $('#my_date').val();
                var dd_date = new Date(date_delivery);
                date_delivery = field_utils.format.datetime(moment(date_delivery), {}, { timezone: false });
                if ($('#apply_shipping_address').is(':checked')) {
                    if (fields.d_name == false) {
                        $('#apply_shipping_address').prop('checked', true);
                        $('.delivery-detail').show();
                        $('#default').hide()
                        $('#d_name').show()
                        setTimeout(function() { $('#d_name').hide() }, 3000);
                        $('#tab1').prop('checked', true);
                        return
                    } else if (fields.mobile == false) {
                        $('.delivery-detail').show();
                        $('#mobile').show()
                        setTimeout(function() { $('#mobile').hide() }, 3000);
                        $('#default').hide()
                        $('#tab1').prop('checked', true);
                        return
                    } else if (fields.address == false) {
                        $('.delivery-detail').show();
                        $('#address').show()
                        setTimeout(function() { $('#address').hide() }, 3000);
                        $('#default').hide()
                        $('#tab1').prop('checked', true);
                        return
                    } else if (fields.street == false) {
                        $('.delivery-detail').show();
                        $('#street').show()
                        setTimeout(function() { $('#street').hide() }, 3000);
                        $('#default').hide()
                        $('#tab1').prop('checked', true);
                        return
                    } else if (fields.city == false) {
                        $('.delivery-detail').show();
                        $('#city').show()
                        setTimeout(function() { $('#city').hide() }, 3000);
                        $('#default').hide()
                        $('#tab1').prop('checked', true);
                        return
                    } else if (fields.zip == false) {
                        $('.delivery-detail').show();
                        $('#zip').show()
                        setTimeout(function() { $('#zip').hide() }, 3000);
                        $('#default').hide()
                        $('#tab1').prop('checked', true);
                        return
                    } else if (fields.delivery_date == false) {
                        $('.delivery-detail').show();
                        $('#delivery_date').show()
                        setTimeout(function() { $('#delivery_date').hide() }, 3000);
                        $('#default').hide()
                        $('#tab2').prop('checked', true);
                        return
                    } else if (fields.person_id == false) {
                        $('.delivery-detail').show();
                        $('#delivery_person').show()
                        $('#default').hide()
                        setTimeout(function() { $('#delivery_person').hide() }, 3000);
                        $('#tab2').prop('checked', true);
                        return
                    } else if (fields.delivery_note == false) {
                        // $('.delivery-detail').show();
                        $('#bi_delivery_note').show()
                        $('#default').hide()
                        setTimeout(function() { $('#bi_delivery_note').hide() }, 3000);
                        $('#tab3').prop('checked', true);
                        return
                    } else {
                        let delivery_config_id = self.env.pos.config.id;
                        let delivery_charges = self.env.pos.delivery_charges

                        if (delivery_charges) {
                            for (let d = 0; d < delivery_charges.length; d++) {
                                if (delivery_charges[d].config_id[0] == delivery_config_id) {
                                    if (delivery_charges[d].delivery_addr[1] == result.form_data.zip) {
                                        order.add_product(self.env.pos.db.product_by_id[delivery_product.id], { price: delivery_charges[d].price });
                                    }
                                }
                            }
                        }

                        rpc1 = this.rpc({
                                model: 'pos.delivery.order',
                                method: 'delivery_order_from_ui',
                                args: [result],
                            })
                            .then(function(data) {
                                if (data) {
                                    fields = {};
                                    order.set_delivery_status(true);
                                    if (order.delivery) {
                                        console.log('___in iff', );
                                        alert('Home Delivery order successfully created.');
                                        self.cancel();

                                    }
                                    return data;
                                } else {
                                    console.log('___in else', );
                                    alert('Home Delivery order can not be modify.');
                                    self.cancel();
                                    return data;
                                }
                            }, function(err, event) {
                                event.preventDefault();
                                self.showPopup('ErrorPopup', {
                                    'title': _t('Delivery Order not Created'),
                                    'body': _t('Please fill your details properly.'),
                                });
                                return false;
                            });
                    }
                } else {
                    if (fields.person_id == false) {
                        $('#delivery_person').show()
                        setTimeout(function() { $('#delivery_person').hide() }, 3000);
                        $('#tab2').prop('checked', true);
                        return
                    } else if (fields.delivery_note == false) {
                        $('#bi_delivery_note').show()
                        $('#default').hide()
                        setTimeout(function() { $('#bi_delivery_note').hide() }, 3000);
                        $('#tab3').prop('checked', true);
                        return
                    } else if (fields.delivery_date == false) {
                        $('#delivery_date').show()
                        setTimeout(function() { $('#delivery_date').hide() }, 3000);
                        $('#tab2').prop('checked', true);
                        return
                    } else {

                        let delivery_config_id = self.env.pos.config.id;
                        order.set_delivery_data({
                            address: "",
                            city: "",
                            d_name: "",
                            delivery_date: fields.delivery_date,
                            email: "",
                            mobile: "",
                            order_note: fields.order_note,
                            person_id: fields.person_id,
                            delivery_note: fields.delivery_note,
                            street: "",
                            zip: ""
                        });
                        console.log('___1', );
                        rpc1 = this.rpc({
                                model: 'pos.delivery.order',
                                method: 'delivery_order_from_ui_with_partner',
                                args: [partner, order_data, orderlines, dd_date, notes, delivery_person, delivery_note],
                            })
                            .then(function(data) {
                                if (data) {
                                    fields = {};
                                    order.set_delivery_status(true);
                                    if (order.delivery) {
                                        alert('Home Delivery order successfully created.');
                                        self.cancel();
                                        return data;
                                    }

                                } else {
                                    alert('Home Delivery order can not be modify.');
                                    self.cancel();
                                    return data;
                                }
                            }, function(err, event) {
                                event.preventDefault();
                                self.showPopup('ErrorPopup', {
                                    'title': _t('Delivery Order not Created'),
                                    'body': _t('Please fill your details properly.'),
                                });
                                return false;
                            });
                    }
                }


                if (!delivery_person) {
                    self.showPopup('DeliveryOrderWidget', {});
                    $('#delivery_person').show()
                    $('.delivery-detail').show();
                    $('#default').hide()
                    $('#tab2').prop('checked', true);
                    return
                }
                if (!delivery_note) {
                    self.showPopup('DeliveryOrderWidget', {});
                    $('#bi_delivery_note').show()
                        // $('.delivery-detail').show();
                    $('#default').hide()
                    $('#tab3').prop('checked', true);
                    return
                }
            }

            $.when(rpc1).done(function() {
                this.env.posbus.trigger('close-popup', {
                    popupId: this.props.id,
                    response: { confirmed: false, payload: null },
                });
            });
        }

        get_orderline_data() {
            let order = this.env.pos.get_order();
            let orderlines = order.orderlines;
            let all_lines = [];
            for (let i = 0; i < orderlines.length; i++) {
                let line = orderlines[i]
                if (line && line.product && line.quantity !== undefined) {
                    all_lines.push({
                        'product_id': line.product.id,
                        'qty': line.quantity,
                        'price': line.get_display_price(),
                        'note': line.get_note(),
                    })
                }
            }
            return all_lines
        }

        cancel() {
            this.env.posbus.trigger('close-popup', {
                popupId: this.props.id,
                response: { confirmed: false, payload: null },
            });
        }

        clear() {
            $('.detail').val('');
            $('.d_name').focus();
        }
    }
    DeliveryOrderWidget.template = 'DeliveryOrderWidget';
    DeliveryOrderWidget.defaultProps = {
        confirmText: 'Create',
        cancelText: 'Cancel',
        clearText: 'Clear',
        title: 'Home Delivery Order',
        body: '',
    };

    Registries.Component.add(DeliveryOrderWidget);

    return DeliveryOrderWidget;
});