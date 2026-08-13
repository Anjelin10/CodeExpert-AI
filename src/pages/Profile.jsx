import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { FiUser, FiMail, FiEdit2, FiShield, FiBell } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    email: '',
    memberSince: '',
    bio: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));
    if (!localUser) {
      navigate('/login');
      return;
    }
    fetch(`http://localhost:5000/api/auth/${localUser.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        const date = new Date(data.created_at);
        setUser({
          id: data.id,
          username: data.username,
          email: data.email,
          bio: data.bio || '',
          memberSince: date.toLocaleString('default', { month: 'short', year: 'numeric' })
        });
      })
      .catch(err => console.error(err));
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/auth/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: user.username, bio: user.bio })
      });
      if (res.ok) {
        setIsEditing(false);
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
        const localUser = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify({ ...localUser, username: user.username, bio: user.bio }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-[#F4F4F5]">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8 md:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-[#F4F4F5]">My Profile</h1>
          <p className="mt-1.5 text-sm text-[#A1A1AA]">Manage your account settings and preferences.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Navigation/Overview */}
          <div className="space-y-6">
            <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 text-center">
              <div className="w-24 h-24 bg-[#27272A] rounded-full mx-auto flex items-center justify-center border-4 border-[#09090B] shadow-lg mb-4">
                <FiUser size={40} className="text-[#A1A1AA]" />
              </div>
              <h2 className="text-xl font-bold text-[#F4F4F5]">{user.username}</h2>
              <p className="text-sm text-[#71717A] mt-1">{user.email}</p>
              <div className="mt-4 pt-4 border-t border-[#27272A]">
                <p className="text-xs text-[#A1A1AA]">Member since {user.memberSince}</p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="md:col-span-2">
            <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-medium text-[#F4F4F5]">Account Details</h3>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 text-sm text-purple-500 hover:text-purple-400 transition-colors cursor-pointer"
                >
                  <FiEdit2 size={14} />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {message && (
                <div className="mb-4 text-sm text-green-400 bg-green-400/10 p-2 rounded border border-green-400/20">
                  {message}
                </div>
              )}

              <form className="space-y-6" onSubmit={handleSave}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#D4D4D8] mb-2">
                      Username
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-[#52525B]" />
                      </div>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={user.username}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                        className={`block w-full rounded-md border border-[#27272A] bg-[#09090B] py-2.5 pl-10 pr-3 text-[#A1A1AA] sm:text-sm ${!isEditing ? 'cursor-not-allowed' : 'focus:border-purple-500 outline-none'}`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#D4D4D8] mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-[#52525B]" />
                      </div>
                      <input
                        type="email"
                        disabled
                        value={user.email}
                        className="block w-full rounded-md border border-[#27272A] bg-[#09090B] py-2.5 pl-10 pr-3 text-[#A1A1AA] sm:text-sm cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#D4D4D8] mb-2">
                    Bio
                  </label>
                  <textarea
                    rows={4}
                    disabled={!isEditing}
                    value={user.bio}
                    onChange={(e) => setUser({...user, bio: e.target.value})}
                    placeholder="Tell us a little bit about yourself"
                    className={`block w-full rounded-md border border-[#27272A] bg-[#09090B] py-2 px-3 text-[#F4F4F5] placeholder:text-[#52525B] sm:text-sm transition-colors ${!isEditing ? 'cursor-not-allowed opacity-70' : 'focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500'}`}
                  ></textarea>
                </div>

                <div className="pt-4 border-t border-[#27272A] flex justify-end">
                  {isEditing && (
                    <button
                      type="submit"
                      className="rounded-md bg-purple-600 py-2 px-6 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-[#18181B] transition-colors cursor-pointer"
                    >
                      Save Changes
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
