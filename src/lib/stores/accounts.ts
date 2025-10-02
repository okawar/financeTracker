import type { Account } from "$lib/types/domain";
import { writable } from "svelte/store";

const STORAGE_KEY = "finance_accounts";

function loadFromStorage(): Account[] {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getDefaultAccounts();
}

function getDefaultAccounts(): Account[] {
    return [
        {
            id: 1,
            name: "Наличные",
            type: "cash",
            balance: 0,
            currency: "rub",
            createdAt: new Date().toISOString(),
            isActive: true,
        },
    ];
}

export const accounts = writable<Account[]>(loadFromStorage());

accounts.subscribe((value) => {
    if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    }
});

export function addAccount(account: Account) {
    accounts.update((items) => [...items, account]);
}

export function removeAccount(id: number) {
    accounts.update((items) => items.filter((a) => a.id !== id));
}

export function updateAccount(id: number, data: Partial<Account>) {
    accounts.update((items) => items.map((a) => (a.id === id ? { ...a, ...data } : a)));
}
