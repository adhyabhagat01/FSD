import React, { useEffect, useState } from 'react';
import { Star, Loader2, MessageSquareOff } from 'lucide-react';

const API_URL = 'http://localhost:5000/api/feedback';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      const data = await response.json();
      setFeedbacks(data);
    } catch (err) {
      setError('Could not load feedback. Please ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="loading">
        <Loader2 className="loading-spinner" size={48} />
        <p>Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="empty-state glass-panel">
        <div style={{ color: 'var(--danger)', marginBottom: '1rem' }}>{error}</div>
        <button onClick={fetchFeedback} className="btn-submit" style={{ width: 'auto', display: 'inline-flex', padding: '0.5rem 1.5rem' }}>
          Retry
        </button>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="empty-state glass-panel">
        <MessageSquareOff className="icon" />
        <h3>No feedback yet</h3>
        <p>Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div>
      <div className="feed-header">
        <h2>Recent Reviews</h2>
        <span style={{ color: 'var(--text-muted)' }}>{feedbacks.length} reviews</span>
      </div>

      <div className="feedback-grid">
        {feedbacks.map((feedback) => (
          <div key={feedback._id} className="feedback-card glass-panel">
            <div className="card-header">
              <div>
                <h3 className="course-name">{feedback.courseName}</h3>
                <div className="professor-name">{feedback.professorName}</div>
              </div>
              <div className="rating-display">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`star ${star <= feedback.rating ? '' : 'inactive'}`} 
                    fill={star <= feedback.rating ? 'currentColor' : 'none'} 
                  />
                ))}
              </div>
            </div>
            
            {feedback.comments && (
              <div className="card-body">
                "{feedback.comments}"
              </div>
            )}
            
            <div className="card-footer">
              <span>{new Date(feedback.createdAt).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
