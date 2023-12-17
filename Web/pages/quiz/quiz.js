//  Purpose: The JavaScript file powers the interactive functionality, quiz logic,
//           and dynamic content management within the Woodland Conservation Quiz interface.
//  Author: Lipi Sharma & Charles Demond

// Wait for the DOM content to load before executing JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const adultBtn = document.getElementById("adultBtn");
  const kidBtn = document.getElementById("kidBtn");
  const easyBtn = document.getElementById("easyBtn");
  const hardBtn = document.getElementById("hardBtn");
  const adultSection = document.getElementById("adultSection");
  const kidSection = document.getElementById("kidSection");
  const quizSection = document.getElementById("quizSection");
  const resultSection = document.getElementById("resultSection");
  const playAgainBtn = document.getElementById("playAgainBtn");
  const questionDisplay = document.getElementById("question");
  const optionsDisplay = document.getElementById("options");

  // Global variables to manage the quiz
  let currentQuestion = 0;
  let score = 0;
  let currentQuestions = [];

  // Event listeners for buttons and quiz sections
  adultBtn.addEventListener("click", function () {
    document.getElementById("startSection").style.display = "none";
    adultSection.style.display = "block";
    kidSection.style.display = "none";
    quizSection.style.display = "none";
    resultSection.style.display = "none";
  });

  // Event listeners for buttons and quiz sections
  kidBtn.addEventListener("click", function () {
    document.getElementById("startSection").style.display = "none";
    kidSection.style.display = "block";
    adultSection.style.display = "none";
    quizSection.style.display = "none";
    resultSection.style.display = "none";
    currentQuestions = kidsQuestions.slice();
    startQuiz();
  });

  // Event listeners for buttons and quiz sections
  easyBtn.addEventListener("click", function () {
    showQuestions(easyAdultQuestions);
    startQuiz("easy");
    hideDifficultySection(); // Add this line to hide the difficulty section
  });

  // Event listeners for buttons and quiz sections
  hardBtn.addEventListener("click", function () {
    showQuestions(hardAdultQuestions);
    startQuiz("hard");
    hideDifficultySection(); // Add this line to hide the difficulty section
  });

  // Data for adult and kid questions
  // This contains all the adult easy questions
  const easyAdultQuestions = [
    // Question-1
    {
      question:
        "What is the main greenhouse gas responsible for climate change?",
      options: [
        "A. Methane",
        "B. Carbon Dioxide",
        "C. Nitrous Oxide",
        "D. Ozone",
      ],
      answer: "B. Carbon Dioxide",
    },
    // Question-2
    {
      question:
        "What is the term for the loss of a species from a specific habitat or the entire planet?",
      options: [
        "A. Extinction",
        "B. Biodiversity",
        "C. Evolution",
        "D. Adaptation",
      ],
      answer: "A. Extinction",
    },
    // Question-3
    {
      question:
        "Which of the following is a non-renewable energy source derived from the remains of ancient plants and animals?",
      options: [
        "A. Solar energy",
        "B. Nuclear energy",
        "C. Fossil fuels",
        "D. Wind energy",
      ],
      answer: "C. Fossil fuels",
    },
    // Question-4
    {
      question:
        "What is the term for the process of converting waste materials into reusable materials?",
      options: [
        "A. Landfilling",
        "B. Incineration",
        "C. Recycling",
        "D. Composting",
      ],
      answer: "C. Recycling",
    },
    // Question-5
    {
      question:
        "Which of the following is a key component of organic farming that enriches the soil?",
      options: [
        "A. Pesticides",
        "B. Herbicides",
        "C. Fertilisers",
        "D. Compost",
      ],
      answer: "D. Compost",
    },
    // Question-6
    {
      question:
        "What is the primary cause of coral bleaching in the world's oceans?",
      options: [
        "A. Overfishing",
        "B. Oil spills",
        "C. Global warming",
        "D. Plastic pollution",
      ],
      answer: "C. Global warming",
    },
    // Question-7
    {
      question:
        "What is the term for the process of restoring a degraded, damaged, or destroyed ecosystem to a functional and sustainable state?",
      options: [
        "A. Preservation",
        "B. Rehabilitation",
        "C. Conservation",
        "D. Restoration",
      ],
      answer: "D. Restoration",
    },
    // Question-8
    {
      question:
        "Which environmental concept advocates for reducing, reusing, and recycling to minimize waste generation?",
      options: [
        "A. Zero waste",
        "B. Circular economy",
        "C. Sustainable consumption",
        "D. Waste management",
      ],
      answer: "A. Zero waste",
    },
    // Question-9
    {
      question:
        "Which of the following is a renewable energy source that harnesses the power of flowing water?",
      options: [
        "A. Solar energy",
        "B. Wind energy",
        "C. Hydropower",
        "D. Geothermal energy",
      ],
      answer: "C. Hydropower",
    },
    // Question-10
    {
      question:
        "What is the main environmental concern associated with the use of nuclear power?",
      options: [
        "A. Greenhouse gas emissions",
        "B. Radioactive waste",
        "C. Habitat destruction",
        "D. Air pollution",
      ],
      answer: "B. Radioactive waste",
    },
  ];

  // This contains all the hard adult questions.
  const hardAdultQuestions = [
    // Question-1
    {
      question:
        "Which gas, released during agricultural practices, contributes to both air pollution and climate change?",
      options: [
        "A. Methane",
        "B. Carbon Monoxide",
        "C. Sulfur Dioxide",
        "D. Nitrogen Oxide",
      ],
      answer: "A. Methane",
    },
    // Question-2
    {
      question:
        "What is the term for the gradual increase in the acidity of the Earth's oceans due to absorption of excess carbon dioxide?",
      options: [
        "A. Acid rain",
        "B. Ocean warming",
        "C. Coral bleaching",
        "D. Ocean acidification",
      ],
      answer: "D. Ocean acidification",
    },
    // Question-3
    {
      question: "What is the primary cause of soil erosion and degradation?",
      options: [
        "A. Overgrazing",
        "B. Deforestation",
        "C. Agricultural practices",
        "D. Urbanisation",
      ],
      answer: "C. Agricultural practices",
    },
    // Question-4
    {
      question:
        "What is the term for the intentional killing of a species to protect other species or ecosystems?",
      options: [
        "A. Poaching",
        "B. Conservation hunting",
        "C. Culling",
        "D. Preservation",
      ],
      answer: "C. Culling",
    },
    // Question-5
    {
      question: "Which of the following is a consequence of deforestation?",
      options: [
        "A. Increased biodiversity",
        "B. Soil erosion",
        "C. Enhanced carbon sequestration",
        "D. Improved air quality",
      ],
      answer: "B. Soil erosion",
    },
    // Question-6
    {
      question:
        "What is the term for the practice of using natural resources at a rate that does not deplete or degrade them?",
      options: [
        "A. Resource extraction",
        "B. Sustainable resource use",
        "C. Exploitative utilisation",
        "D. Resource depletion",
      ],
      answer: "B. Sustainable resource use",
    },
    // Question-7
    {
      question:
        "What is the main environmental impact of using single-use plastics?",
      options: [
        "A. Air pollution",
        "B. Water pollution",
        "C. Soil pollution",
        "D. Noise pollution",
      ],
      answer: "B. Water pollution",
    },
    // Question-8
    {
      question:
        "Which type of waste poses the greatest environmental challenge in terms of disposal and management?",
      options: [
        "A. Hazardous waste",
        "B. E-waste (electronic waste)",
        "C. Biodegradable waste",
        "D. Plastic waste",
      ],
      answer: "A. Hazardous waste",
    },
    // Question-9
    {
      question:
        "What is the primary source of mercury pollution in aquatic ecosystems?",
      options: [
        "A. Industrial discharges",
        "B. Agricultural runoff",
        "C. Coal combustion",
        "D. Oil spills",
      ],
      answer: "C. Coal combustion",
    },
    // Question-10
    {
      question:
        "What is the primary purpose of wildlife corridors in conservation planning?",
      options: [
        "A. Protection from predators",
        "B. Migration routes",
        "C. Feeding grounds",
        "D. Breeding sites",
      ],
      answer: "B. Migration routes",
    },
  ];

  // This contains all the kids questions with there image options
  const kidsQuestions = [
    //Question-1
    {
      question: "What do we call the air we breathe?",
      options: [
        {
          imageSrc: "images/oxygen.jpeg ", //Image path
          altText: "Oxygen",
        },
        {
          imageSrc: "images/co2.jpeg", //Image path
          altText: "Carbon Dioxide",
        },
      ],
      answer: "Oxygen", // Correct answer among altText values
    },
    //Question-2
    {
      question:
        "What is the colour of the recycling bin for paper and cardboard?",
      options: [
        {
          imageSrc: "images/blue.jpeg ", //Image path
          altText: "Blue",
        },
        {
          imageSrc: "images/red.jpeg", //Image path
          altText: "Red",
        },
      ],
      answer: "Blue", // Correct answer among altText values
    },
    //Question-3
    {
      question:
        "Which animal is known for its black and white stripes and is found in Africa?",
      options: [
        {
          imageSrc: "images/tiger.jpeg ", //Image path
          altText: "Tiger",
        },
        {
          imageSrc: "images/zebra.jpeg", //Image path
          altText: "Zebra",
        },
      ],
      answer: "Zebra", // Correct answer among altText values
    },
    //Question-4
    {
      question:
        "What do we call the practice of planting trees to create new forests?",
      options: [
        {
          imageSrc: "images/plant.jpeg ", //Image path
          altText: "Reforestration",
        },
        {
          imageSrc: "images/desert.jpeg", //Image path
          altText: "Afforestation",
        },
      ],
      answer: "Reforestration", // Correct answer among altText values
    },
    //Question-5
    {
      question:
        "Which of the following is a type of pollution caused by loud sounds?",
      options: [
        {
          imageSrc: "images/pollution.jpeg ", //Image path
          altText: "Air Pollution",
        },
        {
          imageSrc: "images/girl.jpeg", //Image path
          altText: "Noise Pollution",
        },
      ],
      answer: "Noise Pollution", // Correct answer among altText values
    },
    //Question-6
    {
      question:
        "Which of the following is a habitat for fish and other aquatic organisms?",
      options: [
        {
          imageSrc: "images/ocean.jpg ", //Image path
          altText: "Ocean",
        },
        {
          imageSrc: "images/forest1.jpg", //Image path
          altText: "Forest",
        },
      ],
      answer: "Ocean", // Correct answer among altText values
    },
    //Question-7
    {
      question:
        "Which of the following is a human-made material that takes hundreds of years to decompose?",
      options: [
        {
          imageSrc: "images/paper.jpg ", //Image path
          altText: "Paper",
        },
        {
          imageSrc: "images/plastic.jpg", //Image path
          altText: "Plastic",
        },
      ],
      answer: "Plastic", // Correct answer among altText values
    },
    //Question-8
    {
      question:
        "Which animal is known for its ability to change its color to match its surroundings?",
      options: [
        {
          imageSrc: "images/chameleon.jpg ", //Image path
          altText: "Chameleon",
        },
        {
          imageSrc: "images/elephant.jpg", //Image path
          altText: "Elephant",
        },
      ],
      answer: "Chameleon", // Correct answer among altText values
    },
    //Question-9
    {
      question:
        "Which of the following is a renewable source of energy derived from the sun?",
      options: [
        {
          imageSrc: "images/geo.jpg ", //Image path
          altText: "Geothermal energy",
        },
        {
          imageSrc: "images/solar.jpg", //Image path
          altText: "Solar energy",
        },
      ],
      answer: "Solar energy", // Correct answer among altText values
    },
    //Question-10
    {
      question:
        "What is the substance that covers almost three-fourths of the Earth's surface and is essential for all life forms?",
      options: [
        {
          imageSrc: "images/soil.jpg ", //Image path
          altText: "Soil",
        },
        {
          imageSrc: "images/water.jpg", //Image path
          altText: "Water",
        },
      ],
      answer: "water", // Correct answer among altText values
    },
  ];

  // Function to show image options
  function showImageOptions(options) {
    optionsDisplay.innerHTML = "";
    options.forEach((option) => {
      const optionElement = document.createElement("img");
      optionElement.src = option.imageSrc;
      optionElement.alt = option.altText;
      optionElement.classList.add("option-image");

      // Set specific width and height attributes
      optionElement.width = 200; // Adjust the width as needed
      optionElement.height = 200; // Adjust the height as needed

      optionElement.addEventListener("click", () => {
        handleAnswer(option.altText); // Pass alt text as the selected answer
      });
      optionsDisplay.appendChild(optionElement);
    });
  }

  // Function to start the quiz.
  function startQuiz(difficulty) {
    if (difficulty === "easy") {
      currentQuestions = easyAdultQuestions.slice();
    } else if (difficulty === "hard") {
      currentQuestions = hardAdultQuestions.slice();
    }
    quizSection.style.display = "block";
    showNextQuestion();
  }

  // Function to show text options
  function showTextOptions(options) {
    optionsDisplay.innerHTML = "";
    options.forEach((optionText) => {
      const optionElement = document.createElement("div");
      optionElement.textContent = optionText;
      optionElement.classList.add("option-text"); // Add a class for styling

      optionElement.addEventListener("click", () => {
        handleAnswer(optionText);
      });
      optionsDisplay.appendChild(optionElement);
    });
  }

  // Function to show questions.
  function showQuestions(questions) {
    currentQuestions = questions.slice();
    quizSection.style.display = "block";
    showNextQuestion();
  }

  // Function to show text and image options
  function showOptions(options) {
    options.forEach((option) => {
      const optionContainer = document.createElement("div");

      if (typeof option === "string") {
        // Text option
        const textOption = document.createElement("div");
        textOption.textContent = option;
        textOption.classList.add("text-option");

        textOption.addEventListener("click", () => {
          handleAnswer(option);
        });

        optionContainer.appendChild(textOption);
      } else {
        // Image option
        const imageOption = document.createElement("img");
        imageOption.src = option.imageSrc;
        // Rest same as before

        optionContainer.appendChild(imageOption);
      }

      optionsDisplay.appendChild(optionContainer);
    });
  }

  // Function to show the next question
  function showNextQuestion() {
    if (currentQuestion < currentQuestions.length) {
      const question = currentQuestions[currentQuestion];
      if (question && question.question) {
        questionDisplay.textContent = question.question;
        optionsDisplay.innerHTML = "";

        if (question.options && question.options.length > 0) {
          if (question.options[0].imageSrc) {
            // For image-based options
            showImageOptions(question.options);
          } else {
            // For text-based options
            showTextOptions(question.options);
          }
        }
        currentQuestion++;
      }
    } else {
      showResult();
    }
  }

  // Function to find correct answer and add the score.
  function handleAnswer(selectedAnswer) {
    const question = currentQuestions[currentQuestion - 1];
    if (question && question.answer) {
      if (selectedAnswer === question.answer) {
        score++;
      }
      showNextQuestion();
    }
  }

  // Function to show the result at the end of the quiz.
  function showResult() {
    quizSection.style.display = "none";
    resultSection.style.display = "block";
    const result = document.getElementById("result");
    result.textContent = `You scored ${score} out of ${currentQuestions.length}`;

    playAgainBtn.addEventListener("click", function () {
      resetQuiz();
      document.getElementById("startSection").style.display = "block";
      resultSection.style.display = "none";
    });
  }

  // Function to start the quiz again.
  function resetQuiz() {
    score = 0;
    currentQuestion = 0;
    currentQuestions = [];
  }

  // Function to hide difficulty section
  function hideDifficultySection() {
    adultSection.style.display = "none";
  }
});
