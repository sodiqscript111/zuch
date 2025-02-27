// components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../utils/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import './admindashboard.css';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    imageFiles: [],
    imagePreviews: [],
    standardSizes: ['S', 'M', 'L', 'XL'],
    collectionId: '',
  });
  const [editProduct, setEditProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('products');
  const navigate = useNavigate();

  const IMGBB_API_KEY = VITE_IMAGE_KEY; // Replace with your ImgBB API key

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        fetchCollections();
        fetchAllProducts();
        fetchAllOrders();
      } else {
        setUser(null);
        setProducts([]);
        setOrders([]);
        setCollections([]);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchCollections = async () => {
    try {
      const collectionsRef = collection(db, "collections");
      const collectionsSnapshot = await getDocs(collectionsRef);
      const collectionList = collectionsSnapshot.docs.map(doc => doc.id);
      setCollections(collectionList);
      if (collectionList.length > 0 && !newProduct.collectionId) {
        setNewProduct(prev => ({ ...prev, collectionId: collectionList[0] }));
      }
    } catch (err) {
      console.error("Error fetching collections:", err);
      setError("Failed to load collections.");
    }
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const collectionsRef = collection(db, "collections");
      const collectionsSnapshot = await getDocs(collectionsRef);
      const allProducts = [];

      for (const collectionDoc of collectionsSnapshot.docs) {
        const productsRef = collection(db, "collections", collectionDoc.id, "products");
        const productsSnapshot = await getDocs(productsRef);
        productsSnapshot.forEach((doc) => {
          const data = doc.data();
          allProducts.push({
            id: doc.id,
            collectionId: collectionDoc.id,
            name: data.name || "Unknown",
            price: data.price || "N/A",
            description: data.description || "",
            imageUrl: Array.isArray(data.imageUrl) ? data.imageUrl : [data.imageUrl] || [],
            standardSizes: data.standardSizes || ['S', 'M', 'L', 'XL'],
          });
        });
      }

      console.log("Fetched Products:", allProducts);
      setProducts(allProducts);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const ordersRef = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersRef);
      const allOrders = ordersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Orders:", allOrders);
      setOrders(allOrders);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid credentials.");
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  const handleImageUpload = async (files) => {
    const uploadedUrls = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('key', IMGBB_API_KEY);

      const response = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        uploadedUrls.push(data.data.url);
      } else {
        throw new Error('Image upload failed');
      }
    }
    return uploadedUrls;
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const imageUrls = newProduct.imageFiles.length > 0 
        ? await handleImageUpload(newProduct.imageFiles) 
        : [];
      
      const productsRef = collection(db, "collections", newProduct.collectionId, "products");
      await addDoc(productsRef, {
        name: newProduct.name,
        price: parseFloat(newProduct.price) || 0,
        description: newProduct.description,
        imageUrl: imageUrls,
        standardSizes: newProduct.standardSizes,
      });
      setNewProduct({ name: '', price: '', description: '', imageFiles: [], imagePreviews: [], standardSizes: ['S', 'M', 'L', 'XL'], collectionId: collections[0] || 'customnative' });
      fetchAllProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      setError("Failed to add product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const productRef = doc(db, "collections", editProduct.collectionId, "products", editProduct.id);
      const imageUrls = editProduct.imageFiles && editProduct.imageFiles.length > 0 
        ? await handleImageUpload(editProduct.imageFiles) 
        : editProduct.imageUrl;

      await updateDoc(productRef, {
        name: editProduct.name,
        price: parseFloat(editProduct.price) || 0,
        description: editProduct.description,
        imageUrl: imageUrls,
        standardSizes: editProduct.standardSizes,
      });
      setEditProduct(null);
      fetchAllProducts();
    } catch (err) {
      console.error("Error editing product:", err);
      setError("Failed to edit product: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (collectionId, id) => {
    try {
      const productRef = doc(db, "collections", collectionId, "products", id);
      await deleteDoc(productRef);
      fetchAllProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      setError("Failed to delete product.");
    }
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleFileChange = (e, isEdit = false) => {
    const files = Array.from(e.target.files);
    const previews = files.map(file => URL.createObjectURL(file));
    if (isEdit) {
      setEditProduct(prev => ({
        ...prev,
        imageFiles: files,
        imagePreviews: previews,
      }));
    } else {
      setNewProduct(prev => ({
        ...prev,
        imageFiles: files,
        imagePreviews: previews,
      }));
    }
  };

  const downloadOrdersAsCSV = () => {
    const headers = [
      "Order ID",
      "Reference",
      "Email",
      "Phone",
      "Address",
      "Date",
      "Status",
      "Item Name",
      "Item Price",
      "Item Quantity",
      "Item Size",
    ];
    const rows = orders.flatMap(order => 
      order.cartItems.map(item => [
        order.id,
        order.reference,
        order.email,
        order.phone,
        order.address,
        new Date(order.timestamp).toLocaleString(),
        order.status,
        item.name,
        `₦${item.price}`,
        item.quantity,
        item.options?.size || 'N/A',
      ])
    );

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'orders.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!user) {
    return (
      <div className="admin-login">
        <div className="login-container">
          <h2>Admin Login</h2>
          {error && <p className="error-text">{error}</p>}
          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="login-input"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="login-input"
            />
            <button type="submit" className="login-button">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <h2 className="sidebar-title">Admin</h2>
        <ul className="sidebar-nav">
          <li>
            <button onClick={() => { setActiveTab('products'); setEditProduct(null); }} className="nav-button">
              <span className="nav-icon">➕</span> Add Product
            </button>
          </li>
          <li>
            <button onClick={() => { setActiveTab('products'); fetchAllProducts(); }} className="nav-button">
              <span className="nav-icon">📦</span> Products
            </button>
          </li>
          <li>
            <button onClick={() => { setActiveTab('orders'); fetchAllOrders(); }} className="nav-button">
              <span className="nav-icon">📋</span> Orders
            </button>
          </li>
          <li>
            <button onClick={handleLogout} className="nav-button logout">
              <span className="nav-icon">🚪</span> Logout
            </button>
          </li>
        </ul>
      </aside>
      <main className="dashboard-content">
        <h1>{activeTab === 'products' ? 'Products' : 'Orders'}</h1>
        {error && <p className="error-text">{error}</p>}
        {loading ? (
          <p className="loading-text">Loading...</p>
        ) : (
          <>
            {activeTab === 'products' && (
              <>
                {/* Add/Edit Product Form */}
                <section className="form-section">
                  <h2>{editProduct ? 'Edit Product' : 'Add New Product'}</h2>
                  <form onSubmit={editProduct ? handleEditProduct : handleAddProduct} className="product-form">
                    <input
                      type="text"
                      value={editProduct ? editProduct.name : newProduct.name}
                      onChange={(e) => editProduct 
                        ? setEditProduct({ ...editProduct, name: e.target.value }) 
                        : setNewProduct({ ...newProduct, name: e.target.value })}
                      placeholder="Product Name"
                      required
                      className="form-input"
                    />
                    <input
                      type="number"
                      value={editProduct ? editProduct.price : newProduct.price}
                      onChange={(e) => editProduct 
                        ? setEditProduct({ ...editProduct, price: e.target.value }) 
                        : setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="Price (₦)"
                      required
                      className="form-input"
                    />
                    <textarea
                      value={editProduct ? editProduct.description : newProduct.description}
                      onChange={(e) => editProduct 
                        ? setEditProduct({ ...editProduct, description: e.target.value }) 
                        : setNewProduct({ ...newProduct, description: e.target.value })}
                      placeholder="Description"
                      className="form-textarea"
                    />
                    <div className="image-upload-section">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, !!editProduct)}
                        className="form-file-input"
                      />
                      <div className="image-previews">
                        {(editProduct ? editProduct.imagePreviews : newProduct.imagePreviews).map((preview, index) => (
                          <img key={index} src={preview} alt="Preview" className="image-preview" />
                        ))}
                        {editProduct && !editProduct.imagePreviews?.length && editProduct.imageUrl.map((url, index) => (
                          <img key={index} src={url} alt="Existing" className="image-preview" />
                        ))}
                      </div>
                    </div>
                    {!editProduct && (
                      <select
                        value={newProduct.collectionId}
                        onChange={(e) => setNewProduct({ ...newProduct, collectionId: e.target.value })}
                        className="form-select"
                        required
                      >
                        {collections.map((collection) => (
                          <option key={collection} value={collection}>
                            {collection}
                          </option>
                        ))}
                      </select>
                    )}
                    <div className="form-actions">
                      <button type="submit" className="form-button">{editProduct ? 'Save Changes' : 'Add Product'}</button>
                      {editProduct && (
                        <button type="button" onClick={() => setEditProduct(null)} className="form-button cancel">Cancel</button>
                      )}
                    </div>
                  </form>
                </section>

                {/* Product Grid */}
                <section className="product-grid-section">
                  <h2>Manage Products</h2>
                  <div className="product-grid">
                    {products.map((product) => (
                      <div key={`${product.collectionId}-${product.id}`} className="product-card">
                        <div className="product-images">
                          {product.imageUrl.map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              alt={`${product.name} - ${index + 1}`}
                              className="product-thumbnail"
                              onClick={() => handleImageClick(url)}
                            />
                          ))}
                        </div>
                        <div className="product-details">
                          <h3>{product.name}</h3>
                          <p>Price: ₦{product.price}</p>
                          <p>Collection: {product.collectionId}</p>
                        </div>
                        <div className="product-actions">
                          <button onClick={() => setEditProduct({ ...product, imageFiles: [], imagePreviews: [] })} className="action-button edit">Edit</button>
                          <button onClick={() => handleDeleteProduct(product.collectionId, product.id)} className="action-button delete">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {activeTab === 'orders' && (
              <section className="order-grid-section">
                <div className="section-header">
                  <h2>Customer Orders</h2>
                  <button onClick={downloadOrdersAsCSV} className="download-csv-button">Download CSV</button>
                </div>
                <div className="order-grid">
                  {orders.map((order) => (
                    <div key={order.id} className="order-card">
                      <div className="order-details">
                        <h3>Order #{order.reference}</h3>
                        <p>Email: {order.email}</p>
                        <p>Phone: {order.phone}</p>
                        <p>Address: {order.address}</p>
                        <p>Date: {new Date(order.timestamp).toLocaleString()}</p>
                        <p>Status: {order.status}</p>
                      </div>
                      <div className="order-items">
                        <h4>Items:</h4>
                        {order.cartItems.map((item, index) => (
                          <div key={index} className="order-item">
                            <img src={item.imageUrl[0]} alt={item.name} className="order-item-thumbnail" />
                            <div>
                              <p>{item.name}</p>
                              <p>Price: ₦{item.price}</p>
                              <p>Quantity: {item.quantity}</p>
                              <p>Size: {typeof item.options?.size === 'object' ? JSON.stringify(item.options.size) : item.options?.size || 'N/A'}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div className="image-modal-overlay" onClick={closeModal}>
          <div className="image-modal" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged product view" className="enlarged-image" />
            <button className="close-modal-btn" onClick={closeModal}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;