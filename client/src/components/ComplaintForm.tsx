import React, { useState } from 'react';
import { Complaint, ComplaintFormData } from '../types/complaint';
import { addComplaint } from '../data/complaintsData';
import './ComplaintForm.css';

interface ComplaintFormProps {
  username: string | null;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

const ComplaintForm: React.FC<ComplaintFormProps> = ({ username, onSubmitSuccess, onCancel }) => {
  const [formData, setFormData] = useState<ComplaintFormData>({
    text: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(null); // Clear any previous errors
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    if (!username) {
      setError('You must be logged in to submit a complaint');
      return;
    }
    
    if (!formData.text.trim()) {
      setError('Please enter your complaint text');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    // Create a new complaint object
    const newComplaint: Complaint = {
      id: Date.now().toString(), // Server will handle ID if not provided
      owner: username,
      creationDate: new Date().toISOString(),
      status: 'created',
      text: formData.text.trim()
    };
    
    try {
      // Add the complaint to server
      const success = await addComplaint(newComplaint);
      
      if (success) {
        // Reset form and notify parent
        setFormData({ text: '' });
        onSubmitSuccess();
      } else {
        setError('Failed to submit complaint. Please try again.');
      }
    } catch (error) {
      setError('An error occurred while submitting your complaint.');
      console.error('Complaint submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="complaint-form-container">
      <h2>Submit a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-info">
          <div className="form-field">
            <label>Username:</label>
            <div className="field-value">{username || 'Not logged in'}</div>
          </div>
          <div className="form-field">
            <label>Date:</label>
            <div className="field-value">{new Date().toLocaleDateString()}</div>
          </div>
          <div className="form-field">
            <label>Status:</label>
            <div className="field-value status-created">Created</div>
          </div>
        </div>
        
        <div className="form-field">
          <label htmlFor="text">Complaint Details:</label>
          <textarea
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            rows={6}
            placeholder="Please describe your complaint in detail..."
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-button" 
            onClick={onCancel}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-button" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm; 