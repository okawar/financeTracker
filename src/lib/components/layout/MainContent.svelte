<script>
    import TransactionForm from "../TransactionForm.svelte";
    import TransactionList from "../TransactionList.svelte";
</script>

<main class="main-content">
    <TransactionForm />
    <TransactionList />
</main>

<style>
    .main-content {
        flex: 1;
        padding: 1.75rem;
        overflow-y: auto;
        background-color: var(--surface-0);
        color: var(--text-900);
    }
</style>
