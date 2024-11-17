
import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';
import { Users, UserCircle } from 'lucide-react'

export const EmployeesSumary = ()=>{
  const {store,actions} = useContext(Context)

  useEffect(() => {
    const fetchEmployees = async () => {
      await actions.getEmployees(); 
      await actions.getAdministrators();
    };
    fetchEmployees();
    }, []);

  return (
    <div className=" ms-4 d-flex">
      <section className="mb-8 col-6">
        <h2 className="mt-4 border-bottom border-success me-4 mb-4 pb-2 border-b-2 border-secondary">
          <Users className="text-success m-2" />
          Administradores
        </h2>
        {store.administrators.length > 0 ? (
          <ul className="list-none">
            {store.administrators.map((admin) => (
              <li
                key={admin.id}
                className="list-unstyled"
              >
                <div className="flex items-center">
                  <UserCircle className="text-success h-8 w-8 m-2"/>
                  <span className="text-lg">{admin.name} {admin.last_name}</span>
                </div>
                
              </li>
            ))}
          </ul>
        ) : (
          <p>No administrators found</p>
        )}
      </section>

      <section className='col-6'>
        <h2 className="border-bottom border-warning me-4 mb-4 mt-4 pb-2">
          <Users className=" text-warning m-2" />
          Empleados
        </h2>
        {store.employees.length > 0 ? (
          <ul className="list-none">
            {store.employees.map((employee) => (
              <li
                key={employee.id}
                className="list-unstyled"
              >
                <div>
                  <UserCircle className="m-2 text-warning h-8 w-8" />
                  <span>{employee.name} {employee.last_name}</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No employees found</p>
        )}
      </section>
    </div>
  );
}
