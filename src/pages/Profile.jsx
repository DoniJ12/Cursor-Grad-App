import { useState, useEffect } from 'react';

function Profile({ user }) {
  const [imageStacks, setImageStacks] = useState([]);
  const [editingStack, setEditingStack] = useState(null);
  const [newQuote, setNewQuote] = useState('');
  const [newImages, setNewImages] = useState([]);

  useEffect(() => {
    const savedStacks = JSON.parse(localStorage.getItem('imageStacks') || '[]');
    setImageStacks(savedStacks);
  }, []);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleUpdateStack = (stackId) => {
    const updatedStacks = imageStacks.map(stack => {
      if (stack.id === stackId) {
        return {
          ...stack,
          images: [...stack.images, ...newImages],
          quote: newQuote || stack.quote
        };
      }
      return stack;
    });

    localStorage.setItem('imageStacks', JSON.stringify(updatedStacks));
    setImageStacks(updatedStacks);
    setEditingStack(null);
    setNewImages([]);
    setNewQuote('');
  };

  const handleRemoveImage = (stackId, imageIndex) => {
    const updatedStacks = imageStacks.map(stack => {
      if (stack.id === stackId) {
        const newImages = stack.images.filter((_, index) => index !== imageIndex);
        return {
          ...stack,
          images: newImages
        };
      }
      return stack;
    });

    localStorage.setItem('imageStacks', JSON.stringify(updatedStacks));
    setImageStacks(updatedStacks);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name || 'User'}</h2>
          <p className="text-gray-600">Email: {user?.email}</p>
        </div>

        <h3 className="text-xl font-bold mb-6">Your Image Stacks</h3>
        
        <div className="space-y-6">
          {imageStacks.map(stack => (
            <div key={stack.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                {stack.images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Stack image ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      onClick={() => handleRemoveImage(stack.id, index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <p className="text-gray-700 mb-4">{stack.quote}</p>

              {editingStack === stack.id ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add More Images
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={handleFileChange}
                      className="w-full"
                      accept="image/*"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Update Quote
                    </label>
                    <textarea
                      value={newQuote}
                      onChange={(e) => setNewQuote(e.target.value)}
                      className="w-full p-2 border rounded-md"
                      placeholder={stack.quote}
                      rows="3"
                    />
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleUpdateStack(stack.id)}
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => {
                        setEditingStack(null);
                        setNewImages([]);
                        setNewQuote('');
                      }}
                      className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setEditingStack(stack.id)}
                  className="btn-primary"
                >
                  Edit Stack
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile; 