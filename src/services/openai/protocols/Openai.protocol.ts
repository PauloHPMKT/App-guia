export interface IOpenaiService {
  getUserData(): Promise<string>;
  generateContentReview(content: any): Promise<any>;
}