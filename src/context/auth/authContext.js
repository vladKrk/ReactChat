import { createContext} from 'react'
import api from '../../services/serverApi';

api.connect("ws://localhost:3001");
export const AuthContext = createContext();
