import { db } from "$lib/db";
import type { Transaction } from "$lib/types/domain";
import { liveQuery } from "dexie";
import { readable, writable } from "svelte/store";

// const STORAGE_KEY = "finance_transactions";

// function loadFromStorage(): Transaction[] {
//     if (typeof window === "undefined") return [];
//     const stored = localStorage.getItem(STORAGE_KEY);
//     return stored ? JSON.parse(stored) : [];
// }

// export const transactions = writable<Transaction[]>(loadFromStorage());

// transactions.subscribe((value) => {
//     if (typeof window !== "undefined") {
//         localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
//     }
// });

export const transactions = readable<Transaction[]>([], (set) => {
    const query = liveQuery(() => db.transactions.toArray())
    const subscription = query.subscribe(set)
    return () => subscription.unsubscribe()
}) 

export async function addTransaction(transaction: Omit<Transaction, "id">){
    await db.transactions.add(transaction as Transaction);
}

export async function removeTransaction(id: number){
    await db.transactions.delete(id)
}

export async function updateTransaction(id: number, data: Partial<Transaction>){
    const {id: _, ...updateData} = data
    await db.transactions.update(id, updateData)
}


export async function clearTransactions() {
    await db.transactions.clear()
}
