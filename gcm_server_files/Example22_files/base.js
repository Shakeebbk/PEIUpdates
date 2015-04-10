function BuildGrid(a, b, c, d, e)
{
    var f = m_pageLocation + "/tabid/{0}/id/{1}/default.aspx";
    var g = [];
    if (b == null || b.length <= 0)
    {
        $("divPageHeader").css("display", "none");
        g.push(e);
        $(g.join("")).appendTo($(c));
        return
    }
    for (var h in b)
    {
        var i = b[h];
        g.push(d(i, a, f))
    }
    $(g.join("")).appendTo($(c))
}

function BuildPaging(a, b, c, d)
{
    var e = [];
    if (typeof d == "undefined") d = "";
    if (b == 0)
    {
        $("#div" + d + "PageHeader,#span" + d + "PageHeader").html("");
        $("#div" + d + "Paging,#span" + d + "Paging").html("");
        return
    }
    var f = a;
    for (var g = 0; g < 2; g++) if (f - m_rpp >= 0) f -= m_rpp;
    var h = f + m_rpp * 5;
    if (h > b)
    {
        f -= h - Math.ceil(b / 10) * 10;
        if (f < 0) f = 0;
        h = b
    }
    for (var g = f; g < h; g += m_rpp)
    {
        if (g == a) e.push("<li class='active'><a href='javascript:" + c + "(" + g + ")'>" + (g / m_rpp + 1) + "</a></li>");
        else e.push("<li><a href='javascript:" + c + "(" + g + ")'>" + (g / m_rpp + 1) + "</a></li>")
    }
    var i = a + m_rpp;
    if (i > b) i = b;
    $("#span" + d + "PageHeader,#div" + d + "PageHeader").html(a + 1 + "-" + i + " out of " + b);
    $("#span" + d + "Paging,#div" + d + "Paging").html(e.join(""))
}

function ShowIndicator()
{
    $("#imgLoader").css("display", "inline")
}

function HideIndicator()
{
    $("#imgLoader").css("display", "none")
}

function ErrorMessage(a)
{
    var b = [];
    b.push("<ul>");
    for (var c in a)
    {
        b.push("<li>");
        b.push(a[c]);
        b.push("</li>")
    }
    b.push("</ul>");
    ClientMessage(b.join(""), false)
}

function ClientMessage(a, b, c)
{
    if (!m_pageActive) return;
    var d = $("#divMessage");
    var e = $("#divMessageContainer");
    e.css("display", "inline-block");
    d.html(a);
    e.attr("class", b ? "show_error" : "show_success");
    if (c)
    {
        setTimeout(CloseMessage, c);

        return;
    }
    setTimeout(function ()
    {
        $("#divMessageContainer").removeClass('show_error').removeClass('show_success');
    }, 4e3)
}

