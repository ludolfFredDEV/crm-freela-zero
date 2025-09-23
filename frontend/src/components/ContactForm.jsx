import React from "react";

function ContactForm({
  newContact,
  setNewContact,
  handleSubmit,
  editingContact,
  setEditingContact,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <h3>{editingContact ? "Editar Contato" : "Adicionar Novo Contato"}</h3>
      <input
        type="text"
        placeholder="Nome"
        value={newContact.name}
        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        value={newContact.email}
        onChange={(e) =>
          setNewContact({ ...newContact, email: e.target.value })
        }
        required
      />
      <input
        type="text"
        placeholder="Telefone"
        value={newContact.phone}
        onChange={(e) =>
          setNewContact({ ...newContact, phone: e.target.value })
        }
        required
      />
      <button type="submit">
        {editingContact ? "Salvar Edição" : "Adicionar Contato"}
      </button>
      {editingContact && (
        <button
          type="button"
          onClick={() => {
            setEditingContact(null);
            setNewContact({ name: "", email: "", phone: "" });
          }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

export default ContactForm;
