// Визначаємо масив для збереження заміток
let notesData = [
  {
    id: 1,
    timeOfCreation: "2023-08-01T10:00:00",
    noteContent: "Маю зубний прийом",
    noteCategory: "Task",
    datesMentioned: ["3/5/2021", "5/5/2021"],
    archived: false,
  },
  {
    id: 2,
    timeOfCreation: "2023-08-01T11:00:00",
    noteContent: "Гра у футбол",
    noteCategory: "Task",
    datesMentioned: ["4/5/2021", "6/5/2021"],
    archived: false,
  },
  {
    id: 3,
    timeOfCreation: "2023-08-01T12:00:00",
    noteContent: "Стажування",
    noteCategory: "Task",
    datesMentioned: ["5/5/2021", "7/5/2021"],
    archived: false,
  },
  {
    id: 4,
    timeOfCreation: "2023-08-01T13:00:00",
    noteContent: "Поїздка в гори",
    noteCategory: "Task",
    datesMentioned: ["6/5/2021", "8/5/2021"],
    archived: false,
  },
  {
    id: 5,
    timeOfCreation: "2023-08-01T14:00:00",
    noteContent: "Провідати батьків",
    noteCategory: "Task",
    datesMentioned: ["7/5/2021", "8/5/2021"],
    archived: false,
  },
  {
    id: 6,
    timeOfCreation: "2023-08-01T15:00:00",
    noteContent: "Влаштуватись на роботу в RADENCY",
    noteCategory: "Task",
    datesMentioned: ["8/5/2021", "10/5/2021"],
    archived: false,
  },
  {
    id: 7,
    timeOfCreation: "2023-08-02T14:00:00",
    noteContent: "Добитись успіху",
    noteCategory: "Idea",
    datesMentioned: ["9/5/2021", "11/5/2021"],
    archived: false,
  },
];

// Допоміжна функція для генерації унікальних ідентифікаторів заміток
function generateNoteId() {
  return Date.now();
}

// Допоміжна функція для форматування дати у форматі "DD/MM/YYYY"
function formatDate(date) {
  const formattedDate = new Date(date);
  const day = String(formattedDate.getDate()).padStart(2, "0");
  const month = String(formattedDate.getMonth() + 1).padStart(2, "0");
  const year = formattedDate.getFullYear();
  return `${day}/${month}/${year}`;
}

// Функція для відображення одного рядка замітки
function renderNoteRow(note) {
  const row = document.createElement("tr");
  row.innerHTML = `
      <td>${formatDate(note.timeOfCreation)}</td>
      <td>${note.noteContent}</td>
      <td>${note.noteCategory}</td>
      <td>${note.datesMentioned.join(", ")}</td>
      <td>
        <button class="edit-button" data-id="${note.id}">Редагувати</button>
        ${
          note.archived
            ? `<button class="unarchive-button" data-id="${note.id}">Розархівувати</button>`
            : `<button class="archive-button" data-id="${note.id}">Архівувати</button>`
        }
        <button class="delete-button" data-id="${note.id}">Видалити</button>
      </td>
    `;
  return row;
}

// Функція для відображення таблиці активних заміток
function renderActiveNotesTable() {
  const activeNotesTableBody = document.getElementById("active-notes-body");
  activeNotesTableBody.innerHTML = "";
  const activeNotes = notesData.filter((note) => !note.archived);
  activeNotes.forEach((note) => {
    const row = renderNoteRow(note);
    activeNotesTableBody.appendChild(row);
  });
  addEditEventListeners(); // Додамо обробники подій для кнопок "Редагувати"
  addArchiveEventListeners(); // Додамо обробники подій для кнопок "Архівувати"
  addDeleteEventListeners(); // Додамо обробники подій для кнопок "Видалити"
}

// Функція для відображення таблиці архівованих заміток
function renderArchivedNotesTable() {
  const archivedNotesTableBody = document.getElementById("archived-notes-body");
  archivedNotesTableBody.innerHTML = "";
  const archivedNotes = notesData.filter((note) => note.archived);
  archivedNotes.forEach((note) => {
    const row = renderNoteRow(note);
    archivedNotesTableBody.appendChild(row);
  });
  addEditEventListeners(); // Додамо обробники подій для кнопок "Редагувати"
  addUnarchiveEventListeners(); // Додамо обробники подій для кнопок "Розархівувати"
  addDeleteEventListeners(); // Додамо обробники подій для кнопок "Видалити"
}

