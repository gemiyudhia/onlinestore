export type CartItem = {
  id: number; // ID produk
  title: string; // Judul produk
  price: number; // Harga produk
  description?: string; // Deskripsi produk (opsional)
  category?: string; // Kategori produk (opsional)
  image?: string; // URL gambar produk (opsional)
  quantity: number; // Jumlah item dalam keranjang
};
