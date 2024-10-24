const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            user: '',
			isLoged: false
		},
		actions: {
			getMessage: async () => {
				const uri = `${process.env.BACKEND_URL}/api/hello`
				const options = {
					method: 'GET'
				}
				const response = await fetch(uri, options)
				if (!response.ok) {
					console.log("Error loading message from backend", response.status)
					return
				}
				const data = await response.json()
				setStore({ message: data.message })
				return data;
			},
			login: async (dataToSend) => {
                const uri = `${process.env.BACKEND_URL}/api/login`;
                const options = {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                }
                const response = await fetch(uri, options);
                if (!response.ok) {
                    console.log('Error', response.status, response.statusText);
                    return;
                }
                const data = await response.json()
                localStorage.setItem('token', data.access_token)
                localStorage.setItem('user', JSON.stringify(data.results))
                setStore({ isLoged: true, user: data.results.email })
            },
            logout: () => {
                setStore({ isLoged: false, user: '' });
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            },
            isLogged: () => {
                const token = localStorage.getItem('token')
                if (token) {
                    const userData = JSON.parse(localStorage.getItem('user'));
                    setStore({ isLoged: true, user: userData.email })
                }
            },
            newSignUp: async (dataToSend) => {
                const uri = `${process.env.BACKEND_URL}/api/sign-up`;
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                };
                    const response = await fetch(uri, options);
                    if (!response.ok) {
                        console.log("Error:", response.status);
                        return;
                    }
                    const data = await response.json();
                    setStore({ isLoged: true });
            },
		}
	};
};

export default getState;
