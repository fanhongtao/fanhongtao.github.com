/**
 * 页面ready方法
 */
$(document).ready(function() {
  generateQRcode();
  generateContent();
  backToTop();
  formatTable();
});

/**
 * 生成二维码
 */
function generateQRcode() {
  var opt = { text : window.location.href, width:150, height:150, background: "#f0f0f0" };
  try {
    document.createElement("canvas").getContext("2d");
  } catch (e) {
    $.extend(opt,{ render : "table" });
  }
  $('.qrcode').html('').qrcode(opt);
}

/**
 * 生成侧边目录
 */
function generateContent() {
  if (typeof $('#markdown-toc').html() === 'undefined') {
    $('#content').hide();
  } else {
    $('#content .content-text').html('<ul>' + $('#markdown-toc').html() + '</ul>');
  }
}

/**
 * 回到顶部
 */
function backToTop() {
  $(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
      $("#back-top").fadeIn(500);
    } else {
      $("#back-top").fadeOut(500);
    }
  });
  $("#back-top").click(function() {
    $("body,html").animate({
      scrollTop: "0"
    }, 500);
  });
}

/**
 * 动态修改表格
 */
function formatTable() {
  $("table").each(function (tabindex, tabitem) {
    setTableClassAndCaption(tabindex, tabitem);
    removeEmptyHead(tabindex, tabitem);
    formatCell(tabindex, tabitem);
  });
}


/**
 * 通过在 <th> 字段中使用自定义的格式，来设置表格 class 和 caption
 * 支持的格式为：
 *    class && caption && head
 * class : 指定表格的CSS class属性。为空表示表格不用添加 class 属性。
 * caption : 指定表格的标题。为空表示表格无标题。
 * head : <th> 字段所要显示的内容
 */
function setTableClassAndCaption(tabindex, tabitem) {
  var tableFmt = RegExp(/.*&&.*&&.*/); // 自定义的表头格式
  $(tabitem).find("th").each(function (thindex, thitem) {
    if ($(thitem).text().match(tableFmt)) {
      var arr = $(thitem).text().split("&&");
      var style = arr[0].trim();
      if (style.length != 0) {
        $(tabitem).addClass(style);
      }
      var cap = arr[1].trim();
      if (cap.length != 0) {
        var caption =$("<caption></caption>").text(cap);
        $(tabitem).prepend(caption);
      }
      $(thitem).text(arr[2]);
    }
  });
}

/**
 * 如果表格的表头(head) 全部都是空，则删除表头
 */
function removeEmptyHead(tabindex, tabitem) {
  var count = 0;
  var total = 0;
  var last_th;
  $(tabitem).find("th").each(function (thindex, thitem) {
    total = total + 1;
    if ($.trim($(thitem).text()).length==0) {
      last_th = thitem;
      count = count + 1;
    }
  });
  if (count == total) {
    $(last_th).parent().remove();
  }
}

/**
 * 通过在 <td> 字段中使用自定义的格式，来设置支持动态设置表格单元
 * 支持的格式为：
 *    class && content
 * class : 指定单元格的CSS class属性。为空表示该单元格不用添加 class 属性。
 * caption : 指定表格的内容。支持输入 html 元素。
 */
function formatCell(tabindex, tabitem) {
  var tdFmt = RegExp(/.*&&.*/);   // 自定义的单元格格式
  $(tabitem).find("td").each(function (tdindex, tditem) {
    if ($(tditem).text().match(tdFmt)) {
      //console.log($(tditem).text());
      var arr = $(tditem).text().split("&&");
      var style = arr[0].trim();
      if (style.length != 0) {
        $(tditem).addClass(style);
      }
      $(tditem).html(arr[1]);
    }
  });
}

