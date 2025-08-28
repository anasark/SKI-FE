<!DOCTYPE html>
<html>

<?php include __DIR__ . '/../components/header.php' ?>

<body>
    <? include __DIR__ . '/../components/navbar.php' ?>

    <div class="container" style="margin-top:20px;">
        <?= $content ?>
    </div>

    <script src="assets/js/helper.js"></script>

    <?php if (isset($js)): ?>
        <script src="<?= $js ?>"></script>
    <?php endif; ?>
</body>

</html>
