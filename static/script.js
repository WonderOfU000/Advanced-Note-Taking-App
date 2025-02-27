document.getElementById("addNoteBtn").addEventListener("click", function () {
  const noteInput = document.getElementById("noteInput").value;
  if (noteInput) {
    fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ note: noteInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        updateNotesList(data.notes);
        document.getElementById("noteInput").value = "";
        $("#noteModal").modal("hide"); // Hide the modal
        showNotification("Note added successfully!");
      })
      .catch((error) => console.error("Error:", error));
  }
});

function updateNotesList(notes) {
  const notesList = document.getElementById("notesList");
  notesList.innerHTML = "";
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.className = "list-group-item animate__animated animate__fadeInUp";
    li.innerHTML = `<span>${note}</span>
                      <i class="fas fa-trash-alt deleteBtn"></i>`;
    const deleteBtn = li.querySelector(".deleteBtn");
    deleteBtn.addEventListener("click", function () {
      fetch("/api/notes", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ note: note }),
      })
        .then((response) => response.json())
        .then((data) => {
          updateNotesList(data.notes);
          showNotification("Note deleted successfully!");
        })
        .catch((error) => console.error("Error:", error));
    });
    notesList.appendChild(li);
  });
}

// Function to show notifications
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className =
    "alert alert-info animate__animated animate__fadeInDown";
  notification.innerText = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.classList.add("animate__fadeOutUp");
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 1000);
  }, 3000);
}

// Fix focus issue by adding focus to the first input field inside the modal
$("#noteModal").on("shown.bs.modal", function () {
  $("#noteInput").trigger("focus");
});
