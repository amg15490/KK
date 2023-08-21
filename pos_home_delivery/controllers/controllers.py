# -*- coding: utf-8 -*-
import json
import io
import os
import base64

from odoo import http
from odoo.http import request


class Kosharykda(http.Controller):

    @http.route('/', auth='public')
    def landing(self, **kw):
        # return "hello world"
        return http.request.render('pos_home_delivery.my_landing')

    @http.route('/menu', auth='public')
    def menu(self, **kw):
        # return "hello world"
        return http.request.render('pos_home_delivery.my_menu')
