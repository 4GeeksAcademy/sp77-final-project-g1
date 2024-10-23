"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import datetime, timezone
from api.models import db, Companies, Users, Administrators, Applications, Histories, Expenses, Employees
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
# import requests

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route("/login", methods=["POST"]) 
def login():
    response_body = {}
    data = request.json
    email = data.get("email", None)
    password = data.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active)).scalar()
    if not user:
        response_body["message"]="Bad email or password"
        return response_body, 401
    access_token = create_access_token(identity={'email': user.email, 'user_id': user.id, 'is_app_admin': user.is_app_admin, 'company_id': user.company_id})
    response_body["message"] = f'Bienvenida {email}'
    response_body['results'] = user.serialize()
    return response_body, 200

@api.route("/sign-up", methods=['POST'])
def signup():
    response_body = {}
    data = request.json
    row = Users(email = data.get("email"),
                password = data.get("password"),
                is_active = True,
                is_app_admin = False,
                company_id = 1)

    db.session.add(row)
    db.session.commit()
    response_body['message'] = f'Bienvenido {data.get("email")}'
    response_body['results'] = {}
    return response_body, 200


@api.route('/companies', methods=['GET', 'POST'])
def companies():
    # Obtengo del toker(del current user) si el usuario es appadmin. Si no lo es, permiso denegado, contrario, continua. 
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Companies)).scalars()
        # Validar: si row no tiene datos 40x no hay regristro para mostrar
        if not rows:
            response_body['message'] = f'Company no existe'
            response_body['result'] = {}
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas las compañias (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json()
        # Validar: si data trae el name, sino: datos incorrectos (para el token)
        row = Companies(name = data.get('name'),
                        date_recored = datetime.now())
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando una compañia (POST)'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/users', methods=['GET', 'POST'])
def users():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        if not rows:
            response_body['message'] = f'Company no existe'
            response_body['result'] = {}
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todos las users (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json()
        row = Companies(email = data.get('email'),
                        password = data.get('password'),
                        is_active = data.get('is_asctive'),
                        is_app_admin = data.get('is_app_admin'),
                        date = datetime.now(),
                        company_id = data.get('company_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando una compañia (POST)'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/administrators', methods=['GET', 'POST'])
def administrators():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Administrators)).scalars()
        if not rows:
            response_body['message'] = f'Administrador no existe'
            response_body['result'] = {}
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todos las adminitradores (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json()
        row = Companies(name = data.get('name'),
                        last_name = data.get('last_name'),
                        date = datetime.now(),
                        user_id = data.get('user_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando un administrador (POST)'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/employees', methods=['GET', 'POST'])
def employees():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Employees).scalars())
        if not rows:
            response_body['message'] = f'Employee no existe'
            response_body['result'] = {}
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todos las empleados (GET)'
        response_body['results'] = result
        return response_body, 200
        if request.method == 'POST':
            data = request.json()
            row = Companies(name = data.get('name'),
                            last_name = data.get('last_name'),
                            date = datetime.now(),
                            budget_limit = data.get('budget_limit'),
                            user_id = data.get('user_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando un administrador (POST)'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/applications', methods=['GET', 'POST'])
def applications():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Applications).scalars())
        if not rows:
            response_body['message'] = f'Applications no existe'
            response_body['result'] = {}
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas las solicitudes (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json()
        row = Applications(description = data.get('description'),
                           amount = data.get('amount'),
                           employee_id = data.get('employee_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando una solicitud (POST)'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/histories', methods=['GET', 'POST'])
def histories():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Histories).scalars())
        if not rows:
            response_body['message'] = f'Historial no existe'
            response_body['result'] = {}
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Historial (GET)'
        response_body['results'] = result
        return response_body, 200
        if request.method == 'POST':
            data = request.json()
            row = Companies(period = data.get('period'),
                            amount = data.get('amount'),
                            employee_id = data.get('employee_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando un revision historial (POST)'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/expenses', methods=['GET', 'POST'])
def expenses():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Expenses).scalars())
        if not rows:
            response_body['message'] = f'Gastos no existen'
            response_body['result'] = {}
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Gastos (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json()
        row = Companies(amount = float(data.form.get('amount')),
                        vouchers = data.form.get('vouchers'),
                        date = datetime.now())
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando un revision historial (POST)'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/companies/<int:id>', methods=['GET','PUT', 'DELETE'])
def company(id):
    response_body = {}
    rows = db.session.execute(db.select(Companies).where(Companies.id == id)).scalar()
    if not rows:
        response_body['message'] = f'Compañia no existe'
        response_body['result'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = 'Compañia (GET)'
        response_body['results'] = rows.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        rows.name = data.get('name')
        db.session.commit()
        response_body['message'] = f'La compañía ha sido modificada'
        response_body['result'] = rows.serialize()
        return response_body, 201
    if request.method == 'DELETE':
        db.session.delete(rows)
        db.session.commit()
        response_body['message'] = f'Compañía eliminada'
        response_body['result'] = {}
        return response_body, 200


@api.route('/users/<int:id>', methods=['GET','PUT', 'DELETE'])
def user(id):
    response_body = {}
    rows = db.session.execute(db.select(Users).where(Users.id == id)).scalar()
    if not rows:
        response_body['message'] = f'Usuario no existe'
        response_body['result'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = 'Usuario (GET)'
        response_body['results'] = rows.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        rows.email = data.get('email')
        rows.password = data.get('password')
        rows.is_active = data.get('is_active')
        db.session.commit()
        response_body['message'] = f'El usuario {id} ha sido modificada'
        response_body['result'] = rows.serialize()
        return response_body, 201
    if request.method == 'DELETE':
        db.session.delete(rows)
        db.session.commit()
        response_body['message'] = f'Usuario eliminado'
        response_body['result'] = {}
        return response_body, 200


@api.route('/administrators/<int:id>', methods=['GET','PUT', 'DELETE'])
def admin(id):
    response_body = {}
    rows = db.session.execute(db.select(Administrators).where(Administrators.id == id)).scalar()
    if not rows:
        response_body['message'] = f'Administrador no existe'
        response_body['result'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = 'Administrador (GET)'
        response_body['results'] = rows.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        rows.name = data.get('name')
        rows.last_name = data.get('last_name')
        db.session.commit()
        response_body['message'] = f'El Administrador {id} ha sido modificada'
        response_body['result'] = rows.serialize()
        return response_body, 201
    if request.method == 'DELETE':
        db.session.delete(rows)
        db.session.commit()
        response_body['message'] = f'Administrador eliminado'
        response_body['result'] = {}
        return response_body, 200


@api.route('/employees/<int:id>', methods=['GET','PUT', 'DELETE'])
def employee(id):
    response_body = {}
    rows = db.session.execute(db.select(Employees).where(Employees.id == id)).scalar()
    if not rows:
        response_body['message'] = f'Empleado no existe'
        response_body['result'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = 'Empleado (GET)'
        response_body['results'] = rows.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        rows.name = data.get('name')
        rows.last_name = data.get('last_name')
        rows.budget_limit = data.get('budget_limit')
        db.session.commit()
        response_body['message'] = f'El empleado {id} ha sido modificada'
        response_body['result'] = rows.serialize()
        return response_body, 201
    if request.method == 'DELETE':
        db.session.delete(rows)
        db.session.commit()
        response_body['message'] = f'Empleado eliminado'
        response_body['result'] = {}
        return response_body, 200
    

@api.route('/applications/<int:id>', methods=['GET','PUT', 'DELETE'])
def application(id):
    response_body = {}
    rows = db.session.execute(db.select(Applications).where(Applications.id == id)).scalar()
    if not rows:
        response_body['message'] = f'solicitud no existe'
        response_body['result'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = 'solicitudes (GET)'
        response_body['results'] = rows.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        rows.description = data.get('description')
        rows.amount = data.get('amount')
        rows.approved_date = data.get('approved_date')
        rows.reviewed_date = data.get('reviewed_date')
        rows.is_approved = data.get('is_approved')
        db.session.commit()
        response_body['message'] = f'solicitud {id} ha sido modificada'
        response_body['result'] = rows.serialize()
        return response_body, 201
    if request.method == 'DELETE':
        db.session.delete(rows)
        db.session.commit()
        response_body['message'] = f'solicitud eliminado'
        response_body['result'] = {}
        return response_body, 200
    

@api.route('/histories/<int:id>', methods=['GET'])
def history(id):
    response_body = {}
    rows = db.session.execute(db.select(Histories).where(Histories.id == id)).scalar()
    if not rows:
        response_body['message'] = f'Historial no existe'
        response_body['result'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = 'Historial (GET)'
        response_body['results'] = rows.serialize()
        return response_body, 200


@api.route('/expenses/<int:id>', methods=['GET','PUT', 'DELETE'])
def expenditure(id):
    response_body = {}
    rows = db.session.execute(db.select(Expenses).where(Expenses.id == id)).scalar()
    if not rows:
        response_body['message'] = f'gasto no existe'
        response_body['result'] = {}
        return response_body, 404
    if request.method == 'GET':
        response_body['message'] = 'gasto (GET)'
        response_body['results'] = rows.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        rows.amount = data.get('amount')
        rows.vouchers = data.get('vouchers')
        db.session.commit()
        response_body['message'] = f'gasto {id} ha sido modificada'
        response_body['result'] = rows.serialize()
        return response_body, 201
    if request.method == 'DELETE':
        db.session.delete(rows)
        db.session.commit()
        response_body['message'] = f'gasto eliminado'
        response_body['result'] = {}
        return response_body, 200
      
