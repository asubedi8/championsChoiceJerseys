// Author: Abhi Subedi

"use strict";

document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const images = document.querySelectorAll('.slideshow-image');
    const playerDisplay = document.getElementById('player-display');
    const playerControls = document.getElementById('player-controls');
    const guessForm = document.getElementById('guess-form');
    const gameResult = document.getElementById('game-result');
    const contactForm = document.getElementById('contact-form');
    const formResult = document.getElementById('form-result');
    let currentImageIndex = 0;

    // Set initial mode based on class and update the toggle button text
    if (body.classList.contains('light-mode')) {
        modeToggle.textContent = '☀️'; // Light mode
    } else {
        modeToggle.textContent = '🌙'; // Dark mode
    }

    // Event listener for toggling light/dark mode
    modeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        if (body.classList.contains('light-mode')) {
            modeToggle.textContent = '☀️'; // Update button text to sun for light mode
        } else {
            modeToggle.textContent = '🌙'; // Update button text to moon for dark mode
        }
    });

    // Function to show the next image in the slideshow
    function showNextImage() {
        images[currentImageIndex].classList.remove('active'); // Remove active class from current image
        currentImageIndex = (currentImageIndex + 1) % images.length; // Update index
        images[currentImageIndex].classList.add('active'); // Add active class to next image
    }

    // Start the homepage slideshow by showing the first image
    images[currentImageIndex].classList.add('active');
    setInterval(showNextImage, 2000); // Change image every 2 seconds

    // Players data
    const players = [
        { name: "Lionel Messi Jersey", description: "Lionel Messi is an Argentinian forward who has won 8 Ballon d'Or awards. Known for his incredible dribbling skills, vision, and goal-scoring ability, Messi has spent the majority of his career at FC Barcelona before moving to Paris Saint-Germain. He is widely regarded as one of the greatest football players of all time.", image: "playerImages/messi.jpg" },
        { name: "Cristiano Ronaldo Jersey", description: "Cristiano Ronaldo, a Portuguese forward, has won 5 Ballon d'Or awards. Renowned for his athleticism, powerful shooting, and aerial ability, Ronaldo has played for several top clubs including Manchester United, Real Madrid, and Juventus. He is one of the top goal scorers in football history and continues to perform at the highest level.", image: "playerImages/ronaldo.jpg" },
        { name: "Neymar Jr Jersey", description: "Neymar Jr is a Brazilian forward known for his exceptional dribbling skills, creativity, and flair on the pitch. Neymar has played for top clubs like FC Barcelona and Paris Saint-Germain. His technical ability and agility make him a constant threat to defenses and a key player for both club and country.", image: "playerImages/neymar.jpg" },
        { name: "Kylian Mbappe Jersey", description: "Kylian Mbappe is a French forward and World Cup winner. Known for his explosive speed, clinical finishing, and composure, Mbappe has become one of the most exciting young talents in football. He currently plays for Paris Saint-Germain and has been a crucial player for both his club and the French national team.", image: "playerImages/mbappe.jpg" },
        { name: "Mohamed Salah Jersey", description: "Mohamed Salah, an Egyptian forward, is a Premier League star known for his pace, dribbling, and goal-scoring prowess. Playing for Liverpool FC, Salah has won multiple Premier League Golden Boots and has been instrumental in the club's domestic and international successes. He is considered one of the best wingers in the world.", image: "playerImages/salah.jpg" },
        { name: "Robert Lewandowski Jersey", description: "Robert Lewandowski is a Polish forward known for his prolific goal-scoring ability. Playing for Bayern Munich, Lewandowski has won numerous Bundesliga titles and has been a consistent top scorer in Europe. His positioning, finishing, and physical presence make him one of the most feared strikers in football.", image: "playerImages/lewandowski.jpg" }
    ];

    // Function to load a player's data into the display area
    function loadPlayer(index) {
        const player = players[index];
        playerDisplay.innerHTML = `
            <div class="player-container">
                <img class="player-image" src="${player.image}" alt="${player.name}">
                <div class="player-description">
                    <h3>${player.name}</h3>
                    <p>${player.description}</p>
                </div>
            </div>
        `;
    }

    // Generate player buttons and add event listeners for each player
    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.textContent = player.name;
        button.addEventListener('click', () => loadPlayer(index)); // Load the selected player's data on click
        playerControls.appendChild(button); // Add the button to the player controls
    });

    // Load the first player by default
    loadPlayer(0);

    // Event listener for the guessing game form submission
    guessForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const userGuess = parseInt(document.getElementById('guess').value, 10);
        const randomNumber = Math.floor(Math.random() * 10) + 1; // Generate a random number between 1 and 10
        if (userGuess === randomNumber) {
            gameResult.textContent = `You guessed ${userGuess}. The correct number was ${randomNumber}. You win!`;
        } else {
            gameResult.textContent = `You guessed ${userGuess}. The correct number was ${randomNumber}. Try again!`;
        }
    });

    // Event listener for the contact form submission with validation
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const comments = document.getElementById('comments').value;
        const contactPreference = document.querySelector('input[name="contact-preference"]:checked').value;

        let valid = true;

        // Validate required fields
        if (!name) {
            valid = false;
            alert("Name is required");
        }

        if (contactPreference === "phone" && !phone) {
            valid = false;
            alert("Phone number is required");
        }

        if (contactPreference === "email" && !email) {
            valid = false;
            alert("Email is required");
        }

        if (!comments) {
            valid = false;
            alert("Comments are required");
        }

        // If all validations pass, show a success message
        if (valid) {
            const customer = {
                name,
                phone,
                email,
                comments,
                contactPreference
            };

            formResult.textContent = `Thank you for your submission, ${customer.name}. We will contact you via ${customer.contactPreference}.`;
            contactForm.reset(); // Reset the form after successful submission
        }
    });
});
