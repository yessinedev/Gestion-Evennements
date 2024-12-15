import React, { useEffect, useState} from 'react';
import { SearchIcon } from 'lucide-react';
import { EventCard } from '../components/EventCard';
import axios from 'axios';


export function EventList() {
  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([])

  const fetchEvents = async () => {
    const {data} = await axios.get('http://localhost:8080/evenement1_war/api/events')
    setEvents(data)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h1>
      
      <div className="relative mb-8">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {events?.map(event => (
          <EventCard
            key={event.id}
            event={event}
            onParticipate={() => participateInEvent(event.id, 'Anonymous User')}
          />
        ))}
      </div>
    </div>
  );
}