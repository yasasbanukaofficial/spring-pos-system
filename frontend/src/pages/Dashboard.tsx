export const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="border border-white p-8">
        <p className="text-[10px] text-gray-500 font-black uppercase">
          Revenue
        </p>
        <p className="text-5xl font-black italic">$12,450</p>
      </div>
      <div className="border border-white p-8">
        <p className="text-[10px] text-gray-500 font-black uppercase">Active</p>
        <p className="text-5xl font-black italic">24</p>
      </div>
      <div className="border border-white p-8">
        <p className="text-[10px] text-gray-500 font-black uppercase">Status</p>
        <p className="text-5xl font-black italic">NOMINAL</p>
      </div>
    </div>
  );
};
