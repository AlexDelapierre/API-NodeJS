import type { Objet } from '../types/objet';

const API_BASE_URL = "http://localhost:3000/api";

type RequestOptions = RequestInit & { body?: BodyInit | null };

async function request(endpoint: string, options: RequestOptions = {}): Promise<any> {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = localStorage.getItem('token');
    const isFormData = options.body instanceof FormData;
    const defaultHeaders: HeadersInit = {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(!isFormData ? { "Content-Type": "application/json" } : {})
    };
    const config: RequestInit = {
        ...options,
        headers: { ...defaultHeaders, ...(options.headers || {}) }
    };
    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la requête API :", error);
        throw error;
    }
}

export async function getObjets(): Promise<Objet[]> {
    return await request("/stuff", { method: "GET" });
}

export async function getObjetById(id: string): Promise<Objet> {
    return await request(`/stuff/${id}`, { method: "GET" });
}

export async function ajouterObjet(formData: FormData): Promise<Objet> {
    return await request("/stuff", {
        method: "POST",
        body: formData
    });
}

export async function updateObjet(id: string, formData: FormData): Promise<Objet> {
    return await request(`/stuff/${id}`, {
        method: "PUT",
        body: formData
    });
}

export async function deleteObjet(id: string): Promise<void> {
    return await request(`/stuff/${id}`, { method: "DELETE" });
}

export async function signup(email: string, password: string): Promise<any> {
    return await request("/auth/signup", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });
}

export async function login(email: string, password: string): Promise<any> {
    return await request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password })
    });
}
