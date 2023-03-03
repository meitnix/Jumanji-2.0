import { useState, useEffect } from "react"
import { useUpdateTicketMutation } from "./ticketsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const ShareTicketForm = ({ ticket, users }) => {

    const [updateTicket, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateTicketMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(ticket.title)
    const [text, setText] = useState(ticket.text)
    const [userId, setUserId] = useState(ticket.user)

    useEffect(() => {

        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/store/tickets')
        }

    }, [isSuccess, navigate])


    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveTicketClicked = async (e) => {
        if (canSave) {
            console.log(ticket.id,userId,title,text)
            await updateTicket({ id: ticket.id,ticketID:ticket.ticketID, user: userId, title, text})
        }
    }


    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.username}

            > {user.username}</option >
        )
    })

    const errClass = (isError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''
    const errContent = (error?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Share Ticket #{ticket.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveTicketClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="ticket-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="ticket-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    readonly="readonly"
                />
                <label className="form__label" htmlFor="ticket-text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="ticket-text"
                    name="text"
                    value={text}
                    readonly="readonly"
                />
                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="ticket-username">
                            Share With:</label>
                        <select
                            id="ticket-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default ShareTicketForm