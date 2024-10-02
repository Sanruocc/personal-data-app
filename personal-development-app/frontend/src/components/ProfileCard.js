import React from 'react';

function ProfileCard({ contact, onEdit, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{contact.name}</h3>
      <p className="text-gray-600 mb-1">Email: {contact.email}</p>
      <p className="text-gray-600 mb-4">Phone: {contact.phone}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(contact)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(contact.id)}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;