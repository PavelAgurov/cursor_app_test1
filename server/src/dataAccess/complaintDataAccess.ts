import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import Complaint, { ComplaintData } from '../types/complaint';

/**
 * Data access layer for complaint-related operations
 */
export const complaintDataAccess = {
  /**
   * Gets all complaints from the YAML data file
   * @returns Array of Complaint objects or null if an error occurs
   */
  getComplaints: (): Complaint[] | null => {
    try {
      // Read and parse the YAML file
      const filePath = path.join(__dirname, '..', 'data', 'complaints.yaml');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = yaml.load(fileContents) as ComplaintData;
      
      return data.complaints;
    } catch (error) {
      console.error('Error reading complaints data:', error);
      return null;
    }
  },

  /**
   * Gets complaints for a specific user
   * @param username Username to filter by
   * @returns Array of filtered Complaint objects or null if an error occurs
   */
  getComplaintsByUser: (username: string): Complaint[] | null => {
    try {
      const complaints = complaintDataAccess.getComplaints();
      if (!complaints) return null;
      
      return complaints.filter(complaint => complaint.owner === username);
    } catch (error) {
      console.error('Error getting complaints by username:', error);
      return null;
    }
  },

  /**
   * Adds a new complaint to the YAML file
   * @param complaint The complaint to add
   * @returns True if successful, false otherwise
   */
  addComplaint: (complaint: Complaint): boolean => {
    try {
      const filePath = path.join(__dirname, '..', 'data', 'complaints.yaml');
      
      // Get current complaints
      const complaints = complaintDataAccess.getComplaints() || [];
      
      // Add new complaint
      complaints.push(complaint);
      
      // Create updated data structure
      const updatedData: ComplaintData = { complaints };
      
      // Convert to YAML and write to file
      const yamlStr = yaml.dump(updatedData);
      fs.writeFileSync(filePath, yamlStr, 'utf8');
      
      return true;
    } catch (error) {
      console.error('Error adding complaint:', error);
      return false;
    }
  }
}; 