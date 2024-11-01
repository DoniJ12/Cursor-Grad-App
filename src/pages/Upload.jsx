import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Upload() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [quote, setQuote] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Function to compress image
  const compressImage = (base64String) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        // Compress image to JPEG with 0.7 quality
        resolve(canvas.toDataURL('image/jpeg', 0.7));
      };
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles([]); // Clear previous selections
    
    try {
      const filePromises = files.map(file => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = async () => {
            try {
              const compressedImage = await compressImage(reader.result);
              resolve(compressedImage);
            } catch (error) {
              reject(error);
            }
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const results = await Promise.all(filePromises);
      setSelectedFiles(results);
    } catch (error) {
      console.error('Error reading files:', error);
      setMessage('Error reading files. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedFiles.length === 0) {
      setMessage('Please select at least one image.');
      return;
    }

    setIsUploading(true);
    setMessage('');

    try {
      // Clean up existing stacks first
      const existingStacks = JSON.parse(localStorage.getItem('imageStacks') || '[]')
        .filter(stack => stack.images && stack.images.length > 0);

      // Create new stack
      const newStack = {
        id: Date.now(),
        images: selectedFiles,
        quote,
        timestamp: new Date().toISOString()
      };

      // Try to save to localStorage with error handling
      try {
        localStorage.setItem('imageStacks', JSON.stringify([...existingStacks, newStack]));
      } catch (storageError) {
        // If storage is full, try to remove oldest stacks until it fits
        while (existingStacks.length > 0) {
          existingStacks.shift(); // Remove oldest stack
          try {
            localStorage.setItem('imageStacks', JSON.stringify([...existingStacks, newStack]));
            setMessage('Upload successful! (Some older images were removed due to storage limits)');
            break;
          } catch (e) {
            if (existingStacks.length === 0) {
              throw new Error('Cannot save even after clearing storage');
            }
          }
        }
      }

      // Clear form
      setSelectedFiles([]);
      setQuote('');
      
      // Navigate after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Upload error:', error);
      setMessage('Upload failed: Storage is full. Please delete some existing images first.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemovePreview = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
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
                  <div key={index} className="relative">
                    <img
                      src={file}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePreview(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
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