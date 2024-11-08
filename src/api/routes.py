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
    response_body['access_token'] = access_token
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
@jwt_required() 
def companies():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)
    if not user.is_app_admin:
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    if request.method == 'GET':
        rows = db.session.execute(db.select(Companies)).scalars()
        if not rows:
            response_body['message'] = 'No hay compañías para mostrar'
            response_body['results'] = []
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas las compañías (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.get_json()
        if not data.get('name'):
            response_body['message'] = 'Faltan datos requeridos'
            return response_body, 400
        row = Companies(name=data.get('name'),
                        date_recored=datetime.now())
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Compañía creada exitosamente'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/users', methods=['GET', 'POST'])
@jwt_required()
def users():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)
    if not user.is_app_admin:
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    if request.method == 'GET':
        rows = db.session.execute(db.select(Users)).scalars()
        if not rows:
            response_body['message'] = f'User no existe'
            response_body['result'] = {}
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todos los users (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json()
        row = users(email = data.get('email'),
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
@jwt_required()
def administrators():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user['user_id'])
    if not user.is_app_admin and not user.is_company_admin:
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    if request.method == 'GET':
        if user.company_id == 0:
            rows = db.session.execute(db.select(Administrators)).scalars()
        else:
            rows = db.session.execute(db.select(Administrators).where(Administrators.company_id == user.company_id)).scalars()
        if not rows:
            response_body['message'] = 'No hay administradores para mostrar'
            response_body['result'] = {}
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de administradores (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        if user.company_id != 0 and not user.is_company_admin:
            response_body['message'] = 'Permiso denegado para crear administradores'
            return response_body, 403
        data = request.json
        row = Administrators(name=data.get('name'),
                             last_name=data.get('last_name'),
                             date_created=datetime.now(),
                             user_id = data.get('user_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Administrador creado exitosamente'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/employees', methods=['GET', 'POST'])
@jwt_required()
def employees():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user['user_id'])
    if not user.is_app_admin and not user.is_company_admin:
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    if request.method == 'GET':
        rows = db.session.execute(db.select(Employees)).scalars()
        if not rows:
            response_body['message'] = f'Employee no existe'
            response_body['result'] = {}
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todos las empleados (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        if user.company_id != 0 and not user.is_company_admin:
            response_body['message'] = 'Permiso denegado para crear administradores'
            return response_body, 403
        data = request.json
        row = Employees(name=data.get('name'),
                             last_name=data.get('last_name'),
                             date_created=datetime.now(),
                             budget_limit= data.get('budget_limit'),
                             user_id = data.get('user_id'))
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Creando un empleado (POST)'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/applications', methods=['GET', 'POST'])
@jwt_required()
def applications():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)
    if not user.is_app_admin and not user.is_company_admin:
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    if request.method == 'GET':
        rows = db.session.execute(db.select(Applications)).scalars()
        if not rows:
            response_body['message'] = 'No hay aplicaciones disponibles'
            response_body['result'] = {}
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Listado de todas las solicitudes (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json()
        if not user.is_company_admin and not user.is_app_admin and not user.is_employee:
            response_body['message'] = 'Permiso denegado. Solo los empleados o administradores pueden crear solicitudes'
            return response_body, 403
        row = Application(description=data.get('description'),
                           amount=data.get('amount'),
                           employee_id=current_user,
                           company_id=user.company_id)
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Solicitud creada exitosamente (POST)'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/histories', methods=['GET', 'POST'])
@jwt_required()
def histories():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)
    if not user.is_app_admin and not user.is_company_admin:
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    if request.method == 'GET':
        rows = db.session.execute(db.select(Histories)).scalars()
        if not rows:
            response_body['message'] = f'Historial no existe'
            response_body['result'] = {}
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Historial encontrado (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        if not user.is_company_admin and not user.is_app_admin and not user.is_employee:
            response_body['message'] = 'Permiso denegado'
            return response_body, 403
        data = request.json
        row = History(period = data.get('period'),
                      amount = data.get('amount'),
                      employee_id=current_user,
                      company_id=user.company_id)
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Historial creado exitosamente (POST)'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/expenses', methods=['GET', 'POST'])
@jwt_required()
def expenses():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)
    if not user.is_app_admin and not user.is_company_admin:
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    if request.method == 'GET':
        rows = db.session.execute(db.select(Expenses)).scalars()
        if not rows:
            response_body['message'] = 'No existen gastos registrados'
            response_body['results'] = []
            return response_body, 404
        result = [row.serialize() for row in rows]
        response_body['message'] = 'Gastos encontrados (GET)'
        response_body['results'] = result
        return response_body, 200
    if request.method == 'POST':
        data = request.json
        row = Expenses(amount=float(data.get('amount')),
                       vouchers=data.get('vouchers'),
                       date=datetime.now(),
                       user_id=user.id)
        db.session.add(row)
        db.session.commit()
        response_body['message'] = 'Gasto creado exitosamente (POST)'
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/companies/<int:id>', methods=['GET','PUT', 'DELETE'])
@jwt_required()
def company(id):
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)
    if not user.is_app_admin:
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
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
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(rows)
        db.session.commit()
        response_body['message'] = f'Compañía eliminada existosamente'
        response_body['result'] = {}
        return response_body, 200