function CloseMessage()
{
    $("#divMessageContainer").removeClass('show_error').removeClass('show_success');
    window.location = window.location
}
if (!this.JSON)
{
    this.JSON = {}
} (function ()
{
    function f(a)
    {
        return a < 10 ? "0" + a : a
    }

    function quote(a)
    {
        escapable.lastIndex = 0;
        return escapable.test(a) ? '"' + a.replace(escapable, function (a)
        {
            var b = meta[a];
            return typeof b === "string" ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }

    function str(a, b)
    {
        var c, d, e, f, g = gap,
            h, i = b[a];
        if (i && typeof i === "object" && typeof i.toJSON === "function")
        {
            i = i.toJSON(a)
        }
        if (typeof rep === "function")
        {
            i = rep.call(b, a, i)
        }
        switch (typeof i)
        {
            case "string":
                return quote(i);
            case "number":
                return isFinite(i) ? String(i) : "null";
            case "boolean":
            case "null":
                return String(i);
            case "object":
                if (!i)
                {
                    return "null"
                }
                gap += indent;
                h = [];
                if (Object.prototype.toString.apply(i) === "[object Array]")
                {
                    f = i.length;
                    for (c = 0; c < f; c += 1)
                    {
                        h[c] = str(c, i) || "null"
                    }
                    e = h.length === 0 ? "[]" : gap ? "[\n" + gap + h.join(",\n" + gap) + "\n" + g + "]" : "[" + h.join(",") + "]";
                    gap = g;
                    return e
                }
                if (rep && typeof rep === "object")
                {
                    f = rep.length;
                    for (c = 0; c < f; c += 1)
                    {
                        d = rep[c];
                        if (typeof d === "string")
                        {
                            e = str(d, i);
                            if (e)
                            {
                                h.push(quote(d) + (gap ? ": " : ":") + e)
                            }
                        }
                    }
                } else
                {
                    for (d in i)
                    {
                        if (Object.hasOwnProperty.call(i, d))
                        {
                            e = str(d, i);
                            if (e)
                            {
                                h.push(quote(d) + (gap ? ": " : ":") + e)
                            }
                        }
                    }
                }
                e = h.length === 0 ? "{}" : gap ? "{\n" + gap + h.join(",\n" + gap) + "\n" + g + "}" : "{" + h.join(",") + "}";
                gap = g;
                return e
        }
    }
    if (typeof Date.prototype.toJSON !== "function")
    {
        Date.prototype.toJSON = function (a)
        {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        };
        String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (a)
        {
            return this.valueOf()
        }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap, indent, meta = {
            "\b": "\\b",
            "	": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
        }, rep;
    if (typeof JSON.stringify !== "function")
    {
        JSON.stringify = function (a, b, c)
        {
            var d;
            gap = "";
            indent = "";
            if (typeof c === "number")
            {
                for (d = 0; d < c; d += 1)
                {
                    indent += " "
                }
            } else
            {
                if (typeof c === "string")
                {
                    indent = c
                }
            }
            rep = b;
            if (b && typeof b !== "function" && (typeof b !== "object" || typeof b.length !== "number"))
            {
                throw new Error("JSON.stringify")
            }
            return str("", {
                "": a
            })
        }
    }
    if (typeof JSON.parse !== "function")
    {
        JSON.parse = function (text, reviver)
        {
            function walk(a, b)
            {
                var c, d, e = a[b];
                if (e && typeof e === "object")
                {
                    for (c in e)
                    {
                        if (Object.hasOwnProperty.call(e, c))
                        {
                            d = walk(e, c);
                            if (d !== undefined)
                            {
                                e[c] = d
                            } else
                            {
                                delete e[c]
                            }
                        }
                    }
                }
                return reviver.call(a, b, e)
            }
            var j;
            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text))
            {
                text = text.replace(cx, function (a)
                {
                    return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                })
            }
            if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, "")))
            {
                j = eval("(" + text + ")");
                return typeof reviver === "function" ? walk({
                    "": j
                }, "") : j
            }
            throw new SyntaxError("JSON.parse")
        }
    }
})();
this.ServiceProxy = function (a, b)
{
    var c = this;
    this.serviceUrl = a;
    this.timeout = 1e4;
    this.contentType = "application/json";
    this.invoke = function (a, b, d, e)
    {
        var f = JSON.stringify(b);
        var g = c.serviceUrl + a;
        return $.ajax({
            url: g,
            data: f,
            type: "POST",
            contentType: c.contentType,
            timeout: 9999999,
            dataType: "json",
            success: function (a)
            {
                if (d) d(a.d)
            },
            error: function (a, b)
            {
                var d = null;
                if (a.readyState == 4)
                {
                    var f = a.responseText;
                    if (f && f.charAt(0) == "{" && b != "parsererror") var d = JSON.parse(f);
                    if (!d)
                    {
                        if (a.status && a.status != 200) d = new CallbackException(a.status + " " + a.statusText);
                        else
                        {
                            if (b == "parsererror") b = "Unable to parse JSON response.";
                            else if (b == "timeout") b = "Request timed out.";
                            else if (b == "error") b = "Unknown error";
                            d = new CallbackException("Callback Error: " + b)
                        }
                        d.detail = f
                    }
                }
                if (!d) d = new CallbackException("Callback Error: " + b);
                if (e) e(d, c, a)
            }
        })
    }
};
this.CallbackException = function (a, b)
{
    this.isCallbackError = true;
    if (typeof a == "object")
    {
        if (a.message) this.message = a.message;
        else if (a.Message) this.message = a.Message
    } else this.message = a;
    if (b) this.detail = b;
    else this.detail = null
};

$(document).ajaxSend(ShowIndicator);
$(document).ajaxStop(HideIndicator);

