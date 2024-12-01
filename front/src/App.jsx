import { useState } from 'react';
import { CalendarDaysIcon, ListIcon, UsersIcon } from 'lucide-react';
import { ManageEvents } from './pages/ManageEvents';
import { EventList } from './pages/EventList';
import { ParticipantsList } from './pages/ParticipantsList';

function App() {
  const [currentPage, setCurrentPage] = useState('list');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex space-x-8">
              <button
                onClick={() => setCurrentPage('list')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  currentPage === 'list'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <ListIcon className="w-5 h-5 mr-2" />
                Events
              </button>
              <button
                onClick={() => setCurrentPage('manage')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  currentPage === 'manage'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <CalendarDaysIcon className="w-5 h-5 mr-2" />
                Manage Events
              </button>
              <button
                onClick={() => setCurrentPage('participants')}
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  currentPage === 'participants'
                    ? 'border-blue-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <UsersIcon className="w-5 h-5 mr-2" />
                Participants
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {currentPage === 'list' && <EventList />}
        {currentPage === 'manage' && <ManageEvents />}
        {currentPage === 'participants' && <ParticipantsList />}
      </main>
    </div>
  );
}

export default App;