@api.route('/administrators/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def admin(id):
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)   
    if not user.is_app_admin and not user.is_company_admin:
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    rows = db.session.execute(db.select(Administrators).where(Administrators.id == id)).scalar()
    if not rows:
        response_body['message'] = 'Administrador no existe'
        response_body['result'] = {}
        return response_body, 404
    if request.method == 'GET':
        if user.company_id == 0:
            response_body['message'] = 'Administrador encontrado (GET)'
            response_body['results'] = rows.serialize()
            return response_body, 200
        elif rows.company_id != user.company_id:
            response_body['message'] = 'No se encontró el administrador en su compañía'
            response_body['results'] = []
            return response_body, 404
        response_body['message'] = 'Administrador encontrado (GET)'
        response_body['results'] = rows.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        rows.name = data.get('name')
        rows.last_name = data.get('last_name')
        db.session.commit()
        response_body['message'] = f'El Administrador {id} ha sido modificado'
        response_body['result'] = rows.serialize()
        return response_body, 201
    if request.method == 'DELETE':
        db.session.delete(rows)
        db.session.commit()
        response_body['message'] = 'Administrador eliminado'
        response_body['result'] = {}
        return response_body, 200


@api.route('/employees/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def employee(id):
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)
    if not user.is_app_admin and not user.is_company_admin:
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    rows = db.session.execute(db.select(Employees).where(Employees.id == id)).scalar()
    if not rows:
        response_body['message'] = 'Empleado no existe'
        response_body['result'] = {}
        return response_body, 404
    if request.method == 'GET':
        if user.company_id == 0:
            response_body['message'] = 'Empleado encontrado (GET)'
            response_body['results'] = rows.serialize()
            return response_body, 200
        elif rows.company_id != user.company_id:
            response_body['message'] = 'No se encontró al empleado en su compañía'
            response_body['results'] = []
            return response_body, 404
        response_body['message'] = 'Empleado encontrado (GET)'
        response_body['results'] = rows.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        rows.name = data.get('name')
        rows.last_name = data.get('last_name')
        rows.budget_limit = data.get('budget_limit')
        db.session.commit()
        response_body['message'] = f'El empleado {id} ha sido modificado'
        response_body['result'] = rows.serialize()
        return response_body, 201
    if request.method == 'DELETE':
        db.session.delete(rows)
        db.session.commit()
        response_body['message'] = 'Empleado eliminado'
        response_body['result'] = {}
        return response_body, 200
    

