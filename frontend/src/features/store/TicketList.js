import { useGetTicketsQuery } from "./ticketsApiSlice"
import Ticket from "./Ticket"
import useAuth from "../../hooks/useAuth"
import PulseLoader from "react-spinners/PulseLoader"

const TicketsList = () => {

    const { username} = useAuth()

    const {
        data: tickets,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTicketsQuery('ticketsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = tickets

        let filteredIds
        filteredIds = ids.filter(ticketId => entities[ticketId].user === username)
    

        const tableContent = ids?.length && filteredIds.map(ticketId => <Ticket key={ticketId} ticketId={ticketId} />)

        content = (
            <table className="table table--tickets">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th ticket__title">Title</th>
                        <th scope="col" className="table__th ticket__text">Description</th>
                        <th scope="col" className="table__th ticket__username">Username</th>
                        <th scope="col" className="table__th ticket__edit">Share</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default TicketsList