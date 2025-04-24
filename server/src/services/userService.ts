import { userDataAccess } from '../dataAccess/userDataAccess';
import User from '../types/user';

interface UserService {
  authenticate(username: string, password: string): boolean;
  getUserByUsername(username: string): User | null;
}

const userService: UserService = {
  authenticate: (username: string, password: string): boolean => {
    try {
      return userDataAccess.validateUserCredentials(username, password);
    } catch (error) {
      console.error('Error authenticating user:', error);
      return false;
    }
  },
  
  getUserByUsername: (username: string): User | null => {
    try {
      return userDataAccess.getUserByUsername(username);
    } catch (error) {
      console.error('Error getting user by username:', error);
      return null;
    }
  }
};

export { userService }; 