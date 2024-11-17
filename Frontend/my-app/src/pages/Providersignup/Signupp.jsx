import React, { useState } from 'react';
import Header from '../../component/Headeruser';
import Footer from '../../component/Footer';
import image from '../../assetss/image/signup.png';
import './Signupp.css';

const Signupp = () => {
  const [form, setForm] = useState({
    name: '',
    companyCode: '',
    phone: '',
    email: '',
    password: '',
    address: '',
    cnicFront: null,
    cnicBack: null,
    policeCertificate: null,
  });
  const [error, setError] = useState({});
  const [success, setSuccess] = useState('');

  const validateForm = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z]{3,15}$/;
    if (!nameRegex.test(form.name)) {
      newErrors.name = "Name must be unique, only letters, and between 3-15 characters.";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    if (!passwordRegex.test(form.password)) {
      newErrors.password = "Password must be 8-15 characters, with 1 uppercase letter and 1 special character.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      newErrors.email = "Enter a valid email format, e.g., example12@gmail.com.";
    }

    const phoneRegex = /^\d{7}$/;
    if (!form.companyCode) {
      newErrors.companyCode = "Select a valid phone code.";
    }
    if (!phoneRegex.test(form.phone)) {
      newErrors.phone = "Phone number must be exactly 7 digits.";
    }

    const addressRegex = /^[A-Za-z0-9\s,.-]{10,}$/;
    if (!addressRegex.test(form.address)) {
      newErrors.address = "Address must be at least 10 characters with allowed symbols.";
    }

    if (!form.cnicFront || !['image/jpeg', 'image/png'].includes(form.cnicFront.type) || form.cnicFront.size > 10 * 1024 * 1024) {
      newErrors.cnicFront = "CNIC front image must be JPG/PNG format and <=10 MB.";
    }
    if (!form.cnicBack || !['image/jpeg', 'image/png'].includes(form.cnicBack.type) || form.cnicBack.size > 10 * 1024 * 1024) {
      newErrors.cnicBack = "CNIC back image must be JPG/PNG format and <=10 MB.";
    }

    if (!form.policeCertificate || !['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(form.policeCertificate.type) || form.policeCertificate.size > 10 * 1024 * 1024) {
      newErrors.policeCertificate = "Police certificate must be PDF/DOCX format and <=10 MB.";
    }

    return Object.keys(newErrors).length ? newErrors : null;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (validationErrors) {
      setError(validationErrors);
      setSuccess('');
      return;
    }

    const signupData = new FormData();
    Object.keys(form).forEach((key) => {
      signupData.append(key, form[key]);
    });

    try {
      const response = await fetch('http://localhost:5000/api/Provider/signup', {
        method: 'POST',
        body: signupData,
      });

      const result = await response.json();
      if (result.success) {
        setSuccess("Signup successful! Your data has been submitted.");
        setError({}); 
        setForm({
          name: '',
          companyCode: '',
          phone: '',
          email: '',
          password: '',
          address: '',
          cnicFront: null,
          cnicBack: null,
          policeCertificate: null,
        });
      } else if (result.message === "Email is already registered.") {
        setError({ email: result.message }); 
      } else {
        setError({ submit: result.message });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError({ submit: "Failed to create account." });
    }
  };

  return (
    <>
      <Header />
      <div className="signup-container">
        <div className="image-side">
          <img src={image} alt="Signup" className="pic" />
        </div>
        <div className="form-side">
          <h2>Service Provider Signup</h2>
          {success && <p className="success">{success}</p>}
          {error.submit && <p className="error">{error.submit}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input type="text" name="name" placeholder="Enter your full name" value={form.name} onChange={handleChange} required />
              {error.name && <p className="error">{error.name}</p>}
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required />
              {error.email && <p className="error">{error.email}</p>}
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <div className="phone-input">
                <select name="companyCode" value={form.companyCode} onChange={handleChange} className="phone-code">
                  <option value="">Select code</option>
                  <option value="0300">+92 300 (Mobilink)</option>
                  <option value="0345">+92 345 (Telenor)</option>
                  <option value="0321">+92 321 (Warid)</option>
                  <option value="0331">+92 331 (Ufone)</option>
                  <option value="0312">+92 312 (Zong)</option>
                  <option value="0581">+92 581 (Local)</option>
                </select>
                <input type="text" name="phone" placeholder="Enter phone number" value={form.phone} onChange={handleChange} className="phone-number" required />
              </div>
              {error.phone && <p className="error">{error.phone}</p>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" placeholder="Enter your password" value={form.password} onChange={handleChange} required />
              {error.password && <p className="error">{error.password}</p>}
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea name="address" placeholder="Enter your address" value={form.address} onChange={handleChange} required></textarea>
              {error.address && <p className="error">{error.address}</p>}
            </div>
            <div className="form-group">
              <label>CNIC Front Image</label>
              <input type="file" name="cnicFront" accept="image/jpeg, image/png" onChange={handleChange} required />
              {error.cnicFront && <p className="error">{error.cnicFront}</p>}
            </div>
            <div className="form-group">
              <label>CNIC Back Image</label>
              <input type="file" name="cnicBack" accept="image/jpeg, image/png" onChange={handleChange} required />
              {error.cnicBack && <p className="error">{error.cnicBack}</p>}
            </div>
            <div className="form-group">
              <label>Police Clearance Certificate</label>
              <input type="file" name="policeCertificate" accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleChange} required />
              {error.policeCertificate && <p className="error">{error.policeCertificate}</p>}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signupp;
