import {useState, useEffect} from 'react'
import ContactList from "./contactList.jsx";
import './App.css'
import ContactForm from "./contactForm.jsx";

function App() {
    const [contacts, setContacts] = useState([])

    useEffect(() => {
        fetchContacts()
    }, [])

    const fetchContacts = async () => {
        const response = await fetch("http://127.0.0.1:5000/contacts")
        const data = await response.json()
        setContacts(data.contacts)
        console.log(data.contacts)
    }

    return (
        <div>
            <ContactList contacts={contacts}/>
            <ContactForm/>
        </div>)
}

export default App
