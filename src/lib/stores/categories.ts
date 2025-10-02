import type { Category } from "$lib/types/domain";
import { writable } from "svelte/store";

const STORAGE_KEY = "finance_categories";

function loadFromStorage(): Category[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getDefaultCategories();
}

function getDefaultCategories(): Category[] {
    return [
        { id: 1, name: "Продукты", type: "expense", icon: "🛒", color: "#22c55e", isDefault: true },
        {
            id: 2,
            name: "Транспорт",
            type: "expense",
            icon: "🚗",
            color: "#3b82f6",
            isDefault: true,
        },
        {
            id: 3,
            name: "Развлечения",
            type: "expense",
            icon: "🎮",
            color: "#a855f7",
            isDefault: true,
        },
        { id: 4, name: "Зарплата", type: "income", icon: "💰", color: "#10b981", isDefault: true },
    ];
}

export const categories = writable<Category[]>(loadFromStorage());

categories.subscribe((value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    }
});

export function addCategory(category: Category) {
    categories.update((items) => [...items, category]);
}

export function removeCategory(id: number) {
    categories.update((items) => items.filter((c) => c.id !== id));
}

export function updateCategory(id: number, data: Partial<Category>) {
    categories.update((items) => items.map((c) => (c.id === id ? { ...c, ...data } : c)));
}
