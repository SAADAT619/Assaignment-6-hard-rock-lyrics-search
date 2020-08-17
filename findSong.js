const form = document.getElementById('form')
const search = document.getElementById('search')
const result = document.getElementById('result')

const apiURL = 'https://api.lyrics.ovh'

// adding event listener in form
form.addEventListener('submit', func =>{
    func.preventDefault();
    searchValue = search.Value.trim();


// checking search value is empthy or not

    if(!searchValue){
        alert("We didn't find anything")
    }
    else{
        searchSong(searchValue)
        alert(searchValue)
    }
})

// search song
async function searchSong(searchValue){
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`)
    const data = await searchResult.json();

    showData(data)
}
// updating DOM
function showData(data){
    result.innerHTML = `
    <ul class="song-list">
    ${data.data.map(song =>`<li>
                            <div>
                                <strong>
                                ${song.artist.name}
                                </strong> -${song.title}
                            </div>
                            <span data-artist="${song.artist.name}" data-songtitle="${song.title}">
                                get lyrics
                            </span>
                            </li>


    `).join('')
}
</ul>
`
}

// event listener in get lyrics
result.addEventListener('click', func =>{
    const clickedElement = func.target;

    // checking clicked element is button or not
    if(clickedElement.tagName === 'SPAN'){
        const artist = clickedElement.getAttribute('data-artist');
        const songtitle = clickedElement.getAttribute('data-songtitle');

        getLyrics(artist, songtitle)
    }
})

function getLyrics(artist, songtitle){
    const res = await fetch(`${apiURL}/vl/${artist}/${songtitle}`)
    const data = await res.json();

    const lyrics = data.lyrics.replace(/(\r\n|\r\n)/g, '<br>');

    result.innerHTML = `<h2><strong>
                            ${artist}</strong> - ${songtitle}
                        </h2>
                        <p>${lyrics}</p>`;
}



