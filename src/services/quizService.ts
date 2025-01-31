import axios from 'axios';
import { QuizData } from '../types';

const API_URL = '/api/Uw5CrX';

export const fetchQuizData = async (): Promise<QuizData> => {
  try {
    const response = await axios.get<QuizData>(API_URL);
    // console.log(response)
    return response.data;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    throw error;
  }
};