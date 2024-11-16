const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      user: '',
      isLoged: false,
      expenses: [],
      administrators: [],
      employees: [],
      signup: [],
      users: [] 
    },

    actions: {
      getMessage: async () => {
        const uri = `${process.env.BACKEND_URL}/api/hello`;
        const options = { method: 'GET' };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error loading message from backend", response.status);
          return;
        }
        const data = await response.json();
        setStore({ message: data.message });
        return data;
      },

      login: async (dataToSend) => {
        const uri = `${process.env.BACKEND_URL}/api/login`;
        const options = {
          method: 'POST',
          headers: { "Content-Type": 'application/json' },
          body: JSON.stringify(dataToSend)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log('Error', response.status, response.statusText);
          return;
        }
        const data = await response.json();
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.results));
        setStore({ isLoged: true, user: data.results.email });
      },

      logout: () => {
        setStore({ isLoged: false, user: '' });
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      },

      isLogged: () => {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = JSON.parse(localStorage.getItem('user'));
          setStore({ isLoged: true, user: userData.email });
        }
      },

      // Nueva acción para obtener usuarios
      loadUsers: async () => {
        const token = localStorage.getItem('token');
        const uri = `${process.env.BACKEND_URL}/api/users`; 
        const options = {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        };
        const response = await fetch(uri, options);
        if (!response.ok) return;
        const data = await response.json();
        setStore({ users: data.results });
      },

      getExpenses: async () => {
        const token = localStorage.getItem('token');
        const uri = `${process.env.BACKEND_URL}/api/expenses`;
        const options = {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        };
        const response = await fetch(uri, options);
        if (!response.ok) return;
        const data = await response.json();
        setStore({ expenses: data.results });
      },

      addExpenses: async (dataToSend) => {
        const token = localStorage.getItem('token');
        const uri = `${process.env.BACKEND_URL}/api/expenses`;
        const options = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(dataToSend)
        };
        const response = await fetch(uri, options);
        if (!response.ok) return;
        getActions().getExpenses();
      },

      deleteExpenses: async (id) => {
        const uri = `${process.env.BACKEND_URL}/api/expenses/${id}`;
        const options = { method: 'DELETE' };
        const response = await fetch(uri, options);
        if (!response.ok) return;
        getActions().getExpenses();
      },

      addAdmin: async (dataToSend) => {
        const uri = `${process.env.BACKEND_URL}/api/administrators`;
        const token = localStorage.getItem("token");
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(dataToSend)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status);
          return;
        }
        const data = await response.json();
        setStore({ isLoged: true, administrators: data.results });
      },

      signUp: async (dataToSend) => {
        const token = localStorage.getItem("token");
        const uri = `${process.env.BACKEND_URL}/api/register-company`;
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(dataToSend)
        };
        try {
          const response = await fetch(uri, options);
          if (!response.ok) {
            console.log("Error:", response.status);
            return;
          }
          const data = await response.json();
          setStore({ isLoged: true, signup: data.results });
        } catch (error) {
          console.error("Error en el registro:", error);
        }
      },

      addEmployee: async (dataToSend) => {
        const uri = `${process.env.BACKEND_URL}/api/employees`;
        const token = localStorage.getItem("token");
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(dataToSend)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
          console.log("Error:", response.status);
          return;
        }
        const data = await response.json();
        setStore({ isLoged: true, employees: data.results });
      },

      getAdministrators: async () => {
        const token = localStorage.getItem('token');
        const uri = `${process.env.BACKEND_URL}/api/administrators`;
        const options = {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        };
        const response = await fetch(uri, options);
        if (!response.ok) return;
        const data = await response.json();
        setStore({ administrators: data.results });
      },

      getEmployees: async () => {
        const token = localStorage.getItem('token');
        const uri = `${process.env.BACKEND_URL}/api/employees`;
        const options = {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        };
        const response = await fetch(uri, options);
        if (!response.ok) return;
        const data = await response.json();
        setStore({ employees: data.results });
      },
      uploadFiles: async (file) => {
        const cloudName = "dsl7bwfyj";
        const uploadPresets = "u0siqfrh";
        const uri = `https://api.cloudinary.com/v1_1/${cloudName}/upload`; // Correct template literal syntax
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", uploadPresets);

        try {
            const response = await fetch(uri, {
                method: "POST",
                body: data
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const parseData = await response.json();
            return parseData.secure_url;
        } catch (error) {
            console.error('Error uploading file:', error);
            return null;
        }
    },
    },
  };
};

export default getState;
