from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timezone


db = SQLAlchemy()


class Companies(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    date_recored = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.now(timezone.utc))

    def __repr__(self):
        return f'Companies {self.id} - {self.name}'

    def serialize(self):
        return{'id': self.id,
               'name': self.name} 


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    is_app_admin = db.Column(db.Boolean(), unique=False, nullable=False)
    is_company_admin = db.Column(db.Boolean(), default=False, nullable=False)
    date = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.now(timezone.utc))
    company_id = db.Column(db.Integer, db.ForeignKey('companies.id'))
    companies_to = db.relationship('Companies', foreign_keys=[company_id], backref=db.backref('users_to'), lazy='select')

    def __repr__(self):
        return f'User {self.id} - {self.email}'

    def serialize(self):
        return {'id': self.id,
                'email': self.email,
                'is_active': self.is_active,
                'is_app_admin': self.is_app_admin,
                'is_company_admin': self.is_company_admin,
                'date': self.date,
                'company_id': self.company_id}


class Administrators(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    last_name = db.Column(db.String, unique=False, nullable=False)
    date_created = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.now(timezone.utc))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('administrator_to', lazy='select'))

    def __ref__(self):
        return f'Administrators {self.id} - {self.name} - {self.last_name}'

    def serialize(self):
        user_data = self.user_to.serialize() if self.user_to else {} 
        return {'id': self.id,
                'name': self.name,
                'last_name': self.last_name,
                'date_created': self.date_created,
                **user_data
                }


class Employees(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=False, nullable=False)
    last_name = db.Column(db.String, unique=False, nullable=False)
    date_created = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.now(timezone.utc))
    budget_limit = db.Column(db.Integer, unique=False, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('employee_to', lazy='select'))

    def __ref__(self):
        return f'Employees {self.id} - {self.name} {self.last_name}'

    def serialize(self):
        user_data = self.user_to.serialize() if self.user_to else {} 
        return {
            'id': self.id,
            'name': self.name,
            'last_name': self.last_name,
            'date_created': self.date_created,
            'budget_limit': self.budget_limit,
            **user_data  
        }


class Applications(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, unique=False, nullable=False)
    creation_date = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.now(timezone.utc))
    approved_date = db.Column(db.DateTime(timezone=True))
    reviewed_date = db.Column(db.DateTime(timezone=True))
    is_approved = db.Column(db.Boolean, nullable=False, default=False)
    amount = db.Column(db.Float, unique=False, nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    employee_to = db.relationship('Employees', foreign_keys=[employee_id], backref=db.backref('applications_employee_to', lazy='select'))
    approved_by = db.Column(db.Integer, db.ForeignKey('employees.id'))
    approved_to = db.relationship('Employees', foreign_keys=[approved_by], backref=db.backref('applications_approved_to', lazy='select'))
    reviewed_by = db.Column(db.Integer, db.ForeignKey('employees.id'))
    reviewed_to = db.relationship('Employees', foreign_keys=[reviewed_by], backref=db.backref('applications_reviewed_to', lazy='select'))

    def __ref__(self):
        return f'Applications {self.id} - {self.employee_id}'
    
    def serialize(self):
        return {'id': self.id,
                'description': self.description,
                'creation_date': self.creation_date,
                'approved_date': self.approved_date,
                'reviewed_date': self.reviewed_date,
                'is_approved': self.is_approved,
                'amount': self.amount}

      
class Histories(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    period = db.Column(db.DateTime, nullable=False)
    amount = db.Column(db.Float, unique=False, nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employees.id'))
    employee_to = db.relationship('Employees', foreign_keys=[employee_id], backref=db.backref('history_to', lazy='select'))

    def __ref__(self):
        return f'Histories {self.id} - {self.period} - {self.employee_id}'

    def serialize(self):
        return {'id': self.id,
                'description': self.description,
                'period': self.period,
                'amount': self.amount}


class Expenses(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String, unique=False, nullable=False)
    amount = db.Column(db.Float, unique=False, nullable=False)
    vouchers = db.Column(db.String, nullable=True)
    date = db.Column(db.DateTime(timezone=True), nullable=False, default=datetime.now(timezone.utc))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    user_to = db.relationship('Users', foreign_keys=[user_id], backref=db.backref('expenses_to', lazy='select'))

    def __ref__(self):
        return f'Expenses {self.id} - {self.amount} - {self.date}'

    def serialize(self):
        return {'id': self.id,
                'description': self.description,
                'amount': self.amount,
                'date': self.date.isoformat(),
                'vouchers': self.vouchers if self.vouchers else None}


