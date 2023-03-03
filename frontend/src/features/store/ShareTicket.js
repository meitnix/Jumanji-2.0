import { useParams } from 'react-router-dom'
import ShareTicketForm from './ShareTicketForm'
import { useGetTicketsQuery } from './ticketsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const ShareTicket = () => {
    useTitle('Tickets: Edit Ticket')

    const { id } = useParams()

    const { username } = useAuth()

    const { ticket } = useGetTicketsQuery("ticketsList", {
        selectFromResult: ({ data }) => ({
            ticket: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!ticket || !users?.length) return <PulseLoader color={"#FFF"} />


    const content = <ShareTicketForm ticket={ticket} users={users} />

    return content
}
export default ShareTicket