@api.route('/applications/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def application(id):
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)
    rows = db.session.execute(db.select(Applications).where(Applications.id == id)).scalar()
    if not rows:
        response_body['message'] = 'Solicitud no existe'
        response_body['result'] = {}
        return response_body, 404
    if not (user.is_app_admin or user.is_company_admin or rows.employee_id == user.id):
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    if request.method == 'GET':
        response_body['message'] = 'Solicitud encontrada (GET)'
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
        response_body['message'] = f'Solicitud {id} ha sido modificada'
        response_body['result'] = rows.serialize()
        return response_body, 201
    if request.method == 'DELETE':
        db.session.delete(rows)
        db.session.commit()
        response_body['message'] = 'Solicitud eliminada'
        response_body['result'] = {}
        return response_body, 200
    

@api.route('/histories/<int:id>', methods=['GET'])
@jwt_required()
def history(id):
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)
    if not (user.is_app_admin or user.is_company_admin or user.is_employee):
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    rows = db.session.execute(db.select(Histories).where(Histories.id == id)).scalar()
    if not rows:
        response_body['message'] = 'Historial no existe'
        response_body['results'] = {}
        return response_body, 404
    if user.is_employee and rows.employee_id != user.id:
        response_body['message'] = 'Permiso denegado para este historial'
        response_body['results'] = {}
        return response_body, 403
    if request.method == 'GET':
        response_body['message'] = 'Historial encontrado (GET)'
        response_body['results'] = rows.serialize()
        return response_body, 200


@api.route('/expenses/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@jwt_required()
def expenditure(id):
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)
    if not (user.is_app_admin or user.is_company_admin or user.is_employee):
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    rows = db.session.execute(db.select(Expenses).where(Expenses.id == id)).scalar()
    if not rows:
        response_body['message'] = 'Gasto no existe'
        response_body['result'] = {}
        return response_body, 404
    if not (user.is_app_admin or user.is_company_admin or rows.user_id == user.id):
        response_body['message'] = 'Permiso denegado'
        return response_body, 403
    if request.method == 'GET':
        response_body['message'] = 'Gasto encontrado (GET)'
        response_body['results'] = rows.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.json
        rows.amount = data.get('amount')
        rows.vouchers = data.get('vouchers')
        db.session.commit()
        response_body['message'] = f'Gasto {id} ha sido modificado'
        response_body['results'] = rows.serialize()
        return response_body, 200
    if request.method == 'DELETE':
        db.session.delete(rows)
        db.session.commit()
        response_body['message'] = 'Gasto eliminado'
        response_body['results'] = {}
        return response_body, 200


@api.route('/api/register-company', methods=['POST'])
def newCompany():
    response_body = {}
    data = request.json()
    row = Company(name=data.get('name'),
                  date_recored=datetime.now())
    db.session.add(row)
    db.session.commit()
    response_body['message'] = 'Compañía registrada exitosamente'
    response_body['results'] = row.serialize()
    return response_body, 201


@api.route('/api/create-applications', methods=['POST'])
@jwt_required()
def new_application():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)
    if not (user.is_company_admin or user.is_employee):
        response_body['message'] = 'Permiso denegado para crear una solicitud'
        return response_body, 403
    data = request.json
    row = Applications(description=data.get('description'),
                       amount=data.get('amount'),
                       employee_id=user.id,
                       company_id=user.company_id)
    db.session.add(row)
    db.session.commit()
    response_body['message'] = 'Solicitud registrada exitosamente'
    response_body['results'] = row.serialize()
    return response_body, 201


@api.route('/api/add-expenses', methods=['POST'])
@jwt_required()
def newExpenditure():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.get(Users, current_user)
    if not (user.is_company_admin or user.is_employee):
        response_body['message'] = 'Permiso denegado para crear un gasto'
        return response_body, 403
    data = request.json
    row = Expenses(amount=float(data.get('amount')),
                   vouchers=data.get('vouchers'),
                   date=datetime.now(),
                   user_id=user.id)
    db.session.add(row)
    db.session.commit()
    response_body['message'] = 'Gasto registrado exitosamente'
    response_body['results'] = row.serialize()
    return response_body, 201
