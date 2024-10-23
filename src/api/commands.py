"""
En este archivo, puedes agregar tantos comandos como desees usando el decorador @app.cli.command.
Los comandos de Flask son útiles para ejecutar cronjobs o tareas fuera de la API pero aún en integración
con tu base de datos, por ejemplo: Importar el precio de bitcoin cada noche a las 12am.
"""
import click
from api.models import db, Users, Companies


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
        # Insertar datos de prueba en la base de datos
        # Crear Compañía 0
        company = Companies()
        company.name = "AnDiGu"
        company.id = 0
        db.session.add(company)
        
        # Crear Usuarios Diego, Guillermo, Anthony
        for email in ["diego@andigu.com", "guillermo@andigu.com", "anthony@andigu.com"]:
            user = Users()
            user.email = email
            user.password = "123456"
            user.is_active = True
            user.company_id = 0
            user.is_app_admin = True
            db.session.add(user)
        
        db.session.commit()
        print("Datos de prueba insertados")