// 1. Logika Buka Undangan & Putar Musik
const btnBuka = document.getElementById("btn-buka");
const coverScreen = document.getElementById("cover-screen");
const mainContent = document.getElementById("main-content");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

btnBuka.addEventListener("click", () => {
    coverScreen.classList.add("opened");
    mainContent.classList.remove("d-none");
    bgMusic.play();
    isPlaying = true;
    setTimeout(() => {
        coverScreen.style.display = 'none';
    }, 800);
});

// 2. Logika Play/Pause Musik Melayang
musicBtn.addEventListener("click", () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.style.animationPlayState = 'paused';
    } else {
        bgMusic.play();
        musicBtn.style.animationPlayState = 'running';
    }
    isPlaying = !isPlaying;
});

// 3. Logika Countdown Timer
const timer = setInterval(function() {
    const countDownDate = new Date("Dec 12, 2026 08:00:00").getTime();
    const now = new Date().getTime(); // Memperbaiki variabel now yang sebelumnya hilang
    const distance = countDownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("hari").innerHTML = days;
    document.getElementById("jam").innerHTML = hours;
    document.getElementById("menit").innerHTML = minutes;
    document.getElementById("detik").innerHTML = seconds;

    if (distance < 0) {
        clearInterval(timer);
        document.querySelector(".timer-box").innerHTML = "<h3>Acara Telah Berlangsung</h3>";
    }
}, 1000);

// 4. Logika Salin Nomor Rekening
function copyText(elementId) {
    const textToCopy = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("Nomor rekening berhasil disalin: " + textToCopy);
    }).catch(err => {
        alert("Gagal menyalin rekening.");
    });
}

// 5. Logika Form RSVP & Tampilkan Ucapan
document.addEventListener("DOMContentLoaded", function() {
    const rsvpForm = document.getElementById("rsvpForm");
    const daftarUcapan = document.getElementById("daftar-ucapan");

    function muatUcapan() {
        daftarUcapan.innerHTML = "";
        const ucapanTersimpan = JSON.parse(localStorage.getItem("dataUcapan")) || [];

        ucapanTersimpan.forEach(data => {
            const div = document.createElement("div");
            // text-dark ditambahkan agar tulisan hitam dan terbaca
            div.className = "card p-3 mb-3 shadow-sm text-start text-dark"; 
            
            const badgeClass = data.kehadiran === "Hadir" ? "bg-success" : "bg-danger";

            div.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5 class="mb-0 fw-bold">${data.nama}</h5>
                    <span class="badge ${badgeClass}">${data.kehadiran}</span>
                </div>
                <p class="mb-0">${data.pesan}</p>
            `;
            daftarUcapan.appendChild(div);
        });
    }

    if (daftarUcapan) {
        muatUcapan();
    }

    if (rsvpForm) {
        rsvpForm.addEventListener("submit", function(e) {
            e.preventDefault(); 

            const nama = document.getElementById("nama").value;
            const kehadiran = document.getElementById("kehadiran").value;
            const pesan = document.getElementById("pesan").value;

            if (nama === "" || kehadiran === "") {
                alert("Mohon lengkapi nama dan konfirmasi kehadiran!");
                return;
            }

            const ucapanTersimpan = JSON.parse(localStorage.getItem("dataUcapan")) || [];

            ucapanTersimpan.unshift({
                nama: nama,
                kehadiran: kehadiran,
                pesan: pesan
            });

            localStorage.setItem("dataUcapan", JSON.stringify(ucapanTersimpan));

            alert(`Terima kasih, ${nama}! Konfirmasi berhasil dikirim.`);
            rsvpForm.reset();
            muatUcapan();
        });
    }
});