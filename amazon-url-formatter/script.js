function getAsin(target) {
    target = encodeURI(target)
	var regList = [];
	regList.push(/(?:https?:\/\/)?([^\/]*\/).*dp\/([0-9A-Z]{10})(?:[^0-9A-Z]|$)/i);
	regList.push(/(?:https?:\/\/)?([^\/]*\/).*product\/([0-9A-Z]{10})(?:[^0-9A-Z]|$)/i);
	regList.push(/(?:https?:\/\/)?([^\/]*\/).*asin\/([0-9A-Z]{10})(?:[^0-9A-Z]|$)/i);
	for (let reg of regList) {
		var m = reg.exec(target);
		if (m) {
			return [m[1], m[2]];
		}
	}

}

function run(input, parameters) {
    var app = Application.currentApplication();
    app.includeStandardAdditions = true;

	var domain, asin;
	urlInfo = getAsin(input);
	if (urlInfo) {
		[domain, asin] = urlInfo;
		url = "https://" + domain + "dp/" + asin;
		app.setTheClipboardTo(url);
        app.displayNotification("URLをコピーしました",{
            withTitle: "成功",
        })
	}else{
        var dialogText = "Amazonリンクが正しく入力されませんでした。";
        app.displayAlert(dialogText, {
            buttons: "終了",
        });
    }
}
