import React, { useState } from 'react';
import Header from '../../component/Servicesheader';
import Footer from '../../component/Footer';
import './AddService.css';

const AddService = () => {
  const initialState = { name: '', estimatedCharges: '', type: '', picture: null };
  const [service, setService] = useState(initialState);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleChange = (e) => {
      const { name, value } = e.target;
      setService((prevService) => ({ ...prevService, [name]: value }));
  };

 
  const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          if (file.size > 10 * 1024 * 1024) { 
              setError("File size should be 10 MB or less.");
              setService((prevService) => ({ ...prevService, picture: null }));
              return;
          }
          if (!['image/png', 'image/jpeg'].includes(file.type)) {
              setError("Only PNG and JPEG formats are allowed.");
              setService((prevService) => ({ ...prevService, picture: null }));
              return;
          }
          setError('');
          setService((prevService) => ({ ...prevService, picture: file }));
      }
  };

  const validateForm = () => {
      if (!service.name) return "Service Name is required.";
      if (!service.estimatedCharges) return "Estimated Charges are required.";
      if (!service.type) return "Service Type is required.";
      return null;
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      const validationError = validateForm();
      if (validationError) {
          setError(validationError);
          setSuccess('');
          return;
      }

      const formData = new FormData();
      Object.entries(service).forEach(([key, value]) => {
          formData.append(key, value);
      });

      try {
          const response = await fetch('http://localhost:5000/api/Addservice/add', { 
              method: 'POST',
              body: formData,
          });

          const result = await response.json();
          if (result.success) {
              setSuccess("Service added successfully!");
              setError('');
              setService(initialState); 
          } else {
              setError(result.message);
              setSuccess('');
          }
      } catch (error) {
        console.error("Error submitting form:", error);
        setError("Failed to create account.");
      }
  };

  return (
    <>
      <Header />
      <div className="add-service-container">
        <h2>Add New Service</h2>
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Service Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter service name"
              value={service.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Estimated Charges</label>
            <input
              type="number"
              name="estimatedCharges"
              placeholder="Enter estimated charges"
              value={service.estimatedCharges}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Service Type</label>
            <select
              name="type"
              value={service.type}
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
            <label>Service Picture (Optional)</label>
            <input
              type="file"
              name="picture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <button type="submit" className="submit-button">Add Service</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddService;
//hhkhjhjhh
