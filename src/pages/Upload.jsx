import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [quote, setQuote] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFiles(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    try {
      const newStack = {
        id: Date.now(),
        images: selectedFiles,
        quote,
        timestamp: new Date().toISOString()
      };

      const existingStacks = JSON.parse(localStorage.getItem('imageStacks') || '[]');
      localStorage.setItem('imageStacks', JSON.stringify([...existingStacks, newStack]));

      setMessage('Upload successful!');
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      setMessage('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Upload Images</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
              accept="image/*"
            />
            <label
              htmlFor="file-upload"
              className="btn-primary cursor-pointer inline-block"
            >
              Choose Files
            </label>
            
            {selectedFiles.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {selectedFiles.map((file, index) => (
                  <img
                    key={index}
                    src={file}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add a Quote
            </label>
            <textarea
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="w-full p-2 border rounded-md"
              rows="3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isUploading || selectedFiles.length === 0}
            className="w-full btn-primary disabled:opacity-50"
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-4 rounded text-center ${
            message.includes('successful') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload; 