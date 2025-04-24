import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import User from '../types/user';

interface UserService {
  authenticate(username: string, password: string): boolean;
}

interface UserData {
  users: User[];
}

const userService: UserService = {
  authenticate: (username: string, password: string): boolean => {
    try {
      // Read and parse the YAML file
      const filePath = path.join(__dirname, '..', 'data', 'users.yaml');
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const data = yaml.load(fileContents) as UserData;
      
      // Find the user
      const user = data.users.find(
        (u) => u.username === username && u.password === password
      );
      
      return !!user;
    } catch (error) {
      console.error('Error authenticating user:', error);
      return false;
    }
  },
};

export { userService }; 