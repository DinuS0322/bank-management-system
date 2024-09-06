var activePage = getUrlVars()["page"];
$("#overlay-Load").hide();

// Preview PDF inside DIV using pdfjs
var _PDF_DOC,
  _CURRENT_PAGE,
  _TOTAL_PAGES,
  _PAGE_RENDERING_IN_PROGRESS = 0,
  _CANVAS = document.querySelector("#pdfCanvas");
localStorage.clear();
$(document).ready(function () {
  $("#pdf-canvas").css({
    border: "1px solid black",
  });

  $("#pdf-canvas").attr("width", screen.width - 30 + "px");
  console.log(screen.width - 30 + "px");
});

// Preview PDF inside DIV using pdfjs
var _PDF_DOC,
  _CURRENT_PAGE,
  _TOTAL_PAGES,
  _PAGE_RENDERING_IN_PROGRESS = 0,
  _CANVAS = document.querySelector("#pdf-canvas");

// PDF SHOWING FUNCTION
async function showPDF(pdf_url) {
  document.querySelector("#pdf-loader").style.display = "block";

  try {
    _PDF_DOC = await pdfjsLib.getDocument({
      url: pdf_url,
    });
  } catch (error) {
    //console.log(error.message);
    console.log(error.message);
  }
  _TOTAL_PAGES = _PDF_DOC.numPages;

  // Hide the pdf loader and show pdf container
  document.querySelector("#pdf-loader").style.display = "none";
  document.querySelector("#pdf-contents").style.display = "block";
  document.querySelector("#pdf-total-pages").innerHTML = _TOTAL_PAGES;

  showPage(1);
  $("#txtGogoPageNumBox").html("<option value='0' hidden>Page</option>");
  for (let i = 1; i < _TOTAL_PAGES + 1; i++) {
    $("#txtGogoPageNumBox").append(
      "<option value='" + i + "'>" + i + "</option>"
    );
  }
}

// load and render specific page of the PDF
async function showPage(page_no) {
  _PAGE_RENDERING_IN_PROGRESS = 1;
  _CURRENT_PAGE = page_no;
  $("#selectedPageNo").val(_CURRENT_PAGE);
  // disable Previous & Next buttons while page is being loaded
  document.querySelector("#pdf-next").disabled = true;
  document.querySelector("#pdf-prev").disabled = true;

  // while page is being rendered hide the canvas and show a loading message
  document.querySelector("#pdf-canvas").style.display = "none";
  document.querySelector("#page-loader").style.display = "block";

  // update current page
  document.querySelector("#pdf-current-page").innerHTML = page_no;

  // get handle of page
  try {
    var page = await _PDF_DOC.getPage(page_no);
  } catch (error) {
    console.log(error.message);
  }

  // original width of the pdf page at scale 1
  var pdf_original_width = page.getViewport(1).width;

  // as the canvas is of a fixed width we need to adjust the scale of the viewport where page is rendered
  var scale_required = _CANVAS.width / pdf_original_width;

  // get viewport to render the page at required scale
  var viewport = page.getViewport(scale_required);

  // set canvas height same as viewport height
  _CANVAS.height = viewport.height;

  // setting page loader height for smooth experience
  document.querySelector("#page-loader").style.height = _CANVAS.height + "px";
  document.querySelector("#page-loader").style.lineHeight =
    _CANVAS.height + "px";

  // page is rendered on <canvas> element
  var render_context = {
    canvasContext: _CANVAS.getContext("2d"),
    viewport: viewport,
    intent: "print",
  };

  // render the page contents in the canvas
  try {
    await page.render(render_context);
  } catch (error) {
    console.log(error.message);
  }

  _PAGE_RENDERING_IN_PROGRESS = 0;

  // re-enable Previous & Next buttons
  document.querySelector("#pdf-next").disabled = false;
  document.querySelector("#pdf-prev").disabled = false;

  // show the canvas and hide the page loader
  document.querySelector("#pdf-canvas").style.display = "block";
  document.querySelector("#page-loader").style.display = "none";

  if (_CURRENT_PAGE == 1) {
    document.querySelector("#pdf-prev").style.display = "none";
  } else {
    document.querySelector("#pdf-prev").style.display = "block";
  }

  if (_CURRENT_PAGE == _TOTAL_PAGES) {
    document.querySelector("#pdf-next").style.display = "none";
  } else {
    document.querySelector("#pdf-next").style.display = "block";
  }

  $("#overlay").hide();
}

