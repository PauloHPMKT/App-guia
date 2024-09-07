import { AxiosResponse } from "axios";
import { api } from "../axios/api";
import { IOpenaiService } from "./protocols/Openai.protocol";

export class OpenaiService implements IOpenaiService {
  async getUserData(): Promise<any> {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
      const res = await response.json();
      console.log(res); // Para garantir que os dados estão sendo recebidos
      return res; // Aqui você precisa retornar os dados
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      throw error; // Caso precise tratar o erro no componente
    }
  }

  async generateContentReview(content: any): Promise<any> {
    try {
      const response = await api.post('/content-reviewer/v1/chat/completions', content);;
      return response;
    } catch (error) {
      console.error('Erro ao buscar dados', error);
      throw error; 
    }
  }
}