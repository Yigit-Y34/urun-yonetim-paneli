let urunler = JSON.parse(localStorage.getItem('urunler')) || [];

document.getElementById('urunEkleForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const adi = document.getElementById('adi').value.trim();
    const fiyati = document.getElementById('fiyati').value.trim();
    const stok_durumu = document.getElementById('stok_durumu').value;

    if (!adi || !fiyati) {
        alert('Lütfen tüm alanları doldurun!');
        return;
    }

    const yeniUrun = {
        urun_id: Date.now(),
        adi,
        fiyati,
        stok_durumu
    };

    urunler.push(yeniUrun);
    localStorage.setItem('urunler', JSON.stringify(urunler));

    e.target.reset();
    urunleriListele();
});

function urunleriListele() {
    const urunListesi = document.getElementById('urunListesi');
    urunListesi.innerHTML = '';

    urunler.forEach(urun => {
        const urunSatiri = document.createElement('tr');
        urunSatiri.classList.add('border-b');

        urunSatiri.innerHTML = `
            <td class="px-4 py-2">${urun.urun_id}</td>
            <td class="px-4 py-2">${urun.adi}</td>
            <td class="px-4 py-2">${urun.fiyati} TL</td>
            <td class="px-4 py-2">${urun.stok_durumu}</td>
            <td class="px-4 py-2">
                <button onclick="silUrun(${urun.urun_id})" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700">Sil</button>
            </td>
        `;

        urunListesi.appendChild(urunSatiri);
    });
}

function silUrun(id) {
    urunler = urunler.filter(urun => urun.urun_id !== id);
    localStorage.setItem('urunler', JSON.stringify(urunler));
    urunleriListele();
}

window.onload = function() {
    urunleriListele();
};