<h2>Chart of Accounts</h2>
<button class="btn btn-success" data-toggle="modal" data-target="#accountModal" id="addAccountBtn">Add Account</button>
<br><br>
<table id="accountsTable" class="table table-striped table-bordered">
    <thead>
        <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Normal Balance</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody></tbody>
</table>

<!-- Modal -->
<div class="modal fade" id="accountModal" tabindex="-1" role="dialog" aria-labelledby="accountModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="accountForm">
                <div class="modal-header">
                    <h4 class="modal-title" id="accountModalLabel">Add Account</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="accountId">
                    <div class="form-group">
                        <label>Code</label>
                        <input type="text" class="form-control" id="code" required>
                    </div>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" class="form-control" id="name" required>
                    </div>
                    <div class="form-group">
                        <label>Normal Balance</label>
                        <select class="form-control" id="normal_balance">
                            <option value="DR">DR</option>
                            <option value="CR">CR</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select class="form-control" id="is_active">
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="saveBtn">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php $js = 'assets/js/chart-of-accounts.js'; ?>