// click on "Show PDF" buuton
function placeSigHolder(left, top, width, height, pdfWidth, element) {
  let canvasWidth = parseInt(screen.width - 30);
  let fileWidth = parseInt(pdfWidth);

  let ratio = canvasWidth / fileWidth;
  var sign = document.getElementById(element);
  let boxLeft = parseInt(parseInt(left) * ratio);
  let boxTop = parseInt(parseInt(top) * ratio) + 2;
  let boxWidth = parseInt(parseInt(width) * ratio);
  let boxHeight = parseInt(parseInt(height) * ratio);

  sign.style.position = "absolute";
  sign.style.left = boxLeft + "px";
  sign.style.top = boxTop + "px";
  sign.style.width = boxWidth + "px";
  sign.style.height = boxHeight + "px";
}

// click on the "Previous" page button
document.querySelector("#pdf-prev").addEventListener("click", function () {
  if (_CURRENT_PAGE != 1) showPage(--_CURRENT_PAGE);
  if (localStorage.length > 0) {
    $("#divSignModal").html("");
    const data = JSON.parse(localStorage.getItem("signData"));
    $.each(data, function (index, element) {
      var pageNo = index;
      pageNo = pageNo.split("-");
      var data = element;
      if (pageNo[0] == _CURRENT_PAGE) {
        $("#divSignModal").append(
          "<img id='sign" +
          pageNo[1] +
          "' class='responsive-image' src='" +
          data["imgData"] +
          "' >"
        );
        placeSigHolder(
          data["position"]["left"],
          data["position"]["top"],
          data["signSize"]["width"],
          data["signSize"]["height"],
          data["pdfSize"]["width"],
          "sign" + pageNo[1]
        );
      }
    });
  } else {
    $("#divSignModal").html("");
  }
  $("#txtGogoPageNumBox").val(0);
});

// click on the "Next" page button
document.querySelector("#pdf-next").addEventListener("click", function () {
  if (_CURRENT_PAGE != _TOTAL_PAGES) showPage(++_CURRENT_PAGE);
  if (localStorage.length > 0) {
    $("#divSignModal").html("");
    const data = JSON.parse(localStorage.getItem("signData"));
    $.each(data, function (index, element) {
      var pageNo = index;
      pageNo = pageNo.split("-");
      var data = element;
      if (pageNo[0] == _CURRENT_PAGE) {
        $("#divSignModal").append(
          "<img id='sign" +
          pageNo[1] +
          "' class='responsive-image' src='" +
          data["imgData"] +
          "' >"
        );
        placeSigHolder(
          data["position"]["left"],
          data["position"]["top"],
          data["signSize"]["width"],
          data["signSize"]["height"],
          data["pdfSize"]["width"],
          "sign" + pageNo[1]
        );
      }
    });
  } else {
    $("#divSignModal").html("");
  }
  $("#txtGogoPageNumBox").val(0);
});

// click on the "Last" page button
document.querySelector("#pdf-last").addEventListener("click", function () {
  showPage(_TOTAL_PAGES);
  if (localStorage.length > 0) {
    $("#fieldPosHolder").html("");
    const data = JSON.parse(localStorage.getItem("template"));
    $.each(data, function (index, element) {
      var pageNo = index;
      pageNo = pageNo.split("-");
      var data = element;
      if (pageNo[0] == _CURRENT_PAGE) {
        $("#fieldPosHolder").append(
          "<div class='box' id='box" +
          pageNo[1] +
          "' data-id='" +
          pageNo[1] +
          "'><a href='#' data-id='" +
          pageNo[1] +
          "' class='badge badge-sq float-right removeBox'>X</a><a id='mapModal" +
          pageNo[1] +
          "' href='#' data-toggle='modal' data-id='" +
          pageNo[1] +
          "' data-textSpace='" +
          data["textSpacing"] +
          "' data-field='" +
          data["field"] +
          "' data-textMasked='" +
          data["textMasked"] +
          "' data-maskChar='" +
          data["maskChar"] +
          "' data-maskFrom='" +
          data["maskFrom"] +
          "' data-maskTo='" +
          data["maskTo"] +
          "'  data-target='#fieldBoxModal' class='badge badge-sq float-right'><i class='fas fa-bookmark'></i></a></div>"
        );
        $(".box").draggable({
          containment: "#pdfCanvas",
          stop: function (event, ui) {
            setTimeout(function () {
              $("#btnSetLocation").trigger("click");
            }, 1000);
          },
        });
        placeSigHolder(
          data["position"]["left"],
          data["position"]["top"],
          "box" + pageNo[1]
        );
      }
    });
  }
});

