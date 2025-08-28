<h2>Closing Periods</h2>
<button class="btn btn-success" id="addPeriodBtn">Add Period</button>
<br><br>
<div class="table-responsive">
    <table id="closingPeriodsTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Period</th>
                <th>Locked</th>
                <th>Locked By</th>
                <th>Locked At</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>

<!-- Modal -->
<div class="modal fade" id="periodModal" tabindex="-1" role="dialog" aria-labelledby="periodModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="periodForm">
                <div class="modal-header">
                    <h4 class="modal-title" id="periodModalLabel">Add Closing Period</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="periodId">
                    <div class="form-group">
                        <label>Period (YYYY-MM)</label>
                        <input type="month" class="form-control" id="period" required>
                    </div>
                    <div class="form-group">
                        <label>Locked</label>
                        <select class="form-control" id="is_locked">
                            <option value="0">No</option>
                            <option value="1">Yes</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="savePeriodBtn">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php $js = 'assets/js/closing-periods.js'; ?>
