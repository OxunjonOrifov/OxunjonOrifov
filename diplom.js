let diplomSubjects = [];

const form = document.getElementById('diplomForm');
const list = document.getElementById('diplomList');
const result = document.getElementById('diplomResult');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('diplomSubject').value;
  const credit = parseFloat(document.getElementById('diplomCredit').value);
  const grade = parseFloat(document.getElementById('diplomGrade').value);

  diplomSubjects.push({ name, credit, grade });
  renderDiplomTable();
  form.reset();
});

function renderDiplomTable() {
  list.innerHTML = '';
  diplomSubjects.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${item.name}</td><td>${item.credit}</td><td>${item.grade}</td>`;
    list.appendChild(row);
  });
}

function calculateDiplomGPA() {
  let totalCredits = 0;
  let totalWeighted = 0;
  diplomSubjects.forEach(item => {
    totalCredits += item.credit;
    totalWeighted += item.credit * item.grade;
  });
  const gpa = totalWeighted / totalCredits;
  const gpa100 = gpa * 20;
  result.textContent = `Diplom GPA: ${gpa.toFixed(2)} | 100 ballik tizimda: ${gpa100.toFixed(2)}`;
}
