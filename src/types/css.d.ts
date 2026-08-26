/* ===========================================================================
   Düz CSS dosyalarının tip tanımı.

   Next.js kendi tip tanımlarında sadece CSS Modules'ü (*.module.css) tanıtır,
   düz *.css dosyalarını tanıtmaz. Bu yüzden bazı editörler
   `import './globals.css'` satırını "modül bulunamadı" (TS2882) diye
   işaretler — proje aslında sorunsuz derlenir.

   Aşağıdaki satır "bu uzantılar geçerli birer modüldür" demekten ibarettir;
   derlemeyi veya siteyi hiçbir şekilde etkilemez, sadece uyarıyı kaldırır.
   =========================================================================== */

declare module '*.css'
