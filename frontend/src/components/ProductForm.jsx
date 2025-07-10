import { useState, useEffect } from 'react';

const ProductForm = ({ initialData = {}, onSubmit, isEditing = false }) => {
  const [name, setName] = useState(initialData.name || '');
  const [image, setImage] = useState(initialData.image || '');
  const [brand, setBrand] = useState(initialData.brand || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [countInStock, setCountInStock] = useState(initialData.countInStock || '');

  useEffect(() => {
    if (isEditing && initialData) {
      setName(initialData.name || '');
      setImage(initialData.image || '');
      setBrand(initialData.brand || '');
      setCategory(initialData.category || '');
      setDescription(initialData.description || '');
      setPrice(initialData.price || '');
      setCountInStock(initialData.countInStock || '');
    }
  }, [initialData, isEditing]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      name,
      image,
      brand,
      category,
      description,
      price: Number(price),
      countInStock: Number(countInStock),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-xl border border-slate-200 shadow-xl rounded-2xl max-w-3xl w-full p-6 sm:p-10 space-y-6"
    >

      <div className="grid sm:grid-cols-2 gap-5">
        {/* Product Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            placeholder="e.g. Nike Air Max 270"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full bg-white border-2 border-indigo-500 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full bg-white border-2 border-indigo-500 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
          />
        </div>

        {/* Brand */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
          <input
            type="text"
            placeholder="e.g. Nike"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            className="w-full bg-white border-2 border-indigo-500 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <input
            type="text"
            placeholder="e.g. Footwear"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full bg-white border-2 border-indigo-500 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
          />
        </div>

        {/* Description */}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            placeholder="Detailed product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full bg-white border-2 border-indigo-500 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800 resize-none"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
          <input
            type="number"
            placeholder="e.g. 4999"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full bg-white border-2 border-indigo-500 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
          />
        </div>

        {/* Stock Count */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Count In Stock</label>
          <input
            type="number"
            placeholder="e.g. 10"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            required
            className="w-full bg-white border-2 border-indigo-500 rounded-lg px-4 py-2 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-800"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-slate-700 hover:bg-slate-800 transition text-white py-3 rounded-lg text-lg font-semibold shadow-md"
        >
          {isEditing ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
