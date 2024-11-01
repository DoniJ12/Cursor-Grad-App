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
    setSelectedStack(selectedStack?.id === stack.id ? null : stack);
  };

  const handleImageClick = (image) => {
    setEnlargedImage(enlargedImage === image ? null : image);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {imageStacks.map((stack) => (
          <div key={stack.id} className="image-stack card-hover">
            <div
              onClick={() => handleStackClick(stack)}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={stack.images[0]}
                alt="Stack thumbnail"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-700">{stack.quote}</p>
              </div>
            </div>

            {selectedStack?.id === stack.id && (
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-y-auto">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {stack.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Stack image ${index + 1}`}
                        onClick={() => handleImageClick(image)}
                        className="w-full h-32 object-cover cursor-pointer rounded"
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setSelectedStack(null)}
                    className="mt-4 btn-primary"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
          onClick={() => setEnlargedImage(null)}
        >
          <img
            src={enlargedImage}
            alt="Enlarged view"
            className="max-w-[90vw] max-h-[90vh] object-contain"
          />
        </div>
      )}
    </div>
  );
}

export default Home; 