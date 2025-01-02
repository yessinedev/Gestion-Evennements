import React, { useEffect, useState } from 'react';
import { EventForm } from '../components/EventForm';
import { EventCard } from '../components/EventCard';
import { fetchEvents} from '../services/eventService';
import { fetchCategories } from '../services/categoryService';
import axios from 'axios';
import { fetchUsers } from '../services/userService';

export function ManageEvents() {
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]); 
  const [users, setUsers] = useState([]); 

  const handleSubmit = async (event) => {
    try {
      if (editingEvent) {
        // Modification d'un événement 
        await axios({
          method: "put",
          url: `${import.meta.env.VITE_API_BASE_URL}/events/${editingEvent}`, 
          data: event, 
          headers: { "Content-Type": "application/json" }, 
        });
        alert('Event updated successfully!');
      } else {
        // Création d'un nouvel événement 
        await axios({
          method: "post",
          url: `${import.meta.env.VITE_API_BASE_URL}/events`,
          data: event, // Envoyer les données de l'événement
          headers: { "Content-Type": "application/json" }, // Assurer que le bon type est défini
        });
        alert('Event created successfully!');
      }
      fetchAllEvents(); 
      setEditingEvent(null); 
    } catch (error) {
      console.error('Error submitting event:', error.message);
      alert('Failed to submit event. Please try again.');
    }
  };



  const handleDelete = async (eventId) => {
    try {
      // Suppression d'un événement 
      await axios({
        method: "delete",
        url: `${import.meta.env.VITE_API_BASE_URL}/events/${eventId}`, 
        headers: {
          "Content-Type": "application/json", 
        },
      });
      alert('Event deleted successfully!');
      fetchAllEvents();
    } catch (error) {
      console.error('Error deleting event:', error.message);
      alert('Failed to delete event. Please try again.');
    }
  };
  
 
  


  const fetchAllEvents = async () => {
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error.message);
    }
  };

  const fetchAllCategories = async () => {
    try {
      const data = await fetchCategories(); 
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const data = await fetchUsers(); 
      setUsers(data);
    } catch (error) {
      console.error('Error fetching categories:', error.message);
    }
  };

  useEffect(() => {
    fetchAllEvents();
    fetchAllCategories();
    fetchAllUsers();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Events</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingEvent ? 'Edit Event' : 'Create New Event'}
        </h2>
        <EventForm
          onSubmit={handleSubmit}
          initialData={editingEvent ? events.find((e) => e.id === editingEvent) : undefined}
          categories={categories}
          users={users}
          buttonText={editingEvent ? 'Update Event' : 'Create Event'}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {events?.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            showActions
            onEdit={() => setEditingEvent(event.id)}
            onDelete={() => handleDelete(event.id)}
          />
        ))}
      </div>
    </div>
  );
}
