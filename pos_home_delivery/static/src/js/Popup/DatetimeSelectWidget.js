odoo.define('pos_home_delivery.DatetimeSelectWidget', function(require) {
    'use strict';

    const AbstractAwaitablePopup = require('point_of_sale.AbstractAwaitablePopup');
    const Registries = require('point_of_sale.Registries');
    const { onMounted } = owl;

    // formerly DatetimeSelectWidgetWidget
    class DatetimeSelectWidget extends AbstractAwaitablePopup {

        setup() {
            super.setup();
            onMounted(this.onMounted);
        }

        onMounted() {
            $('#del_date').datetimepicker({
                format: 'YYYY-MM-DD HH:mm:ss',
                inline: true,
                sideBySide: true
            });
        }

        async select() {
            this.env.posbus.trigger('close-popup', {
                popupId: this.props.id,
                response: { confirmed: false, payload: null },
            });
        }

        cancel() {
            this.env.posbus.trigger('close-popup', {
                popupId: this.props.id,
                response: { confirmed: false, payload: null },
            });
        }
    }
    DatetimeSelectWidget.template = 'DatetimeSelectWidget';
    DatetimeSelectWidget.defaultProps = {
        confirmText: 'Select',
        cancelText: 'Cancel',
        title: 'Select Date',
        body: '',
    };

    Registries.Component.add(DatetimeSelectWidget);

    return DatetimeSelectWidget;
});
