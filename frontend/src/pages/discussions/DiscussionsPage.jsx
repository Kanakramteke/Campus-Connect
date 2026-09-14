import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DiscussionsPage({ isOpen, onClose }) {
  const [filter, setFilter] = useState('All Discussions');
  const [searchQuery, setSearchQuery] = useState('');
  const [reply, setReply] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDiscussion, setNewDiscussion] = useState({ title: '', category: '', postedBy: '' });
  const [discussions, setDiscussions] = useState([
    {
      id: 1,
      title: 'How to get started with AI?',
      postedBy: 'John Doe',
      category: 'Tech',
      replies: 5,
      time: '2h ago',
    },
    {
      id: 2,
      title: 'Best practices for group studies?',
      postedBy: 'Jane Smith',
      category: 'Studies',
      replies: 3,
      time: '5h ago',
    },
    {
      id: 3,
      title: 'Career advice for fresh graduates',
      postedBy: 'Alice Johnson',
      category: 'Career',
      replies: 8,
      time: '1d ago',
    },
    {
      id: 4,
      title: 'How to combat climate change?',
      postedBy: 'Environment Club',
      category: 'Social / Awareness',
      replies: 12,
      time: '3h ago',
    },
    {
      id: 5,
      title: 'How will AI impact jobs in the next decade?',
      postedBy: 'Tech Visionaries',
      category: 'Tech',
      replies: 14,
      time: '4h ago',
    },
    {
      id: 6,
      title: 'Is coding becoming a basic skill like reading and writing?',
      postedBy: 'Code Academy',
      category: 'Tech',
      replies: 9,
      time: '6h ago',
    },
    {
      id: 7,
      title: 'How do you choose between passion and a stable job?',
      postedBy: 'Career Coaches',
      category: 'Career',
      replies: 11,
      time: '8h ago',
    },
    {
      id: 8,
      title: 'What soft skills matter most in today’s workplace?',
      postedBy: 'HR Experts',
      category: 'Career',
      replies: 10,
      time: '10h ago',
    },
    {
      id: 9,
      title: 'Why do people procrastinate even when motivated?',
      postedBy: 'Psychology Enthusiasts',
      category: 'Psychology',
      replies: 13,
      time: '12h ago',
    },
    {
      id: 10,
      title: 'Can personality truly change over time?',
      postedBy: 'Behavioral Scientists',
      category: 'Psychology',
      replies: 8,
      time: '1d ago',
    },
    {
      id: 11,
      title: 'Why do people seek validation from others?',
      postedBy: 'Social Psychologists',
      category: 'Psychology',
      replies: 7,
      time: '1d ago',
    },
    {
      id: 12,
      title: 'What lessons from past civilizations apply today?',
      postedBy: 'History Buffs',
      category: 'History',
      replies: 9,
      time: '2d ago',
    },
    {
      id: 13,
      title: 'How did wars shape technological progress?',
      postedBy: 'Historians',
      category: 'History',
      replies: 10,
      time: '2d ago',
    },
    {
      id: 14,
      title: 'How does culture preserve history better than books?',
      postedBy: 'Cultural Experts',
      category: 'History',
      replies: 6,
      time: '3d ago',
    },
    {
      id: 15,
      title: 'The mysteries of the universe',
      postedBy: 'Science Community',
      category: 'Others',
      replies: 15,
      time: '1d ago',
    },
    {
      id: 16,
      title: 'Lessons from history',
      postedBy: 'History Buffs',
      category: 'Others',
      replies: 10,
      time: '2d ago',
    },
    {
      id: 17,
      title: 'Understanding human behavior',
      postedBy: 'Psychology Enthusiasts',
      category: 'Others',
      replies: 7,
      time: '6h ago',
    },
    {
      id: 18,
      title: 'Analyzing art through the ages',
      postedBy: 'Art Lovers',
      category: 'Others',
      replies: 8,
      time: '3d ago',
    },
  ]);

  const categories = ['All Discussions', 'Tech', 'Career', 'Studies', 'Social', 'Others'];
  const createOptions = ['Create Event', 'Create Community'];

  const filteredDiscussions = discussions.filter(
    (d) =>
      (filter === 'All Discussions' || d.category === filter) &&
      (searchQuery === '' || d.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreateDiscussion = () => {
    if (newDiscussion.title && newDiscussion.postedBy && newDiscussion.category) {
      setDiscussions([{
        id: discussions.length + 1,
        title: newDiscussion.title,
        postedBy: newDiscussion.postedBy,
        category: newDiscussion.category,
        replies: 0,
        time: 'Just now',
      }, ...discussions]);
      setNewDiscussion({ title: '', category: '', postedBy: '' });
      setIsCreateModalOpen(false);
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="sticky top-0 bg-white shadow-md z-10 p-4 flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4 w-full">
                <button
                  onClick={() => setIsCreateModalOpen(true)}
                  className="w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center justify-center"
                >
                  +
                </button>
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 px-6 py-3 border rounded-lg shadow-sm text-lg font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </header>

            <main className="p-4 space-y-6">
              {filteredDiscussions.map((discussion) => (
                <div key={discussion.id} className="bg-gray-100 shadow rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{discussion.title}</h3>
                  <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                    <span>Posted by {discussion.postedBy}</span>
                    <span>{discussion.time}</span>
                  </div>
                  <textarea
                    placeholder="Write your reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    className="w-full mt-4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={() => {
                      alert(`Reply posted: ${reply}`);
                      setReply('');
                    }}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  >
                    Post Reply
                  </button>
                </div>
              ))}
            </main>
          </motion.div>
        </motion.div>
      )}

      {isCreateModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsCreateModalOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Create Discussion</h2>
            <input
              type="text"
              placeholder="Your Name"
              value={newDiscussion.postedBy}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, postedBy: e.target.value })}
              className="w-full mb-4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Discussion Title"
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, title: e.target.value })}
              className="w-full mb-4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newDiscussion.category}
              onChange={(e) => setNewDiscussion({ ...newDiscussion, category: e.target.value })}
              className="w-full mb-4 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="" disabled>Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <button
              onClick={handleCreateDiscussion}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
              Post Discussion
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}