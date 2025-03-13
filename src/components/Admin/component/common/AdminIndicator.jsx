import React from 'react';

const AdminIndicator = ({ email }) => {
  return (
    <div className="flex items-center gap-2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
      {/* Blinking green dot */}
      <span className="w-2 h-2 bg-green-400 rounded-full animate-blink"></span>

      {/* Admin email */}
      <span>{email}</span>
    </div>
  );
};

export default AdminIndicator;
