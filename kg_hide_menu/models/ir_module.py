# -*- coding: utf-8 -*-

# Klystron Global LLC
# Copyright (C) Klystron Global LLC
# All Rights Reserved
# https://www.klystronglobal.com/


from odoo import models, api, tools


class Menu(models.Model):
    _inherit = 'ir.ui.menu'

    @api.model
    @tools.ormcache('frozenset(self.env.user.groups_id.ids)', 'debug')
    def _visible_menu_ids(self, debug=False):

        all = self.env.user.groups_id

        childs = all.implied_ids

        groups = all - childs

        menus = super(Menu, self)._visible_menu_ids(debug)

        if self.env.user.hide_menu_access_ids or groups.hide_menu_access_ids:
            for rec in self.env.user.hide_menu_access_ids | groups.hide_menu_access_ids:
                menus.discard(rec.id)
            return menus
        return menus
