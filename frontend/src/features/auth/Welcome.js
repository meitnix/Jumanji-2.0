import { Link } from 'react-router-dom'
import useAuth
 from '../../hooks/useAuth'
const Welcome = () => {

    const {username, isEmployee, isAdmin} = useAuth()
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Hello {username}! <br/> Welcome to the Jungle!</h1>

            <p><Link to="/dash/trips">View Trips</Link></p>
            <p><Link to="/dash/store/tickets">View Tickets</Link></p>

            {(isAdmin || isEmployee) && <p><Link to="/dash/trips/new">New Trips</Link></p>}

            <p><Link to="/dash/store">View Store</Link></p>

            {(isAdmin) && <p><Link to="/dash/users">View User Settings</Link></p>}

            {(isAdmin) && <p><Link to="/dash/users/new">New User</Link></p>}

        </section>
    )

    return content
}
export default Welcome