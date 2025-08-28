$(document).ready(function () {
  function loadReport() {
    let start = $('#startDate').val();
    let end = $('#endDate').val();

    $.getJSON(`${apiUrl}/trial-balance?start_date=${start}&end_date=${end}`, function (response) {
      let tbody = '';

      response.data.forEach(a => {
        tbody += `<tr>
            <td>${a.account_code}</td>
            <td>${a.account_name}</td>
            <td>${Number(a.opening_balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            <td>${Number(a.debit).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            <td>${Number(a.credit).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
            <td>${Number(a.closing_balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
          </tr>`;
      });

      $('#trialBalanceTable tbody').html(tbody);
    });
  }

  loadReport();

  $('#loadReport').click(function () {
    loadReport();
  });

  $('#downloadPdf').click(function () {
    let start = $('#startDate').val();
    let end = $('#endDate').val();

    window.open(`${apiUrl}/trial-balance/pdf?start_date=${start}&end_date=${end}`, '_blank'); 
  });
});
