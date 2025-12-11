function UserProfile() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white p-6 rounded shadow max-w-lg space-y-4">
        <div>
          <h2 className="font-semibold">Full Name</h2>
          <p>Raiven Christian Navor</p>
        </div>
        <div>
          <h2 className="font-semibold">Email</h2>
          <p>raiven@example.com</p>
        </div>
        <div>
          <h2 className="font-semibold">Role</h2>
          <p>Administrator</p>
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
}

export default UserProfile;
