  const fileInput = document.getElementById("image-upload");
  const preview = document.getElementById("image-preview");
  const previewContainer = document.getElementById("image-preview-container");
  const status = document.getElementById("upload-status");
  const result = document.getElementById("result");
              const themeToggleButton = document.getElementById('theme-toggle');
            const themeIcon = themeToggleButton.querySelector('svg');

            // Function to update the theme icon
            function updateThemeIcon(isDarkMode) {
                if (isDarkMode) {
                    // Moon icon for dark mode
                    themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />`;
                } else {
                    // Sun icon for light mode
                    themeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h1M4 12H3m15.325 5.924l-.707.707M6.364 6.364l-.707-.707m12.728 0l-.707-.707M6.364 17.636l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />`;
                }
            }

            // --- Theme Toggle Logic ---
            themeToggleButton.addEventListener('click', () => {
                const isDarkMode = document.body.classList.toggle('dark-mode'); // Toggles dark-mode class
                localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
                updateThemeIcon(isDarkMode); // Update icon based on new theme
            });

            // Apply saved theme on load and update icon
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
                updateThemeIcon(true);
            } else {
                updateThemeIcon(false); // Ensure sun icon is set for light mode by default
            }

  const suggestions = {
    happy: [
      "😊 You're doing great! Spread that smile today.",
      "Have a fun day! Here's some music to match your vibe.",
      "Enjoy the little things — they're big in disguise.",
      "Let that smile shine bright!",
      "You're a burst of energy. Celebrate that!"
    ],
    sad: [
      "💙 It's okay to feel down. You're not alone.",
      "Try a cozy corner, music, and deep breaths.",
      "You're stronger than you feel right now.",
      "Let emotions flow, then let them go.",
      "Be kind to yourself — this will pass too."
    ],
    angry: [
      "😤 Take a deep breath — you're in control.",
      "Channel your energy into something productive.",
      "Step outside for a break or walk it off.",
      "Let music mellow the mood.",
      "You've got this — just cool down gently."
    ],
    fearful: [
      "😨 You're safe. Try grounding yourself.",
      "This fear will pass — you’ve made it this far.",
      "Play calming music and relax your body.",
      "Everything is okay — breathe slowly.",
      "Give yourself space and stillness."
    ],
    disgust: [
      "😖 Shake it off with something fun or silly.",
      "A short walk or favorite snack can reset your day.",
      "Try writing it out — vent and let go.",
      "Call a friend and laugh it off.",
      "This too shall pass!"
    ],
    neutral: [
      "😐 It’s a calm day. Maybe explore something new?",
      "Try learning a quick new skill or watch a short video.",
      "Even a normal day can become great!",
      "Enjoy the peace in neutrality.",
      "Balance is beautiful."
    ],
    surprise: [
      "😲 Lean into the unexpected!",
      "Let today’s surprise be a story for tomorrow.",
      "Go with the flow — you’re flexible.",
      "Not all surprises are bad — smile!",
      "Take it in — reflect later."
    ]
  };

  const moodSongs = {
    happy: ["x4qTbH8z-GI?si=mf5fQ1MUhToxseW0", "MvW8E1nwrE4?si=HQTSBzxHy_2WBqV9", "NyBrTymEajA?si=mO8Xg4H0GWya4W2E", "b-uQtN5lbGA?si=qcuPMIpxNSu7u6NB", "toTRkovRzvo?si=MsUwA9HJ_qLJTDLq"],
    sad: ["gPs2PopJFlc?si=WeOOEsFYVMnzaeMh", "vSIE_Pi1ejs?si=I1BEJvHv5pONzLkZ", "mJPEf7vWb6Q?si=GoEwEpUL_L0epNTy", "RcMQuy1ObeY?si=134_taHGr1b6VvTr", "GhXU_FTKNbE?si=8EoKi-Mqn9lGSxPo"],
    angry: ["Bg8Yb9zGYyA?si=dI_bYpd_4V1xJic2","wZbI5RqMMDg?si=b8PM1J-WgfrCz8Hx","XD1cW3z5epg?si=C7cOpammSNYyQ7yS","zZl7vDDN8Ek?si=4H2kCWT7tGSzsIpj","TBX-PJyifts?si=2Blyoonq4EM_n1zV"],
    fearful: ["PKzA-BRCTQ0?si=OHaw12xWdWdileFB", "_PtH3QraTz0?si=ErDNwj_0y0sf9wCw", "yEBee5d_S8U?si=gXzRc45OGuoyxeUa", "4zQN-Hw0JuQ?si=MOGZl2Ud5IVX1hUK", "i_cKDAFG0Mo?si=ZL8LZyEmqEYt1qzN"],
    disgust: ["iDnGD_diZVM?si=bXMPldKoVtlQnfyt", "2a34XyiZO14?si=PdUfJWnINUkGvf5J", "ipiF7b0Rg2o?si=1NYqLGX790yTSm8g", "47RtCabjFK0?si=Y3oX_ejuV1VfVzjf", "47RtCabjFK0?si=Y3oX_ejuV1VfVzjf"],
    neutral: ["_xuI60USDjw?si=2f980RIpGYkajomr", "OUpz-uETnvQ?si=RlvY55n6BTN6wzwH", "8LXvQBACCCE?si=EQ3y8qTKLBLtLZUH", "G7Fxzz-NH_s?si=bymKqEerhC0VrSQe", "4dbiE-da82E?si=Bng5UqoyB3qz_xOr"],
    surprise: ["Th4uWCY-tQU?si=Ui8eLrAn7Ovgsh6R", "MuJXBJBTVkI?si=Qb2r4ousmIMgyRrC", "g0RPoEt9xdU?si=jr2E634NbXII6ci0", "Er8D49RPLCs?si=42ouM1_L9eTw4suU", "f-KyCvE8AS0?si=ca8-t23tnNY-PIjC"]
  };

  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      preview.src = URL.createObjectURL(file);
      previewContainer.classList.remove("hidden");
      status.textContent = `Selected: ${file.name}`;
    } else {
      previewContainer.classList.add("hidden");
      preview.src = "";
      status.textContent = "No file selected.";
    }
  });

  document.getElementById("analyze-button").addEventListener("click", async (event) => {
    event.preventDefault();

    const file = fileInput.files[0];
    if (!file) {
      status.textContent = "Please select an image first.";
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    result.textContent = "Analyzing mood...";
    document.getElementById("suggestion").textContent = "";
    document.getElementById("player").innerHTML = "";

    try {
        const response = await fetch("http://127.0.0.1:5000/predict", {

        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.mood) {
        const mood = data.mood.toLowerCase();
        result.textContent = `Detected Mood: ${data.mood}`;

        const suggestionList = suggestions[mood] || ["Take care of yourself 💛"];
        const songList = moodSongs[mood] || [];

        const randomSuggestion = suggestionList[Math.floor(Math.random() * suggestionList.length)];
        const randomSongId = songList[Math.floor(Math.random() * songList.length)];

        document.getElementById("suggestion").textContent = randomSuggestion;

        if (randomSongId) {
          const embedHTML = `
            <iframe width="320" height="180" src="https://www.youtube.com/embed/${randomSongId}" 
              frameborder="0" allowfullscreen class="mx-auto rounded-lg shadow mt-4"></iframe>`;
          document.getElementById("player").innerHTML = embedHTML;
        }
      } else {
        result.textContent = "Mood detection failed. Human Not Recognised";
      }
    } catch (err) {
      console.error(err);
      result.textContent = "Error connecting to server.";
    }
  });