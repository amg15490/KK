# -*- coding: utf-8 -*-
# Part of BrowseInfo. See LICENSE file for full copyright and licensing details.
{
    'name': 'POS Delivery',
    'version': '16.0.0.4',
    # 'author': 'BrowseInfo',
    'sequence': 120,
    'category': 'Point of sale',
    # 'website': 'https://www.browseinfo.in',
    'summary': '',
    'description': """ 

""",
    'depends': ['base','pos_restaurant',],
    'data': [
        'data/data.xml',
        'security/ir.model.access.csv',
        'views/pos_delivery_view.xml',
        'templates/layout.xml',
        'templates/landing.xml',
        'templates/menu.xml',

    ],
    'assets': {
        'point_of_sale.assets': [
            'pos_home_delivery/static/src/css/pos_delivery_css.css',
            'pos_home_delivery/static/src/css/datetime.css',
            'pos_home_delivery/static/src/js/Popup/DatetimeSelectWidget.js',
            'pos_home_delivery/static/src/js/Popup/DeliveryOrderWidget.js',
            'pos_home_delivery/static/src/js/Screens/ActionpadWidget.js',
            'pos_home_delivery/static/src/js/Screens/HomeDelivery.js',
            'pos_home_delivery/static/src/js/Screens/OrderReceipt.js',
            'pos_home_delivery/static/src/js/Screens/PaymentScreen.js',
            'pos_home_delivery/static/src/js/datetime.js',
            'pos_home_delivery/static/src/js/Screens/NumpadWidget.js',
            'pos_home_delivery/static/src/js/models.js',
            'pos_home_delivery/static/src/js/Chrome.js',
            'pos_home_delivery/static/src/js/ClosePosPopup.js',
            'pos_home_delivery/static/src/xml/**/*',
        ],
    },
    'installable': True,
    'application': False,
    'price': 25.78,
    'currency': "EUR",
    # "images": ["static/description/Banner.gif"],
    # "live_test_url": "https://youtu.be/hRXeleLmtZM",
    'license': 'OPL-1',
}

