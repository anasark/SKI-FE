<nav class="navbar navbar-default">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#navbar-collapse">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="index.php">SKI Mini Project</a>
        </div>
        <div class="collapse navbar-collapse" id="navbar-collapse">
            <ul class="nav navbar-nav">
                <li class="<?= ($_GET['page'] ?? 'dashboard') === 'chart-of-accounts' ? 'active' : '' ?>">
                    <a href="?page=chart-of-accounts">Chart of Accounts</a>
                </li>
                <li class="<?= ($_GET['page'] ?? 'dashboard') === 'journals' ? 'active' : '' ?>">
                    <a href="?page=journals">Journals</a>
                </li>
                <li class="<?= ($_GET['page'] ?? 'dashboard') === 'invoices' ? 'active' : '' ?>">
                    <a href="?page=invoices">Invoices</a>
                </li>
                <li class="<?= ($_GET['page'] ?? 'dashboard') === 'payments' ? 'active' : '' ?>">
                    <a href="?page=payments">Payments</a>
                </li>
                <li class="<?= ($_GET['page'] ?? 'dashboard') === 'closing-periods' ? 'active' : '' ?>">
                    <a href="?page=closing-periods">Closing Periods</a>
                </li>
            </ul>
        </div>
    </div>
</nav>
