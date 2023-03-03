import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetTicketsQuery } from './ticketsApiSlice'
import { memo } from 'react'

const Ticket = ({ ticketId }) => {

    const { ticket } = useGetTicketsQuery("ticketsList", {
        selectFromResult: ({ data }) => ({
            ticket: data?.entities[ticketId]
        }),
    })

    const navigate = useNavigate()

    if (ticket) {

        const handleShare = () => navigate(`/dash/store/tickets/${ticketId}`)

        return (
            <tr className="table__row">
                <td className="table__cell ticket__title">{ticket.title}</td>
                <td className="table__cell ticket__username">{ticket.text}</td>
                <td className="table__cell ticket__text">{ticket.user}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleShare}
                    >
                        <FontAwesomeIcon icon={faShare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedTicket = memo(Ticket)

export default memoizedTicket