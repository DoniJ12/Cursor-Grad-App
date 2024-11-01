import { Link } from 'react-router-dom';

function Header({ onLogout }) {
  return (
    <header className="bg-header-blue text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          GCGALL
        </Link>
        <nav className="space-x-6">
          <Link to="/" className="hover:bg-hover-gray hover:text-black px-3 py-2 rounded">
            Home
          </Link>
          <Link to="/upload" className="hover:bg-hover-gray hover:text-black px-3 py-2 rounded">
            Upload
          </Link>
          <Link to="/profile" className="hover:bg-hover-gray hover:text-black px-3 py-2 rounded">
            Profile
          </Link>
          <Link to="/about" className="hover:bg-hover-gray hover:text-black px-3 py-2 rounded">
            About Us
          </Link>
          <Link to="/contact" className="hover:bg-hover-gray hover:text-black px-3 py-2 rounded">
            Contact
          </Link>
          <button
            onClick={onLogout}
            className="hover:bg-hover-gray hover:text-black px-3 py-2 rounded"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header; 