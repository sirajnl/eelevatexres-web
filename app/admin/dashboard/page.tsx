export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl">
          <h2 className="text-gray-500 font-semibold mb-2">Total Orders</h2>
          <p className="text-4xl font-bold text-gray-800">124</p>
        </div>
        
        {/* Card 2 */}
        <div className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl">
          <h2 className="text-gray-500 font-semibold mb-2">Revenue</h2>
          <p className="text-4xl font-bold text-gray-800">$4,520</p>
        </div>

        {/* Card 3 */}
        <div className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl">
          <h2 className="text-gray-500 font-semibold mb-2">Active Reservations</h2>
          <p className="text-4xl font-bold text-gray-800">18</p>
        </div>

        {/* Card 4 */}
        <div className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-6 transition-all hover:-translate-y-1 hover:shadow-2xl">
          <h2 className="text-gray-500 font-semibold mb-2">New Users</h2>
          <p className="text-4xl font-bold text-gray-800">12</p>
        </div>
      </div>
      
      {/* Branding comment: developed by elevatex */}
    </div>
  );
}
