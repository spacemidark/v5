# YENİ SÜRÜM (v1.2) — TAM MOTOR İÇERİK AĞACI

**Lütfen önce `README_FULL_ENGINE_TR.md` dosyasını okuyun.** Bu dosyanın aşağıdaki bölümü bir önceki HPC odaklı sürümün kullanım açıklamasıdır; yeni sürümde menü kapsamı tüm motora genişletilmiştir.

---

## Masaüstü `.exe` sürümü

Bu klasör artık Windows için Electron masaüstü uygulaması oluşturabilir. **Önce `README_DESKTOP_TR.md` dosyasını oku.** En kolay yöntem: Windows’ta `CREATE_EXE_WINDOWS.bat` dosyasına çift tıklamak.

---

# INSIDE THE JET ENGINE — React + TypeScript v1.0

Bu proje, önceki **v0.3** prototipindeki *Fixed Stator Vane* (14 teknik bölüm) ve *Variable Stator Vane* (15 teknik bölüm) içeriklerini **React + TypeScript + MDX** mimarisine taşıyan kaynak kodlu, düzenlenebilir bir web uygulamasıdır. İki dilde toplam **58 MDX içerik dosyası** bulunur. Önceki içerik kaybolmaz; 3D demonstrasyon ve daha gelişmiş arayüz eklendi.

## 1 — Başlamak için (Windows)

**ÖNEMLİ:** Bu, eski tek dosyalık HTML projesi değildir. `index.html` dosyasına çift tıklayarak çalıştırılmaz; önce Node.js paketlerinin yüklenmesi gerekir.

1. ZIP'i indir, sağ tıkla → **Tümünü Ayıkla**. ZIP dosyasını doğrudan VS Code'a açma.
2. Bilgisayarında **Node.js LTS** kurulu olsun (Vite 7 için en az Node.js **20.19 veya 22.12** gerekir). `node -v` komutuyla kontrol edebilirsin.
3. VS Code'u aç → **File → Open Folder** → ZIP'ten çıkardığın ve `package.json` içeren klasörü seç.
4. **Terminal → New Terminal** menüsünü aç.
5. Terminale sırayla aşağıdakileri yaz:

```bash
npm install
npm run dev
```

6. Terminalin verdiği yerel adrese tarayıcından git; çoğunlukla **http://localhost:5173**. VS Code terminali açık kaldığı sürece uygulama çalışır.
7. Bitirince terminalde `Ctrl + C` ile kapatabilirsin.

**Windows kolay yolu:** `START_WINDOWS.bat` dosyasını proje klasöründen açabilirsin. İlk çalışmada internet bağlantısı ve Node.js gerekir.

`npm` komutunda PowerShell güvenlik hatası görürsen komutu `npm.cmd install` olarak kullanabilir veya VS Code terminal profilini **Command Prompt** yapabilirsin. Sadece kodu okumak için Node.js kurulu olması gerekmez.

## 2 — Hangi teknoloji ne iş yapıyor?

| Teknoloji | İşlev |
|---|---|
| React | Sayfalar, komponent ağacı, arama, teknik içerik arayüzü |
| TypeScript | Tip güvenliği, kodların daha güvenli düzenlenmesi |
| Vite | Geliştirme sunucusu, otomatik yenileme ve üretim derlemesi |
| Three.js | 3 boyutlu nesneler, geometri ve sahne altyapısı |
| React Three Fiber | React içinde 3D kompresör sahnesi |
| React Three Drei | 3D kamera kontrolleri ve yardımcılar |
| MDX | Makaleler, denklemler, teknik resimler, interaktif hesaplayıcı |
| JSON | Komponent ve konu hiyerarşisi, kaynakça, teknik sözlük |
| CSS | Arayüz renkleri ve yerleşimi |

## 3 — Önce BURAYI değiştir: teknik içerik!

Bir komponentin her bölümü ayrı MDX dosyasıdır. **Kod öğrenmeden uzun teknik yazılar yazabilirsin.**

`content/fixed-stator-vane/overview.tr.mdx` → Fixed Stator Vane / Genel bakış / Türkçe.

`content/variable-stator-vane/materials.en.mdx` → VSV / Malzemeler / İngilizce.

İlgili MDX dosyasını aç ve örneğin şöyle değiştir:

```mdx
# Fixed Stator Vane — Materials

Stator vane material selection is driven by temperature, mechanical loads,
fatigue requirements, oxidation/corrosion and manufacturing constraints.

## Engineering considerations

- Strength at operating temperature
- Surface condition and fatigue
- Thermal expansion compatibility

<EngineeringNote>
Alloy choices depend on engine architecture and compressor stage.
</EngineeringNote>
```

Kaydettiğinde `npm run dev` açıkken tarayıcıdaki içerik güncellenir.

### Denklem yazma (MDX)

```mdx
$$
\Delta L = \alpha L_0 \Delta T
$$
```

Math rendering `remark-math` ve `rehype-katex` ile hazırdır.

### Resim ekleme

1. İzinli veya kendi çizdiğin bir resmi `public/images/stator-vane.png` adıyla koy.
2. Bir MDX dosyasına şu satırı ekle:

