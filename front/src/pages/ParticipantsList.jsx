import React, { useEffect, useState } from "react";
import { Edit, Trash, UsersIcon } from "lucide-react";
import { fetchEvents } from "../services/eventService";
import Select from "react-select";
import axios from "axios";

export function ParticipantsList() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
  }, []);

  const eventOptions = events?.map((event) => ({
    value: event.id,
    label: event.name,
  }));

  const handleSelectChange = (selectedOption) => {
    console.log(selectedOption);
    const event = events?.find((e) => e.id === selectedOption.value);
    setSelectedEvent(event);
  };

  const handleDeleteParticipant = async (participant) => {
    console.log(participant);
    try {
        await axios({
            method: "delete",
            url: "http://localhost:8080/evenement1_war/api/participants",
            data: participant, // Send participant in the body
            headers: { "Content-Type": "application/json" }, // Ensure correct headers
        });
        // Update state after deletion
        setSelectedEvent((prev) => ({
            ...prev,
            participants: prev.participants.filter((part) => part.id !== participant.id),
        }));
    } catch (error) {
        console.error("Error deleting participant:", error);
    }
};


  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Event Participants
      </h1>
      <div className="py-6">
        <Select
          options={eventOptions}
          value={
            selectedEvent
              ? { value: selectedEvent.id, label: selectedEvent.name }
              : null
          }
          onChange={(selectedOption) => handleSelectChange(selectedOption)}
          placeholder="Select an event"
        />
      </div>
      <div className="space-y-6">
        {selectedEvent ? (
          <div
            key={selectedEvent.id}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedEvent.name}
              </h2>
              <div className="flex items-center text-gray-600">
                <UsersIcon className="w-5 h-5 mr-2" />
                <span>
                  {selectedEvent.participants.length} /{" "}
                  {selectedEvent.limitParticipants}
                </span>
              </div>
            </div>

            {selectedEvent?.participants ? (
              <ul className="divide-y divide-gray-200">
                {selectedEvent.participants.map((participant, index) => (
                  <li
                    key={index}
                    className="py-3 flex items-center justify-between"
                  >
                    <span className="text-gray-800">
                      {participant.user.name}
                    </span>
                    <button
                      onClick={() => handleDeleteParticipant(participant)}
                    >
                      <Trash />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No participants yet</p>
            )}
          </div>
        ) : (
          "No selected Event"
        )}
      </div>
    </div>
  );
}
