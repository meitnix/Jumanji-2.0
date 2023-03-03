import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  let isEmployee = false
  let isAdmin = false
  let status = "Customer"

    if(token){
        const decoded = jwtDecode(token)
        const { username, roles } =decoded.UserInfo

        isEmployee = roles.includes('Employee')
        isAdmin = roles.includes('Admin')

        if(isEmployee) status = "Employee"
        if(isAdmin) status = "Admin"
        return { username, roles, status, isEmployee, isAdmin }
    }

  return {username: '', roles:[], isEmployee, isAdmin, status}

}

export default useAuth