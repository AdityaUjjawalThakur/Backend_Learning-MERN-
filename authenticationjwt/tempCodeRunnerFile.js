
fetch("http://localhost:3000/dashboard", {
    method: "GET",
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzM4ODU1NjQ2LCJleHAiOjE3Mzg4NTkyNDZ9.jUoUnG8rXDG_HjjvH3Li14B--hH5JCE4ZbVdlAm7LeY"
    }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error("Error:", error));