var m_pageLocation = "http://" + window.location.host;
var m_rpp = 10;
var m_loadCount;
var m_pageActive = true;
var _tmplCache = {};
this.parseTemplate = function (a, b)
{
    var c = "";
    try
    {
        var d = _tmplCache[a];
        if (!d)
        {
            var e = "var p=[],print=function(){p.push.apply(p,arguments);};" + "with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").replace(/'(?=[^#]*#>)/g, "	").split("'").join("\\'").split("	").join("'").replace(/<#=(.+?)#>/g, "',$1,'").split("<#").join("');").split("#>").join("p.push('") + "');}return p.join('');";
            d = new Function("obj", e);
            _tmplCache[a] = d
        }
        return d(b)
    } catch (f)
    {
        c = f.message
    }
    return "< # ERROR: " + $("<div/>").text(c).html() + " # >"
};
window.onbeforeunload = function ()
{
    m_pageActive = false
}

function Scale()
{
    $('[scale]').each(function ()
    {
        var $this = $(this);
        var scale = $this.attr('scale');
        if (document.cookie.search(scale) != -1)
        {
            ScaleEnd($this);
            return;
        }
        var src = 'ScaleImage.jpg?image=' + scale.replace('images/', '');
        CreateImage($this, src, function ()
        {
            src = 'ScaleImage.jpg?size=med&image=' + $this.attr('scale').replace('images/', '');
            CreateImage($this, src, function ()
            {
                CreateImage($this, $this.attr('scale'), function ()
                {
                    ScaleEnd($this);
                    pushCookie($this.attr('scale'));
                });
            });
        });
    });

    $('img[small]').each(function (i, e)
    {
        var src = 'ScaleImage.jpg?image=' + $(e).attr('small').replace('images/', '');
        $(e).attr('src', src).removeAttr('small');
    });

    $('img[medium]').each(function (i, e)
    {
        var src = 'ScaleImage.jpg?size=med&image=' + $(e).attr('medium').replace('images/', '');
        $(e).attr('src', src).removeAttr('medium');
    });

    $('[srcd]').each(function (i, e)
    {
        var $e = $(e);
        $e.attr('src', GetAbsUrl($e.attr('srcd')));
        $e.removeAttr('srcd');
    });
}

function pushCookie(cookie)
{
    var items = document.cookie.split(';');
    var value = '';
    for (var i in items)
    {
        var parts = items[i].split('=');
        if (parts[0].search('ncsi') != -1)
        {
            value = parts[1];
            break;
        }
    }

    value += ',' + cookie;
    document.cookie = 'ncsi=' + value;
}

function ScaleEnd($this)
{
    $this.removeAttr('width');
    $this.attr('src', GetAbsUrl($this.attr('scale')));
}

function GetAbsUrl(relativeUrl)
{
    return window.location.protocol + '//' + window.location.host + '/' + relativeUrl;
}

function CreateImage($this, src, callback)
{
    var $image = new Image();
    $image.src = GetAbsUrl(src);
    $image.onload = function ()
    {
        $this.attr('src', GetAbsUrl(src));
        $this.attr('width', $this.parent().width() + 'px');
        callback();
    }
}

function Menu()
{
    $('[menu]').each(function (i, e)
    {
        var m_current = document.location.pathname;
        var cName = $(e).attr('menu') + 'active';
        var iName = $(e).attr('menu') + 'inactive';
        $('.' + cName).removeClass(cName);
        $('.' + iName).removeClass(iName);

        for (var c = e.children.length - 1; c >= 0; c--)
        {
            $c = $(e.children[c]);

            var href = $c.find('a').attr('href').replace('/#!', '')

            if (m_current.search(href) != -1)
            {
                $c.addClass(cName);
                break;
            }
        }

        $(e).children().not('.' + cName).addClass(iName);
    });
}

function CheckConnection()
{
    var connectionProxy = new ServiceProxy("../Web Services/ConnectionService.asmx/");
    connectionProxy.invoke("CheckConnection", {}, CheckConnectionCallback, FailedCallback);
}

function CheckConnectionCallback(result)
{
    if (result.length > 0)
    {
        $('#divConnectionIssues').show();
        $('#divConnectionIssues').html(result);
    }
    else
    {
        $('#divConnectionIssues').hide();
    }
}

function FailedCallback(error)
{
    var errors = [];
    errors.push(error.message);
    ErrorMessage(errors);
}