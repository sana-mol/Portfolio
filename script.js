function calculateGrade() {
    let marks = [];
    for (let index = 1; index <= 5; index++) {
        let input = prompt(`Enter marks for Subject ${index}(0 - 100):`);
        let mark = Number(input);

        // Validate input
        if (isNaN(mark) || mark < 0 || mark > 100) {
            alert("Invalid input! Please enter a number between 0 and 100.");
            index--;
        } else if (input === null) {
            // if cancel button pressed
            return;
        } else {
            // if ok button pressed
            marks.push(mark);
        }
    }

    // Calculate total and average
    let total = marks.reduce((sum, curr) => sum + curr, 0);
    let average = total / marks.length;

    // Assign grade using if-else
    let grade;
    if (average >= 90) {
        grade = "A+";
    } else if (average >= 80) {
        grade = "A";
    } else if (average >= 70) {
        grade = "B";
    } else if (average >= 60) {
        grade = "C";
    } else if (average >= 50) {
        grade = "D";
    } else {
        grade = "F";
    }

    // Displaying results
    alert("Result:\n" +
        "----------\n\n" +
        `Total Marks: ${total}\n` +
        `Average Marks: ${average.toFixed(2)}\n` +
        `Grade: ${grade}`
    );
}