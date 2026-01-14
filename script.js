function searchMusic() {
    const query = document.getElementById('query').value;
    const resultsDiv = document.getElementById('results');
    
    if(!query) return alert("Bi' şeyler yaz kanka!");

    resultsDiv.innerHTML = `
        <div class="song-card">
            <h3>Şu an çalıyor: ${query}</h3>
            <iframe src="https://www.youtube.com/embed?listType=search&list=${query}" frameborder="0" allowfullscreen></iframe>
            <br>
            <button class="download-btn" onclick="downloadMP3('${query}')">MP3 İNDİR (BETA)</button>
        </div>
    `;
}

function downloadMP3(name) {
    // Burada dış kaynaklı bir API'ye yönlendirme yapıyoruz
    // Kullanıcıyı videoyu MP3'e çeviren güvenli bir sayfaya atacak
    const convertUrl = "https://ezmp3.cc/api/search?q=" + encodeURIComponent(name);
    window.open(convertUrl, '_blank');
}