// click on the "First" page button
$("body").on("click", "#pdf-first", function () {
  var pageNo = 1;

  showPage(pageNo);
  if (localStorage.length > 0) {
    $("#docSignHolder").html("");
    const data = JSON.parse(localStorage.getItem("template"));
    $.each(data, function (index, element) {
      var pageNo = index;
      pageNo = pageNo.split("-");
      var data = element;
      if (pageNo[0] == _CURRENT_PAGE) {
        $("#docSignHolder").append(
          "<div class='box' id='box" +
          pageNo[1] +
          "' data-id='" +
          pageNo[1] +
          "'><a href='#' data-id='" +
          pageNo[1] +
          "' class='badge badge-sq float-right removeBox'>X</a><a id='signType" +
          pageNo[1] +
          "' href='#' data-toggle='modal' data-id='" +
          pageNo[1] +
          "' data-type='" +
          data["type"] +
          "' data-target='#signTypeModal' class='badge badge-sq float-right'><i class='fas fa-bookmark'></i></a></div>"
        );
        $(".box").draggable({
          containment: "#pdf-canvas",
          stop: function (event, ui) {
            $("#overlay").show();
            setTimeout(function () {
              $("#btnSetESignLocation").trigger("click");
            }, 1000);
          },
        });
        $(".box").resizable({
          animate: false,
          containment: "#pdf-canvas",
          ghost: true,
          stop: function (event, ui) {
            $("#overlay").show();
            setTimeout(function () {
              $("#btnSetESignLocation").trigger("click");
            }, 1000);
          },
        });
        placeSigHolder(
          data["position"]["left"],
          data["position"]["top"],
          data["signSize"]["width"],
          data["signSize"]["height"],
          "box" + pageNo[1]
        );
      }
    });
  }
  // showPage(1);
  // if (localStorage.length > 0) {
  //   $("#divSignModal").html("");
  //   const data = JSON.parse(localStorage.getItem("signData"));
  //   $.each(data, function (index, element) {
  //     var pageNo = index;
  //     pageNo = pageNo.split("-");
  //     var data = element;
  //     if (pageNo[0] == _CURRENT_PAGE) {
  //       $("#divSignModal").append(
  //         "<img id='sign" +
  //         pageNo[1] +
  //         "' class='responsive-image' src='" +
  //         data["imgData"] +
  //         "' >"
  //       );
  //       placeSigHolder(
  //         data["position"]["left"],
  //         data["position"]["top"],
  //         data["signSize"]["width"],
  //         data["signSize"]["height"],
  //         data["pdfSize"]["width"],
  //         "sign" + pageNo[1]
  //       );
  //     }
  //   });
  // } else {
  //   $("#divSignModal").html("");
  // }
  // $("#txtGogoPageNumBox").val(0);
});

$("body").on("click", ".btnShowSignPage", function () {
  var pageNo = $(this).attr("data-pageNo");
  if (localStorage.length > 0) {
    _CURRENT_PAGE = parseInt(pageNo);
    showPage(_CURRENT_PAGE);
    $("#divSignModal").html("");
    const data = JSON.parse(localStorage.getItem("signData"));
    $.each(data, function (index, element) {
      var pageNo = index;
      pageNo = pageNo.split("-");
      var data = element;
      if (pageNo[0] == _CURRENT_PAGE) {
        $("#divSignModal").append(
          "<img id='sign" +
          pageNo[1] +
          "' class='responsive-image' src='" +
          data["imgData"] +
          "' >"
        );
        placeSigHolder(
          data["position"]["left"],
          data["position"]["top"],
          data["signSize"]["width"],
          data["signSize"]["height"],
          data["pdfSize"]["width"],
          "sign" + pageNo[1]
        );
      }
    });
  } else {
    $("#divSignModal").html("");
  }
  $("#sigingPageModal").modal("hide");
  $("#txtGogoPageNumBox").val(0);
});

// active page check done
$("body").on("click", ".show-pdf-button", function () {
  $("#overlay").show();
  // $('#pdf-first').trigger('click');
  $("#pdf-buttons").show();
  $("#initial-msg").hide();
  $("#pdf-div").show();
  var location = $(this).attr("data-location");
  var id = $(this).attr("data-id");
  $("#txtDocId").val(id);

  $(".fa-circle").removeClass("outline-info");
  $("#fa-circle" + id).addClass("outline-info");

  $('#pdf-first').trigger('click');
  showPDF(location);
  console.log(location);

  var postData = "&id=" + id;
  $.ajax({
    url: "ajax/sign-data-get-esign.php",
    type: "POST",
    data: postData,
    success: function (data) {
      console.log(data);
      $('#pdf-first').trigger('click');
      localStorage.setItem("signData", data);
    },
  });

  setTimeout(function () {
    console.log("delay 2 Sec");
    $("#divSignModal").html("");
   
    const data = JSON.parse(localStorage.getItem("signData"));
    $.each(data, function (index, element) {
      var pageNo = index;
      pageNo = pageNo.split("-");
      var data = element;
      if (pageNo[0] == 1) {
        $("#divSignModal").append(
          "<img id='sign" +
          pageNo[1] +
          "' class='responsive-image' src='" +
          data["imgData"] +
          "' >"
        );
                $(".box").draggable({
          containment: "#pdf-canvas",
          stop: function (event, ui) {
            $("#overlay").show();
            setTimeout(function () {
            }, 1000);
          },
        });
        $(".box").resizable({
          animate: false,
          containment: "#pdf-canvas",
          ghost: true,
          stop: function (event, ui) {
            $("#overlay").show();
            setTimeout(function () {
              $("#btnSetESignLocation").trigger("click");
            }, 1000);
          },
        });
        placeSigHolder(
          data["position"]["left"],
          data["position"]["top"],
          data["signSize"]["width"],
          data["signSize"]["height"],
          data["pdfSize"]["width"],
          "sign" + pageNo[1]
        );
      }
    });
  }, 1000);
});