// Допоміжна функція для додавання обробників подій для кнопок "Редагувати"
function addEditEventListeners() {
  const editButtons = document.getElementsByClassName("edit-button");
  Array.from(editButtons).forEach((button) => {
    button.addEventListener("click", () => {
      const noteId = parseInt(button.getAttribute("data-id"));
      const note = notesData.find((note) => note.id === noteId);
      if (note) {
        const noteContent = prompt(
          "Редагуйте зміст замітки:",
          note.noteContent
        );
        if (noteContent) {
          const noteCategory = prompt(
            "Редагуйте категорію замітки (Task, Random Thought, Idea):",
            note.noteCategory
          );
          if (
            noteCategory &&
            ["Task", "Random Thought", "Idea"].includes(noteCategory)
          ) {
            const datesMentionedStr = prompt(
              "Редагуйте дати, згадані у замітці (розділені комами):",
              note.datesMentioned.join(", ")
            );
            const datesMentioned = datesMentionedStr
              .split(",")
              .map((date) => date.trim());
            editNote(noteId, noteContent, noteCategory, datesMentioned);
          } else {
            alert(
              "Неправильна категорія замітки. Використовуйте одну з наступних: Task, Random Thought, Idea."
            );
          }
        }
      }
    });
  });
}

// Допоміжна функція для додавання обробників подій для кнопок "Архівувати"
function addArchiveEventListeners() {
  const archiveButtons = document.getElementsByClassName("archive-button");
  Array.from(archiveButtons).forEach((button) => {
    button.addEventListener("click", () => {
      const noteId = parseInt(button.getAttribute("data-id"));
      toggleNoteArchive(noteId);
    });
  });
}

// Допоміжна функція для додавання обробників подій для кнопок "Розархівувати"
function addUnarchiveEventListeners() {
  const unarchiveButtons = document.getElementsByClassName("unarchive-button");
  Array.from(unarchiveButtons).forEach((button) => {
    button.addEventListener("click", () => {
      const noteId = parseInt(button.getAttribute("data-id"));
      toggleNoteArchive(noteId);
    });
  });
}

// Допоміжна функція для додавання обробників подій для кнопок "Видалити"
function addDeleteEventListeners() {
  const deleteButtons = document.getElementsByClassName("delete-button");
  Array.from(deleteButtons).forEach((button) => {
    button.addEventListener("click", () => {
      const noteId = parseInt(button.getAttribute("data-id"));
      deleteNote(noteId);
    });
  });
}

// Функція для додавання замітки
function addNote(noteContent, noteCategory, datesMentioned) {
  const newNote = {
    id: generateNoteId(),
    timeOfCreation: new Date().toISOString(),
    noteContent: noteContent,
    noteCategory: noteCategory,
    datesMentioned: datesMentioned,
    archived: false,
  };
  notesData.push(newNote);
  renderActiveNotesTable();
  renderSummaryTable();
}

// Функція для редагування замітки
function editNote(noteId, noteContent, noteCategory, datesMentioned) {
  const noteIndex = notesData.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    notesData[noteIndex].noteContent = noteContent;
    notesData[noteIndex].noteCategory = noteCategory;
    notesData[noteIndex].datesMentioned = datesMentioned;
    renderActiveNotesTable();
    renderArchivedNotesTable();
    renderSummaryTable();
  }
}

// Функція для перемикання статусу архівації замітки
function toggleNoteArchive(noteId) {
  const noteIndex = notesData.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    notesData[noteIndex].archived = !notesData[noteIndex].archived;
    renderActiveNotesTable();
    renderArchivedNotesTable();
    renderSummaryTable();
  }
}

// Функція для видалення замітки
function deleteNote(noteId) {
  const noteIndex = notesData.findIndex((note) => note.id === noteId);
  if (noteIndex !== -1) {
    notesData.splice(noteIndex, 1);
    renderActiveNotesTable();
    renderArchivedNotesTable();
    renderSummaryTable();
  }
}

// Функція для відображення загальної інформації про замітки
function renderSummaryTable() {
  const summaryTableBody = document.getElementById("summary-body");
  summaryTableBody.innerHTML = "";
  const categories = ["Task", "Random Thought", "Idea"];

  categories.forEach((category) => {
    const activeCount = notesData.filter(
      (note) => note.noteCategory === category && !note.archived
    ).length;
    const archivedCount = notesData.filter(
      (note) => note.noteCategory === category && note.archived
    ).length;

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${category}</td>
        <td>${activeCount}</td>
        <td>${archivedCount}</td>
      `;

    summaryTableBody.appendChild(row);
  });
}

// Додамо обробники подій для кнопки "Додати замітку"
document.getElementById("add-button").addEventListener("click", () => {
  const noteContent = prompt("Введіть зміст замітки:");
  if (noteContent) {
    const noteCategory = prompt(
      "Введіть категорію замітки (Task, Random Thought, Idea):"
    );
    if (
      noteCategory &&
      ["Task", "Random Thought", "Idea"].includes(noteCategory)
    ) {
      const datesMentionedStr = prompt(
        "Введіть дати, згадані у замітці (розділені комами):"
      );
      const datesMentioned = datesMentionedStr
        .split(",")
        .map((date) => date.trim());
      addNote(noteContent, noteCategory, datesMentioned);
    } else {
      alert(
        "Неправильна категорія замітки. Використовуйте одну з наступних: Task, Random Thought, Idea."
      );
    }
  }
});

// Відображення початкових даних
renderActiveNotesTable();
renderArchivedNotesTable();
renderSummaryTable();
