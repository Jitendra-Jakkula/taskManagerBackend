Admin routes
Action	Route Path	Meaning
Create task	POST /api/projects/:projectId/tasks	Create a task in a project
View tasks	GET /api/projects/:projectId/tasks	Get all tasks of a project
Update task	PUT /api/projects/:projectId/tasks/:taskId	Update any task field
Delete task	DELETE /api/projects/:projectId/tasks/:taskId	Remove task from project
Assign / Reassign task	PATCH /api/projects/:projectId/tasks/:taskId/assign	Assign task to a user