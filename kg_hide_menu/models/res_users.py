# -*- coding: utf-8 -*-

# Klystron Global LLC
# Copyright (C) Klystron Global LLC
# All Rights Reserved
# https://www.klystronglobal.com/


from odoo import fields, models, api


class ResUsers(models.Model):
    _inherit = 'res.users'

    hide_menu_access_ids = fields.Many2many('ir.ui.menu', 'ir_ui_hide_menu_rel', 'uid', 'menu_id',
                                            string='Hide Access Menu')

    def write(self, vals):
        res = super().write(vals)
        self.self.clear_caches()
        return res


class ResGroups(models.Model):
    _inherit = 'res.groups'

    hide_menu_access_ids = fields.Many2many('ir.ui.menu', 'ir_ui_hide_menu_rel2', 'uid', 'menu_id',
                                            string='Hide Access Menu')

    def write(self, vals):
        res = super().write(vals)
        return res