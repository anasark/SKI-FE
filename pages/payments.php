<h2>Payments</h2>
<button class="btn btn-success" data-toggle="modal" data-target="#paymentModal" id="addPaymentBtn">Add Payment</button>
<br><br>
<div class="table-responsive">
    <table id="paymentsTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Payment Ref</th>
                <th>Paid At</th>
                <th>Amount Paid</th>
                <th>Method</th>
                <th>Invoice</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>

<!-- Add/Edit Modal -->
<div class="modal fade" id="paymentModal" tabindex="-1" role="dialog" aria-labelledby="paymentModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="paymentForm">
                <div class="modal-header">
                    <h4 class="modal-title" id="paymentModalLabel">Add Payment</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="paymentId">
                    <div class="form-group">
                        <label>Payment Ref</label>
                        <input type="text" class="form-control" id="payment_ref" required>
                    </div>
                    <div class="form-group">
                        <label>Paid At</label>
                        <input type="date" class="form-control" id="paid_at" required>
                    </div>
                    <div class="form-group">
                        <label>Amount Paid</label>
                        <input type="number" class="form-control" id="amount_paid" required>
                    </div>
                    <div class="form-group">
                        <label>Method</label>
                        <select class="form-control" id="method">
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Invoice</label>
                        <select class="form-control" id="invoice_id"></select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="savePaymentBtn">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Payment Detail Modal -->
<div class="modal fade" id="paymentDetailModal" tabindex="-1" role="dialog" aria-labelledby="paymentDetailModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="paymentDetailModalLabel">Payment Detail</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <table class="table table-borderless">
                            <tr>
                                <th>Payment Ref:</th>
                                <td id="detailPaymentRef">-</td>
                            </tr>
                            <tr>
                                <th>Payment Date:</th>
                                <td id="detailPaymentDate">-</td>
                            </tr>
                            <tr>
                                <th>Method:</th>
                                <td id="detailPaymentMethod">-</td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <table class="table table-borderless">
                            <tr>
                                <th>Amount Paid:</th>
                                <td id="detailAmountPaid" class="text-success font-weight-bold">-</td>
                            </tr>
                            <tr>
                                <th>Created At:</th>
                                <td id="detailCreatedAt">-</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <hr>
                <h5>Invoice Information</h5>
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-borderless">
                            <tr>
                                <th width="20%">Invoice No:</th>
                                <td width="30%" id="detailInvoiceNo">-</td>
                                <th width="20%">Customer:</th>
                                <td width="30%" id="detailInvoiceCustomer">-</td>
                            </tr>
                            <tr>
                                <th>Invoice Date:</th>
                                <td id="detailInvoiceDate">-</td>
                                <th>Status:</th>
                                <td id="detailInvoiceStatus">-</td>
                            </tr>
                            <tr>
                                <th>Invoice Total:</th>
                                <td id="detailInvoiceTotal">-</td>
                                <th>Remaining:</th>
                                <td id="detailInvoiceRemaining">-</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
        </div>
    </div>
</div>

<?php $js = 'assets/js/payments.js'; ?>
