import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, X, Plus } from 'lucide-react'
import { toast } from 'react-toastify'
import { createProduct, getCategories, uploadImage } from '../api'

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    categoryId: '',
    mrp: '',
    basePrice: '',
    wholesalePrice: '',
    stock: '',
    hsnCode: '',
    originLocation: '',
    qualityGrade: '',
    packagingType: '',
    tags: [],
    gallery: [],
    status: 'active',
    featured: false,
    inStock: true
  })

  const [newTag, setNewTag] = useState('')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mainImageUploading, setMainImageUploading] = useState(false)
  const [mainImageUrl, setMainImageUrl] = useState('')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setMainImageUploading(true)
    try {
      const result = await uploadImage(file)
      setMainImageUrl(result.url)
      toast.success('Product image uploaded!')
    } catch {
      toast.error('Failed to upload image')
    } finally {
      setMainImageUploading(false)
      e.target.value = ''
    }
  }

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files)
    for (const file of files) {
      try {
        const result = await uploadImage(file)
        setFormData(prev => ({ ...prev, gallery: [...prev.gallery, { url: result.url }] }))
        toast.success('Gallery image uploaded!')
      } catch {
        toast.error('Failed to upload image')
      }
    }
    e.target.value = ''
  }

  const removeGalleryImage = (index) => {
    setFormData(prev => ({ ...prev, gallery: prev.gallery.filter((_, i) => i !== index) }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }))
      setNewTag('')
    }
  }

  const removeTag = (tag) => {
    setFormData(prev => ({ ...prev, tags: prev.tags.filter(t => t !== tag) }))
  }

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setError('Failed to load categories'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.categoryId || !formData.basePrice) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await createProduct({
        name: formData.name,
        description: formData.description || null,
        categoryId: parseInt(formData.categoryId),
        image: mainImageUrl || null,
        mrp: formData.mrp || null,
        basePrice: formData.basePrice,
        wholesalePrice: formData.wholesalePrice || null,
        stock: parseInt(formData.stock) || 0,
        hsnCode: formData.hsnCode || null,
        originLocation: formData.originLocation || null,
        qualityGrade: formData.qualityGrade || null,
        packagingType: formData.packagingType || null,
        tags: formData.tags,
        gallery: formData.gallery,
        status: formData.status,
        featured: formData.featured,
        inStock: formData.inStock
      });
      toast.success('Product created successfully!');
      navigate('/product-list');
    } catch (err) {
      const msg = err.message || 'Failed to create product';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="add-product">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Add Product</h1>
          <p>Create a new spice / agricultural product</p>
        </div>
        <button type="submit" form="product-form" className="btn btn-primary" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Product'}
        </button>
      </div>

      {error && <div className="error-message" style={{ color: '#dc2626', background: '#fee2e2', padding: '12px', borderRadius: '8px', marginBottom: '16px' }}>{error}</div>}

      <form id="product-form" onSubmit={handleSubmit} className="product-form">
        <div className="form-grid">

          {/* LEFT: Basic Info */}
          <div className="form-section">
            <div className="section-header"><h3>Basic Information</h3></div>

            <div className="form-group">
              <label className="form-label">Product Name *</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g. Premium Salem Turmeric"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter product description"
                rows={4}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Category *</label>
                <select
                  className="form-select"
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-select"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.featured} onChange={(e) => handleInputChange('featured', e.target.checked)} style={{ width: '18px', height: '18px' }} />
                <span className="form-label" style={{ margin: 0 }}>Mark as Featured Product</span>
              </label>
            </div>

            <div className="form-group">
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" checked={formData.inStock} onChange={(e) => handleInputChange('inStock', e.target.checked)} style={{ width: '18px', height: '18px' }} />
                <span className="form-label" style={{ margin: 0 }}>In Stock</span>
              </label>
            </div>
          </div>

          {/* RIGHT: Pricing */}
          <div className="form-section">
            <div className="section-header"><h3>Pricing & Stock</h3></div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">MRP (₹ / gram)</label>
                <input type="text" className="form-input" value={formData.mrp} onChange={(e) => handleInputChange('mrp', e.target.value)} placeholder="e.g. 6.00" />
              </div>
              <div className="form-group">
                <label className="form-label">Selling Price (₹ / gram) *</label>
                <input type="text" className="form-input" value={formData.basePrice} onChange={(e) => handleInputChange('basePrice', e.target.value)} placeholder="e.g. 5.00" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Wholesale Price (₹ / kg)</label>
                <input type="text" className="form-input" value={formData.wholesalePrice} onChange={(e) => handleInputChange('wholesalePrice', e.target.value)} placeholder="e.g. 400.00" />
              </div>
              <div className="form-group">
                <label className="form-label">Stock Quantity</label>
                <input type="number" className="form-input" value={formData.stock} onChange={(e) => handleInputChange('stock', e.target.value)} placeholder="e.g. 500" min="0" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">HSN Code</label>
                <input type="text" className="form-input" value={formData.hsnCode} onChange={(e) => handleInputChange('hsnCode', e.target.value)} placeholder="e.g. 09041100" />
              </div>
              <div className="form-group">
                <label className="form-label">Origin Location</label>
                <input type="text" className="form-input" value={formData.originLocation} onChange={(e) => handleInputChange('originLocation', e.target.value)} placeholder="e.g. Salem, Tamil Nadu" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Quality Grade</label>
                <input type="text" className="form-input" value={formData.qualityGrade} onChange={(e) => handleInputChange('qualityGrade', e.target.value)} placeholder="e.g. Premium, Grade A" />
              </div>
              <div className="form-group">
                <label className="form-label">Packaging Type</label>
                <input type="text" className="form-input" value={formData.packagingType} onChange={(e) => handleInputChange('packagingType', e.target.value)} placeholder="e.g. Vacuum Sealed" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Image */}
        <div className="form-section">
          <div className="section-header"><h3>Product Image</h3></div>
          <div className="image-upload-section">
            {mainImageUrl ? (
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <img src={mainImageUrl} alt="Product" style={{ width: '160px', height: '160px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
                <button type="button" onClick={() => setMainImageUrl('')} style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="image-upload-area" onClick={() => document.getElementById('main-image-upload').click()} style={{ cursor: 'pointer' }}>
                <input type="file" id="main-image-upload" accept="image/*" onChange={handleMainImageUpload} className="image-input" />
                <label htmlFor="main-image-upload" className="upload-label" style={{ cursor: 'pointer' }}>
                  <Upload size={48} />
                  <p>{mainImageUploading ? 'Uploading...' : 'Click to upload product image'}</p>
                  <span>PNG, JPG up to 5MB</span>
                </label>
              </div>
            )}
          </div>
        </div>

        {/* Gallery */}
        <div className="form-section">
          <div className="section-header"><h3>Gallery Images</h3></div>
          <div className="image-upload-section">
            <div className="image-upload-area" onClick={() => document.getElementById('gallery-upload').click()}>
              <input type="file" id="gallery-upload" multiple accept="image/*" onChange={handleGalleryUpload} className="image-input" />
              <label htmlFor="gallery-upload" className="upload-label">
                <Upload size={48} />
                <p>Click to upload gallery images</p>
                <span>PNG, JPG up to 5MB (Multiple files)</span>
              </label>
            </div>
            {formData.gallery.length > 0 && (
              <div className="image-preview-grid">
                {formData.gallery.map((img, i) => (
                  <div key={i} className="image-preview">
                    <img src={img.url} alt="Gallery" />
                    <button type="button" className="remove-image" onClick={() => removeGalleryImage(i)}><X size={16} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="form-section">
          <div className="section-header"><h3>Tags</h3></div>
          <div className="form-group">
            <div className="tags-input">
              <div className="tags-list">
                {formData.tags.map((tag, i) => (
                  <span key={i} className="tag">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="remove-tag"><X size={14} /></button>
                  </span>
                ))}
              </div>
              <div className="add-tag-input">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add tag (e.g. Organic, Wholesale)"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button type="button" onClick={addTag} className="add-tag-btn"><Plus size={16} /></button>
              </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  )
}

export default AddProduct
