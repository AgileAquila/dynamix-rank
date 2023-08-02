const search = () =>{
    const searchbox = document.getElementById('search-item').value.toUpperCase();
    const storeitems = document.getElementById("rank")
    const song = document.querySelectorAll(".song_bg_name")
    const song_name = storeitems.getElementsByClassName("song_name")

    for (var i = 0; i < song_name.length; i++){
        let match = song[i].getElementsByClassName('song_name')[0];

        if (match){
            let textvalue = match.textContent || match.innerHTML

            if(textvalue.toUpperCase().indexOf(searchbox) > -1){
                song[i].style.display = "";
            }else{
                song[i].style.display = "none";
            }
        }
    }

    const rank = document.querySelectorAll(".ranksearch")
    const ranksong = storeitems.getElementsByClassName("rank_song_name")


    for (var i = 0; i < ranksong.length; i++){
        let match2 = rank[i].getElementsByClassName('rank_song_name')[0];

        if (match2){
            let textvalue = match2.textContent || match2.innerHTML

            if(textvalue.toUpperCase().indexOf(searchbox) > -1){
                rank[i].style.display = "";
            }else{
                rank[i].style.display = "none";
            }
        }
    }

    const uncertain_song = document.querySelectorAll(".uncertain_song")
    const uncertain_song_name = storeitems.getElementsByClassName("uncertain_song_name")

    for (var i = 0; i < uncertain_song_name.length; i++){
        let match3 = uncertain_song[i].getElementsByClassName('uncertain_song_name')[0];

        if (match3){
            let textvalue = match3.textContent || match3.innerHTML

            if(textvalue.toUpperCase().indexOf(searchbox) > -1){
                uncertain_song[i].style.display = "";
            }else{
                uncertain_song[i].style.display = "none";
            }
        }
    }
}