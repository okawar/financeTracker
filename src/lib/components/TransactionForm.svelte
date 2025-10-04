<script lang="ts">
    import { addTransaction } from "$lib/stores/transactions";
    import { accounts } from "$lib/stores/accounts";
    import { categories } from "$lib/stores/categories";

    import type { Transaction } from "$lib/types/domain";
    import type { TransactionType } from "$lib/types/domain";

    let amount = 0;
    let type: TransactionType = "expense";
    let accountId = 0;
    let categoryId = 0;
    let description = "";
    let date = new Date().toISOString().split("T")[0];

    $: filteredCategories = $categories.filter((c) => c.type === type);

    $: if (filteredCategories.length > 0 && categoryId === 0) {
        categoryId = filteredCategories[0].id;
    }

    $: if ($accounts.length > 0 && accountId === 0) {
        accountId = $accounts[0].id;
    }

    async function handleSubmit() {
        if (amount <= 0) {
            alert("Сумма должна быть больше 0");
            return;
        }
        if (accountId === 0) {
            alert("Выберите счёт");
            return;
        }
        if (categoryId === 0) {
            alert("Выберите категорию");
            return;
        }

        const now = new Date().toISOString();
        await addTransaction({
            accountId,
            categoryId,
            amount,
            type,
            description: description.trim() || undefined,
            date: new Date(date).toISOString(),
            tags: [],
            createdAt: now,
            updatedAt: now,
        });
        amount = 0;
        description = "";
        date = new Date().toISOString().split("T")[0];
    }
</script>

<form class="transaction-form" on:submit|preventDefault={handleSubmit}>
    <h2>Добавить транзакцию</h2>

    <div class="type-switcher">
        <button
            class="type-btn"
            type="button"
            class:active={type === "expense"}
            on:click={() => (type = "expense")}
        >
            💸 Расход
        </button>

        <button
            class="type-btn"
            type="button"
            class:active={type === "income"}
            on:click={() => (type = "income")}
        >
            💰 Доход
        </button>
    </div>

    <div class="form-field">
        <label for="amount">Сумма</label>
        <input type="number" id="amount" bind:value={amount} min="0" step="0.01" required />
    </div>

    <div class="form-field">
        <label for="account">Счёт</label>
        <select id="account" bind:value={accountId} required>
            {#each $accounts as account}
                <option value={account.id}>{account.name}</option>
            {/each}
        </select>
    </div>

    <div class="form-field">
        <label for="category">Категория</label>
        <select id="category" bind:value={categoryId}>
            {#each $categories as category}
                <option value={category.id}>
                    {category.icon}
                    {category.name}
                </option>
            {/each}
        </select>
    </div>

    <div class="form-field">
        <label for="date">Дата</label>
        <input type="date" id="date" bind:value={date} required />
    </div>

    <button type="submit" class="submit-btn">
        {type === "expense" ? "Добавить расход" : "Добавить доход"}
    </button>
</form>

<style>
    .transaction-form {
        max-width: 32rem;
        padding: 1.5rem;
        background: var(--surface-0);
        border: 1px solid var(--border-color);
        border-radius: 0.75rem;
    }

    h2 {
        margin: 0 0 1.5rem;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-900);
    }

    .type-switcher {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
    }

    .type-btn {
        flex: 1;
        padding: 0.75rem;
        border: 2px solid var(--border-color);
        border-radius: 0.5rem;
        background: var(--surface-50);
        color: var(--text-700);
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 150ms ease;
    }

    .type-btn:hover {
        background: var(--surface-100);
    }

    .type-btn.active {
        border-color: var(--accent-500);
        background: var(--accent-100);
        color: var(--accent-700);
    }

    .form-field {
        margin-bottom: 1rem;
    }

    .form-field label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--text-700);
    }

    .form-field input,
    .form-field select,
    .form-field textarea {
        width: 100%;
        padding: 0.625rem 0.875rem;
        border: 1px solid var(--border-color);
        border-radius: 0.5rem;
        background: var(--surface-0);
        color: var(--text-900);
        font-size: 1rem;
        font-family: inherit;
        transition: border-color 150ms ease;
    }

    .form-field input:focus,
    .form-field select:focus,
    .form-field textarea:focus {
        outline: none;
        border-color: var(--accent-500);
    }

    .form-field textarea {
        min-height: 4rem;
        resize: vertical;
    }

    .submit-btn {
        width: 100%;
        padding: 0.875rem;
        margin-top: 0.5rem;
        border: none;
        border-radius: 0.5rem;
        background: var(--accent-500);
        color: white;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 150ms ease;
    }

    .submit-btn:hover {
        background: var(--accent-700);
    }

    .submit-btn:active {
        transform: scale(0.98);
    }
</style>
