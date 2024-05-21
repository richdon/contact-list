import {useState, useEffect} from 'react'
import ContactList from "./contactList.jsx";
import './App.css'
import ContactForm from "./contactForm.jsx";

function App() {
    const [contacts, setContacts] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentContact, setCurrentContact] = useState({})

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        const response = await fetch("http://127.0.0.1:5000/contacts")
        const data = await response.json()
        setContacts(data.contacts)
        console.log(data.contacts)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setCurrentContact({})
    }

    const openCreateModal = () => {
        if (!isModalOpen) {
            setIsModalOpen(true)
        }
    }

    const openEditModal = (contact) => {
        if (isModalOpen) return
        setCurrentContact(contact)
        setIsModalOpen(true)
    }

    const onUpdate = async () => {
        closeModal()
        await fetchContacts()
    }

    return (
        <div>
            <ContactList contacts={contacts} updateContact={openEditModal} updateCallBack={onUpdate}/>
            <button onClick={openCreateModal}>Create New Contact</button>
            {
                isModalOpen && <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <ContactForm existingContact={currentContact} updateCallback={onUpdate}/>
                    </div>
                </div>
            }

        </div>)
}

export default App
