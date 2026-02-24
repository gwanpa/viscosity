import { Activity, Heart, Bone, Users, Calendar, FileText } from 'lucide-react';

interface HomepageProps {
  onLogin: () => void;
  onRegister: () => void;
}

export default function Homepage({ onLogin, onRegister }: HomepageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/visco_logo2.png" alt="Viscosity Logo" className="h-10 w-auto" />
              <span className="ml-3 text-xl font-bold text-blue-900">Viscosity Orthopedics</span>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={onLogin}
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Login
              </button>
              <button
                onClick={onRegister}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Expert Orthopedic Care
              <span className="block text-blue-600 mt-2">For Your Active Life</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              World-class orthopedic treatment with compassionate care. From sports injuries to joint replacement,
              we're here to help you move better and live better.
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={onRegister}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
              >
                Book Appointment
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl text-lg font-semibold border-2 border-blue-600"
              >
                Our Services
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-xl hover:shadow-xl transition-shadow bg-gradient-to-br from-blue-50 to-white">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">15,000+</h3>
              <p className="text-gray-600">Happy Patients</p>
            </div>
            <div className="text-center p-8 rounded-xl hover:shadow-xl transition-shadow bg-gradient-to-br from-green-50 to-white">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">25+</h3>
              <p className="text-gray-600">Years of Excellence</p>
            </div>
            <div className="text-center p-8 rounded-xl hover:shadow-xl transition-shadow bg-gradient-to-br from-orange-50 to-white">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">98%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive orthopedic care tailored to your needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Bone, title: 'Joint Replacement', desc: 'Advanced joint replacement surgery for hip, knee, and shoulder' },
              { icon: Activity, title: 'Sports Medicine', desc: 'Comprehensive care for sports-related injuries and rehabilitation' },
              { icon: FileText, title: 'Spine Care', desc: 'Expert treatment for back pain and spinal conditions' },
              { icon: Heart, title: 'Arthritis Management', desc: 'Specialized care for arthritis and joint inflammation' },
              { icon: Bone, title: 'Fracture Care', desc: 'Emergency and planned treatment for bone fractures' },
              { icon: Activity, title: 'Physical Therapy', desc: 'Rehabilitation and physical therapy services' },
            ].map((service, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
                <service.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our patient-centered approach
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'Expert Team', desc: 'Board-certified specialists with decades of experience' },
              { icon: Calendar, title: 'Easy Scheduling', desc: 'Book appointments online 24/7 through our portal' },
              { icon: Heart, title: 'Personalized Care', desc: 'Treatment plans tailored to your unique needs' },
              { icon: Activity, title: 'Modern Facility', desc: 'State-of-the-art equipment and techniques' },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of patients who trust us with their orthopedic care
          </p>
          <button
            onClick={onRegister}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl text-lg font-semibold"
          >
            Create Your Account
          </button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Viscosity Orthopedics</h3>
              <p className="text-gray-400">Expert orthopedic care for your active life</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-400">Phone: (555) 123-4567</p>
              <p className="text-gray-400">Email: info@viscosityortho.com</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Hours</h3>
              <p className="text-gray-400">Mon-Fri: 8:00 AM - 6:00 PM</p>
              <p className="text-gray-400">Sat: 9:00 AM - 2:00 PM</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Viscosity Orthopedics. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
