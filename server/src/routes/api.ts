import express from 'express';
import { helloController } from '../controllers/helloController';
import { authController } from '../controllers/authController';
import { complaintController } from '../controllers/complaintController';

const router = express.Router();

// Hello endpoint
router.get('/hello', helloController.getHello);

// Auth endpoints
router.post('/login', authController.login);
router.get('/users/:username', authController.getUserInfo);

// Complaint endpoints
router.get('/complaints', complaintController.getAllComplaints);
router.get('/complaints/user/:username', complaintController.getComplaintsByUser);
router.post('/complaints', complaintController.addComplaint);

export { router as apiRoutes }; 