$(document).ready(function () {
  let table = $('#closingPeriodsTable').DataTable({
    ajax: {
      url: apiUrl + '/closing-periods',
      dataSrc: 'data'
    },
    columns: [
      { data: 'id' },
      { data: 'period' },
      {
        data: 'is_locked',
        render: function (d) {
          return d ? 'Yes' : 'No';
        }
      },
      { data: 'locked_by', defaultContent: '-' },
      { data: 'locked_at', defaultContent: '-' },
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

  // Add Period
  $('#addPeriodBtn').click(function () {
    $('#periodForm')[0].reset();
    $('#periodId').val('');
    $('#periodModalLabel').text('Add Closing Period');
    $('#periodModal').modal('show');
  });

  // Save or Update
  $('#periodForm').submit(function (e) {
    e.preventDefault();
    let id = $('#periodId').val();
    let data = {
      period: $('#period').val(),
      is_locked: $('#is_locked').val()
    };
    if (id) {
      $.ajax({
        url: apiUrl + '/closing-periods/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
          $('#periodModal').modal('hide');
          table.ajax.reload();
        }
      });
    } else {
      $.ajax({
        url: apiUrl + '/closing-periods',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
          $('#periodModal').modal('hide');
          table.ajax.reload();
        }
      });
    }
  });

  // Edit button
  $('#closingPeriodsTable').on('click', '.editBtn', function () {
    let id = $(this).data('id');
    $.get(apiUrl + '/closing-periods/' + id, function (result) {
      let period = result.data;
      $('#periodId').val(period.id);
      $('#period').val(period.period);
      $('#is_locked').val(period.is_locked ? "1" : "0").change();
      $('#periodModalLabel').text('Edit Closing Period');
      $('#periodModal').modal('show');
    });
  });

  // Delete
  $('#closingPeriodsTable').on('click', '.deleteBtn', function () {
    if (confirm('Are you sure want to delete this period?')) {
      let id = $(this).data('id');
      $.ajax({
        url: apiUrl + '/closing-periods/' + id,
        method: 'DELETE',
        success: function () {
          table.ajax.reload();
        }
      });
    }
  });

  // Lock / Unlock
  $('#closingPeriodsTable').on('click', '.lockBtn', function () {
    let id = $(this).data('id');
    $.ajax({
      url: `/api/closing-periods/${id}/lock`,
      method: 'POST',
      success: function () {
        table.ajax.reload();
      }
    });
  });

  $('#closingPeriodsTable').on('click', '.unlockBtn', function () {
    let id = $(this).data('id');
    $.ajax({
      url: `/api/closing-periods/${id}/unlock`,
      method: 'POST',
      success: function () {
        table.ajax.reload();
      }
    });
  });
});
