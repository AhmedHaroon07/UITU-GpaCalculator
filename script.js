function addCourseInputs() {
    const courseCount = document.getElementById('courses').value;
    const courseInputs = document.getElementById('course-inputs');
    courseInputs.innerHTML = ''; // Clear previous inputs

    for (let i = 0; i < courseCount; i++) {
        courseInputs.innerHTML += `
            <div class="course">
                <h3>Course ${i + 1}</h3>
                <label for="crhrs-${i}">Credit Hours:</label>
                <input type="number" id="crhrs-${i}" name="crhrs-${i}" required min="1">
                <label for="sessional-${i}">Sessional Marks:</label>
                <input type="number" id="sessional-${i}" name="sessional-${i}" required min="0" max="50">
                <label for="final-${i}">Final Marks:</label>
                <input type="number" id="final-${i}" name="final-${i}" required min="0" max="50">
                <label for="lab-${i}">Lab Marks:</label>
                <input type="number" id="lab-${i}" name="lab-${i}" required min="0" max="50">
            </div>
        `;
    }
}

document.getElementById('gpa-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const courseCount = document.getElementById('courses').value;
    const courseData = [];
    let totalPoints = 0;
    let totalCreditHours = 0;

    for (let i = 0; i < courseCount; i++) {
        const crhrs = parseInt(document.getElementById(`crhrs-${i}`).value);
        const sessional = parseFloat(document.getElementById(`sessional-${i}`).value);
        const finalmks = parseFloat(document.getElementById(`final-${i}`).value);
        const labmarks = parseFloat(document.getElementById(`lab-${i}`).value);

        let result = 0;
        if (crhrs === 4) {
            result = ((finalmks + sessional) * 3) + ((labmarks / 50) * 100);
            result = result / crhrs;
        } else if (crhrs === 3) {
            result = ((finalmks + sessional) * 3) / crhrs;
        } else {
            alert("Invalid credit hours. Please enter a valid course credit hour (3 or 4).");
            return;
        }

        let courseGpa = 0;
        if (result >= 95 && result <= 100) {
            courseGpa = 4.00;
        } else if (result >= 90 && result <= 94) {
            courseGpa = 4.00;
        } else if (result >= 85 && result <= 89) {
            courseGpa = 3.67;
        } else if (result >= 80 && result <= 84) {
            courseGpa = 3.33;
        } else if (result >= 75 && result <= 79) {
            courseGpa = 3.00;
        } else if (result >= 70 && result <= 74) {
            courseGpa = 2.67;
        } else if (result >= 65 && result <= 69) {
            courseGpa = 2.33;
        } else if (result >= 60 && result <= 64) {
            courseGpa = 2.00;
        } else if (result >= 55 && result <= 59) {
            courseGpa = 1.67;
        } else {
            courseGpa = 0.0;
        }

        const points = courseGpa * crhrs;
        totalPoints += points;
        totalCreditHours += crhrs;
    }

    const sgpa = totalPoints / totalCreditHours;

    document.getElementById('result').innerHTML = `
        <p>Your Semester GPA (SGPA) is: ${sgpa.toFixed(2)}</p>
    `;
});
