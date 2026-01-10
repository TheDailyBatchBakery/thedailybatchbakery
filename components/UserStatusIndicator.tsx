'use client';

import { useUserStore } from '@/stores/userStore';

export default function UserStatusIndicator() {
  const { user, clearUser } = useUserStore();

  if (!user) return null;

  return (
    <div className="fixed top-4 left-4 z-50">
      <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg text-sm shadow-md max-w-xs flex items-center gap-3">
        <span>Welcome back, {user.name}!</span>
        <button
          onClick={clearUser}
          className="bg-primary-500 text-white px-3 py-1 rounded text-xs whitespace-nowrap hover:bg-primary-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

