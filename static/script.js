// Fixed Student Management Script - All Functions Working
let students = [];
let editId = null;
let isDark = localStorage.getItem('theme') === 'dark';

document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
    loadStudents();
    setupEventListeners();
    animateElements();
});

function applyTheme() {
    document.body.dataset.theme = isDark ? 'dark' : 'light';
    document.getElementById('themeBtn').textContent = isDark ? '☀️' : '🌙';
}

function setupEventListeners() {
    document.getElementById('themeBtn').addEventListener('click', toggleTheme);
    document.getElementById('studentForm').addEventListener('submit', addStudent);
    document.getElementById('editForm').addEventListener('submit', updateStudent);
    document.getElementById('cancelEdit').addEventListener('click', closeModal);
    document.getElementById('searchInput').addEventListener('input', filterStudents);
    document.querySelector('.close').addEventListener('click', closeModal);
    document.getElementById('editModal').addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) closeModal();
    });
}

function toggleTheme() {
    isDark = !isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    applyTheme();
}

async function loadStudents() {
    try {
        console.log('Loading students...');
        const response = await fetch('/get_students');
        if (!response.ok) throw new Error('Failed to fetch');
        students = await response.json();
        console.log('Students loaded:', students);
        displayStudents(students);
        document.getElementById('studentsCount').textContent = students.length;
        document.getElementById('noStudents').style.display = students.length === 0 ? 'block' : 'none';
    } catch (error) {
        console.error('Error loading students:', error);
        showNotification('Failed to load students: ' + error.message, 'error');
    }
}

function displayStudents(studentList) {
    const container = document.getElementById('studentsContainer');
    container.innerHTML = '';
    
    if (studentList.length === 0) {
        document.getElementById('noStudents').style.display = 'block';
        return;
    }
    
    document.getElementById('noStudents').style.display = 'none';
    
    studentList.forEach((student, index) => {
        const card = createStudentCard(student, index);
        container.appendChild(card);
        // Trigger animation
        setTimeout(() => {
            card.style.opacity = '1';
            card.classList.add('fade-in');
        }, index * 100);
    });
}

function createStudentCard(student, index) {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.style.opacity = '0';
    card.style.animationDelay = `${index * 0.1}s`;
    card.innerHTML = `
        <div class="student-info">
            <h3>${student.name}</h3>
            <p>📧 ${student.email}</p>
            <p>📚 Grade: ${student.grade}</p>
        </div>
        <div class="student-actions">
            <button class="btn-edit" onclick="editStudent(${student.id}, '${student.name.replace(/'/g, "\\'")}', '${student.email.replace(/'/g, "\\'")}', '${student.grade.replace(/'/g, "\\'")}')">Edit ✏️</button>
            <button class="btn-delete" onclick="deleteStudent(${student.id})">Delete 🗑️</button>
        </div>
    `;
    return card;
}

async function addStudent(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const grade = document.getElementById('grade').value.trim();
    
    if (!name || !email || !grade) {
        showNotification('Please fill all fields', 'error');
        return;
    }
    
    const formData = { name, email, grade };
    
    try {
        console.log('Adding student:', formData);
        const response = await fetch('/add_student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Add failed');
        document.getElementById('studentForm').reset();
        await loadStudents();
        showNotification('Student added successfully! 🎉', 'success');
    } catch (error) {
        console.error('Add error:', error);
        showNotification('Error adding student: ' + error.message, 'error');
    }
}

function editStudent(id, name, email, grade) {
    editId = id;
    document.getElementById('editName').value = name;
    document.getElementById('editEmail').value = email;
    document.getElementById('editGrade').value = grade;
    document.getElementById('editId').value = id;
    document.getElementById('editModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

async function updateStudent(e) {
    e.preventDefault();
    const name = document.getElementById('editName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const grade = document.getElementById('editGrade').value.trim();
    
    if (!name || !email || !grade) return;
    
    const formData = { name, email, grade };
    
    try {
        const response = await fetch(`/update_student/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        if (!response.ok) throw new Error('Update failed');
        closeModal();
        await loadStudents();
        showNotification('Student updated! ✅', 'success');
    } catch (error) {
        console.error('Update error:', error);
        showNotification('Error updating: ' + error.message, 'error');
    }
}

async function deleteStudent(id) {
    if (!confirm('Delete this student?')) return;
    
    try {
        const response = await fetch(`/delete_student/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Delete failed');
        await loadStudents();
        showNotification('Student deleted! 🗑️', 'success');
    } catch (error) {
        console.error('Delete error:', error);
        showNotification('Error deleting: ' + error.message, 'error');
    }
}

function closeModal() {
    document.getElementById('editModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function filterStudents() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = students.filter(s => 
        s.name.toLowerCase().includes(query) ||
        s.email.toLowerCase().includes(query) ||
        s.grade.toLowerCase().includes(query)
    );
    displayStudents(filtered);
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed; top: 100px; right: 20px; padding: 15px 20px; border-radius: 10px;
        color: white; font-weight: 500; z-index: 3000; transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.style.transform = 'translateX(0)', 100);
    setTimeout(() => notification.remove(), 3000);
}

function animateElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('fade-in');
        });
    });
    document.querySelectorAll('.student-card').forEach(el => observer.observe(el));
}

