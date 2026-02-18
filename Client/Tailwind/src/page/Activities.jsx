import { Link } from "react-router-dom";
import { FaHiking, FaUmbrellaBeach, FaCamera, FaUtensils, FaSpa, FaShoppingBag } from "react-icons/fa";

const Activities = () => {
  const activities = [
    { id: 1, title: "Adventure Tours", description: "Explore thrilling trekking, camping, and adventure sports across India", icon: FaHiking, color: "from-orange-500 to-red-500", bgColor: "bg-orange-100", iconColor: "text-orange-600", items: ["Mountain Trekking", "River Rafting", "Paragliding", "Camping"] },
    { id: 2, title: "Beach Activities", description: "Enjoy sun, sand, and water sports at beautiful coastal destinations", icon: FaUmbrellaBeach, color: "from-cyan-500 to-blue-500", bgColor: "bg-cyan-100", iconColor: "text-cyan-600", items: ["Scuba Diving", "Snorkeling", "Jet Skiing", "Beach Volleyball"] },
    { id: 3, title: "Sightseeing Tours", description: "Discover historical monuments, temples, and scenic viewpoints", icon: FaCamera, color: "from-purple-500 to-pink-500", bgColor: "bg-purple-100", iconColor: "text-purple-600", items: ["Heritage Walks", "City Tours", "Temple Visits", "Photography Tours"] },
    { id: 4, title: "Food & Culinary", description: "Taste local cuisines and join cooking classes", icon: FaUtensils, color: "from-amber-500 to-orange-500", bgColor: "bg-amber-100", iconColor: "text-amber-600", items: ["Food Tours", "Cooking Classes", "Wine Tasting", "Street Food Walks"] },
    { id: 5, title: "Spa & Wellness", description: "Relax and rejuvenate with traditional spa treatments", icon: FaSpa, color: "from-emerald-500 to-teal-500", bgColor: "bg-emerald-100", iconColor: "text-emerald-600", items: ["Ayurvedic Spa", "Yoga Retreats", "Meditation", "Hot Springs"] },
    { id: 6, title: "Shopping Tours", description: "Explore local markets and shopping destinations", icon: FaShoppingBag, color: "from-pink-500 to-rose-500", bgColor: "bg-pink-100", iconColor: "text-pink-600", items: ["Local Markets", "Handicrafts", "Fashion Streets", "Souvenir Shops"] },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-slate-50 to-indigo-50/20">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Explore Activities
          </h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Make your trip memorable with exciting activities and experiences
          </p>
        </div>
      </div>

      {/* Activities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div
                key={activity.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`h-36 bg-gradient-to-r ${activity.color} flex items-center justify-center`}>
                  <IconComponent className="text-white text-5xl drop-shadow-md" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {activity.title}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {activity.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-5">
                    {activity.items.map((item, index) => (
                      <span
                        key={index}
                        className={`${activity.bgColor} ${activity.iconColor} text-sm px-3 py-1.5 rounded-xl font-medium`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <button className={`w-full py-3 rounded-xl bg-gradient-to-r ${activity.color} text-white font-semibold hover:opacity-95 transition-opacity shadow-lg`}>
                    Explore More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-slate-300 mb-8 text-lg">
            Contact us and we'll help you plan custom activities for your trip
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-slate-800 px-8 py-3.5 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Activities;
