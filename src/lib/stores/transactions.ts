import type { Transaction } from "$lib/types/domain";
import { writable } from "svelte/store";

const STORAGE_KEY = "finance_transactions";

function loadFromStorage(): Transaction[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

export const transactions = writable<Transaction[]>(loadFromStorage());

transactions.subscribe((value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    }
});

export function addTransaction(transaction: Transaction) {
    transactions.update((items) => [...items, transaction]);
}

export function removeTransaction(id: number) {
    transactions.update((items) => items.filter((t) => t.id !== id));
}

export function updateTransaction(id: number, data: Partial<Transaction>) {
    transactions.update((items) => items.map((t) => (t.id === id ? { ...t, ...data } : t)));
}

export function clearTransactions() {
    transactions.set([]);
}
