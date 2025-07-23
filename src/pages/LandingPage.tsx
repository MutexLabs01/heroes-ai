import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Users, Download, Star, TrendingUp } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Connect with Perfect Characters",
      description: "Find characters that resonate with your vision. Every hero has a story waiting to be told, and you'll discover the perfect match for your next narrative masterpiece."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Licensing",
      description: "One-click license templates with clear terms. Choose exclusive or non-exclusive rights and get instant legal protection for your creative investments."
    },
    {
      icon: <Download className="h-6 w-6" />,
      title: "Instant Downloads",
      description: "Purchase and download immediately. Get high-quality character art, story synopses, and complete IP bundles ready for your projects."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Creator Marketplace",
      description: "Monetize your creativity. Upload your superhero content, set your prices, and earn from your artistic talents in our thriving marketplace."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Comic Creator",
      image: "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "Heroes.ai helped me find the perfect character for my graphic novel. The licensing was straightforward and the quality exceeded my expectations."
    },
    {
      name: "Marcus Rodriguez",
      role: "Game Developer",
      image: "https://images.pexels.com/photos/3778603/pexels-photo-3778603.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "As an indie game developer, Heroes.ai is a goldmine. The character packs are professionally crafted and save me months of development time."
    },
    {
      name: "Emma Thompson",
      role: "Digital Artist",
      image: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
      quote: "I've sold over 50 character designs on Heroes.ai. The platform makes it easy to showcase my work and connect with creators who need my art."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-black"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
            Find Your Perfect
            <span className="block bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
              Superhero Story
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with characters that bring your stories to life. Discover professionally crafted superhero content, 
            from character art to complete IP bundles, all with secure licensing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/marketplace"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 flex items-center space-x-2 group"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/creator"
              className="border border-red-600 text-red-400 hover:bg-red-600/10 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
            >
              Start Selling
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Why Creators Choose Heroes.ai
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Every story deserves the perfect character. Our marketplace connects storytellers 
              with the ideal heroes for their next narrative adventure.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black/50 border border-red-900/20 rounded-lg p-6 hover:border-red-600/50 transition-all duration-200 group"
              >
                <div className="bg-red-600/20 text-red-400 p-3 rounded-lg w-fit mb-4 group-hover:bg-red-600/30 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2 group-hover:scale-105 transition-transform">
                10K+
              </div>
              <div className="text-gray-300">Characters Available</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2 group-hover:scale-105 transition-transform">
                5K+
              </div>
              <div className="text-gray-300">Happy Creators</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2 group-hover:scale-105 transition-transform">
                50K+
              </div>
              <div className="text-gray-300">Downloads</div>
            </div>
            <div className="group">
              <div className="text-3xl sm:text-4xl font-bold text-red-500 mb-2 group-hover:scale-105 transition-transform">
                98%
              </div>
              <div className="text-gray-300">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by Creators Worldwide
            </h2>
            <p className="text-xl text-gray-300">
              See what our community says about finding their perfect characters
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-black/50 border border-red-900/20 rounded-lg p-6 hover:border-red-600/50 transition-all duration-200"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-red-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-red-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Character?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who have found their ideal superhero characters. 
            Start your next story today.
          </p>
          <Link
            to="/marketplace"
            className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 inline-flex items-center space-x-2 group"
          >
            <Zap className="h-5 w-5" />
            <span>Start Exploring Now</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;