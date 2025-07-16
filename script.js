const API_URL = 'https://6877d5f7dba809d901f115ba.mockapi.io/contacts/contact';
const form = document.getElementById('contact-form');
const contactsList = document.getElementById('contacts-list');
const searchInput = document.getElementById('search');

window.addEventListener('DOMContentLoaded', loadContacts);

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (!name || !phone) return alert('Fill in all fields');

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, phone })
        });
        loadContacts();
        form.reset();
    } catch (error) {
        alert('Error adding contact: ' + error.message);
    }
});

// Load all contacts
async function loadContacts() {
    try {
        const res = await fetch(API_URL);
        const contacts = await res.json();
        displayContacts(contacts);
    } catch (err) {
        alert('Failed to fetch contacts');
    }
}

// Display contacts
function displayContacts(contacts) {
    contactsList.innerHTML = '';
    contacts.forEach(contact => {
        const li = document.createElement('li');
        li.innerHTML = `
      <strong>${contact.name}</strong>: ${contact.phone}
      <button onclick="deleteContact(${contact.id})">🗑️</button>
      <button onclick="editContact(${contact.id}, '${contact.name}', '${contact.phone}')">✏️</button>
    `;
        contactsList.appendChild(li);
    });
}

// Delete contact
async function deleteContact(id) {
    if (!confirm('Delete this contact?')) return;
    try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        loadContacts();
    } catch (err) {
        alert('Failed to delete');
    }
}

// Edit contact
function editContact(id, name, phone) {
    document.getElementById('name').value = name;
    document.getElementById('phone').value = phone;

    form.onsubmit = async (e) => {
        e.preventDefault();
        const updatedName = document.getElementById('name').value.trim();
        const updatedPhone = document.getElementById('phone').value.trim();

        try {
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: updatedName, phone: updatedPhone })
            });
            loadContacts();
            form.reset();
            form.onsubmit = defaultAddHandler; // restore original
        } catch (err) {
            alert('Update failed');
        }
    };
}

const defaultAddHandler = form.onsubmit;

// Search contacts
searchInput.addEventListener('input', async () => {
    const query = searchInput.value.toLowerCase();
    const res = await fetch(API_URL);
    const contacts = await res.json();
    const filtered = contacts.filter(c =>
        c.name.toLowerCase().includes(query) ||
        c.phone.includes(query)
    );
    displayContacts(filtered);
});
