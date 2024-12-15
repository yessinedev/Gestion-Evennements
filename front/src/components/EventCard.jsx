import React from 'react';
import { CalendarIcon, MapPinIcon, UsersIcon, Edit2Icon, TrashIcon } from 'lucide-react';



export function EventCard({ event, onParticipate, onEdit, onDelete, showActions = false }) {
  const isFullyBooked = event.participants.length >= event.limitParticipants;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900">{event.name}</h3>
          {showActions && (
            <div className="flex space-x-2">
              <button
                onClick={onEdit}
                className="p-1 text-gray-500 hover:text-blue-600"
              >
                <Edit2Icon className="w-5 h-5" />
              </button>
              <button
                onClick={onDelete}
                className="p-1 text-gray-500 hover:text-red-600"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
        
        <p className="mt-2 text-gray-600">{event.description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex items-center text-gray-600">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span>{new Date(event.date).toLocaleString()}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <MapPinIcon className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>
          
          <div className="flex items-center text-gray-600">
            <UsersIcon className="w-4 h-4 mr-2" />
            <span>{event.participants.length} / {event.limitParticipants} participants</span>
          </div>
        </div>

        {!showActions && (
          <button
            onClick={onParticipate}
            disabled={isFullyBooked}
            className={`mt-4 w-full px-4 py-2 rounded-md text-white ${
              isFullyBooked
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isFullyBooked ? 'Fully Booked' : 'Participate'}
          </button>
        )}
      </div>
    </div>
  );
}