import { FaTwitter, FaInstagram, FaTelegram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-header-blue text-white py-6">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">GCGALL</h3>
            <p className="text-sm mt-2">Graduation Gallery for GC Students</p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-hover-gray transition-colors"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-hover-gray transition-colors"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-hover-gray transition-colors"
            >
              <FaTelegram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-hover-gray transition-colors"
            >
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>
        <div className="text-center mt-6 text-sm">
          <p>&copy; {new Date().getFullYear()} GCGALL. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
