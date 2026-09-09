const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// POST API - Create Service Request
app.post('/api/service-requests', async (req, res) => {
  try {
    const { name, email, requestType, description } = req.body;

    if (!name || !email || !requestType || !description) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, email, requestType, description) are required.'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address.'
      });
    }

    const allowedTypes = ['Lead Generation', 'Email Campaign', 'Social Campaign', 'Other'];
    if (!allowedTypes.includes(requestType)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid request type selected.'
      });
    }

    const newRecord = await prisma.serviceRequest.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        requestType,
        description: description.trim()
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Request created successfully',
      data: newRecord
    });
  } catch (error) {
    console.error('Database insertion error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// GET API - Fetch All Service Requests (Newest First)
app.get('/api/service-requests', async (req, res) => {
  try {
    const records = await prisma.serviceRequest.findMany({
      orderBy: { createdAt: 'desc' }
    });

    return res.status(200).json({
      success: true,
      data: records
    });
  } catch (error) {
    console.error('Database fetch error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});