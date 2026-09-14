import React, { useState } from 'react';

export default function TeamsPage() {
  const [joinFormOpen, setJoinFormOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const [teams, setTeams] = useState([
    {
      id: 1,
      name: 'Team Alpha',
      description: 'A team focused on AI and Machine Learning projects.',
      purpose: 'To create ML systems that assist in early diagnosis, predict patient outcomes, and support data-driven healthcare decisions.',
      work: 'Use algorithms like Random Forest, CNNs (for images), or LSTMs (for time-series health data).',
      skills: 'AI, Machine Learning, Deep Learning, NLP, Computer Vision',
      requiredMembers: 2,
      totalCapacity: 7,
      collegeName: 'YCCE',
      headName: 'Alice Johnson',
      email: 'alice.johnson@ycce.edu',
      contact: '+91-9876543210',
    },
    {
      id: 2,
      name: 'Innovators',
      description: 'A group of innovators working on cutting-edge technology.',
      purpose: 'To explore and develop cutting-edge technologies that solve real-world challenges through creativity, data-driven design, and intelligent automation.',
      work: 'Research and development.',
      skills: 'Innovation, Technology, Research, Development, Prototyping',
      requiredMembers: 3,
      totalCapacity: 5,
      collegeName: 'VNIT',
      headName: 'Bob Smith',
      email: 'bob.smith@vnit.edu',
      contact: '+91-9876543222',
    },
    {
      id: 3,
      name: 'Code Warriors',
      description: 'Passionate coders building impactful software solutions.',
      purpose: 'To design secure and scalable financial software that simplifies transactions, enhances transparency, and supports informed decision-making.',
      work: 'Collaborate on full-stack projects from idea to deployment.',
      skills: 'Software Development, Coding, Testing, Debugging, Optimization',
      requiredMembers: 1,
      totalCapacity: 4,
      collegeName: 'RCOEM',
      headName: 'Charlie Davis',
      email: 'charlie.davis@rcoem.edu',
      contact: '+91-9876543233',
    },
  ]);

  const handleJoinClick = (team) => {
    setSelectedTeam(team);
    setJoinFormOpen(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const response = {
      name: formData.get('name'),
      number: formData.get('number'),
      skills: formData.get('skills'),
      college: formData.get('college'),
    };
    console.log('Form submitted:', response);
    alert('Response Submitted');
    setJoinFormOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-full px-6 py-5 md:py-6 flex items-center justify-between">
          <div className="relative w-full max-w-lg">
            <span className="absolute inset-y-0 left-3 flex items-center text-slate-500 text-xl">🔍</span>
            <input
              type="text"
              placeholder="Search Teams..."
              className="w-full pl-12 pr-4 py-3 rounded-lg border-2 border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg font-semibold shadow-sm"
            />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="space-y-6 max-h-[90vh] overflow-y-auto">
          {teams.map((team) => (
            <div
              key={team.id}
              className="p-6 bg-white rounded-lg shadow-md border border-slate-200 hover:shadow-lg transition-all"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-4">{team.name}</h3>
              <p className="text-slate-700 mb-2">
                <span className="font-bold">Purpose:</span> {team.purpose}
              </p>
              <p className="text-slate-700 mb-2">
                <span className="font-bold">Working On:</span> {team.work}
              </p>
              <p className="text-slate-700 mb-2">
                <span className="font-bold">Looking For:</span> {team.skills}
              </p>
              <p className="text-slate-700 mb-2">
                <span className="font-bold">Required Members:</span> {team.requiredMembers} out of {team.totalCapacity}
              </p>
              <p className="text-slate-700 mb-2">
                <span className="font-bold">College Name:</span> {team.collegeName}
              </p>
              <p className="text-slate-700 mb-2">
                <span className="font-bold">Head Name:</span> {team.headName}
              </p>
              <p className="text-slate-700 mb-2">
                <span className="font-bold">Email:</span> {team.email}
              </p>
              <p className="text-slate-700 mb-4">
                <span className="font-bold">Contact:</span> {team.contact}
              </p>
              <button
                onClick={() => handleJoinClick(team)}
                className="px-4 py-2 bg-cyan-500 text-white font-bold rounded-lg shadow-md hover:bg-cyan-600 transition-all w-full"
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </main>

      {joinFormOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-slate-800">Join {selectedTeam.name}</h2>
              <button
                onClick={() => setJoinFormOpen(false)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-slate-700 font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2" htmlFor="number">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
                  placeholder="Enter your contact number"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2" htmlFor="skills">
                  Skills
                </label>
                <input
                  type="text"
                  id="skills"
                  name="skills"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
                  placeholder="Enter your skills"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2" htmlFor="college">
                  College Name
                </label>
                <input
                  type="text"
                  id="college"
                  name="college"
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-lg"
                  placeholder="Enter your college name"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-cyan-500 text-white font-bold rounded-lg shadow-md hover:bg-cyan-600 transition-all text-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}