import React, { useState } from 'react';
import { UsersIcon } from 'lucide-react';

export function ParticipantsList() {
  const [events, setEvents]  = useState([]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Event Participants</h1>
      
      <div className="space-y-6">
        {events?.map(event => (
          <div key={event.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{event.title}</h2>
              <div className="flex items-center text-gray-600">
                <UsersIcon className="w-5 h-5 mr-2" />
                <span>{event.participants.length} / {event.capacity}</span>
              </div>
            </div>
            
            {event.participants.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {event.participants.map((participant, index) => (
                  <li key={index} className="py-3 flex items-center justify-between">
                    <span className="text-gray-800">{participant}</span>
                    <span className="text-sm text-gray-500">Participant #{index + 1}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No participants yet</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}