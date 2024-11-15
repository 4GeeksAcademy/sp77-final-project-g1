"""
En este archivo, puedes agregar tantos comandos como desees usando el decorador @app.cli.command.
Los comandos de Flask son útiles para ejecutar cronjobs o tareas fuera de la API pero aún en integración
con tu base de datos, por ejemplo: Importar el precio de bitcoin cada noche a las 12am.
"""
import click
from api.models import db, Users, Companies, Employees


def setup_commands(app):
    """ 
    Este es un comando de ejemplo "insert-test-users" que puedes ejecutar desde la línea de comandos
    escribiendo: $ flask insert-test-users 5
    Nota: 5 es el número de usuarios a agregar
    """
    @app.cli.command("insert-test-users")  # Nombre de nuestro comando
    @click.argument("count")  # Argumento de nuestro comando
    def insert_test_users(count):
        print("Creando usuarios de prueba")
        for x in range(1, int(count) + 1):
            user = Users()
            user.email = f"test_user{x}@test.com"  # Usar f-string para mayor claridad
            user.password = "123456"
            user.is_active = True
            db.session.add(user)
            db.session.commit()
            print("Usuario: ", user.email, " creado.")
        print("Todos los usuarios de prueba creados")

    @app.cli.command("insert-test-data")
    def insert_test_data():
        """
        Comando para insertar datos de prueba en la base de datos.
        Incluye una compañía, administradores y empleados.
        """

        # Verificar si la Compañía 0 ya existe
        company = Companies.query.get(0)
        if not company:
            company = Companies(name="AnDiGu")
            db.session.add(company)

        # Crear usuarios administradores
        admin_emails = ["diego@andigu.com", "guillermo@andigu.com", "anthony@andigu.com"]
        for email in admin_emails:
            user = Users.query.filter_by(email=email).first()
            if not user:
                user = Users(
                    email=email,
                    password="123456",
                    is_active=True,
                    company_id=company.id,
                    is_app_admin=True,
                    is_company_admin=True
                )
                db.session.add(user)

                # Crear empleado relacionado con el administrador
                employee = Employees(
                    name=email.split('@')[0],
                    last_name=email.split('@')[0].capitalize(),
                    budget_limit=5000,
                    user_to=user
                )
                db.session.add(employee)

        # Crear empleados
        employee_data = [
            ("juan@andigu.com", "Juan", "Perez"),
            ("maria@andigu.com", "Maria", "Gomez"),
            ("carlos@andigu.com", "Carlos", "Lopez"),
            ("lucia@andigu.com", "Lucia", "Martinez"),
            ("pedro@andigu.com", "Pedro", "Rodriguez")
        ]

        for email, name, last_name in employee_data:
            user = Users.query.filter_by(email=email).first()
            if not user:
                user = Users(
                    email=email,
                    password="123456",
                    is_active=True,
                    company_id=company.id,
                    is_app_admin=False,
                    is_company_admin=False
                )
                db.session.add(user)

                # Crear empleado relacionado con el usuario
                employee = Employees(
                    name=name,
                    last_name=last_name,
                    budget_limit=1000,
                    user_id=user.id
                )
                db.session.add(employee)

        # Confirmar los cambios en la base de datos
        db.session.commit()
        print("Datos de prueba insertados.")

