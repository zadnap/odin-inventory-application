const rows = document.querySelectorAll('tbody tr');
const modal = document.querySelector('.edit-modal');
const closeBtn = modal.querySelector('.close-btn');
const form = modal.querySelector('.edit-form');
const fields = [
  'firstName',
  'lastName',
  'jobTitle',
  'email',
  'extension',
  'officeCode',
  'reportsTo',
];

rows.forEach((row) => {
  row.addEventListener('click', () => {
    const cells = row.querySelectorAll('td');
    const employeeNumber = row.getAttribute('data-employee-number');

    form.querySelector('#update-employeeNumber').value = employeeNumber;
    fields.forEach((field, index) => {
      let value = cells[index + 1].textContent;
      if (value === 'N/A') {
        value = '';
      }
      const input = form.querySelector(`#update-${field}`);
      input.value = value;
      input.dataset.original = value;
    });

    modal.classList.add('open');
  });
});

closeBtn.addEventListener('click', () => {
  modal.classList.remove('open');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.classList.remove('open');
  }
});

const deleteBtn = form.querySelector('button[type="button"]');

deleteBtn.addEventListener('click', async () => {
  const employeeNumber = form.querySelector('#update-employeeNumber').value;
  if (!employeeNumber) return;

  try {
    const response = await fetch('/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ employeeNumber }),
    });

    if (response.ok) {
      location.reload();
    } else {
      const text = await response.text();
      alert('Delete failed: ' + text);
    }
  } catch (err) {
    console.error(err);
    alert('Server error');
  }
});

form.addEventListener('submit', (e) => {
  fields.forEach((field) => {
    const input = form.querySelector(`#update-${field}`);
    if (input.value === input.dataset.original) {
      input.removeAttribute('name');
    }
  });
});
