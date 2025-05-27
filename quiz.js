let questions = [];
let userAnswers = [];

fetch('data/biology_1st/chapter_1/set_1.json')
  .then(res => res.json())
  .then(data => {
    questions = data;
    showQuestions();
  });

function showQuestions() {
  const container = document.getElementById('quiz-container');
  container.innerHTML = '';
  questions.forEach((q, i) => {
    let html = `<div class="question"><p>${i + 1}. ${q.question}</p>`;
    q.options.forEach((opt, j) => {
      html += `
        <label>
          <input type="radio" name="q${i}" value="${j}"> ${opt}
        </label><br>`;
    });
    html += '</div>';
    container.innerHTML += html;
  });
}

function submitQuiz() {
  let score = 0;
  let wrongs = [];

  questions.forEach((q, i) => {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    const ans = selected ? parseInt(selected.value) : -1;
    userAnswers[i] = ans;

    if (ans === q.answer) score++;
    else wrongs.push({ no: i + 1, correct: q.options[q.answer], selected: q.options[ans] || 'কিছুই নির্বাচিত হয়নি' });
  });

  let resultHTML = `<h3>ফলাফল:</h3>
    <p>সঠিক উত্তর: ${score}/${questions.length}</p>
    <h4>ভুলগুলো:</h4><ul>`;
  wrongs.forEach(w => {
    resultHTML += `<li>প্রশ্ন ${w.no} - আপনার উত্তর: ${w.selected}, সঠিক: ${w.correct}</li>`;
  });
  resultHTML += '</ul>';
  document.getElementById('result').innerHTML = resultHTML;
}