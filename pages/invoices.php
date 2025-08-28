<h2>Invoices</h2>
<button class="btn btn-success" data-toggle="modal" data-target="#invoiceModal" id="addInvoiceBtn">Add Invoice</button>
<br><br>
<div class="table-responsive">
    <table id="invoicesTable" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>Invoice No</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Amount</th>
                <th>Tax</th>
                <th>Status</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>

<!-- Add/Edit Modal -->
<div class="modal fade" id="invoiceModal" tabindex="-1" role="dialog" aria-labelledby="invoiceModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="invoiceForm">
                <div class="modal-header">
                    <h4 class="modal-title" id="invoiceModalLabel">Add Invoice</h4>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="invoiceId">
                    <div class="form-group">
                        <label>Invoice No</label>
                        <input type="text" class="form-control" id="invoice_no" required>
                    </div>
                    <div class="form-group">
                        <label>Date</label>
                        <input type="date" class="form-control" id="date" required>
                    </div>
                    <div class="form-group">
                        <label>Customer</label>
                        <input type="text" class="form-control" id="customer" required>
                    </div>
                    <div class="form-group">
                        <label>Amount</label>
                        <input type="number" class="form-control" id="amount" required>
                    </div>
                    <div class="form-group">
                        <label>Tax</label>
                        <input type="number" class="form-control" id="tax" required>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select class="form-control" id="status">
                            <option value="open">Open</option>
                            <option value="partial">Partial</option>
                            <option value="paid">Paid</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary" id="saveInvoiceBtn">Save</button>
                </div>
            </form>
        </div>
    </div>
</div>

<!-- Invoice Detail Modal -->
<div class="modal fade" id="invoiceDetailModal" tabindex="-1" role="dialog" aria-labelledby="invoiceDetailModalLabel">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="invoiceDetailModalLabel">Invoice Detail</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-md-6">
                        <table class="table table-borderless">
                            <tr>
                                <th>Invoice No:</th>
                                <td id="detailInvoiceNo">-</td>
                            </tr>
                            <tr>
                                <th>Date:</th>
                                <td id="detailInvoiceDate">-</td>
                            </tr>
                            <tr>
                                <th>Customer:</th>
                                <td id="detailCustomer">-</td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-md-6">
                        <table class="table table-borderless">
                            <tr>
                                <th>Amount:</th>
                                <td id="detailAmount">-</td>
                            </tr>
                            <tr>
                                <th>Tax:</th>
                                <td id="detailTax">-</td>
                            </tr>
                            <tr>
                                <th>Total:</th>
                                <td id="detailTotal">-</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <table class="table table-borderless">
                            <tr>
                                <th>Status:</th>
                                <td id="detailStatus">-</td>
                            </tr>
                        </table>
                    </div>
                </div>

                <hr>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h5>Payment History</h5>
                    <div>
                        <span class="text-muted">Total Paid: </span>
                        <span class="font-weight-bold text-success" id="totalPaid">0.00</span>
                        <span class="text-muted ml-3">Remaining: </span>
                        <span class="font-weight-bold text-danger" id="remainingAmount">0.00</span>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table table-striped table-bordered" id="detailPaymentsTable">
                        <thead>
                            <tr>
                                <th>Payment Ref</th>
                                <th>Date</th>
                                <th>Method</th>
                                <th class="text-right">Amount</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>

                <div id="noPayments" class="text-center text-muted py-3" style="display: none;">
                    <i class="fa fa-info-circle fa-2x mb-2"></i>
                    <p>No payments received yet</p>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-success" id="makePaymentFromDetailBtn">
                    <i class="fa fa-money"></i> Make Payment
                </button>
            </div>
        </div>
    </div>
</div>

<!-- Payment Modal -->
<div class="modal fade" id="paymentModal" tabindex="-1" role="dialog" aria-labelledby="paymentModalLabel">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <form id="paymentForm">
                <div class="modal-header">
                    <h4 class="modal-title" id="paymentModalLabel">Make Payment</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" id="paymentInvoiceId">

                    <div class="alert alert-info">
                        <strong>Invoice:</strong> <span id="paymentInvoiceNo">-</span><br>
                        <strong>Customer:</strong> <span id="paymentCustomer">-</span><br>
                        <strong>Total Amount:</strong> <span id="paymentTotalAmount">-</span><br>
                        <strong>Paid Amount:</strong> <span id="paymentPaidAmount">-</span><br>
                        <strong>Remaining:</strong> <span id="paymentRemainingAmount" class="text-danger font-weight-bold">-</span>
                    </div>

                    <div class="form-group">
                        <label>Payment Reference <span class="text-danger">*</span></label>
                        <input type="text" class="form-control" id="payment_ref" required>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Payment Date <span class="text-danger">*</span></label>
                        <input type="date" class="form-control" id="paid_at" required>
                        <div class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Payment Method</label>
                        <select class="form-control" id="method">
                            <option value="Bank Transfer">Bank Transfer</option>
                            <option value="Cash">Cash</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Amount Paid <span class="text-danger">*</span></label>
                        <input type="number" class="form-control" id="amount_paid" step="0.01" min="0.01" required>
                        <div class="invalid-feedback"></div>
                        <small class="form-text text-muted">Maximum amount: <span id="maxPaymentAmount">0.00</span></small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-success" id="savePaymentBtn">
                        <i class="fa fa-money"></i> Process Payment
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

<?php $js = 'assets/js/invoices.js'; ?>
