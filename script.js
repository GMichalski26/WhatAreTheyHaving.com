document.addEventListener('DOMContentLoaded', function() {
    fetch('/meal')
        .then(response => response.json())
        .then(data => {
            const mealContainer = document.getElementById('meal-details');
            const mealTime = document.getElementById('meal-time');
            mealTime.textContent = `Today's ${data.type.toUpperCase()}`;
            mealContainer.innerHTML = `
                <p><strong>Entree:</strong> ${data.entree}</p>
                <p><strong>Sides:</strong> ${data.sides.join(', ')}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching meal data:', error);
        });
});