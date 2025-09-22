import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);
  //Gerenciamento de dados que o usuário vai digitar
  const [newContact, setNewContact] = useState({
    name: "",
    email: "",
    phone: "",
  });

  //Função que será chamada quando o formulário for enviado
  const handleSubmit = async (e) => {
    e.preventDefault(); //Impede o padrão de recarregar a página
    try {
      const response = await axios.post(
        "http://localhost:3001/api/contacts",
        newContact
      );
      setContacts([...contacts, response.data]); //Adiciona contato a lista existente
      setNewContact({ name: "", email: "", phone: "" }); //Limpa o formulário
    } catch (error) {
      console.error("Houve um erro ao adicionar o contato!", error);
    }
  };

  useEffect(() => {
    //Função assíncrona pra buscar os contatos da API
    const fetchContacts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/contacts");
        setContacts(response.data);
      } catch (error) {
        console.error("Houve um erro ao buscar contatos!", error);
      }
    };
    fetchContacts();
  }, []); // array vazio garante que o useEffect rode apenas uma vez, ao carregar a página

  return (
    <div className="App">
      <h1>Lista de contatos</h1>

      <form onSubmit={handleSubmit}>
        <h3>Adicionar Contato</h3>
        <input
          type="text"
          placeholder="Nome"
          value={newContact.name}
          onChange={(e) => {
            setNewContact({ ...newContact, name: e.target.value });
          }}
          required
        />
        <input
          type="text"
          placeholder="Email"
          value={newContact.email}
          onChange={(e) => {
            setNewContact({ ...newContact, email: e.target.value });
          }}
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          value={newContact.phone}
          onChange={(e) => {
            setNewContact({ ...newContact, phone: e.target.value });
          }}
          required
        />
        <button type="submit">Adicionar Contato</button>
      </form>

      <ul>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <strong>{contact.name}</strong> - {contact.email} - {contact.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