```mdx
![Stator vane technical drawing](/images/stator-vane.png)
```

`public/models/` dizinine gelecekte .glb modelleri koyabilirsin. Şimdiki 3D görüntü **gerçek bir motorun CAD modeli değil**, kodla üretilmiş öğretici geometridir.

## 4 — Yeni bölüm veya komponent ekleme

Komponent ağacı ve her bölümün adı, sırası ve referans eşlemesi **`src/data/catalog.json`** içinde.

Örneğin `fixed-stator-vane` altına `coatings` eklemek için `chapters` listesine şunu ekle:

```json
{ "id": "coatings", "tr": "Kaplamalar", "en": "Coatings", "tag": "MATERIALS", "refs": [] }
```

Ayrıca şu iki dosyayı oluştur:

- `content/fixed-stator-vane/coatings.tr.mdx`
- `content/fixed-stator-vane/coatings.en.mdx`

VS Code'da kaydettikten sonra yeni bölüm soldaki teknik bölüm listesinde görünür. Yeni bir komponent için `src/data/catalog.json` içinde bir yeni komponent nesnesi oluştur ve aynı dosyalama mantığını izle. Kategoriler `stator`, `rotor`, `compressor`, `structure`; `status` alanı `draft`, `reviewed` veya `planned` olabilir. `planned` içerik yerine 'hazırlanıyor' ekranı gösterir. Örnekler katalogda hazırdır.

`references` alanında kaynak bilgilerini ekle, `chapters[*].refs` alanında aynı kaynak `id`'lerini kullan. Kaynaklar seçilen bölümün altında gösterilir.

## 5 — Programlama kodunu düzenleme

- `src/App.tsx` — Sayfanın ana yapısı, arama, dil, favori, bileşen gezinme.
- `src/components/EngineViewer.tsx` — React Three Fiber 3D görünümü ve VSV gösterim açısı.
- `src/components/EngineeringWidgets.tsx` — Termal genleşme hesabı ve teknik diyagramlar.
- `src/styles/main.css` — Bütün görünüm ve responsive kurallar.
- `src/data/catalog.json` — Komponent navigasyonu ve referans kayıtları.
- `content/` — Bütün teknik makaleler (MDX).

### Dosya yapısı

```text
Inside_the_Jet_Engine_React_TS_v1/
  content/
    fixed-stator-vane/           # 14 x TR ve 14 x EN
    variable-stator-vane/        # 15 x TR ve 15 x EN
  public/
    images/
    models/
  src/
    components/
      EngineViewer.tsx
      EngineeringWidgets.tsx
    data/
      catalog.json
      glossary.json
      index.ts
    styles/main.css
    App.tsx
    main.tsx
    types.ts
  index.html
  package.json
  vite.config.ts
  README_TR.md
```

## 6 — Çalışan özellikler

- React + TypeScript navigasyon, komponentler ve 29 teknik bölüm;
- Teknik içerikler **TR/EN** MDX dosyalarından gelir;
- Arama, teknik sözlük, yer işaretleri (`localStorage`), bağlantı verilebilir sayfa hash'i;
- Three.js / React Three Fiber ile sahne döndürme ve zoom;
- VSV slider ile öğretici vane hareketi; bu gerçek bir değişken geometri kontrol yasası değildir;
- SVG airfoil ve compressor-stage şemaları;
- Termal genleşme örnek hesaplayıcısı;
- Denklemler için KaTeX;
- Telefon ve masaüstüne uyumlu arayüz, kaynak bağlantıları ve yazar kılavuzu.

## 7 — Kalite ve veri uyarıları

**Yayın öncesi teknik doğrulama gerekli.** Metinler geçmiş prototipten aktarılmıştır; kaynak bağlantıları ve kapsamları tek tek gözden geçirilmelidir. Malzeme seçenekleri, açılar, imalat yöntemleri, toleranslar veya hasar sınırları **belirli bir gerçek motor için onaylı tasarım verisi değildir**. Geometriler şematiktir; ölçeğe göre değildir.

## 8 — Üretim sürümü oluşturma

```bash
npm run build
npm run preview
```

`dist/` klasörü dağıtılabilir statik web dosyaları içerir. `dist/index.html` de doğrudan `file://` ile açılmamalı; basit bir web sunucusu üzerinden yayımlanmalıdır.

### Sorun giderme

- **`npm` tanınmıyor:** Node.js kur / terminali kapatıp aç / `node -v` çalıştır.
- **`package.json` yok:** Yanlış klasörü açtın; projede `package.json` bulunmalı.
- **`npm install` bağlantı hatası:** İlk paket yüklemesi için internet bağlantısı gerekir.
- **Ekran boş:** Tarayıcı konsolunda hatayı kontrol et; mümkünse `npm run build` çıktısını paylaş.
- **3D görünüm yok:** Donanım hızlandırma/WebGL destekleyen güncel bir tarayıcı gerekir; 'Şema' sekmesi 3D gerektirmez.
- **Yeni MDX dosyası görünmüyor:** Dosya adını katalogdaki `id` ile eşleştir; bazı durumlarda geliştirme sunucusunu yeniden başlat.
