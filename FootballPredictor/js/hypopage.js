function HypoPredict(){
    var home = document.getElementById('home').value;
    localStorage.setItem("home_name", home);
    var away = document.getElementById('away').value;
    localStorage.setItem("away_name", away);
    var c = 100;
    if (home == away && home != ""){
        document.getElementById('home').style.borderColor = "red";
        document.getElementById('away').style.borderColor = "red";
        document.getElementById('warning').innerHTML = "We currently DO NOT support same team hypothetical prediction";
    }
    else if (home != "" && away != ""){
        window.location.href='predictionpage_2.html';
    }else
    {
        if (home == "")
        {
            document.getElementById('home').style.borderColor = "red";
        }
        if (away == "")
        {
            document.getElementById('away').style.borderColor = "red";
        }
        document.getElementById('warning').innerHTML = "Please input a team name";
    }
}