export interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  votes: number;
}
