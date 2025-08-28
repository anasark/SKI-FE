<h2>Trial Balance Report</h2>

<div class="form-inline">
    <div class="form-group">
        <label>Start Date:</label>
        <input type="date" id="startDate" class="form-control" value="<?= date('Y-m-01', strtotime('first day of last month')) ?>">
    </div>
    <div class="form-group">
        <label>End Date:</label>
        <input type="date" id="endDate" class="form-control" value="<?= date('Y-m-t', strtotime('last day of last month')) ?>">
    </div>
    <div class="form-group">
        <button class="btn btn-primary" id="loadReport">Load</button>
        <a id="downloadPdf" class="btn btn-success" href="#" target="_blank">Download PDF</a>
    </div>
</div>

<br>

<div class="table-responsive">
    <table id="trialBalanceTable" class="table table-bordered table-striped">
        <thead>
            <tr>
                <th>Account Code</th>
                <th>Account Name</th>
                <th>Opening Balance</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Closing Balance</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>

<?php $js = 'assets/js/trial-balance.js'; ?>
