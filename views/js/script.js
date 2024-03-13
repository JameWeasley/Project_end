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

function detail() {
    Swal.fire({
        title: "Custom animation with Animate.css",
        confirmButtonColor: "#198754",
        showClass: {
            popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
            popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
    });
    
}

function deleteConfirm() {
    Swal.fire({
        title: "ต้องการลบ ใช่ หรือ ไม่ ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ไม่",
        confirmButtonText: "ใช่"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "ลบข้อมูลสำเร็จ",
            icon: "success"
          });
        }
      });
}