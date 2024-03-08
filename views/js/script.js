function add() {
    Swal.fire({
        title: "เพิ่มผู้ใช้",
        text: "กรอกชื่อผู้ใช้ที่ต้องการ",
        input: "text",
        confirmButtonText: 'ตกลง',
        customClass: {
            confirmButton: 'bacground: #198754;'
          }
    });
}

