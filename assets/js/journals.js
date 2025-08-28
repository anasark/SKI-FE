$(document).ready(function () {
  var accountLists = []
  $.get(apiUrl + '/chart-of-accounts', function (result) {
    accountLists = result.data;
  });

  function generateAccountOptions(selectedId = null) {
    let options = '';

    accountLists.forEach(account => {
      options += `<option value="${account.id}" ${account.id == selectedId ? 'selected' : ''}>${account.code} - ${account.name}</option>`;
    });

    return options;
  }

  let table = $('#journalsTable').DataTable({
    ajax: {
      url: apiUrl + '/journals',
      dataSrc: 'data'
    },
    columns: [
      { data: 'posting_date' },
      { data: 'ref_no' },
      { data: 'memo' },
      {
        data: 'lines',
        render: function (lines) {
          return lines
          .filter(l => parseFloat(l.debit) > 0)
          .map(l => `${l.account.code} - ${l.account.name}: ${formatNumber(l.debit)}`)
          .join('<br>') || '-';
        }
      },
      {
        data: 'lines',
        render: function (lines) {
          return lines
          .filter(l => parseFloat(l.credit) > 0)
          .map(l => `${l.account.code} - ${l.account.name}: ${formatNumber(l.credit)}`)
          .join('<br>') || '-';
        }
      },
      {
        data: null,
        render: function (data, type, row) {
          return `
            <button class="btn btn-success btn-sm detailBtn" data-id="${row.id}">Detail</button>
            <button class="btn btn-info btn-sm editBtn" data-id="${row.id}">Edit</button>
            <button class="btn btn-danger btn-sm deleteBtn" data-id="${row.id}">Delete</button>
          `;
        }
      }
    ]
  });

  // Add journal modal
  $('#addJournalBtn').click(function () {
    $('#journalForm')[0].reset();
    $('#journalId').val('');
    $('#linesTable tbody').empty();
    $('#journalModalLabel').text('Add Journal');
  });

  // Add line row
  $('#addLine').click(function () {
    options = generateAccountOptions();
    $('#linesTable tbody').append(`
      <tr>
        <td><select class="form-control account_id" required>${options}</select></td>
        <td><input type="number" class="form-control debit" value="0"></td>
        <td><input type="number" class="form-control credit" value="0"></td>
        <td><button type="button" class="btn btn-sm btn-danger removeLine">X</button></td>
      </tr>
    `);
  });

  // Remove line row
  $('#linesTable').on('click', '.removeLine', function () {
    $(this).closest('tr').remove();
  });

  // Save or Update journal
  $('#journalForm').submit(function (e) {
    e.preventDefault();
    let id = $('#journalId').val();
    let lines = [];
    $('#linesTable tbody tr').each(function () {
      lines.push({
        account_id: $(this).find('.account_id').val(),
        debit: $(this).find('.debit').val(),
        credit: $(this).find('.credit').val()
      });
    });
    let data = {
      ref_no: $('#ref_no').val(),
      posting_date: $('#posting_date').val(),
      memo: $('#memo').val(),
      status: $('#status').val(),
      lines: lines
    };

    if (id) {
      // Update
      $.ajax({
        url: apiUrl + '/journals/' + id,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
          $('#journalModal').modal('hide');
          table.ajax.reload();
        }
      });
    } else {
      // Create
      $.ajax({
        url: apiUrl + '/journals',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function () {
          $('#journalModal').modal('hide');
          table.ajax.reload();
        }
      });
    }
  });

  // Edit button
  $('#journalsTable').on('click', '.editBtn', function () {
    let id = $(this).data('id');
    $.get(apiUrl + '/journals/' + id, function (result) {
      let journal = result.data;
      $('#journalId').val(journal.id);
      $('#ref_no').val(journal.ref_no);
      $('#posting_date').val(journal.posting_date);
      $('#memo').val(journal.memo);
      $('#status').val(journal.status);
      $('#linesTable tbody').empty();
      journal.lines.forEach(l => {
        options = generateAccountOptions(l.account.id);
        $('#linesTable tbody').append(`
          <tr>
            <td><select class="form-control account_id" required>${options}</select></td>
            <td><input type="number" class="form-control debit" value="${l.debit}"></td>
            <td><input type="number" class="form-control credit" value="${l.credit}"></td>
            <td><button type="button" class="btn btn-sm btn-danger removeLine">X</button></td>
          </tr>
        `);
      });
      $('#journalModalLabel').text('Edit Journal');
      $('#journalModal').modal('show');
    });
  });

  // Delete button
  $('#journalsTable').on('click', '.deleteBtn', function () {
    if (confirm('Are you sure want to delete this journal?')) {
      let id = $(this).data('id');
      $.ajax({
        url: apiUrl + '/journals/' + id,
        method: 'DELETE',
        success: function () {
          table.ajax.reload();
        }
      });
    }
  });

  // Detail button
  $('#journalsTable').on('click', '.detailBtn', function () {
    let id = $(this).data('id');

    $.get(apiUrl + '/journals/' + id, function (response) {
      let journal = response.data;

      $('#detailRefNo').text(journal.ref_no);
      $('#detailPostingDate').text(new Date(journal.posting_date).toLocaleDateString('en-GB'));
      $('#detailStatus').html(`<span class="label label-success">${journal.status.toUpperCase()}</span>`);
      $('#detailCreatedAt').text(new Date(journal.created_at).toLocaleString('en-GB'));
      $('#detailMemo').text(journal.memo || '-');

      let tbody = $('#detailLinesTable tbody');
      tbody.empty();

      let totalDebit = 0;
      let totalCredit = 0;

      journal.lines.forEach(line => {
        let debit = parseFloat(line.debit);
        let credit = parseFloat(line.credit);
        totalDebit += debit;
        totalCredit += credit;

        tbody.append(`
          <tr>
            <td>${line.account.code}</td>
            <td>${line.account.name}</td>
            <td class="text-right">${debit > 0 ? formatNumber(debit) : '-'}</td>
            <td class="text-right">${credit > 0 ? formatNumber(credit) : '-'}</td>
          </tr>
        `);
      });

      $('#detailTotalDebit').text(formatNumber(totalDebit));
      $('#detailTotalCredit').text(formatNumber(totalCredit));

      $('#editFromDetailBtn').data('id', journal.id);

      $('#journalDetailModal').modal('show');
    })
  });
});
