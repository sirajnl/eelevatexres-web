export default function AdminMenu() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Menu Management</h1>
        <button className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700 transition">
          Add Menu Item
        </button>
      </div>
      
      <div className="bg-white/60 backdrop-blur-lg border border-white/40 shadow-xl rounded-2xl p-6">
        <p className="text-gray-600">Menu items will be listed here.</p>
        {/* Placeholder for menu table/grid */}
      </div>
      {/* Branding comment: developed by elevatex */}
    </div>
  );
}
