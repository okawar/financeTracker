import Dexie, {type Table} from "dexie";
import type { Account, Category, Transaction, ReceiptDraft } from "./types/domain";
import { accounts } from "./stores/accounts";
import { categories } from "./stores/categories";
import { transactions } from "./stores/transactions";

export class FinanceTrackerDB extends Dexie {
    accounts!: Table<Account, number>;
    categories!: Table<Category, number>;
    transactions!: Table<Transaction, number>;
    receptionDrafts!: Table<ReceiptDraft, number>;

    constructor() {
        super("financeTrackerDB")

        this.version(1).stores({
            accounts: "++id, name",
            categories: "++id, type",
            transactions: "++id, accountId, categoryId, date",
            receiptDrafts: "++id, status"
        })
    }
}

export const db = new FinanceTrackerDB()