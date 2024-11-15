const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

let currentIntent = ''; 
let selectedCab = '';
let travelDate = '';
let bookingAmount = 0;

userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        const userMessage = userInput.value.trim();
        if (userMessage) {
            userInput.value = '';
            displayMessage('You: ' + userMessage);
            processMessage(userMessage);
        }
    }
});

function displayMessage(message) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);
}

function processMessage(message) {
    const lowerMessage = message.toLowerCase();
    
    switch (currentIntent) {
        case 'destination':
            displayMessage("Bot: Where would you like to board?");
            userInput.placeholder = "Type your boarding point...";
            currentIntent = 'boardingPoint';
            break;
        case 'boardingPoint':
            displayMessage("Bot: Which date would you like to go?");
            userInput.placeholder = "Type DD-MM-YYYY...";
            currentIntent = 'goingdate';
            break;
        case 'goingdate':
            if (/^\d{2}-\d{2}-\d{4}$/.test(message)) {
                travelDate = message;
                displayMessage("Bot: Thank you! Your travel date is " + message + ".");
                currentIntent = '';
                displayMessage("Bot: Please choose a cab option:");

                const cabSelect = document.createElement('select');

                const suvOptions = [
                    { value: 'Mahindra Thar Roxx', text: 'Mahindra Thar Roxx (₹1500/day)' },
                    { value: 'XUV 700', text: 'XUV 700 (₹1550/day)' },
                    { value: 'Scorpio N', text: 'Scorpio N (₹1300/day)' },
                    { value: 'Grand Vitara', text: 'Grand Vitara (₹1250/day)' },
                    { value: 'Hyundai Creta', text: 'Hyundai Creta (₹1200/day)' },
                    { value: 'Kia Seltos', text: 'Kia Seltos (₹1200/day)' }
                ];

                const sedanOptions = [
                    { value: 'Honda Amaze', text: 'Honda Amaze (₹1200/day)' },
                    { value: 'Hyundai Verna', text: 'Hyundai Verna (₹1250/day)' },
                    { value: 'Honda City', text: 'Honda City (₹1200/day)' }
                ];

                const primeSedanOptions = [
                    { value: 'Toyota Etios', text: 'Toyota Etios (₹1100/day)' },
                    { value: 'Maruti Swift Dezire', text: 'Maruti Swift Dezire (₹1000/day)' }
                ];

                const hatchbackOptions = [
                    { value: 'Tata Tiago', text: 'Tata Tiago (₹700/day)' },
                    { value: 'Maruti Suzuki Baleno', text: 'Maruti Suzuki Baleno (₹800/day)' },
                    { value: 'Wagon R', text: 'Wagon R (₹800/day)' },
                    { value: 'Tata Altroz', text: 'Tata Altroz (₹750/day)' },
                    { value: 'Toyota Glanza', text: 'Toyota Glanza (₹750/day)' },
                    { value: 'Celerio', text: 'Celerio (₹800/day)' },
                    { value: 'Alto', text: 'Alto (₹700/day)' }
                ];

                suvOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    cabSelect.appendChild(optionElement);
                });

                sedanOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    cabSelect.appendChild(optionElement);
                });

                primeSedanOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    cabSelect.appendChild(optionElement);
                });

                hatchbackOptions.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option.value;
                    optionElement.textContent = option.text;
                    cabSelect.appendChild(optionElement);
                });

                chatbox.appendChild(cabSelect);

                cabSelect.addEventListener('change', function() {
                    selectedCab = cabSelect.value;
                    bookingAmount = getCabPrice(selectedCab);
                    displayMessage(`Bot: You have selected the ${selectedCab} option.`);
                    displayMessage(`Bot: Your travel date is ${travelDate}.`);
                    displayMessage(`Bot: The price for ${selectedCab} is ₹${bookingAmount} per day.`);
                    displayMessage("Bot: Do you want to confirm this booking? (yes/no)");
                    currentIntent = 'confirmation';
                });
            } else {
                displayMessage("Bot: Please enter a valid date (DD-MM-YYYY).");
            }
            break;

        case 'confirmation':
            if (lowerMessage === 'yes') {
                displayMessage("Bot: Your booking is confirmed!");
                displayMessage(`Bot: You have booked a ${selectedCab} for ₹${bookingAmount} per day on ${travelDate}.`);
                displayMessage("Bot: Please make the payment using the QR code below.");
                generatePaymentQR();

                currentIntent = '';
            } else if (lowerMessage === 'no') {
                displayMessage("Bot: Booking canceled. You can start again.");
                currentIntent = ''; 
            } else {
                displayMessage("Bot: Please reply with 'yes' to confirm or 'no' to cancel.");
            }
            break;

        default:
            if (lowerMessage === 'book a cab') {
                displayMessage("Bot: Where would you like to go?");
                userInput.placeholder = "Type your destination point...";
                currentIntent = 'destination';
            } else {
                displayMessage("Bot: I'm here to help! Type 'book a cab' to get started.");
            }
    }
}

function getCabPrice(cabType) {
    const prices = {
        'Mahindra Thar Roxx': 1500,
        'XUV 700': 1550,
        'Scorpio N': 1300,
        'Grand Vitara': 1250,
        'Hyundai Creta': 1200,
        'Kia Seltos': 1200,
        'Honda Amaze': 1200,
        'Hyundai Verna': 1250,
        'Honda City': 1200,
        'Toyota Etios': 1100,
        'Maruti Swift Dezire': 1000,
        'Tata Tiago': 700,
        'Maruti Suzuki Baleno': 800,
        'Wagon R': 800,
        'Tata Altroz': 750,
        'Toyota Glanza': 750,
        'Celerio': 800,
        'Alto': 700
    };
    return prices[cabType] || 0;
}

function generatePaymentQR() {
    const qrContainer = document.createElement('div');
    qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?data=https://paymentgateway.com/pay&size=150x150" alt="QR Code for Payment" />`;
    chatbox.appendChild(qrContainer);
}
