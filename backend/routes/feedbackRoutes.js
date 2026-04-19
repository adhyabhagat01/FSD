import express from 'express';
import Feedback from '../models/Feedback.js';

const router = express.Router();

// @route   GET /api/feedback/seed
// @desc    Seed database with dummy data
// @access  Public
router.get('/seed', async (req, res) => {
  try {
    const dummyData = [
      {
        courseName: 'Introduction to Algorithms',
        professorName: 'Dr. John Doe',
        rating: 5,
        comments: 'Excellent professor, explains concepts very clearly.'
      },
      {
        courseName: 'Data Structures',
        professorName: 'Dr. Jane Smith',
        rating: 4,
        comments: 'Good course, but assignments are very difficult.'
      },
      {
        courseName: 'Operating Systems',
        professorName: 'Dr. Alan Turing',
        rating: 5,
        comments: 'A true pioneer, the lectures are mind-blowing.'
      },
      {
        courseName: 'Web Development',
        professorName: 'Prof. Tim Berners-Lee',
        rating: 3,
        comments: 'Course material is a bit outdated but still foundational.'
      }
    ];

    await Feedback.insertMany(dummyData);
    res.json({ message: 'Dummy data inserted successfully!', data: dummyData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/feedback
// @desc    Get all feedback
// @access  Public
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/feedback
// @desc    Create new feedback
// @access  Public
router.post('/', async (req, res) => {
  const { courseName, professorName, rating, comments } = req.body;

  if (!courseName || !professorName || !rating) {
    return res.status(400).json({ message: 'Please provide courseName, professorName, and rating' });
  }

  try {
    const newFeedback = new Feedback({
      courseName,
      professorName,
      rating,
      comments
    });

    const savedFeedback = await newFeedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
