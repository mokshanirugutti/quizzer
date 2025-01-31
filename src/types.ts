export interface QuizData {
    id: number;
    title: string;
    description: string;
    difficulty_level: string | null;
    topic: string;
    time: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    duration: number;
    end_time: string;
    negative_marks: string;
    correct_answer_marks: string;
    shuffle: boolean;
    show_answers: boolean;
    lock_solutions: boolean;
    is_form: boolean;
    show_mastery_option: boolean;
    reading_material: null;
    quiz_type: null;
    is_custom: boolean;
    banner_id: null;
    exam_id: null;
    show_unanswered: boolean;
    ends_at: string;
    lives: null;
    live_count: string;
    coin_count: number;
    questions_count: number;
    daily_date: string;
    max_mistake_count: number;
    reading_materials: any[]; // You can refine this type later
    questions: Question[];
  }
  
  export interface Question {
    id: number;
    description: string;
    difficulty_level: string | null;
    topic: string;
    is_published: boolean;
    created_at: string;
    updated_at: string;
    detailed_solution: string;
    type: string;
    is_mandatory: boolean;
    show_in_feed: boolean;
    pyq_label: string;
    topic_id: number;
    reading_material_id: number;
    fixed_at: string | null;
    fix_summary: string | null;
    created_by: null;
    updated_by: string | null;
    quiz_level: null;
    question_from: string;
    language: null;
    photo_url: null;
    photo_solution_url: null;
    is_saved: boolean;
    tag: string;
    options: Option[];
    reading_material: ReadingMaterial;
  }
  
  export interface Option {
    id: number;
    description: string;
    question_id: number;
    is_correct: boolean;
    created_at: string;
    updated_at: string;
    unanswered: boolean;
    photo_url: null;
  }
  
  export interface ReadingMaterial {
    id: number;
    keywords: string;
    content: null;
    created_at: string;
    updated_at: string;
    content_sections: string[];
    practice_material: PracticeMaterial;
  }
  
  export interface PracticeMaterial {
    content: string[];
    keywords: string[];
  }