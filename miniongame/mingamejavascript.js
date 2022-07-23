var canvas = document.createElement("canvas");
canvas.height = 512;
canvas.width = 670;
var ctx = canvas.getContext("2d");
document.body.appendChild(canvas);
var area = new Image();
area.src = "background3.gif";
var mini = new Image();
mini.src = "minion.png";
var star = new Image();
star.src = "starwars.png";
var tus = {}; /*aynı anda iki tusa basabilir oyuzden bu nesneyi tanımladık*/
/* kaydown(tusa basma) ile işlemi yaptırılır ve keyup(tustanelinikaldırma) ile işlemi sonlandırılır (js klavye kodları için)*/
addEventListener("keydown", function(ev) {
    tus[ev.keyCode] = true;
    /* alert(ev.keyCode); /*kac nolu hareket tusuna bastıgının uyarısını getirir ekrana*/
});
addEventListener("keyup", function(ev) {
    /*tustan elini kaldırdıgında nesneyi kaldırır*/
    delete tus[ev.keyCode];
});
var starPosX = canvas.width / 2;
var starPosY = canvas.height / 2;
var hizayari;
var starH = {
    /*STARIN HIZ AYARI*/
    hizayari: 10,
    // x:0,
    // y:0
};
var miniH = {};
var koordinat = function() {
    starH.x = starPosX;
    starH.y = starPosY;
    miniH.x = Math.floor(
        Math.random() * 620 + 10
    ); /*620 ye kadar degerler olusturcak 10 da hata payı*/
    miniH.y = Math.floor(Math.random() * 460 + 10);
};
/* ( Ekranda kazandınız yazınca tuslar devredısı olur linke tıklayınca tekrar baslar */
var count = 0;

function myCounter() {
    count = count + 1;
    document.getElementById("p1").innerHTML = count;
    if (count > 3) {
        /*score 3 olduktan sonrası için*/
        document.getElementById("p2").innerHTML = "YOU WIN!!";
        starH.hizayari = 0;
        var tekrar = document.getElementById("tekrarbaslama");
        tekrar.style.display = "block";
        tekrar.addEventListener("click", function() {
            starH.hizayari = 10;
        });
    }
}
/*2.YÖNTEM (oyunu kazanınca tusların devredısı olması için) var count = 0;
function myCounter() {
count = count + 1; document.getElementById("p1").innerHTML = count; if (count > 3) {
document.getElementById("p2").innerHTML = "YOU WIN!!";
 var aa = document.getElementById("a1"); aa.style.display = "block"; tus[ev.keyCode] = false; aa.addEventListener("click", function() {
tus[ev.keyCode] = true; });
}
}*/
var hareket = function() {
    /*hareket tanımlamadan cizdiremez oyuzden ciz() den önce tanımlanmalı hareket*/ //yukarı38
    if (38 in tus && starH.y > 7) {
        starH.y -=
            starH.hizayari; /*y asagıya dogru artar yukarı tanımlıcaksak - verilmeli.0,0 noktası sol üsttedir*/
    }
    //asagı40
    if (40 in tus && starH.y < 445) {
        /*canvas boyutlarının dısına cıkmaması için starH.y <445 445+32=477 */
        starH.y += starH.hizayari;
    }
    //sol37
    if (37 in tus && starH.x > 5) {
        /* x koorinatına göre 5den sonra baslamalı canvası asmaması için*/
        starH.x -= starH.hizayari; /*hareket sol tarafa gidince x - olmalı*/
    }
    //sag39
    if (39 in tus && starH.x < 630) {
        starH.x += starH.hizayari;
    }
    if (
        starH.x <= miniH.x + 32 &&
        starH.y <= miniH.y + 32 &&
        miniH.x <= starH.x + 32 &&
        miniH.y <= starH.y + 32
    ) {
        /*karakter resimlerinin kalınlıgından dolayı+32 verdik*/
        koordinat();
        myCounter(); /*sayacın fonksiyonunu getirdik*/
    }
};
var ciz = function() {
    ctx.drawImage(area, 0, 0);
    /*karakterleri canvasın üzerine ekleme*/
    ctx.drawImage(mini, miniH.x, miniH.y);
    ctx.drawImage(star, starH.x, starH.y);
};
var ENSON = function() {
    hareket();
    ciz();
    requestAnimationFrame(ENSON);
    /*3.YÖNTEM olarak klavye hareketini etkisiz hale getirebilmek için clearanimationframe
yapabilirsin*/
    /* kodun calısmıyorsa requestAnimationFrame ekle (hareketi tanımladıktan sonra tanımlanmalı)!! yeni sekmeye
gecince durdurur oyunu*/
};
koordinat();
ENSON();