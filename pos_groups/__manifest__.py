# -*- coding: utf-8 -*-
#############################################################################
#
#    Cybrosys Technologies Pvt. Ltd.
#
#    Copyright (C) 2022-TODAY Cybrosys Technologies(<https://www.cybrosys.com>)
#    Author: Cybrosys Techno Solutions(<https://www.cybrosys.com>)
#
#    You can modify it under the terms of the GNU LESSER
#    GENERAL PUBLIC LICENSE (LGPL v3), Version 3.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU LESSER GENERAL PUBLIC LICENSE (LGPL v3) for more details.
#
#    You should have received a copy of the GNU LESSER GENERAL PUBLIC LICENSE
#    (LGPL v3) along with this program.
#    If not, see <http://www.gnu.org/licenses/>.
#
#############################################################################

{
    'name': "POS Groups",
    'version': "16.0.1.0.1",
    'summary': """POS Groups """,
    'description': """""",

    'category': 'Tools',
    'depends': ['multi_branch_pos'],
    'data': [
        'security/branch_security.xml',
        # 'security/ir.model.access.csv',
        # 'views/res_branch_views.xml',
        # 'views/branch_product_template_views.xml',
        # 'views/branch_res_partner_views.xml',
        # 'views/branch_sale_order_views.xml',
        # 'views/branch_purchase_order_views.xml',
        # 'views/branch_res_users_views.xml',
        # 'views/branch_stock_picking_views.xml',
        # 'views/branch_account_move_views.xml',
        # 'views/branch_account_payment_views.xml',
        # 'views/branch_account_journal.xml',
        # 'views/branch_account_views.xml',
        # 'views/branch_stock_warehouse_views.xml',
        # 'views/branch_report_template.xml',
    ],
    # 'images': ['static/description/banner.png'],
    'license': "AGPL-3",
    'installable': True,
    'application': False
}
