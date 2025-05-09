const subjectForm = document.getElementById('subjectForm');
const subjectList = document.getElementById('subjectList');
const result = document.getElementById('result');
const subjectTable = document.getElementById('subjectTable');

let subjects = JSON.parse(localStorage.getItem('subjects')) || [];

function renderSubjects() {
  subjectList.innerHTML = '';
  subjects.forEach((subject, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${subject.name}</td>
      <td>${subject.credit}</td>
      <td>${subject.grade}</td>
      <td>${subject.semester}</td>
      <td><button onclick="deleteSubject(${index})">O‘chirish</button></td>
    `;
    subjectList.appendChild(tr);
  });
}

function deleteSubject(index) {
  subjects.splice(index, 1);
  localStorage.setItem('subjects', JSON.stringify(subjects));
  renderSubjects();
}

subjectForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('subjectName').value;
  const credit = parseFloat(document.getElementById('credit').value);
  const grade = parseFloat(document.getElementById('grade').value);
  const semester = document.getElementById('semester').value;

  if (!name || isNaN(credit) || isNaN(grade) || !semester || ![0, 3, 4, 5].includes(grade)) {
    alert('Iltimos, barcha maydonlarni to‘g‘ri to‘ldiring va bahoni 0, 3, 4, 5 oralig‘ida kiriting.');
    return;
  }

  const subject = { name, credit, grade, semester };
  subjects.push(subject);
  localStorage.setItem('subjects', JSON.stringify(subjects));
  renderSubjects();
  subjectForm.reset();
});

function calculateGPA() {
  if (subjects.length === 0) {
    result.textContent = 'Iltimos, avval fanlar qo‘shing!';
    return;
  }

  let totalCredits = 0;
  let weightedSum = 0;
  subjects.forEach(subject => {
    totalCredits += subject.credit;
    weightedSum += subject.credit * subject.grade;
  });

  const gpa = (weightedSum / totalCredits).toFixed(2);
  result.textContent = `Hisoblangan GPA: ${gpa}`;
}

function downloadXLSX() {
  let wb = XLSX.utils.book_new();
  wb.Props = {
    Title: "GPA Hisoblovchi",
    Subject: "Fanlar va baholar",
    Author: "GPA Hisoblovchi",
    CreatedDate: new Date()
  };

  let ws_data = [["Fan Nomi", "Kredit", "Baho", "Semestr"]];
  subjects.forEach(subject => {
    ws_data.push([subject.name, subject.credit, subject.grade, subject.semester]);
  });

  let ws = XLSX.utils.aoa_to_sheet(ws_data);
  XLSX.utils.book_append_sheet(wb, ws, "Fanlar");
  XLSX.writeFile(wb, "GPA_data.xlsx");
}

function clearData() {
  subjects = [];
  localStorage.removeItem('subjects');
  renderSubjects();
  result.textContent = '';
}

renderSubjects();