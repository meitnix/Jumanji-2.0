import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from "@fortawesome/free-solid-svg-icons"
//import { useNavigate } from 'react-router-dom'
import { useAddNewTicketMutation } from "./ticketsApiSlice"
import { useGetTripsQuery } from '../trips/tripsApiSlice'
import useAuth from "../../hooks/useAuth"
import { memo } from 'react'
import { ethers } from 'ethers'
import { v4 as uuid } from 'uuid';

const Store = ({ tripId }) => {
    const {username} = useAuth()
    const { trip } = useGetTripsQuery("tripsList", {
        selectFromResult: ({ data }) => ({
            trip: data?.entities[tripId]
        }),
    })

   // const navigate = useNavigate()
   const unique_id = uuid()
   const [addNewTicket] = useAddNewTicketMutation()

    if (trip) {
        const handleBuy = async () => {
            try {
                if(!window.ethereum)
                throw new Error("No crypto wallet found")
                await window.ethereum.send("eth_requestAccounts");
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const tx = await signer.sendTransaction({
                    to: '0x54179728b483C13c6264f863ae5ff673AC211b53',
                    value: ethers.utils.parseEther(trip.price.toString())
                })
                if(tx)
                {
                await addNewTicket({ ticketID:unique_id, user: username, title: trip.title, text: trip.text,hash:tx.hash})
                console.log('tx:',tx.hash)
                alert('Transaction Success');
                }
                
            } catch (error) {
                console.log(error)
            } finally{
                console.log(unique_id,username,trip.title,trip.text)                
            }
        }

        return (
            <tr className="table__row">
                <td className="table__cell trip__status">
                    {trip.completed
                        ? <span className="trip__status--completed">Sold Out</span>
                        : <span className="trip__status--open">Available</span>
                    }
                </td>
                <td className="table__cell trip__title">{trip.title}</td>
                <td className="table__cell trip__username">{trip.username}</td>
                <td className="table__cell trip__text">{trip.text}</td>
                <td className="table__cell trip__price">{trip.price}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleBuy}
                    >
                        <FontAwesomeIcon icon={faBagShopping} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedTrip = memo(Store)

export default memoizedTrip