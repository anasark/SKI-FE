$(document).ready(function () {
  // Load invoice options for select
  function loadInvoices() {
    $.get(apiUrl + '/invoices', function (result) {
      let options = '';
      result.data.forEach(inv => {
        options += `<option value="${inv.id}">${inv.invoice_no} - ${inv.customer}</option>`;
      });
      $('#invoice_id').html(options);
    });
  }

  loadInvoices();

  let table = $('#paymentsTable').DataTable({
    ajax: {
      url: apiUrl + '/payments',
      dataSrc: 'data'
    },
    columns: [
      { data: 'id' },
      { data: 'payment_ref' },
      { data: 'paid_at' },
      { 
        data: 'amount_paid',
        render: function (data) {
          return formatNumber(data)
        }
      },
      { data: 'method' },
      {
        data: 'invoice',
        render: function (inv) {
          return inv ? `${inv.invoice_no} - ${inv.customer}` : '-';
        }
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
            <button class="btn btn-info btn-sm detailBtn" data-id="${row.id}">Detail</button>
            <button class="btn btn-danger btn-sm deleteBtn" data-id="${row.id}">Delete</button>
          `;
        }
      }
    ]
  });

  // Open modal for add
  $('#addPaymentBtn').click(function () {
    $('#paymentForm')[0].reset();
    $('#paymentId').val('');
    $('#paymentModalLabel').text('Add Payment');
    loadInvoices();
  });

  // Save or Update payment
  $('#paymentForm').submit(function (e) {
    e.preventDefault();
    let id = $('#paymentId').val();
    let data = {
      payment_ref: $('#payment_ref').val(),
      paid_at: $('#paid_at').val(),
      amount_paid: $('#amount_paid').val(),
      method: $('#method').val(),
      invoice_id: $('#invoice_id').val()
    };

    if (id) {
      $.ajax({
        url: apiUrl + '/payments/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
          $('#paymentModal').modal('hide');
          table.ajax.reload();
        }
      });
    } else {
      $.ajax({
        url: apiUrl + '/payments',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
          $('#paymentModal').modal('hide');
          table.ajax.reload();
        }
      });
    }
  });

  // Delete button
  $('#paymentsTable').on('click', '.deleteBtn', function () {
    if (confirm('Are you sure want to delete this payment?')) {
      let id = $(this).data('id');
      $.ajax({
        url: apiUrl + '/payments/' + id,
        method: 'DELETE',
        success: function () {
          table.ajax.reload();
        }
      });
    }
  });

  // Detail button
  $('#paymentsTable').on('click', '.detailBtn', function () {
    let id = $(this).data('id');

    $.get(apiUrl + '/payments/' + id, function (response) {
      let payment = response.data;
      $('#detailPaymentRef').text(payment.payment_ref || '-');
      $('#detailPaymentDate').text(new Date(payment.paid_at).toLocaleDateString('en-GB'));
      $('#detailPaymentMethod').text(payment.method);
      $('#detailAmountPaid').text(formatNumber(payment.amount_paid));
      $('#detailCreatedAt').text(new Date(payment.created_at).toLocaleString('en-GB'));

      if (payment.invoice) {
        $('#detailInvoiceNo').text(payment.invoice.invoice_no);
        $('#detailInvoiceCustomer').text(payment.invoice.customer);
        $('#detailInvoiceDate').text(new Date(payment.invoice.date).toLocaleDateString('en-GB'));

        let statusBadge = 'secondary';
        if (payment.invoice.status === 'paid') statusBadge = 'success';
        else if (payment.invoice.status === 'partial') statusBadge = 'warning';
        else if (payment.invoice.status === 'open') statusBadge = 'danger';

        $('#detailInvoiceStatus').html(`<span class="label label-${statusBadge}">${payment.invoice.status.toUpperCase()}</span>`);

        let totalAmount = parseFloat(payment.invoice.amount) + parseFloat(payment.invoice.tax);
        let totalPaid = Array.isArray(payment.invoice.payments) 
            ? payment.invoice.payments.reduce((sum, p) => sum + parseFloat(p.amount_paid), 0) 
            : 0;

        let remaining = totalAmount - totalPaid;

        $('#detailInvoiceTotal').text(formatNumber(totalAmount));
        $('#detailInvoiceRemaining').text(formatNumber(remaining));
      } else {
        $('#detailInvoiceNo').text('-');
        $('#detailInvoiceCustomer').text('-');
        $('#detailInvoiceDate').text('-');
        $('#detailInvoiceStatus').text('-');
        $('#detailInvoiceTotal').text('-');
        $('#detailInvoiceRemaining').text('-');
      }

      $('#paymentDetailModal').modal('show');
    });
  });
});
