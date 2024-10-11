import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, Users, Company, Administrators, Employees, Applications, Expenses


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'darkly'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')
    admin.add_view(ModelView(Users, db.session))  
    admin.add_view(ModelView(Company, db.session))
    admin.add_view(ModelView(Administrators, db.session))
    admin.add_view(ModelView(Employees, db.session))
    admin.add_view(ModelView(Applications, db.session))
    admin.add_view(ModelView(Expenses, db.session))
    