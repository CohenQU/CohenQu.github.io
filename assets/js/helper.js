function loadPublications() {
  for (var i = 2023; i >= 2021; i--) {
    var filepath = "../documents/meta/" + i + ".json";
    fetchJSON(filepath, i);
  }
}

function fetchJSON(filepath, year) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", filepath, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var json = JSON.parse(xhr.responseText);
      embedJSONInHTML(json, year.toString());
    }
  };
  xhr.send();
}

function embedJSONInHTML(json, year) {
  var html = '<h2><a name="' + year + '">' + year + "</a></h2>";
  //   var html = "";
  for (var key in json) {
    var title = json[key]["title"];
    html += "<b>" + title + "</b>";

    html += "<br />";

    var names = json[key]["authors"];
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (name === "Yuxiao Qu") {
        html += "<b>" + name + "</b>, ";
      } else {
        html += name + ", ";
      }
    }
    html = html.slice(0, -2) + ".";

    html += "<br />";

    var conference = json[key]["conference"];
    var date = json[key]["date"];
    html += "<i>" + conference + "</i>" + ". " + date + ".";
    if ("award" in json[key]) {
      var award = json[key]["award"];
      html += " <b>" + award + "</b>";
    }

    html += "<br />";

    var abstract_ref = "\"javascript:toggle_vis('" + key + "');\"";
    html += "<a href=" + abstract_ref + "> Abstract </a>";
    html += "&nbsp;&nbsp;&nbsp;";

    var bibtex_ref = '"../documents/publications/' + key + '.bib"';
    html += "<a href=" + bibtex_ref + "> BibTeX </a>";
    html += "&nbsp;&nbsp;&nbsp;";

    var pdf_ref = '"../documents/publications/' + key + '.pdf"';
    html += "<a href=" + pdf_ref + "> PDF </a>";

    html += "<br />";
    var id = '"' + key + '_text"';
    html += "<div id=" + id + ' style="display:none;">';
    html += "<br />";
    var abstract = json[key]["abstract"];
    html += abstract;
    html += "</div>";
    html += "<br />";
  }
  console.log(html);
  document.getElementById(year).innerHTML = html;
}
