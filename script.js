const form = document.getElementById('task-form');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const courseId = document.getElementById('course-id').value;
  const taskName = document.getElementById('task-name').value;
  const dueDate = document.getElementById('due-date').value;
  const details = document.getElementById('details').value;

  const taskData = {
    courseId,
    name: taskName,
    dueDate,
    details,
  };

  try {
    const response = await fetch(`/courses/${courseId}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();

    if (data.success) {
      alert('Task added successfully!');
      form.reset(); // Clear the form after successful submission
    } else {
      alert('Error adding task: ' + data.message);
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred. Please try again later.');
  }
});
