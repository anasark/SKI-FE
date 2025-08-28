$(document).ready(function () {
  let table = $('#accountsTable').DataTable({
    ajax: {
      url: apiUrl + '/chart-of-accounts',
      dataSrc: 'data'
    },
    columns: [

      { data: 'code' },
      { data: 'name' },
      { data: 'normal_balance' },
      {
        data: 'is_active',
        render: function (d) {
          return d ? 'Active' : 'Inactive';
        }
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
            <button class="btn btn-info btn-sm editBtn" data-id="${row.id}">Edit</button>
            <button class="btn btn-danger btn-sm deleteBtn" data-id="${row.id}">Delete</button>
          `;
        }
      }
    ]
  });

  // Open modal for add
  $('#addAccountBtn').click(function () {
    $('#accountForm')[0].reset();
    $('#accountId').val('');
    $('#accountModalLabel').text('Add Account');
  });

  // Save or Update
  $('#accountForm').submit(function (e) {
    e.preventDefault();
    let id = $('#accountId').val();
    let data = {
      code: $('#code').val(),
      name: $('#name').val(),
      normal_balance: $('#normal_balance').val(),
      is_active: $('#is_active').val()
    };
    if (id) {
      // Update
      $.ajax({
        url: apiUrl + '/chart-of-accounts/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
          $('#accountModal').modal('hide');
          table.ajax.reload();
        }
      });
    } else {
      // Create
      $.ajax({
        url: apiUrl + '/chart-of-accounts',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
          $('#accountModal').modal('hide');
          table.ajax.reload();
        }
      });
    }
  });

  // Edit button
  $('#accountsTable').on('click', '.editBtn', function () {
    let id = $(this).data('id');
    $.get(apiUrl + '/chart-of-accounts/' + id, function (result) {
      let isActive = result.data.is_active ? "1" : "0";

      $('#accountId').val(result.data.id);
      $('#code').val(result.data.code);
      $('#name').val(result.data.name);
      $('#normal_balance').val(result.data.normal_balance);
      $('#is_active').val(isActive).change();
      $('#accountModalLabel').text('Edit Account');
      $('#accountModal').modal('show');
    });
  });

  // Delete button
  $('#accountsTable').on('click', '.deleteBtn', function () {
    if (confirm('Are you sure want to delete this account?')) {
      let id = $(this).data('id');
      $.ajax({
        url: apiUrl + '/chart-of-accounts/' + id,
        method: 'DELETE',
        success: function () {
          table.ajax.reload();
        }
      });
    }
  });
});
