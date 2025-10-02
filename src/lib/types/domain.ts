export type Currency = "rub" | "usd" | "eur";
export type TransactionType = "expense" | "income" | "transfer";
export type ReceiptStatus = "pending" | "processing" | "recognized" | "error" | "confirmed";

export type AccountId = number & { __brand: "AccountId" };
export type CategoryId = number & { __brand: "CategoryId" };

export interface Account {
    id: number;
    name: string;
    type: "cash" | "card" | "e-wallet" | "bank-account";
    balance: number;
    currency: Currency;
    icon?: string;
    createdAt: string;
    isActive: boolean;
}

export interface Category {
    id: number;
    name: string;
    type: "expense" | "income";
    icon: string;
    color: string;
    parentId?: number;
    isDefault: boolean;
}

export interface Transaction {
    id: number;
    accountId: AccountId;
    categoryId: CategoryId;
    amount: number;
    type: TransactionType;
    description?: string;
    date: string;
    receiptId?: number;
    tags: Array<string>;
    createdAt: string;
    updatedAt: string;
}

export interface ReceiptDraft {
    id: number;
    imageUrl: string;
    uploadedAt: string;
    status: ReceiptStatus;
    vendor?: string;
    totalAmount: number;
    currency: Currency;
    date?: string;
    lineItems: LineItem[];
    rawText?: string;
    errorMessage?: string;
}

export type LineItem = {
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
    category?: string;
};
