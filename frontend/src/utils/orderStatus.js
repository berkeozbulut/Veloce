export function statusText(status) {
    const texts = { 0: "İptal Edildi", 1: "Hazırlanıyor", 2: "Kargoya Verildi", 3: "Teslim Edildi" };
    return texts[status];
}