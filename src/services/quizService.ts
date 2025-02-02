import axios from 'axios';
import { QuizData } from '../types';

const BASE_URL = import.meta.env.VITE_API_URL; 
// console.log('BASE URL ---- ')
// console.log(BASE_URL)
export const fetchQuizData = async (): Promise<QuizData> => {
  try {
    const response = await axios.get<QuizData>(`${BASE_URL}/api/quiz/Uw5CrX`);
    // console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
};