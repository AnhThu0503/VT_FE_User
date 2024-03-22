import axios from 'axios';
import { useState, createContext } from 'react';

const UserContext = createContext({});

const UserProvider = ({ children }) => {

    const [user, setUser] = useState({ });

    const authLogin = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            const response = await axios.get('/api/login', { params: { token } })
            setUser(response.data)
        } else {
            setUser({ auth: false })
        }
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser({auth: false})
    }

    return (
        <UserContext.Provider value={{ user, authLogin, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }