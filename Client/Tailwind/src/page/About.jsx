import { Link } from "react-router-dom";
import { FaUsers, FaHotel, FaGlobe, FaAward } from "react-icons/fa";

const About = () => {
  const stats = [
    {
      icon: FaUsers,
      value: "50,00+",
      label: "Happy Customers",
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
    {
      icon: FaHotel,
      value: "10+",
      label: "Hotels Listed",
      bg: "bg-emerald-100",
      color: "text-emerald-600",
    },
    {
      icon: FaGlobe,
      value: "10+",
      label: "Cities Covered",
      bg: "bg-violet-100",
      color: "text-violet-600",
    },
    {
      icon: FaAward,
      value: "4.8★",
      label: "Average Rating",
      bg: "bg-amber-100",
      color: "text-amber-600",
    },
  ];

  const team = [
    { name: "Mitali Kumari", role: "CEO & Founder", initials: "RS" },
    { name: "HL Singh", role: "CTO", initials: "PP" },
    { name: "Amit Kumar", role: "Head of Operations", initials: "AK" },
    { name: "Sneha Gupta", role: "Customer Success", initials: "SG" },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gradient-to-b from-slate-50 to-indigo-50/20">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            About Us
          </h1>
          <p className="text-xl text-indigo-100 max-w-3xl mx-auto">
            We're on a mission to make hotel booking simple, affordable, and
            enjoyable for everyone.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Founded in 2020, Hotel Booking started with a simple idea: make
                finding and booking the perfect hotel as easy as possible. What
                began as a small startup has grown into one of India's most
                trusted hotel booking platforms.
              </p>
              <p>
                Our team of travel enthusiasts and tech experts work tirelessly
                to bring you the best deals, verified reviews, and a seamless
                booking experience. We partner with thousands of hotels across
                India to ensure you always find the perfect stay.
              </p>
              <p>
                Whether you're planning a business trip, family vacation, or a
                weekend getaway, we're here to help you every step of the way.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl p-8 text-white shadow-xl border border-indigo-400/20">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-indigo-100 mb-6">
              "To revolutionize the way people discover and book hotels by
              providing a platform that combines technology, transparency, and
              exceptional customer service."
            </p>
            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-indigo-100">
              "To become India's most loved and trusted hotel booking platform,
              making travel accessible and enjoyable for millions."
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-slate-100/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-slate-500 text-center mb-12">
            Trusted by travelers across India
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bg} mb-4`}
                  >
                    <IconComponent className={`text-3xl ${stat.color}`} />
                  </div>
                  <div className="text-3xl font-bold text-slate-800 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-4">
          Our Core Values
        </h2>
        <p className="text-slate-500 text-center mb-12">
          What drives us every day
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center hover:shadow-2xl hover:border-indigo-100 transition-all">
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🎯</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Customer First
            </h3>
            <p className="text-slate-600">
              Every decision we make starts with how it will benefit our
              customers.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center hover:shadow-2xl hover:border-emerald-100 transition-all">
            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Trust & Transparency
            </h3>
            <p className="text-slate-600">
              We believe in honest pricing, genuine reviews, and clear
              communication.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 text-center hover:shadow-2xl hover:border-violet-100 transition-all">
            <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🚀</span>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">
              Innovation
            </h3>
            <p className="text-slate-600">
              We constantly improve our platform to provide the best user
              experience.
            </p>
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="bg-slate-100/80 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-4">
            Meet Our Team
          </h2>
          <p className="text-slate-500 text-center mb-12">
            The people behind Hotel Booking
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-105 transition-transform">
                  <span className="text-white text-2xl font-bold">
                    {member.initials}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800">{member.name}</h3>
                <p className="text-slate-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.06\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Book Your Next Stay?
          </h2>
          <p className="text-indigo-100 mb-8 text-lg">
            Join thousands of happy travelers who trust us for their hotel
            bookings.
          </p>
          <Link
            to="/discover"
            className="inline-block bg-white text-indigo-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Start Exploring
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
