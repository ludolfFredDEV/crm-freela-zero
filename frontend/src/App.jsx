import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Houve um erro ao buscar os contatos!", error);
      }
    };
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingContact) {
      try {
        const response = await axios.put(
          `http://localhost:3001/api/contacts/${editingContact.id}`,
          newContact
        );
        setContacts(
          contacts.map((contact) =>
            contact.id === editingContact.id ? response.data : contact
          )
        );
        setEditingContact(null);
      } catch (error) {
        console.error("Houve um erro ao atualizar o contato!", error);
      }
    } else {
      try {
        const response = await axios.post(
          "http://localhost:3001/api/contacts",
          newContact
        );
        setContacts([...contacts, response.data]);
      } catch (error) {
        console.error("Houve um erro ao adicionar o contato!", error);
      }
    }
    setNewContact({ name: "", email: "", phone: "" });
  };

  const handleDelete = async (contactId) => {
    try {
      await axios.delete(`http://localhost:3001/api/contacts/${contactId}`);
      setContacts(contacts.filter((contact) => contact.id !== contactId));
    } catch (error) {
      console.error("Houve um erro ao deletar o contato!", error);
    }
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
    setNewContact({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  };

  return (
    <div className="App">
      <h1>Lista de Contatos</h1>
      <ContactForm
        newContact={newContact}
        setNewContact={setNewContact}
        handleSubmit={handleSubmit}
        editingContact={editingContact}
        setEditingContact={setEditingContact}
      />
      <ContactList
        contacts={contacts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
