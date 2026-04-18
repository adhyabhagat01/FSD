const container = document.getElementById("project-container");

if (container) {
    fetch("/api/projects")
    .then(res => res.json())
    .then(data => {
        container.innerHTML = "";

        data.forEach((project, index) => {
            container.innerHTML += `
            <div class="col-md-4 mb-4">
                <div class="card project-card card-${(index % 6) + 1} p-3">
                    <h5>${project.title}</h5>
                    <p>${project.description}</p>
                </div>
            </div>
            `;
        });
    });
}