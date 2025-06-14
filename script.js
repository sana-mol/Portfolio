document.addEventListener("DOMContentLoaded", function () {
    const input = document.querySelector("#calculator input");
    const buttons = document.querySelectorAll("#calculator button");

    let currentInput = "";
    let resultJustShown = false;

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const value = this.textContent;

            // if result shown and user clicked for next value
            if (resultJustShown && (/\d/.test(value) || value === ".")) {
                currentInput = "";
                resultJustShown = false;
            }

            if (value === "=") {
                try {
                    currentInput = eval(currentInput).toString();
                } catch (e) {
                    currentInput = "Error";
                }
                resultJustShown = true;
            } else if (value === "C") {
                currentInput = "";
                resultJustShown = false;
            } else if (value === "x²") {
                if (currentInput !== "") {
                    try {
                        let num = eval(currentInput);
                        currentInput = (num * num).toString();
                    } catch (e) {
                        currentInput = "Error";
                    }
                    resultJustShown = true;
                }
            } else if (value === "x³") {
                if (currentInput !== "") {
                    try {
                        let num = eval(currentInput);
                        currentInput = (num * num * num).toString();
                    } catch (e) {
                        currentInput = "Error";
                    }
                    resultJustShown = true;
                }
            } else if (["+", "-", "*", "/"].includes(value)) {
                // If result was just shown and operator is pressed, continue calculation with result
                if (resultJustShown) resultJustShown = false;
                // Prevent multiple operators in a row
                const operators = ["+", "-", "*", "/"];
                const lastChar = currentInput.slice(-1);
                if (operators.includes(lastChar)) {
                    currentInput = currentInput.slice(0, -1) + value;
                } else {
                    currentInput += value;
                }
            } else if (/\d/.test(value) || value === ".") {
                currentInput += value;
            }

            input.value = currentInput || "0";
        });
    });
});