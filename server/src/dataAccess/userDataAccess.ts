import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import User from '../types/user';

export interface UserData {
  users: User[];
}

/**
 * Data access layer for user-related operations
 */
export const userDataAccess = {
  /**
   * Gets all users from the YAML data file
   * @returns Array of User objects or null if an error occurs
   */
  getUsers: (): User[] | null => {
    try {
      // Read and parse the YAML file
      const filePath = path.join(__dirname, '..', 'data', 'users.yaml');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = yaml.load(fileContents) as UserData;
      
      return data.users;
    } catch (error) {
      console.error('Error reading users data:', error);
      return null;
    }
  },

  /**
   * Gets a user by username
   * @param username Username to search for
   * @returns User object or null if not found
   */
  getUserByUsername: (username: string): User | null => {
    try {
      const users = userDataAccess.getUsers();
      if (!users) return null;
      
      return users.find(user => user.username === username) || null;
    } catch (error) {
      console.error('Error getting user by username:', error);
      return null;
    }
  },

  /**
   * Validates if a user exists with the given username and password
   * @param username Username to check
   * @param password Password to check
   * @returns True if the credentials are valid, false otherwise
   */
  validateUserCredentials: (username: string, password: string): boolean => {
    try {
      const users = userDataAccess.getUsers();
      if (!users) return false;
      
      const user = users.find(
        (u) => u.username === username && u.password === password
      );
      
      return !!user;
    } catch (error) {
      console.error('Error validating user credentials:', error);
      return false;
    }
  }
}; 