import React, { useEffect, useState } from 'react';
import { EventForm } from '../components/EventForm';
import { EventCard } from '../components/EventCard';
import { fetchEvents } from '../services/eventService';


export function ManageEvents() {
  const [editingEvent, setEditingEvent] = useState(null);
  const [events, setEvents] = useState([])

  const handleSubmit = (eventData) => {
    if (editingEvent) {
      updateEvent(editingEvent, eventData);
      setEditingEvent(null);
    } else {
      addEvent(eventData);
    }
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    getEvents();
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Events</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editingEvent ? 'Edit Event' : 'Create New Event'}
        </h2>
        <EventForm
          onSubmit={handleSubmit}
          initialData={editingEvent ? events.find(e => e.id === editingEvent) : undefined}
          buttonText={editingEvent ? 'Update Event' : 'Create Event'}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {events?.map(event => (
          <EventCard
            key={event.id}
            event={event}
            showActions
            onEdit={() => setEditingEvent(event.id)}
            onDelete={() => deleteEvent(event.id)}
          />
        ))}
      </div>
    </div>
  );
}