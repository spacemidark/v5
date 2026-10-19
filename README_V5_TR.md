# INSIDE THE JET ENGINE — DESKTOP V5.0

React + TypeScript + Three.js + Electron tabanlı Windows masaüstü uygulamasıdır.

## V5'te yapılan değişiklikler

- Sol üstteki Inside the Jet Engine markasının hemen altında **Created by Emine Yasan** yazısı bulunur.
- **LPC** (Low Pressure Compressor) ana ekran kesit işaretlerinden, küçük komponent kartlarından, sistemler görünümünden, şematik haritadaki seçilebilir alanlardan, sol kütüphane ağacından, arama sonuçlarından ve alt bileşen listelerinden gizlenmiştir.
- **Önemli:** LPC içeriği kaybolmasın diye kaynak katalog JSON/MDX dosyalarından silinmedi. Yalnızca uygulamanın görünür öğe listesinde filtreleniyor. Tekrar göstermek istersen `src/data/index.ts` içindeki `excludedIds` kümesinden `lpc` değerini kaldırmalı, ayrıca `src/components/Dashboard.tsx` ve `src/components/EngineSchematic.tsx` dosyalarındaki uygun gezinme öğelerini tekrar eklemelisin.
- Fan, HPC, Combustor, HPT, LPT, Nozzle ve diğer motor sistemleri teknik kütüphanede korunur.
- Sürüm bilgileri 5.0.0 olarak güncellendi.

## Windows üzerinde çalıştırma

1. ZIP arşivini tamamen klasöre çıkart.
2. VS Code ile içinde `package.json` bulunan klasörü aç.
3. Terminalde `npm.cmd install` komutunu çalıştır.
4. Geliştirme görünümü: `npm.cmd run dev`. Masaüstü geliştirme penceresi: `npm.cmd run desktop:dev`.
5. EXE hazırlama: `CREATE_EXE_WINDOWS.bat` dosyasını çalıştır. Sonuçlar başarılı derleme sonrasında `release/` içine kaydedilir.

Kendi MDX mühendislik içeriklerini düzenleyebilirsin. Kendi önceki değişikliklerini V5 proje klasörüne birleştirmeden önce yedekle; bu paket V1.4 kaynaklarından hazırlanmıştır.

## Teknik not

Görseller konsept/temsili görsellerdir; üretici onaylı CAD veya doğrulanmış performans verisi değildir.
