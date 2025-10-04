<script lang="ts">
    import Header from "$lib/components/layout/Header.svelte";
    import MainContent from "$lib/components/layout/MainContent.svelte";
    import Sidebar from "$lib/components/layout/Sidebar.svelte";

    import "./app.css";
</script>

<main>
    <div class="app-shell">
        <!-- <Header /> -->
        <div class="app-body">
            <!-- <Sidebar /> -->
            <MainContent>
                <section class="welcome">
                    <h2>Добро пожаловать в Finance Tracker</h2>
                    <p>Начни с настройки счётов или импортируй чек, чтобы увидеть аналитику.</p>
                </section>
            </MainContent>
        </div>
    </div>
</main>

<style>
</style>
