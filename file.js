document.getElementById("formCheckout").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = this.nama.value;
  const email = this.email.value;
  const alamat = this.alamat.value;
  const tanggal = new Date().toLocaleDateString("id-ID");

  const produk = keranjang.map(item => item.nama); // Ambil produk dari keranjang

  const dataInvoice = {
    nama,
    email,
    alamat,
    tanggal,
    produk
  };

  localStorage.setItem("dataInvoice", JSON.stringify(dataInvoice));
  window.location.href = "invoice.html";
});


function showToast(pesan, type = "success") {
  const toast = document.getElementById("toast");
  toast.textContent = pesan;
  toast.className = "toast";
  if (type === "error") toast.classList.add("error");
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show", "error");
  }, 3000);
}
function checkout() {
  if (keranjang.length === 0) {
    showToast("❌ Keranjang kosong!", "error");
    return;
  }

  document.getElementById("keranjang-popup").style.display = "none";
  document.getElementById("formulir-checkout").style.display = "flex";
}
function tutupFormulirCheckout() {
  document.getElementById("formulir-checkout").style.display = "none";
}
document.addEventListener("DOMContentLoaded", function () {
  const formCheckout = document.getElementById("formCheckout");
  formCheckout.addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = formCheckout.nama.value.trim();
    const email = formCheckout.email.value.trim();
    const alamat = formCheckout.alamat.value.trim();

    if (!nama || !email || !alamat) {
      showToast("❌ Harap lengkapi semua data!", "error");
      return;
    }

    showToast("✅ Pemesanan berhasil dikirim!");
    keranjang = [];
    updateKeranjang();
    tutupFormulirCheckout();
  });
});
function simpanRiwayat(nama, email, alamat, produkList) {
  const riwayatLama = JSON.parse(localStorage.getItem("riwayatPemesanan")) || [];

  const baru = {
    waktu: new Date().toLocaleString(),
    nama,
    email,
    alamat,
    produk: produkList.map(p => `${p.nama} - Rp ${p.harga.toLocaleString()}`)
  };

  riwayatLama.push(baru);
  localStorage.setItem("riwayatPemesanan", JSON.stringify(riwayatLama));
  tampilkanRiwayat();
}

function tampilkanRiwayat() {
  const data = JSON.parse(localStorage.getItem("riwayatPemesanan")) || [];
  const container = document.getElementById("daftar-riwayat");
  container.innerHTML = "";

  if (data.length === 0) {
    container.innerHTML = "<li>Belum ada pemesanan.</li>";
    return;
  }

  data.forEach(item => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.waktu}</strong><br>
      Nama: ${item.nama}<br>
      Email: ${item.email}<br>
      Alamat: ${item.alamat}<br>
      Produk: <ul>${item.produk.map(p => `<li>${p}</li>`).join("")}</ul>
    `;
    container.appendChild(li);
  });
}