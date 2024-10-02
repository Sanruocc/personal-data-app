import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/ProfileCard';
import SearchBar from '../components/SearchBar';
import { getSocialContacts, createSocialContact, updateSocialContact, deleteSocialContact } from '../utils/api';

function Social() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({ name: '', email: '', phone: '' });
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const fetchedContacts = await getSocialContacts();
      setContacts(fetchedContacts);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleCreateContact = async (e) => {
    e.preventDefault();
    try {
      const createdContact = await createSocialContact(newContact);
      setContacts([...contacts, createdContact]);
      setNewContact({ name: '', email: '', phone: '' });
    } catch (error) {
      console.error('Error creating contact:', error);
    }
  };

  const handleUpdateContact = async (e) => {
    e.preventDefault();
    try {
      const updatedContact = await updateSocialContact(editingContact.id, editingContact);
      setContacts(contacts.map(contact => contact.id === updatedContact.id ? updatedContact : contact));
      setEditingContact(null);
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await deleteSocialContact(id);
      setContacts(contacts.filter(contact => contact.id !== id));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleSearch = (query) => {
    // Implement search logic here
    console.log('Searching for:', query);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Social Contacts</h1>
      <SearchBar onSearch={handleSearch} />
      <form onSubmit={editingContact ? handleUpdateContact : handleCreateContact} className="mb-6">
        <input
          type="text"
          placeholder="Name"
          value={editingContact ? editingContact.name : newContact.name}
          onChange={(e) => editingContact ? setEditingContact({...editingContact, name: e.target.value}) : setNewContact({...newContact, name: e.target.value})}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={editingContact ? editingContact.email : newContact.email}
          onChange={(e) => editingContact ? setEditingContact({...editingContact, email: e.target.value}) : setNewContact({...newContact, email: e.target.value})}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone"
          value={editingContact ? editingContact.phone : newContact.phone}
          onChange={(e) => editingContact ? setEditingContact({...editingContact, phone: e.target.value}) : setNewContact({...newContact, phone: e.target.value})}
          className="w-full mb-2 p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          {editingContact ? 'Update Contact' : 'Add Contact'}
        </button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {contacts.map(contact => (
          <ProfileCard
            key={contact.id}
            contact={contact}
            onEdit={setEditingContact}
            onDelete={handleDeleteContact}
          />
        ))}
      </div>
    </div>
  );
}

export default Social;