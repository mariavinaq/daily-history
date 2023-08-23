// DATE AND FACT API
  // Retrieve today's date
  const today = new Date();

  // Set main date
  const options = { month: 'long', day: 'numeric' };
  const dateString = today.toLocaleDateString('en-US', options);
  const mainDate = document.querySelector('.main-date');
  mainDate.textContent = dateString;

  // Fetch fact
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dateStr = `${month}/${day}`;
  const dateFact = `https://history.muffinlabs.com/date/${dateStr}`;
  let timeoutId;
  function fetchFact() {
      clearTimeout(timeoutId);
      fetch(dateFact)
        .then(response => response.json())
        .then(data => {
          const fact = document.querySelector(".date-fact");
          const link = document.querySelector(".fact-link");
          const randomIndex = Math.floor(Math.random() * data.data.Events.length);
          const year = data.data.Events[randomIndex].year;
          const text = data.data.Events[randomIndex].text;
          link.href = data.data.Events[randomIndex].links[0].link;
          let i = 0;
          fact.textContent = `Today, in year ${year} . . . `;
          const addLetter = () => {
            fact.textContent += text.charAt(i);
            i++;
            if (i < text.length) {
              timeoutId = setTimeout(addLetter, 20);
            }
          };
          timeoutId = setTimeout(addLetter, 1000);
        })
        .catch(error => console.error(error));
  }
  fetchFact();

// RANDOM BUTTON
  const random = document.querySelector('.random-button');
  random.addEventListener('click', function() { 
    const fact = document.querySelector(".date-fact");
    fact.textContent = "";
    fetchFact();
  });

// TIP
  const tipButton = document.querySelector('.tip-button')
  const tipPopup = document.querySelector('.tip-popup')
  const popupClose = document.querySelector('.popup-close')

  // Show popup when button is clicked
  tipButton.addEventListener("click", function() {
      tipPopup.style.visibility = "visible";
  });

  // Hide popup when X is clicked
  popupClose.addEventListener('click', function() {
      tipPopup.style.visibility = "hidden";
  });

// LIGHTS ON OR OFF
  const storedPreference = localStorage.getItem('modePreference');
  const modeToggle = document.querySelector('.mode-toggle');
  const html = document.documentElement;

  // Toggle between dark and light mode
  modeToggle.addEventListener('click', function() {
    if (html.classList.contains('dark-mode')) {
      html.classList.remove('dark-mode');
      html.classList.add('light-mode');
      localStorage.setItem('modePreference', 'light');
    } else {
      html.classList.remove('light-mode');
      html.classList.add('dark-mode');
      localStorage.setItem('modePreference', 'dark');
    }
  });

  // Apply the stored mode preference
  if (storedPreference === 'dark') {
    html.classList.remove('light-mode');
    html.classList.add('dark-mode');
  } else {
    html.classList.remove('dark-mode');
    html.classList.add('light-mode');
  }