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

    for (let i = 0; i < courseCount; i++) {
        const crhrs = document.getElementById(`crhrs-${i}`).value;
        const sessional = document.getElementById(`sessional-${i}`).value;
        const finalmks = document.getElementById(`final-${i}`).value;
        const labmarks = document.getElementById(`lab-${i}`).value;
        
        courseData.push({ crhrs, sessional, finalmks, labmarks });
    }

    // Send course data to the backend server
    fetch('http://localhost:8080/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courses: courseData })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerHTML = `
            <p>Your Semester GPA (SGPA) is: ${data.sgpa.toFixed(2)}</p>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('result').innerHTML = `
            <p style="color: red;">Error calculating GPA. Please try again.</p>
        `;
    });
});
