import React from "react";

function ContactList({ contacts, handleEdit, handleDelete }) {
  return (
    <ul>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <strong>{contact.name}</strong> - {contact.email} - {contact.phone}
          <button onClick={() => handleEdit(contact)}>Editar</button>
          <button onClick={() => handleDelete(contact.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
