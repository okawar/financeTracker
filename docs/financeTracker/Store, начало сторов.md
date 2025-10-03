## План создания первого store

### 1. Создай файл `src/lib/stores/transactions.ts`

Начнём с транзакций как основной сущности.

### 2. Что должен уметь store:

- Хранить массив транзакций
- Добавлять новую транзакцию
- Удалять транзакцию
- Обновлять транзакцию
- Фильтровать/сортировать (опционально на старте)

```typescript
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
```

## Account

```typescript
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
```

## Categories

```typescript
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
```
