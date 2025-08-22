/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";

export default function ProductDetails({ params }) {
  const { _id } = params;
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]); // ⭐ related products state
  const [loading, setLoading] = useState(false);

  // Main product fetch
  useEffect(() => {
    if (_id) {
      setLoading(true);
      fetch(`http://localhost:5000/api/v1/product/details/${_id}`)
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setProduct(data.data);
        })
        .catch(() => setLoading(false));
    }
  }, [_id]);

  // Related products fetch (depends on product)
  useEffect(() => {
    console.log("hello");
    if (product?.company && product?.category) {
      fetch(
        `http://localhost:5000/api/v1/product/related-products?company=${product.company}&category=${product.category}`
      )
        .then((res) => res.json())
        .then((data) => {
          setRelatedProducts(data.data || []);
        })
        .catch((err) => console.error("Error fetching related:", err));
    }
  }, [product]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!product) return <p className="text-center">No product found</p>;

  // Quantity control
  const handleIncrease = () => {
    if (quantity < product?.quantity) setQuantity(quantity + 1);
  };
  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      {/* Product Details Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex flex-col items-center">
          <img
            src={product?.image?.image}
            alt={product?.title}
            className="w-72 h-72 object-contain"
          />
        </div>

        {/* Product Info */}
        <div>
          <h2 className="text-orange-500 font-semibold text-lg">
            {product?.brand}
          </h2>
          <h1 className="text-3xl font-bold mt-1">{product?.title}</h1>

          <span className="px-3 py-1 bg-gray-100 rounded shadow text-gray-700 text-sm">
            {product?.category}
          </span>

          <p className="mt-4 text-gray-600 leading-relaxed">
            {product?.description}
          </p>

          <div className="mt-5 flex items-center gap-4">
            {product?.price && (
              <p className="text-gray-400 line-through text-lg">
                ৳ {product?.price}
              </p>
            )}
            <p className="text-3xl font-bold text-orange-600">
              ৳ {product?.discountPrice}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-4">
            {product?.quantity > 0 && (
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={handleDecrease}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 border-x text-lg">{quantity}</span>
                <button
                  onClick={handleIncrease}
                  className="px-3 py-2 hover:bg-gray-100"
                >
                  <Plus size={16} />
                </button>
              </div>
            )}

            {product?.quantity === 0 ? (
              <button className="bg-orange-500 text-white px-6 py-3 rounded-lg shadow-md cursor-not-allowed">
                OUT OF STOCK
              </button>
            ) : (
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md">
                ADD TO CART
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Related Products
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((item, index) => (
              <Link
                key={index}
                href={`/component/products/all_products/product_details/${item._id}`}
              >
                <div
                  key={index}
                  className="bg-white rounded-xl shadow hover:shadow-2xl hover:shadow-primary transition transform hover:-translate-y-2 p-3 relative"
                >
                  {/* Discount Badge */}
                  {item.discountPrice && item.price && (
                    <span className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                      -
                      {Math.round(
                        ((item.price - item.discountPrice) / item.price) * 100
                      )}
                      %
                    </span>
                  )}

                  {/* Product Image */}
                  <div className="w-full h-40 sm:h-48 flex items-center justify-center">
                    <img
                      src={item.image.image}
                      alt={item.title}
                      className="max-h-full object-contain"
                    />
                  </div>

                  {/* Product Title */}
                  <h3 className="text-sm font-medium mt-3 text-gray-800 line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Price */}
                  <div className="mt-2">
                    {item.price && (
                      <p className="text-gray-400 line-through text-sm">
                        {item.price} TK
                      </p>
                    )}
                    <p className="text-lg font-semibold text-orange-600">
                      {item.discountPrice} TK
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
