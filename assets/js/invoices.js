$(document).ready(function () {
  let table = $('#invoicesTable').DataTable({
    ajax: {
      url: apiUrl + '/invoices',
      dataSrc: 'data'
    },
    columns: [
      { data: 'invoice_no' },
      { data: 'date' },
      { data: 'customer' },
      {
        data: 'amount',
        render: function (data) {
          return formatNumber(data);
        }
      },
      {
        data: 'tax',
        render: function (data) {
          return formatNumber(data);
        }
      },
      { data: 'status' },
      {
        data: null,
        render: function (data, type, row) {
          let paymentBtn = row.status !== 'paid'
            ? `<button class="btn btn-success btn-sm paymentBtn" data-id="${row.id}" >Payment</button>`
            : `<button class="btn btn-success btn-sm" disabled>Paid</button>`;

          return `
            <button class="btn btn-info btn-sm detailBtn" data-id="${row.id}">Detail</button>
            ${paymentBtn}
          `;
        },
      }
    ]
  });

  // Open modal for add
  $('#addInvoiceBtn').click(function () {
    $('#invoiceForm')[0].reset();
    $('#invoiceId').val('');
    $('#invoiceModalLabel').text('Add Invoice');
  });

  // Save invoice
  $('#invoiceForm').submit(function (e) {
    e.preventDefault();
    let id = $('#invoiceId').val();
    let data = {
      invoice_no: $('#invoice_no').val(),
      invoice_date: $('#date').val(),
      customer: $('#customer').val(),
      amount: $('#amount').val(),
      tax: $('#tax').val(),
      status: $('#status').val()
    };

    if (id) {
      $.ajax({
        url: apiUrl + '/invoices/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
          $('#invoiceModal').modal('hide');
          table.ajax.reload();
        }
      });
    } else {
      $.ajax({
        url: apiUrl + '/invoices',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
          $('#invoiceModal').modal('hide');
          table.ajax.reload();
        }
      });
    }
  });

  // Edit button
  $('#invoicesTable').on('click', '.editBtn', function () {
    let id = $(this).data('id');
    $.get(apiUrl + '/invoices/' + id, function (result) {
      let invoice = result.data;
      $('#invoiceId').val(invoice.id);
      $('#invoice_no').val(invoice.invoice_no);
      $('#date').val(invoice.date);
      $('#customer').val(invoice.customer);
      $('#amount').val(invoice.amount);
      $('#tax').val(invoice.tax);
      $('#status').val(invoice.status).change();
      $('#invoiceModalLabel').text('Edit Invoice');
      $('#invoiceModal').modal('show');
    });
  });

  // Detail button
  $('#invoicesTable').on('click', '.detailBtn', function () {
    let id = $(this).data('id');

    $.get(apiUrl + '/invoices/' + id, function (response) {
      let invoice = response.data;
      $('#detailInvoiceNo').text(invoice.invoice_no);
      $('#detailInvoiceDate').text(new Date(invoice.invoice_date).toLocaleDateString('en-GB'));
      $('#detailCustomer').text(invoice.customer);
      $('#detailAmount').text(formatNumber(invoice.amount));
      $('#detailTax').text(formatNumber(invoice.tax));

      let totalAmount = parseFloat(invoice.amount) + parseFloat(invoice.tax);
      $('#detailTotal').text(formatNumber(totalAmount));

      let statusBadge = 'secondary';
      if (invoice.status === 'paid') statusBadge = 'success';
      else if (invoice.status === 'partial') statusBadge = 'warning';
      else if (invoice.status === 'open') statusBadge = 'danger';

      $('#detailStatus').html(`<span class="label label-${statusBadge}">${invoice.status.toUpperCase()}</span>`);

      let totalPaid = invoice.payments.reduce((sum, payment) => sum + parseFloat(payment.amount_paid), 0);
      let remaining = totalAmount - totalPaid;

      $('#totalPaid').text(formatNumber(totalPaid));
      $('#remainingAmount').text(formatNumber(remaining));

      if (invoice.payments.length > 0) {
        $('#noPayments').hide();

        let tbody = $('#detailPaymentsTable tbody');
        tbody.empty();

        invoice.payments.forEach(payment => {
          tbody.append(`
            <tr>
              <td>${payment.payment_ref}</td>
              <td>${new Date(payment.paid_at).toLocaleDateString('en-GB')}</td>
              <td>${payment.method}</td>
              <td class="text-right">${formatNumber(payment.amount_paid)}</td>
            </tr>
          `);
        });
      } else {
        $('#detailPaymentsTable tbody').empty();
        $('#noPayments').show();
      }

      $('#makePaymentFromDetailBtn').data('invoice', invoice);

      if (invoice.status === 'paid') {
        $('#makePaymentFromDetailBtn').hide();
      } else {
        $('#makePaymentFromDetailBtn').show();
      }

      $('#invoiceDetailModal').modal('show');
    });
  });

  // Payment button
  $('#invoicesTable').on('click', '.paymentBtn', function () {
    let id = $(this).data('id');

    $.get(apiUrl + '/invoices/' + id, function (response) {
      let invoice = response.data;
      showPaymentModal(invoice);
    });
  });

  // Payment button from detail modal
  $('#makePaymentFromDetailBtn').click(function () {
    let invoice = $(this).data('invoice');
    $('#invoiceDetailModal').modal('hide');

    setTimeout(function () {
      showPaymentModal(invoice);
    }, 500);
  });

  $('#paymentForm').submit(function (e) {
    e.preventDefault();

    let data = {
      invoice_id: parseInt($('#paymentInvoiceId').val()),
      payment_ref: $('#payment_ref').val(),
      paid_at: $('#paid_at').val(),
      amount_paid: parseFloat($('#amount_paid').val()),
      method: $('#method').val()
    };

    $.ajax({
      url: apiUrl + '/payments',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      beforeSend: function () {
        $('#savePaymentBtn').prop('disabled', true).text('Processing...');
      },
      success: function (response) {
        $('#paymentModal').modal('hide');
        table.ajax.reload();
      },
      error: function (xhr) {
        if (xhr.responseJSON?.message) {
          alert(xhr.responseJSON.message);
        }
      },
      complete: function () {
        $('#savePaymentBtn').prop('disabled', false).html('<i class="fa fa-money"></i> Process Payment');
      }
    });
  });
});

// Show payment modal
function showPaymentModal(invoice) {
  let totalAmount = parseFloat(invoice.amount) + parseFloat(invoice.tax);
  let totalPaid = invoice.payments.reduce((sum, payment) => sum + parseFloat(payment.amount_paid), 0);
  let remaining = totalAmount - totalPaid;

  $('#paymentInvoiceId').val(invoice.id);
  $('#paymentInvoiceNo').text(invoice.invoice_no);
  $('#paymentCustomer').text(invoice.customer);
  $('#paymentTotalAmount').text(formatNumber(totalAmount));
  $('#paymentPaidAmount').text(formatNumber(totalPaid));
  $('#paymentRemainingAmount').text(formatNumber(remaining));
  $('#maxPaymentAmount').text(formatNumber(remaining));

  // Set default values
  $('#payment_ref').val('');
  $('#paid_at').val(new Date().toISOString().split('T')[0]);
  $('#method').val('Bank Transfer');
  $('#amount_paid').val(remaining.toFixed(2));

  $('#paymentModal').modal('show');
}
