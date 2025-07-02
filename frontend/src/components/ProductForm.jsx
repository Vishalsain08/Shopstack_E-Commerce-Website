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
      className="bg-white p-6 rounded-lg shadow space-y-6"
    >
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-text mb-1">Product Name</label>
          <input
            type="text"
            placeholder="e.g. Nike Air Max 270"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Image URL</label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Brand</label>
          <input
            type="text"
            placeholder="e.g. Nike"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Category</label>
          <input
            type="text"
            placeholder="e.g. Footwear"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block text-sm font-medium text-text mb-1">Description</label>
          <textarea
            placeholder="Detailed product description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows={3}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Price (₹)</label>
          <input
            type="number"
            placeholder="e.g. 4999"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text mb-1">Count In Stock</label>
          <input
            type="number"
            placeholder="e.g. 10"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isEditing ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
