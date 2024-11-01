import { FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

function About() {
  const developers = [
    {
      name: 'John Doe',
      role: 'Lead Developer',
      image: 'https://via.placeholder.com/150',
      social: {
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        linkedin: 'https://linkedin.com'
      }
    },
    // Add 5 more developer objects with similar structure
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-header-blue mb-4">About Us</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          GCGALL is a platform dedicated to preserving and sharing the precious memories
          of Graduation Ceremony students. Our mission is to create a digital space where
          graduates can showcase their achievements and share their moments with the
          community.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {developers.map((dev, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={dev.image}
              alt={dev.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{dev.name}</h3>
              <p className="text-gray-600 mb-4">{dev.role}</p>
              <div className="flex justify-center space-x-4">
                <a
                  href={dev.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href={dev.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-pink-500"
                >
                  <FaInstagram size={20} />
                </a>
                <a
                  href={dev.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-700"
                >
                  <FaLinkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About; 