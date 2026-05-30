import React, { useEffect, useState } from "react";
import { Search, Filter, Plus, Edit, Trash2, Eye, X, Download, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DataTable from "../components/DataTable";
import {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  API_BASE_URL
} from "../api";
import "../styles/pages/product-list.scss";

// Modal component
const Modal = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          <X size={20} />
        </button>
        {children}
      </div>
    </div>
  );
};

const ProductList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [modal, setModal] = useState({ type: null, product: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(productsData);
        setCategories(categoriesData);
      } catch (err) {
        console.error("Error loading data:", err);
        const errorMsg = `Failed to load products: ${err.message}`;
        setError(errorMsg);
        toast.error(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Modal handlers
  const openModal = async (type, product) => {
    if (type === "view") {
      try {
        const fullProduct = await getProduct(product.id);
        setModal({ type, product: fullProduct });
      } catch (err) {
        console.error("Error loading product details:", err);
        const errorMsg = `Failed to load product details: ${err.message}`;
        setError(errorMsg);
        toast.error(errorMsg);
      }
    } else {
      setModal({ type, product });
    }
  };
  const closeModal = () => setModal({ type: null, product: null });

  // Delete handler
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted successfully!");
      closeModal();
    } catch (err) {
      console.error("Error deleting product:", err);
      const errorMsg = `Failed to delete product: ${err.message}`;
      setError(errorMsg);
      toast.error(errorMsg);
    }
  };

  const handleFeaturedToggle = async (product) => {
    try {
      const updatedProduct = { ...product, featured: !product.featured };
      await updateProduct(product.id, updatedProduct);
      setProducts(
        products.map((p) =>
          p.id === product.id ? updatedProduct : p
        )
      );
      toast.success(`Product ${updatedProduct.featured ? 'marked as' : 'removed from'} Featured!`);
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error(`Failed to update product: ${err.message}`);
    }
  };

  const columns = [
    {
      key: "id",
      label: "Product ID",
      render: (value) => (
        <span style={{ fontFamily: 'monospace', fontSize: '13px', color: '#6b7280' }}>
          #{value}
        </span>
      ),
    },
    {
      key: "gallery",
      label: "Image",
      render: (value, row) => {
        let url = row.image || row.gallery?.[0]?.url;
        if (url && url.includes('localhost:4062')) {
           url = url.replace('http://localhost:4062', API_BASE_URL);
        }
        return (
          <img
            src={url || "/placeholder.svg"}
            alt="Product"
            className="product-thumbnail"
          />
        );
      },
    },
    { key: "name", label: "Product Name" },
    {
      key: "category",
      label: "Category",
      render: (value, row) => row.category?.name || "N/A",
    },
    {
      key: "basePrice",
      label: "Base Price",
      render: (value) => `₹${value}`,
    },
    {
      key: "wholesalePrice",
      label: "Wholesale Price",
      render: (value) => value ? `₹${value}` : "-",
    },
    {
      key: "stock",
      label: "Stock",
      render: (_, row) => {
        const totalQty = row.stock || 0;
        const hasLowStock = totalQty < 5;
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            <span>{totalQty}</span>
            {hasLowStock && (
              <span className="stock-badge low-stock" style={{ fontSize: '11px' }}>
                Low Stock
              </span>
            )}
          </div>
        );
      },
    },
    {
      key: "featured",
      label: "Featured",
      render: (value, row) => (
        <input
          type="checkbox"
          checked={value || false}
          onChange={() => handleFeaturedToggle(row)}
          style={{ cursor: 'pointer', width: '18px', height: '18px' }}
        />
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <span
          className={`status-badge ${value.toLowerCase().replace(" ", "-")}`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => {
        return (
          <div className="action-buttons" style={{ display: 'flex', gap: '4px', flexWrap: 'nowrap' }}>
            <button
              className="action-btn view"
              onClick={() => openModal("view", row)}
            >
              <Eye size={16} />
            </button>
            <button
              className="action-btn edit"
              onClick={() => navigate(`/edit-product/${row.id}`)}
            >
              <Edit size={16} />
            </button>
            <button
              className="action-btn delete"
              onClick={() => openModal("delete", row)}
            >
              <Trash2 size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  // Modal content for view
  const ViewModal = ({ product }) => (
    <div className="modal-content view-modal" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      <h2>Product Details</h2>
      {product.gallery && product.gallery.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          {product.gallery.map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={`${product.name} ${i + 1}`}
              style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
            />
          ))}
        </div>
      )}
      <div className="modal-product-info">
        <p>
          <strong>Name:</strong> {product.name}
        </p>
        <p>
          <strong>Description:</strong> {product.description || "N/A"}
        </p>
        <p>
          <strong>Category:</strong> {product.category?.name || "N/A"}
        </p>
        <p>
          <strong>Base Price:</strong> ₹{product.basePrice}
        </p>
        {product.wholesalePrice && (
          <p>
            <strong>Wholesale Price:</strong> ₹{product.wholesalePrice}
          </p>
        )}
        {product.originLocation && (
          <p>
            <strong>Origin:</strong> {product.originLocation}
          </p>
        )}
        {product.qualityGrade && (
          <p>
            <strong>Quality Grade:</strong> {product.qualityGrade}
          </p>
        )}
        {product.hsnCode && (
          <p>
            <strong>HSN Code:</strong> {product.hsnCode}
          </p>
        )}
        <p>
          <strong>Status:</strong> {product.status}
        </p>
        {product.tags && product.tags.length > 0 && (
          <p>
            <strong>Tags:</strong> {product.tags.join(", ")}
          </p>
        )}
        <p>
          <strong>Stock:</strong> {product.stock || 0} units
        </p>
      </div>
    </div>
  );

  // Modal content for delete
  const DeleteModal = ({ product, onDelete }) => (
    <div className="modal-content delete-modal">
      <h2>Delete Product</h2>
      <p>
        Are you sure you want to delete <strong>{product.name}</strong>?
      </p>
      <div className="modal-actions">
        <button className="btn btn-outline" onClick={closeModal}>
          Cancel
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(product.id)}>
          Delete
        </button>
      </div>
    </div>
  );

  return (
    <div className="product-list">
      <div className="page-header with-actions">
        <div className="header-left">
          <h1>Product List</h1>
          <p>Manage your product inventory</p>
        </div>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/add-product")}
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-message">Loading products...</div>
      ) : (
        <>
          <div className="filters-section">
            <div className="search-container">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search by product name or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-group">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Categories</option>
                {categories && categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No categories found</option>
                )}
              </select>
            </div>
          </div>

          <DataTable
            data={products.filter(p => {
              const categoryMatch = filterCategory === 'all' || p.categoryId === parseInt(filterCategory);
              
              const searchMatch = searchTerm === '' || 
                p.id?.toString().includes(searchTerm) ||
                p.name?.toLowerCase().includes(searchTerm.toLowerCase());
              
              return categoryMatch && searchMatch;
            })}
            columns={columns}
            searchTerm=""
            searchKey="name"
          />

          {/* Modals */}
          <Modal open={modal.type === "view"} onClose={closeModal}>
            {modal.product && <ViewModal product={modal.product} />}
          </Modal>
          <Modal open={modal.type === "delete"} onClose={closeModal}>
            {modal.product && (
              <DeleteModal product={modal.product} onDelete={handleDelete} />
            )}
          </Modal>
        </>
      )}
    </div>
  );
};

export default ProductList;
