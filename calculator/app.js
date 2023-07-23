const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const allClearButton = document.querySelector('[data-all-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalsButton = document.querySelector('[data-equals]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')

class Calculator {
    constructor(currentOperandTextElement, previousOperandTextElement) {
        this.currentOperandTextElement = currentOperandTextElement
        this.previousOperandTextElement = previousOperandTextElement
        this.clear()
    }

    clear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
        this.isCalcComplete = false
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand === '') this.currentOperand = '0.'
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand != '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    compute() {
        const current = parseFloat(this.currentOperand)
        const prev = parseFloat(this.previousOperand)
        let computation

        if (isNaN(current) || isNaN(prev)) return

        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }

        this.currentOperand = computation
        this.previousOperand = ''
        this.operation = undefined
        this.isCalcComplete = true
    }

    getNewCalculation() {
        if (this.isCalcComplete === true && this.previousOperand === '') {
            this.currentOperand = ''
            this.isCalcComplete = false
        }
    }

    getDisplayNumber(number) {
        const numberStr = number.toString()
        const integerDigits = parseFloat(numberStr.split('.')[0])
        const decimalDigits = numberStr.split('.')[1]
        let integerDisplay

        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else return integerDisplay
    }


    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }

    }
}

const calculator = new Calculator(currentOperandTextElement, previousOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.getNewCalculation()
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})