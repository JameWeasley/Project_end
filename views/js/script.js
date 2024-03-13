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

function deleteConfirm(e , id ) {
  const element = e.closest("tr")
    Swal.fire({
        title: "ต้องการลบ ใช่ หรือ ไม่ ?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "ไม่",
        confirmButtonText: "ใช่"
      }).then( async (result) => {
        if (result.isConfirmed) {

          const respone = await fetch(`/deleteUsers?user_id=${id}` , {
            method: "DELETE"
          })

          if (respone.ok) {

            const responeData = await respone.json()
            if (responeData) {
              Swal.fire({
                title: "ลบข้อมูลสำเร็จ",
                icon: "success"
              });
              element.remove()
            }else {
              Swal.fire({
                title: "ไม่สามารถลบได้",
                icon: "error"
              });
            }
          }

        }
      });
}