/* js/script.js */

// 1. DATA KELAS (Ganti nama di sini)
const DATA_KELAS = {
    wali: { name: "Nama Wali Kelas, S.Pd.", file: "walikelas.jpg" },
    pengurus: [
        { role: "Ketua", name: "Nama Ketua", file: "ketua.jpg" },
        { role: "Wakil", name: "Nama Wakil", file: "wakil.jpg" },
        { role: "Sekretaris", name: "Nama Sekretaris", file: "sekretaris.jpg" },
        { role: "Bendahara", name: "Nama Bendahara", file: "bendahara.jpg" }
    ]
};

// 2. FUNGSI RENDER GALERI
function renderGallery(page) {
    const grid = document.getElementById('gallery-grid');
    if(!grid) return;
    grid.innerHTML = '';
    
    const start = (page - 1) * 12 + 1;
    const end = Math.min(page * 12, 34);

    for (let i = start; i <= end; i++) {
        const fileName = `moment${i}.jpg`;
        grid.innerHTML += `
            <div class="aspect-square glass rounded-2xl overflow-hidden group cursor-pointer" onclick="openFullImage('${fileName}')">
                <img src="${fileName}" onerror="this.src='https://via.placeholder.com/400?text=Moment+${i}'" 
                class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500 scale-110 group-hover:scale-100">
            </div>`;
    }

    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active-page'));
    const activeBtn = document.getElementById('btn-' + page);
    if(activeBtn) activeBtn.classList.add('active-page');
}

// 3. FUNGSI INISIALISASI STRUKTUR & SISWA
function initStruktur() {
    const waliContainer = document.getElementById('wali-kelas');
    const pengurusContainer = document.getElementById('pengurus');
    const siswaContainer = document.getElementById('siswa-list');

    if(waliContainer) {
        waliContainer.innerHTML = `
            <div class="inline-block cursor-pointer" onclick="openFullImage('${DATA_KELAS.wali.file}')">
                <div class="w-40 h-40 rounded-full border-4 border-emerald-500 p-1 glass mx-auto mb-4 overflow-hidden">
                    <img src="${DATA_KELAS.wali.file}" onerror="this.src='https://via.placeholder.com/150?text=Wali+Kelas'" class="w-full h-full object-cover rounded-full">
                </div>
                <h4 class="text-2xl font-bold">${DATA_KELAS.wali.name}</h4>
                <p class="text-emerald-400 uppercase text-sm tracking-widest">Wali Kelas</p>
            </div>`;
    }

    if(pengurusContainer) {
        DATA_KELAS.pengurus.forEach(p => {
            pengurusContainer.innerHTML += `
                <div class="cursor-pointer" onclick="openFullImage('${p.file}')">
                    <div class="w-24 h-24 mx-auto mb-3 rounded-2xl glass overflow-hidden border border-blue-500/20">
                        <img src="${p.file}" onerror="this.src='https://via.placeholder.com/150?text=${p.role}'" class="w-full h-full object-cover">
                    </div>
                    <h5 class="font-bold">${p.role}</h5>
                    <p class="text-slate-400 text-xs uppercase">${p.name}</p>
                </div>`;
        });
    }

    if(siswaContainer) {
        for (let i = 1; i <= 34; i++) {
            let abs = i < 10 ? '0' + i : i;
            let sFile = `siswa${i}.jpg`;
            siswaContainer.innerHTML += `
                <div class="group cursor-pointer" onclick="openFullImage('${sFile}')">
                    <div class="aspect-[3/4] rounded-xl glass overflow-hidden mb-2 border border-white/5 group-hover:border-blue-500/50 transition">
                        <img src="${sFile}" onerror="this.src='https://via.placeholder.com/150?text=${abs}'" class="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-500">
                    </div>
                    <p class="text-[10px] text-slate-500">ABSEN ${abs}</p>
                    <p class="text-[11px] font-bold truncate uppercase px-1">Nama Siswa ${i}</p>
                </div>`;
        }
    }
}

// 4. FUNGSI LIGHTBOX
function openFullImage(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if(lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeFullImage() {
    const lightbox = document.getElementById('lightbox');
    if(lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// JALANKAN SAAT HALAMAN DIMUAT
document.addEventListener('DOMContentLoaded', () => {
    renderGallery(1);
    initStruktur();
});
