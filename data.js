var data = {
    series: [{
            name: "Serie 1",
            values: [0.5, 0.3, 0.7, 0.2]
        },
        {
            name: "Serie 2",
            values: [0.4, 0.2, 0.9, 0.3]
        },
        {
            name: "Serie 3",
            values: [0.2, 0.1, 0.6, 0.4]
        },
        {
            name: "Serie 4",
            values: [0.9, 0.7, 0.5, 0.8]
        }
		],
    colonnes: ["Colonne 1", "Colonne 2", "Colonne 3", "Colonne 4"]
};

var largeur = 1000;
var hauteur = 500;
var paper = Raphael("inselberg", largeur, hauteur);
paper.rect(0, 0, largeur, hauteur).attr({
    fill: "#eaf9f8"
});

var nbColonnes = data.colonnes.length;
var nbSeries = data.series.length;

var marge = 20;
var largGraph = largeur - 2 * marge;
var hautGraph = hauteur - 2 * marge;

var disColonne = largGraph / nbColonnes;
var lineStart = marge * 3;
var lineLength = hautGraph - marge * 2;
var lineEnd = lineStart + lineLength;
//var colour = ["f7999f","#c9f799","#99f7f1","#e799f7"];
var colour = [];
for (var i=0; i<nbSeries;i++){
    teinte = 360/nbSeries*i;
    colour.push(`hsla(${teinte},40%,90%,50%)`);
}

for (i = 1; i < nbColonnes+1; i++) {
    var lineX = disColonne*i;
    //paper.path("M" + lineX + "," + lineStart + "L" + lineX + "," + lineEnd);
    paper.path(`M${lineX},${lineStart}L${lineX},${lineEnd}`);
    paper.text(lineX-2,marge,data.colonnes[i-1]).attr({"font-size": "12px"});
}

var disEtiquette = disColonne/3-marge;
for (i = 0; i<nbSeries;i++){
    paper.rect(disEtiquette, lineStart+data.series[i].values[0]*lineLength, 100,30,5).attr({"fill":colour[i]});
    paper.text(disEtiquette+50, lineStart+data.series[i].values[0]*lineLength+15,data.series[i].name).attr({"font-size": "12px"})
    var pointAvant = `(${disEtiquette+100},${lineStart+data.series[i].values[0]*lineLength+15})`;
    for (var j =0; j<nbColonnes;j++){
        X = disColonne*(j+1);
        paper.circle(X,lineStart+data.series[i].values[j]*lineLength,5).attr({fill:colour[i]})
        var point = `(${X},${lineStart+data.series[i].values[j]*lineLength})`;
        paper.path('M'+pointAvant+'L'+point);
        pointAvant = point;
    }
    
}