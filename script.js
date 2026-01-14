// Senin metninde bahsettiğin, CORS engeli olmayan stabil Piped API adresleri
const instances = [
    "https://pipedapi.kavin.rocks",
    "https://pipedapi.moomoo.me",
    "https://pipedapi.syncit.pw",
    "https://api.piped.vicr123.com"
];

let currentInstanceIndex = 0;

async function searchMusic() {
    const term = document.getElementById('searchInput').value;
    const list = document.getElementById('resultsList');
    
    if(!term) return alert("Kanka bir şarkı adı yaz!");
    
    list.innerHTML = "<p style='padding:20px; text-align:center;'>MYT Motoru ile aranıyor...</p>";

    try {
        const currentInstance = instances[currentInstanceIndex];
        // Piped arama endpoint'i
        const response = await fetch(`${currentInstance}/search?q=${encodeURIComponent(term)}&filter=videos`);
        
        if (!response.ok) throw new Error("Sunucu yanıt vermedi");

        const data = await response.json();

        // Eğer sonuç gelirse listeyi temizle ve doldur
        list.innerHTML = ""; 
        
        // Piped API formatına göre döngü (Piped'de sonuçlar direkt dizi olarak döner)
        data.forEach((item) => {
            // Video ID'sini URL'den ayıklıyoruz
            const videoId = item.url.split("v=")[1];
            
            list.innerHTML += `
                <div class="song-card">
                    <img src="${item.thumbnail}" onerror="this.src='https://via.placeholder.com/60'">
                    <div class="song-info">
                        <p class="song-name">${item.title}</p>
                        <p class="song-sub">${item.uploaderName} • ${item.duration} sn</p>
                        <div class="action-btns">
                            <button class="btn-p" onclick="play('${videoId}', '${item.title.replace(/'/g, "")}')">▶ DİNLE</button>
                            <button class="btn-m" onclick="download('${videoId}')">📥 İNDİR</button>
                        </div>
                    </div>
                </div>`;
        });

    } catch (error) {
        console.log("Hata oluştu, bir sonraki sunucu deneniyor...");
        // Fallback: Hata olursa bir sonraki instance'a geç
        currentInstanceIndex = (currentInstanceIndex + 1) % instances.length;
        
        if (currentInstanceIndex === 0) {
            list.innerHTML = "<p style='padding:20px;'>Tüm sunucular meşgul kanka, birazdan tekrar dene!</p>";
        } else {
            searchMusic(); // Bir sonraki sunucuyla tekrar dene
        }
    }
}

function play(id, name) {
    document.getElementById('now-playing').innerText = "🎵 Çalıyor: " + name;
    // Gizli iframe ile ses tetikleme
    document.getElementById('hidden-engine').innerHTML = 
        `<iframe width="0" height="0" src="https://www.youtube.com/embed/${id}?autoplay=1" frameborder="0"></iframe>`;
}

function download(id) {
    // Seni başka siteye atmadan indirme servisini başlatır
    // Kanka burası Piped'in doğrudan stream linkiyle de geliştirilebilir
    window.open(`https://ezmp3.cc/api/convert?url=https://www.youtube.com/watch?v=${id}`, '_blank');
}
