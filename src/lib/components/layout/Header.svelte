<script lang="ts">
    const projectName = "Finance Tracker";
</script>

<header class="header">
    <div class="header__brand">
        <span class="header__logo" aria-hidden="true">₽</span>
        <h1>{projectName}</h1>
    </div>
    <button class="header__profile" type="button" aria-label="Открыть настройки профиля">
        <span class="header__avatar" aria-hidden="true">OK</span>
        <span class="header__caret" aria-hidden="true">▾</span>
    </button>
</header>

<style>
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.75rem 1.5rem;
        background-color: var(--surface-100);
        border-bottom: 1px solid var(--border-color);
    }

    .header__brand {
        display: flex;
        gap: 0.75rem;
        align-items: center;
    }

    .header__logo {
        display: inline-flex;
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 0.75rem;
        justify-content: center;
        align-items: center;
        background: linear-gradient(135deg, var(--accent-500), var(--accent-400));
        color: var(--surface-0);
        font-size: 1.25rem;
        font-weight: 700;
    }

    .header__brand h1 {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        color: var(--text-900);
    }

    .header__profile {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 0.75rem;
        border-radius: 9999px;
        background-color: transparent;
        border: 1px solid var(--border-color);
        color: var(--text-700);
        cursor: pointer;
    }

    .header__profile:hover {
        background-color: var(--surface-200);
    }

    .header__avatar {
        display: inline-flex;
        width: 2rem;
        height: 2rem;
        border-radius: 9999px;
        justify-content: center;
        align-items: center;
        background-color: var(--accent-100);
        color: var(--accent-700);
        font-weight: 600;
    }
</style>
