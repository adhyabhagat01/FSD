import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Send } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/feedback';

export default function FeedbackForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseName: '',
    professorName: '',
    rating: 0,
    comments: ''
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStarClick = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!formData.courseName || !formData.professorName || formData.rating === 0) {
      setError('Please fill in all required fields and select a rating.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit feedback');
      }

      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div className="form-header">
          <h2>Submit Feedback</h2>
          <p style={{ color: 'var(--text-muted)' }}>Share your experience to help other students</p>
        </div>

        {success && (
          <div className="success-msg">
            Feedback submitted successfully! Redirecting...
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Course Name *</label>
            <input
              type="text"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Intro to Computer Science"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Professor Name *</label>
            <input
              type="text"
              name="professorName"
              value={formData.professorName}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g. Dr. Alan Turing"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rating *</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`star-btn ${(hoveredStar || formData.rating) >= star ? 'active' : ''}`}
                  onClick={() => handleStarClick(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(0)}
                >
                  <Star size={32} fill={(hoveredStar || formData.rating) >= star ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
            {error && <div className="error-msg">{error}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Comments</label>
            <textarea
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              className="form-textarea"
              placeholder="What did you like or dislike about this course?"
            />
          </div>

          <button 
            type="submit" 
            className="btn-submit"
            disabled={isSubmitting || success}
          >
            {isSubmitting ? 'Submitting...' : (
              <>
                <Send size={20} />
                Submit Review
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
