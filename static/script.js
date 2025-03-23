document.addEventListener('DOMContentLoaded', function () {
    // ✅ Add Customer
    document.getElementById('customerForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value,
            address: document.getElementById('address').value,
            contact_number: document.getElementById('contact_number').value,
            email: document.getElementById('email').value
        };

        fetch('/add_customer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || data.error);
            document.getElementById('customerForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add customer. Please try again.');
        });
    });

    // ✅ Add Meter
    document.getElementById('meterForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const data = {
            customer_id: document.getElementById('customer_id').value,
            meter_number: document.getElementById('meter_number').value,
            installation_date: document.getElementById('installation_date').value
        };

        fetch('/add_meter', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || data.error);
            document.getElementById('meterForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to add meter. Please try again.');
        });
    });

    // ✅ Record Consumption
    document.getElementById('consumptionForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const data = {
            meter_id: document.getElementById('meter_id').value,
            reading_date: document.getElementById('reading_date').value,
            units_used: document.getElementById('units_used').value
        };

        fetch('/record_consumption', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message || data.error);
            document.getElementById('consumptionForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to record consumption. Please try again.');
        });
    });

    // ✅ Fetch and Display Bills
    fetch('/bills')
    .then(response => response.json())
    .then(data => {
        const tableBody = document.querySelector('#billsTable tbody');
        tableBody.innerHTML = '';
        data.forEach(bill => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${bill.bill_id}</td>
                <td>${bill.name}</td>
                <td>${bill.bill_date}</td>
                <td>${bill.total_units}</td>
                <td>${bill.total_amount}</td>
                <td>${bill.payment_status}</td>
            `;
            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to fetch bills. Please try again.');
    });
});
