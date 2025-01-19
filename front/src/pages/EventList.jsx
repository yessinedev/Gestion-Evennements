import React, { useEffect, useState } from "react";
import { SearchIcon } from "lucide-react";
import { EventCard } from "../components/EventCard";
import {
  fetchEvents,
  fetchEventsByCategory,
  participateToEvent,
} from "../services/eventService";
import axios from "axios";
import { fetchCategories } from "../services/categoryService";
import Select from "react-select";

export function EventList() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Charger les événements au montage
  useEffect(() => {
    const getEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
        setFilteredEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const getCategories = async () => {
      try {
        const data = await fetchCategories();
        const categoriesOptions = data?.map((cat) => ({
          value: cat.id,
          label: cat.name,
        }));
        setCategories(categoriesOptions);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const getEventsByCategory = async (categoryName) => {
      try {
        const data = await fetchEventsByCategory(categoryName);
        setFilteredEvents(data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events by category:", error);
      }
    };

    if (selectedCategory) {
      getEventsByCategory(selectedCategory.label);
    } else {
      getEvents();
      getCategories();
    }
  }, [selectedCategory]);

  // Filtrer les événements en fonction de la recherche
  useEffect(() => {
    const handleSearch = async (name) => {
      try {
        if (name.trim() === "") {
          setFilteredEvents(events);
          return;
        }

        const { data } = await axios({
          method: "get",
          url: `${import.meta.env.VITE_API_BASE_URL}/events/search?name=${name}`,
          headers: {
            "Content-Type": "application/json",
          },
        });
        setFilteredEvents(data);
      } catch (error) {
        console.error("Error searching events:", error.message);
        setFilteredEvents([]);
      }
    };

    handleSearch(search);
  }, [search, events]);

  const participateInEvent = async (eventId) => {
    let userId = prompt("Please enter the user id");
    if (userId != null) {
      const participant = {
        event: {
          id: eventId,
        },
        user: {
          id: userId,
        },
      };
      try {
        await participateToEvent(participant);
        alert("Participation successful!");
      } catch (error) {
        console.error("Error participating in event:", error.message);
        alert("Failed to participate in the event.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Upcoming Events</h1>

      <div className="w-full flex items-center justify-center gap-4 mb-6">
        {/* Barre de recherche */}
        <div className="relative w-1/2">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sélecteur de catégories */}
        <div className="w-1/2">
          <Select
            options={categories}
            value={
              selectedCategory
                ? { value: selectedCategory.id, label: selectedCategory.label }
                : null
            }
            onChange={(selectedOption) => setSelectedCategory(selectedOption)}
            placeholder="Select a category"
          />
        </div>
      </div>

      {/* Liste des événements */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onParticipate={() => participateInEvent(event.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 italic">No events match your criteria.</p>
        )}
      </div>
    </div>
  );
}
