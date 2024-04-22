import { Exception } from "handlebars";
import { authRepository } from './auth.repository';

export class RolesService {

    private readonly baseUrl = 'http://192.168.15.49:3030/roles';

    private async getHeaders() {
        const user = await authRepository.getLoggedUser();
        if (!user) return null;

        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    }

    public async create(name: string | undefined, description: string | undefined): Promise<any> {

        const headers = await this.getHeaders();
        if(headers == null) return null;

        const response = await fetch(`${this.baseUrl}`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ name, description })
        });

        return response.ok;
    }

    public async update(id: number, name: string | undefined): Promise<any> {
        const headers = await this.getHeaders();
        if(headers == null) return null;

        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify({ name })
        });

        if (response.status === 401) return null;
        return response.ok;
    }

    public async get(): Promise<any> {
        const headers = await this.getHeaders();
        if(headers == null) return null;

        const response = await fetch(`${this.baseUrl}`, {
            method: 'GET',
            headers: headers,

        });

        return await response.json() as any[];
    }

    public async getById(id: number): Promise<any> {
        const headers = await this.getHeaders();
        if(headers == null) return null;

        const response = await fetch(`${this.baseUrl}/${id}`, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok)
            return await response.json();

        return null
    }
}

export const rolesService = new RolesService();