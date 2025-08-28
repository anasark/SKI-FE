<h2>Journals</h2>
<button class="btn btn-success" data-toggle="modal" data-target="#journalModal" id="addJournalBtn">Add Journal</button>
<br><br>
<div class="table-responsive">
    <table id="journalsTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Date</th>
                <th>Ref No</th>
                <th>Memo</th>
                <th>Debit Total</th>
                <th>Credit Total</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>

<!-- Add/Edit Modal -->
<div class="modal fade" id="journalModal" tabindex="-1" role="dialog" aria-labelledby="journalModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <form id="journalForm">
                <div class="modal-header">
                    <h4 class="modal-title" id="journalModalLabel">Add Journal</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="journalId">
                    <div class="form-group">
                        <label>Ref No</label>
                        <input type="text" class="form-control" id="ref_no" required>
                    </div>
                    <div class="form-group">
                        <label>Posting Date</label>
                        <input type="date" class="form-control" id="posting_date" required>
                    </div>
                    <div class="form-group">
                        <label>Memo</label>
                        <input type="text" class="form-control" id="memo">
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select class="form-control" id="status">
                            <option value="posted">Posted</option>
                        </select>
                    </div>
                    <hr>
                    <h5>Journal Lines</h5>
                    <table class="table table-bordered" id="linesTable">
                        <thead>
                            <tr>
                                <th>Account ID</th>
                                <th>Debit</th>
                                <th>Credit</th>
                                <th><button type="button" class="btn btn-sm btn-success" id="addLine">Add Line</button></th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="saveJournalBtn">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Detail Journal Modal -->
<div class="modal fade" id="journalDetailModal" tabindex="-1" role="dialog" aria-labelledby="journalDetailModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="journalDetailModalLabel">Journal Detail</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-borderless">
                            <tr>
                                <th width="20%">Reference No:</th>
                                <td width="30%" id="detailRefNo">-</td>
                                <th width="20%">Posting Date:</th>
                                <td width="30%" id="detailPostingDate">-</td>
                            </tr>
                            <tr>
                                <th>Status:</th>
                                <td id="detailStatus">-</td>
                                <th>Created At:</th>
                                <td id="detailCreatedAt">-</td>
                            </tr>
                            <tr>
                                <th>Memo:</th>
                                <td colspan="3" id="detailMemo">-</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <hr>
                <h5>Journal Lines</h5>
                <div class="table-responsive">
                    <table class="table table-striped table-bordered" id="detailLinesTable">
                        <thead>
                            <tr>
                                <th>Account Code</th>
                                <th>Account Name</th>
                                <th class="text-right">Debit</th>
                                <th class="text-right">Credit</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                        <tfoot class="table-info">
                            <tr>
                                <th colspan="2">TOTAL</th>
                                <th class="text-right" id="detailTotalDebit">0.00</th>
                                <th class="text-right" id="detailTotalCredit">0.00</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<!-- Account Selection Modal -->
<div class="modal fade" id="accountModal" tabindex="-1" role="dialog" aria-labelledby="accountModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="accountModalLabel">Select Account</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <input type="text" class="form-control" id="accountSearch" placeholder="Search account...">
                </div>
                <div class="table-responsive" style="max-height: 300px; overflow-y: auto;">
                    <table class="table table-striped table-hover" id="accountsTable">
                        <thead>
                            <tr>
                                <th>Code</th>
                                <th>Name</th>
                                <th>Type</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<?php $js = 'assets/js/journals.js'; ?>
