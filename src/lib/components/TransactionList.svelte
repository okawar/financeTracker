

<script lang="ts">
    import { accounts } from "$lib/stores/accounts";
    import { categories } from "$lib/stores/categories";
    import { removeTransaction, transactions } from "$lib/stores/transactions";

    function getCategory(id: number) {
        return $categories.find((c) => c.id === id)
    }

    function getAccount(id: number) {
        return $accounts.find((a) => a.id === id)
    }

    function formatDate(isoString: string){
        const date = new Date(isoString)
        return date.toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric"
        })
    }

    function formatAmount(amount: number, type: string){
        const prefix = type === "expense" ? "-" : "+"
        return `${prefix}${amount.toFixed(2)} ₽`;
    }

</script>

<section class="transaction-list">

    <h2>История заказов ({$transactions.length})</h2>

    {#if $transactions.length === 0 }
        <div class="empty-state">
            <p>Пока нет заказов</p>
            <p class="hint">
                Добавьте первую транзакцию через форму выше
            </p>
        </div>

    {:else}
        <div class="transactions">
            {#each $transactions.slice().reverse() as transaction (transaction.id)}
                {@const category = getCategory(transaction.categoryId)}
                {@const account = getAccount(transaction.accountId)}

                <div class="transaction-card">
                    <div class="transaction-icon" style="background: {category?.color}20;">
                        <span>{category?.icon || "❓"}</span>
                    </div>
                    <div class="transaction-details">
                        <div class="transaction-header">
                            <span class="category-name">{category?.name}</span>
                            <span class="amount" class:expense={transaction.type === "expense"} class:income={transaction.type === "income"}>{formatAmount(transaction.amount, transaction.type)}</span>
                        </div>
                        {#if transaction.description}
                            <p class="description">{transaction.description}</p>
                        {/if}

                        <div class="transaction-meta">
                            <span class="account">{account?.name || "Неизвестный счет"}</span>
                            <span class="date">{formatDate(transaction.date)}</span>
                        </div>

                        <button 
                            class="delete-btn"
                            on:click={() => removeTransaction(transaction.id)}
                            aria-label="Удалить транзакцию"
                        >
                        </button>
                    </div>
                </div>

            {/each}

            
        </div>
    {/if}


</section>



<style>
  .transaction-list {
    max-width: 48rem;
    margin-top: 2rem;
  }

  h2 {
    margin: 0 0 1rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-900);
  }

  .empty-state {
    padding: 3rem;
    text-align: center;
    background: var(--surface-50);
    border: 2px dashed var(--border-color);
    border-radius: 0.75rem;
  }

  .empty-state p {
    margin: 0.5rem 0;
    color: var(--text-700);
  }

  .empty-state .hint {
    font-size: 0.875rem;
    color: var(--text-500);
  }

  .transactions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .transaction-card {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    background: var(--surface-0);
    border: 1px solid var(--border-color);
    border-radius: 0.75rem;
    transition: border-color 150ms ease;
  }

  .transaction-card:hover {
    border-color: var(--accent-400);
  }

  .transaction-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 0.75rem;
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .transaction-details {
    flex: 1;
    min-width: 0;
  }

  .transaction-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 1rem;
    margin-bottom: 0.25rem;
  }

  .category-name {
    font-weight: 600;
    color: var(--text-900);
  }

  .amount {
    font-size: 1.125rem;
    font-weight: 700;
    white-space: nowrap;
  }

  .amount.expense {
    color: #ef4444;
  }

  .amount.income {
    color: #10b981;
  }

  .description {
    margin: 0.25rem 0;
    font-size: 0.875rem;
    color: var(--text-700);
  }

  .transaction-meta {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-500);
  }

  .delete-btn {
    padding: 0.5rem;
    border: none;
    background: transparent;
    font-size: 1.25rem;
    cursor: pointer;
    opacity: 0.5;
    transition: opacity 150ms ease;
  }

  .delete-btn:hover {
    opacity: 1;
  }
</style>