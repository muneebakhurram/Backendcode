import React, { useState } from 'react';
import Header from '../../component/Servicesheader';
import Footer from '../../component/Footer';
import image from '../../assetss/image/providerprofile.png';
import './ProviderProfile.css';

const ProviderProfile = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    password: '',
    address: '',
    description: '',
    serviceType: '',
    availability: '',
  });
  
  const [error, setError] = useState({});
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]{3,15}$/;
    const phoneRegex = /^\d{7}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\W).{8,15}$/;
    const adressRegex= /^[A-Za-z0-9\s,.-]{10,}$/;

    if (!nameRegex.test(form.name)) newErrors.name = "Invalid name format.";
    if (!phoneRegex.test(form.phone)) newErrors.phone = "Invalid phone format.";
    if (!passwordRegex.test(form.password)) newErrors.password = "Invalid password format.";
    if (!adressRegex.test(form.address)) newErrors.address = "Invalid adress format.";

    return Object.keys(newErrors).length ? newErrors : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors) {
      setError(validationErrors);
      setSuccess('');
      return;
    }

    setSuccess("Profile updated successfully.");
    setError({});
  };

  return (
    <>
      <Header />
      <div className="editprovider-profile-container">
        <div className="image-side">
          <img src={image} alt="Service Provider" className="pic" />
        </div>
        <div className="form-side">
          <h2>Edit Profile</h2>
          {success && <p className="success">{success}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
              {error.name && <p className="error">{error.name}</p>}
            </div>
           
            <div className="form-group">
              <label>Phone Number</label>
              <div className="phone-input">
                <select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  className="phone-code"
                >
                  <option value="">Select code</option>
                  <option value="0300">+92 300 (Mobilink)</option>
                  <option value="0345">+92 345 (Telenor)</option>
                  <option value="0321">+92 321 (Warid)</option>
                  <option value="0331">+92 331 (Ufone)</option>
                  <option value="0312">+92 312 (Zong)</option>
                  <option value="0581">+92 581 (Local)</option>
                </select>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  value={form.phone}
                  onChange={handleChange}
                  className="phone-number"
                  required
                />
              </div>
              {error.phone && <p className="error">{error.phone}</p>}
              </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={form.password}
                onChange={handleChange}
                required
              />
              {error.password && <p className="error">{error.password}</p>}
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                placeholder="Enter your address"
                value={form.address}
                onChange={handleChange}
                required
              ></textarea>
              {error.address && <p className="error">{error.address}</p>}
            </div>
            <div className="form-group">
              <label>Service Description</label>
              <textarea
                name="description"
                placeholder="Describe your services"
                value={form.description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label>Service Type</label>
              <select
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                required
              >
                <option value="">Select a service type</option>
                <option value="Plumber">Plumber</option>
                <option value="Electrician">Electrician</option>
                <option value="Mechanic">Mechanic</option>
              </select>
            </div>
            <div className="form-group">
              <label>Availability</label>
              <select
                name="availability"
                value={form.availability}
                onChange={handleChange}
                required
              >
                <option value="">Select your availability</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Weekends">Weekends</option>
                <option value="Evenings">Evenings</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>
            <button type="submit" className="save-button">Save Changes</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProviderProfile;
