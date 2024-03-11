function add() {
    Swal.fire({
        title: "เพิ่มผู้ใช้",
        text: "กรอกชื่อผู้ใช้ที่ต้องการ",
        input: "text",
        confirmButtonText: 'ตกลง',
        confirmButtonColor: '#198754'
    });
}

function showRegister() {
    document.getElementById('register').style.display = 'block';
    document.getElementById('login').style.display = 'none';
}

function showLogin() {
    document.getElementById('register').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}
