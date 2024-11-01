import { useState, useEffect } from 'react';

function Home() {
  const [imageStacks, setImageStacks] = useState([]);
  const [selectedStack, setSelectedStack] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);

  useEffect(() => {
    const savedStacks = localStorage.getItem('imageStacks');
    if (savedStacks) {
      setImageStacks(JSON.parse(savedStacks));
    }
  }, []);

  const handleStackClick = (stack) => {
    setSelectedStack(stack);
    setEnlargedImage(null);
  };

  const handleImageClick = (e, image) => {
    e.stopPropagation();
    setEnlargedImage(image);
  };

  const handleCloseStack = (e) => {
    e.stopPropagation();
    setSelectedStack(null);
    setEnlargedImage(null);
  };

  const handleCloseEnlarged = (e) => {
    e.stopPropagation();
    setEnlargedImage(null);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-header-blue mb-4">
          Welcome to GCGALL
        </h1>
        <p className="text-xl text-gray-600">
          Congratulations to all graduates! Share your memorable moments here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {imageStacks.map((stack) => (
          <div key={stack.id} className="image-stack card-hover">
            <div
              onClick={() => handleStackClick(stack)}
              className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer h-[500px] flex flex-col"
            >
              <div className="h-[350px] overflow-hidden">
                <img
                  src={stack.images[0]}
                  alt="Stack thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <p className="text-gray-700 text-lg">{stack.quote}</p>
                <p className="text-sm text-gray-500 mt-4">
                  {new Date(stack.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stack Modal */}
      {selectedStack && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-40"
          onClick={handleCloseStack}
        >
          <div 
            className="bg-white p-6 rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto m-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {selectedStack.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Stack image ${index + 1}`}
                  onClick={(e) => handleImageClick(e, image)}
                  className="w-full h-48 object-cover cursor-pointer rounded transition-transform hover:scale-105"
                />
              ))}
            </div>
            <p className="text-gray-700 text-lg mt-6 mb-4">{selectedStack.quote}</p>
            <button
              onClick={handleCloseStack}
              className="mt-4 btn-primary"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Enlarged Image Modal */}
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={handleCloseEnlarged}
        >
          <img
            src={enlargedImage}
            alt="Enlarged view"
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default Home; 