//Sign Listing PopUp
$("#sigingPageModal").on("shown.bs.modal", function (e) {
  var divData = "";
  const data = JSON.parse(localStorage.getItem("signData"));
  for (let i = 0; i < _TOTAL_PAGES + 1; i++) {
    var totalSign = 0;

    $.each(data, function (index, element) {
      var pageNo = index;
      pageNo = pageNo.split("-");
      if (pageNo[0] == i) {
        totalSign++;
      }
    });

    if (totalSign > 0) {
      divData +=
        "<tr><td>Page " +
        i +
        "</td><td><a href='#' data-pageNo='" +
        i +
        "' class='btnShowSignPage btn btn-primary'>Go</a></td></tr>";
    }
  }
  $("#divSignPageClick").html(
    "<table class='table table-sm table-hover'>" + divData + "</table>"
  );
});

$("#txtGogoPageNumBox").change(function () {
  var pageNo = parseInt($("#txtGogoPageNumBox").val());
  console.log(pageNo);
  if (pageNo != "0") {
    showPage(pageNo);
    if (localStorage.length > 0) {
      $("#divSignModal").html("");
      const data = JSON.parse(localStorage.getItem("signData"));
      $.each(data, function (index, element) {
        var pageNo = index;
        pageNo = pageNo.split("-");
        var data = element;
        if (pageNo[0] == _CURRENT_PAGE) {
          $("#divSignModal").append(
            "<img id='sign" +
            pageNo[1] +
            "' class='responsive-image' src='" +
            data["imgData"] +
            "' >"
          );
          placeSigHolder(
            data["position"]["left"],
            data["position"]["top"],
            data["signSize"]["width"],
            data["signSize"]["height"],
            data["pdfSize"]["width"],
            "sign" + pageNo[1]
          );
        }
      });
    } else {
      $("#divSignModal").html("");
    }
  }
});

//Download pdf rendering
$("body").on("click", "#pdfDownload", function () {
  var txtDocId = $("#txtDocId").val();
  var txtSignId = $("#txtSignId").val();
  var txtHashData = $("#txtHashData").val();

  var postData =
    "&txtDocId=" +
    txtDocId +
    "&txtSignId=" +
    txtSignId +
    "&txtHashData=" +
    txtHashData;
  console.log(postData);

  $.ajax({
    url: "ajax/pdf-genarate-api.php",
    type: "POST",
    data: postData,
    beforeSend: function () {
      $("#overlay").show();
    },
    success: function (data) {
      $("#overlay").hide();
      //console.log(data);

      if (data == 'fileMissing') {
        $.alert({
          title: "Alert!",
          content: "Document not found. Regenarate this document and try again.",
          icon: "fa fa-exclamation-triangle",
          type: "red",
          buttons: {
            okay: {
              text: "Okay",
              btnClass: "btn-red",
            },
          },
        });
        return false;
      }
      const successData = JSON.parse(data);
      console.log(successData);

      var viewUrl =
        "/pdf-viewer.php?link=uploads/signed/" +
        successData["caseId"] +
        "/" +
        successData["fileName"];
      if (successData["code"] == 200) {
        $.alert({
          title: "Success!",
          content: "Document genarated <strong>Successfully!</strong>.",
          icon: "fa fa-check-circle",
          type: "green",
          buttons: {
            View: {
              text: "View",
              btnClass: "btn-green",
              action: function () {
                window.open(viewUrl);
              },
            },
            cancel: {
              text: "cancel",
              btnClass: "btn-red",
            },
          },
        });
      } else {
        $.alert({
          title: "Alert!",
          content: "Server error. Please try again later",
          icon: "fa fa-exclamation-triangle",
          type: "red",
          buttons: {
            okay: {
              text: "Okay",
              btnClass: "btn-red",
            },
          },
        });
      }
    },
    error: function (data) {
      $("#overlay").hide();
      console.log(data);
      $.alert({
        title: "Alert!",
        content: "Server error. Please try again later",
        icon: "fa fa-exclamation-triangle",
        type: "red",
        buttons: {
          okay: {
            text: "Okay",
            btnClass: "btn-red",
          },
        },
      });
    },
  });
});

